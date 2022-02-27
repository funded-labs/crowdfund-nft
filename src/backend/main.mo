// Make the Connectd app's public methods available locally
// import Connectd "canister:connectd";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Database "./database";
import E "mo:base/Error";
import Principal "mo:base/Principal";
import Types "./types";
import Utils "./utils";
import Text "mo:base/Text";

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

    // Stable vars used for upgrading 

    stable var users        : [(UserId, Profile)]       = [];
    stable var projects     : [(ProjectId, Project)]    = [];
    stable var userProjects : [(UserId, [ProjectId])]   = [];

    // Main database

    var db: Database.Directory = Database.Directory();

    // Upgrade functions

    system func preupgrade() {
        users           := db.getUserArray();
        projects        := db.getProjectArray();
        userProjects    := db.getUserToProjectArray();
    };

    system func postupgrade() {
        db.initializeUserMap(users);
        db.initializeProjectMap(projects);
        db.initializeUserToProjectMap(userProjects);
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
            throw(E.reject("User is not authorized to delete project."))
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

    type ProjectNoImage = {
        category: Text;
        description: Text;
        discordLink: Types.Link;
        goal: Float;
        id: ProjectId;
        nftVolume: Nat;
        owner: UserId;
        rewards: Text;
        status: ProjectStatus;
        story: Text;
        tags: [Text];
        title: Text;
        twitterLink: Types.Link;
        walletId: Text;
        wetransferLink: Types.Link;
    };
    type ProfileNoImage = {
        bio: Text;
        firstName: Text;
        id: UserId;
        lastName: Text;
    };
    type ProjectWithOwnerNoImage = {
        project: ProjectNoImage;
        owner: ProfileNoImage;
    };
    public query func listProjectsWithoutImages() : async [ProjectWithOwnerNoImage] {
        func getProjectWithOwner(p: Project) : ProjectWithOwner { 
            Utils.getProjectWithOwner(db, p);
        };
        let projectsWithOwners = Array.map(db.listProjects(), getProjectWithOwner);
        func getProjectsWithOwnersNoImage(projectsWithOwners : ProjectWithOwner) : ProjectWithOwnerNoImage {
            let projectNoImage : ProjectNoImage = {
                category = projectsWithOwners.project.category;
                description = projectsWithOwners.project.description;
                discordLink = projectsWithOwners.project.discordLink;
                goal = projectsWithOwners.project.goal;
                id = projectsWithOwners.project.id;
                nftVolume = projectsWithOwners.project.nftVolume;
                owner = projectsWithOwners.project.owner;
                rewards = projectsWithOwners.project.rewards;
                status = projectsWithOwners.project.status;
                story = projectsWithOwners.project.story;
                tags = projectsWithOwners.project.tags;
                title = projectsWithOwners.project.title;
                twitterLink = projectsWithOwners.project.twitterLink;
                walletId = projectsWithOwners.project.walletId;
                wetransferLink = projectsWithOwners.project.wetransferLink;
            };
            let profileNoImage : ProfileNoImage = {
                bio = projectsWithOwners.owner.bio;
                firstName = projectsWithOwners.owner.firstName;
                id = projectsWithOwners.owner.id;
                lastName = projectsWithOwners.owner.lastName;
            };
            return {
                project = projectNoImage;
                owner = profileNoImage;
            };
        };
        Array.map(projectsWithOwners, getProjectsWithOwnersNoImage); 
    };

    public shared(msg) func updateProjectStatus(pid: ProjectId, status: ProjectStatus): async () {
        if (Utils.isAdmin(msg.caller) != true) { throw(E.reject("Not authorized")); };
        let p = Utils.getProject(db, pid);
        if (p.id == "") { throw(E.reject("Project doesn't exist")) };
        if(Utils.hasProjectAccess(msg.caller, p)) {
            db.updateProjectStatus(p, status);
        };
    };

    // User Auth

    public shared query(msg) func getOwnId(): async UserId { msg.caller };

    public shared query(msg) func getOwnIdText(): async Text { Principal.toText(msg.caller) };

    public shared query(msg) func isAdmin(): async Bool {
        Utils.isAdmin(msg.caller)
    };

};
