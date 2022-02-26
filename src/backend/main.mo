import Array            "mo:base/Array";
import Debug            "mo:base/Debug";
import Database         "./database";
import Error            "mo:base/Error";
import Iter             "mo:base/Iter";
import Nat              "mo:base/Nat";
import Principal        "mo:base/Principal";
import Text             "mo:base/Text";

import Types            "./types";
import Utils            "./utils";

import EscrowManager    "canister:escrow-manager";

actor CrowdFundNFT {

    // Types

    type NewProfile = Types.NewProfile;
    type NewProject = Types.NewProject;
    type Profile = Types.Profile;
    type Project = Types.Project;
    type ProjectId = Types.ProjectId;
    type ProjectStatus = Types.ProjectStatus;
    type ProjectWithOwner = Types.ProjectWithOwner;
    type UserId = Types.UserId;

    // Escrow Manager Types

    type EMProjectId = Nat;
    type EMCanisterId = Principal;

    // Stable vars used for upgrading 

    stable var users        : [(UserId, Profile)]               = [];
    stable var projects     : [(ProjectId, Project)]            = [];
    stable var userProjects : [(UserId, [ProjectId])]           = [];
    stable var whitelists   : [var (ProjectId, [Principal])]    = [var];
    stable var nextProject  : Nat                               = 0;

    // Main database

    var db: Database.Directory = Database.Directory();

    // Upgrade functions

    system func preupgrade() {
        users           := db.getUserArray();
        projects        := db.getProjectArray();
        userProjects    := db.getUserToProjectArray();
        nextProject     := db.projectIdGenerator;
    };

    system func postupgrade() {
        db.initializeUserMap(users);
        db.initializeProjectMap(projects);
        db.initializeUserToProjectMap(userProjects);
        db.projectIdGenerator := nextProject;
        Debug.print(Nat.toText(nextProject));
        users := [];
        projects := [];
        userProjects := [];
    };

    // Healthcheck

    public func healthcheck(): async Bool { true };

    // Testing

    public shared(msg) func greet(): async Text {
        "Hello " # Utils.getProfile(db, msg.caller).firstName # "!"
    };

    // Profiles

    public shared query(msg) func getMyProfile(): async Profile {
        Utils.getProfile(db, msg.caller)
    };

    public shared(msg) func createProfile(profile: NewProfile): async () {
        db.createOne(msg.caller, profile);
    };

    public shared(msg) func updateProfile(profile: Profile): async () {
        if(Utils.hasAccess(msg.caller, profile)) {
            db.updateOne(profile.id, profile);
        };
    };

    public query func getProfile(userId: UserId): async Profile {
        Utils.getProfile(db, userId)
    };

    public query func searchProfiles(term: Text): async [Profile] {
        db.findUserBy(term)
    };

    // Projects

    public shared query(msg) func getMyProjects() : async [Project] {
        db.getProjects(msg.caller)
    };

    public shared(msg) func createFirstProject(profile: NewProfile, project: NewProject): async Project {
        db.createOne(msg.caller, profile);
        db.createProject(msg.caller, project);
    };

    public shared(msg) func createProject(project: NewProject): async Project {
        db.createProject(msg.caller, project)
    };

    public shared(msg) func deleteProject(projectId: ProjectId): async ?Project {
        if (Utils.hasProjectAccess(msg.caller, await getProject(projectId))) {
            return db.deleteProject(projectId)
        } else {
            throw(Error.reject("User is not authorized to delete project."))
        };
    };

    public query func getProject(projectId: ProjectId): async Project {
        Utils.getProject(db, projectId)
    };

    public query func getProjectWithOwner(projectId: ProjectId): async ProjectWithOwner {
        Utils.getProjectWithOwner(db, Utils.getProject(db, projectId))
    };

    public query func getProjects(userId: UserId): async [Project] {
        db.getProjects(userId)
    };

    public query func listProjects(statuses: [ProjectStatus]): async [ProjectWithOwner] {
        func getProjectWithOwner(p: Project) : ProjectWithOwner { 
            Utils.getProjectWithOwner(db, p);
        };
        let projectsWithOwners = Array.map(db.listProjects(), getProjectWithOwner);
        switch (statuses.size()) { 
            case 0 { projectsWithOwners };
            case _ { Array.filter(projectsWithOwners, func (p: ProjectWithOwner) : Bool { 
                switch(Array.find(statuses, func (s: ProjectStatus) : Bool { s == p.project.status })) {
                    case null { false };
                    case _ { true };
                };
            }); 
            };
        };
    };

    // Project statuses

    public shared(msg) func approveProject(pid: ProjectId): async () {
        assert(Utils.isAdmin(msg.caller));
        switch (db.getProject(pid)) {
            case (?p) { 
                assert(p.status == ?#submitted);
                db.updateProjectStatus(p, ?#approved);
            };
            case null { throw Error.reject("No project with this id.") };
        };
    };

    public shared(msg) func openProjectToWhiteList(pid: ProjectId) : async () {
        assert(Utils.isAdmin(msg.caller));
        switch (db.getProject(pid)) {
            case (?p) { 
                assert(p.status == ?#approved);
                switch (db.textToNat(pid)) {
                    case (?natId) { 
                        switch (await EscrowManager.getProjectEscrowCanisterPrincipal(natId)) {
                            case null { throw Error.reject("The project does not have an escrow canister.") };
                            case _ { db.updateProjectStatus(p, ?#whitelist) };
                        };
                    };
                    case null { throw Error.reject("Project id is not valid.") };
                };
            };
            case null { throw Error.reject("No project with this id.") };
        }; 
    };

    public shared(msg) func makeProjectLive(pid: ProjectId): async () {
        assert(Utils.isAdmin(msg.caller));
        switch (db.getProject(pid)) {
            case (?p) { 
                assert(p.status == ?#approved or p.status == ?#whitelist);
                switch (db.textToNat(pid)) {
                    case (?natId) { 
                        switch (await EscrowManager.getProjectEscrowCanisterPrincipal(natId)) {
                            case null { throw Error.reject("The project does not have an escrow canister.") };
                            case _ { db.updateProjectStatus(p, ?#live) };
                        };
                    };
                    case null { throw Error.reject("Project id is not valid.") };
                };
            };
            case null { throw Error.reject("No project with this id.") };
        };
    };

    // Project whitelists

    public func getWhitelist(pid: ProjectId): async [Principal] {
        for (pp in Iter.fromArrayMut(whitelists)) {
            if (pidsAreEqual(pp.0, pid)) {
                return pp.1;
            };
        };
        return [];
    };

    public shared(msg) func addToWhitelist(pid: ProjectId, principal: Principal): async () {
        assert(Utils.isAdmin(msg.caller));
        var i = 0;
        while (i < whitelists.size()) {
            if (pidsAreEqual(whitelists[i].0, pid)) {
                var principals = whitelists[i].1;
                principals := Array.append<Principal>(principals, [principal]);
                whitelists[i] := (pid, principals);
                return;
            };
            i += 1;
        };
        whitelists := Array.thaw<(ProjectId, [Principal])>(Array.append<(ProjectId, [Principal])>(Array.freeze<(ProjectId, [Principal])>(whitelists), [(pid, [principal])]));
    };

    func pidsAreEqual(p1: ProjectId, p2: ProjectId) : Bool { p1 == p2 };

    // User Auth

    public shared query(msg) func getOwnId(): async UserId { msg.caller };

    public shared query(msg) func getOwnIdText(): async Text { Principal.toText(msg.caller) };

    public shared query(msg) func isAdmin(): async Bool {
        Utils.isAdmin(msg.caller)
    };

};
