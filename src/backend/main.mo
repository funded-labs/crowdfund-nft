// Make the Connectd app's public methods available locally
// import Connectd "canister:connectd";
import Debug "mo:base/Debug";
import Database "./database";
import Principal "mo:base/Principal";
import Types "./types";
import Utils "./utils";
import Text "mo:base/Text";

actor CrowdFundNFT {
    var directory: Database.Directory = Database.Directory();
    
    let test = 0;

    public query func testVal(): async Nat { test };

    type NewProfile = Types.NewProfile;
    type NewProject = Types.NewProject;
    type Profile = Types.Profile;
    type Project = Types.Project;
    type UserId = Types.UserId;
    type ProjectId = Types.ProjectId;

    // Healthcheck

    public func healthcheck(): async Bool { true };

    // Testing

    public shared(msg) func greet(): async Text {
        "Hello " # Utils.getProfile(directory, msg.caller).firstName # "!"
    };

    // Profiles

    public shared query(msg) func getMyProfile(): async Profile {
        Utils.getProfile(directory, msg.caller)
    };

    public shared(msg) func createProfile(profile: NewProfile): async () {
        Debug.print(Principal.toText(msg.caller));
        directory.createOne(msg.caller, profile);
    };

    public shared(msg) func updateProfile(profile: Profile): async () {
        if(Utils.hasAccess(msg.caller, profile)) {
            directory.updateOne(profile.id, profile);
        };
    };

    public query func getProfile(userId: UserId): async Profile {
        Utils.getProfile(directory, userId)
    };

    public query func searchProfiles(term: Text): async [Profile] {
        directory.findBy(term)
    };

    // Projects

    public shared query(msg) func getMyProjects() : async [Project] {
        directory.getProjects(msg.caller)
    };

    public shared(msg) func createFirstProject(profile: NewProfile, project: NewProject): async Project {
        directory.createOne(msg.caller, profile);
        directory.createProject(msg.caller, project);
    };

    public shared(msg) func createProject(project: NewProject): async Project {
        directory.createProject(msg.caller, project)
    };

    public query func getProjects(userId: UserId): async [Project] {
        directory.getProjects(userId)
    };

    public query func listProjects(): async [Project] {
        directory.listProjects()
    };

    // User Auth

    public shared query(msg) func getOwnId(): async UserId { msg.caller }

};
