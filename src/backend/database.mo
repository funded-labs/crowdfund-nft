import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Types "./types";
import Text "mo:base/Text";
import Prim "mo:prim";

module {
  type NewProfile = Types.NewProfile;
  type NewProject = Types.NewProject;
  type Profile = Types.Profile;
  type Project = Types.Project;
  type ProjectId = Types.ProjectId;
  type ProjectStatus = Types.ProjectStatus;
  type UserId = Types.UserId;

  public class Directory() {

    // The "database" is made up of a few hashmaps
    let userMap = HashMap.HashMap<UserId, Profile>(1, isEqUserId, Principal.hash);
    let projectMap = HashMap.HashMap<ProjectId, Project>(1, isEqProjectId, Text.hash);
    let userToProjectsMap = HashMap.HashMap<UserId, [ProjectId]>(1, isEqUserId, Principal.hash);

    // Users

    public func createOne(userId: UserId, profile: NewProfile) {
      userMap.put(userId, makeProfile(userId, profile));
    };

    public func updateOne(userId: UserId, profile: Profile) {
      userMap.put(userId, profile);
    };

    public func getUser(userId: UserId): ?Profile {
      userMap.get(userId)
    };

    public func getMultipleUsers(userIds: [UserId]): [Profile] {
      func getProfile(userId: UserId): Profile {
        switch (userMap.get(userId)) {
          case null {
            {
              bio = "";
              id = userId;
              img = "";
              firstName = "";
              lastName = "";
            };
          };
          case (?profile) { profile };
        };
      };
      Array.map<UserId, Profile>(userIds, getProfile)
    };

    public func findUserBy(term: Text): [Profile] {
      var profiles : Buffer.Buffer<Profile> = Buffer.Buffer<Profile>(1);
      for ((id, profile) in userMap.entries()) {
        let fullName = profile.firstName # " " # profile.lastName;
        if (includesText(fullName, term)) {
          profiles.add(profile);
        };
      };
      profiles.toArray();
    };

    // Projects 

    public func createProject(userId: UserId, newProject: NewProject): Project {
      let project = makeProject(userId, newProject);
      projectMap.put(project.id, project);
      switch (userToProjectsMap.get(userId)) {
        case (null) { userToProjectsMap.put(userId, [project.id]); };
        case (?projects) { userToProjectsMap.put(userId, Array.append<ProjectId>(projects, [project.id])); };
      };
      project;
    };

    public func deleteProject(projectId: ProjectId) : ?Project {
      let p = projectMap.get(projectId);
      switch (p) {
        case null { };
        case (?project) {
          switch (userToProjectsMap.get(project.owner)) {
            case null { };
            case (?projects) {
              func idsNotEqual (curId: ProjectId) : Bool { isEqProjectId(curId, projectId) != true };
              let newProjects = Array.filter<ProjectId>(projects, idsNotEqual);
              userToProjectsMap.put(project.owner, newProjects);
            };
          };
        };
      };
      projectMap.remove(projectId);
    };

    public func getProject(projectId: ProjectId): ?Project {
      projectMap.get(projectId)
    };

    public func getProjects(userId: UserId): [Project] {
      switch (userToProjectsMap.get(userId)) {
        case (null) { [] };
        case (?projects) {
          func getProject(projectId: ProjectId): Project {
            switch (projectMap.get(projectId)) {
              case null {
                {
                  category = "";
                  cover = "";
                  description = "";
                  discordLink = "";
                  goal = 0;
                  id = projectId;
                  nftVolume = 0;
                  owner = userId;
                  rewards = "";
                  status = null;
                  story = "";
                  tags = [];
                  title = "";
                  twitterLink = "";
                  walletId = "";
                  wetransferLink = "";
                  video = null;
                };
              };
              case (?project) { project };
            }
          };
          Array.map<ProjectId, Project>(projects, getProject)
        };
      };
    };

    public func listProjects() : [Project] {
      Iter.toArray(projectMap.vals())
    };

    public func updateProject(project: Project) {
      projectMap.put(project.id, project);
    };

    public func updateProjectStatus(project: Project, status: ProjectStatus) {
      projectMap.put(project.id, {
        category = project.category;
        cover = project.cover;
        description = project.description;
        discordLink = project.discordLink;
        goal = project.goal;
        id = project.id;
        nftVolume = project.nftVolume;
        owner = project.owner;
        rewards = project.rewards;
        status = status;
        story = project.story;
        tags = project.tags;
        title = project.title;
        twitterLink = project.twitterLink;
        walletId = project.walletId;
        wetransferLink = project.wetransferLink;
        video = project.video;
      });
    };

    public func findProjects(term: Text) : [Project] {
      var projects : Buffer.Buffer<Project> = Buffer.Buffer<Project>(1);
      for ((id, project) in projectMap.entries()) {
        if (includesText(project.title, term)) {
          projects.add(project);
        };
      };
      projects.toArray();
    };

    // Upgrade helpers

    public func getUserArray() : [(UserId, Profile)] {
      Iter.toArray(userMap.entries())
    };

    public func getProjectArray() : [(ProjectId, Project)] {
      Iter.toArray(projectMap.entries())
    };

    public func getUserToProjectArray() : [(UserId, [ProjectId])] {
      Iter.toArray(userToProjectsMap.entries())
    };

    public func initializeUserMap(users: [(UserId, Profile)]) {
      for ((userId, profile) in users.vals()) {
        userMap.put(userId, profile);
      };
    };

    public func initializeProjectMap(projects: [(ProjectId, Project)]) {
      for ((projectId, project) in projects.vals()) {
        projectMap.put(projectId, project);
      };
    };

    public func initializeUserToProjectMap(userToProjects: [(UserId, [ProjectId])]) {
      for ((userId, projects) in userToProjects.vals()) {
        userToProjectsMap.put(userId, projects);
      };
    };

    // Helpers

    func makeProfile(userId: UserId, profile: NewProfile): Profile {
      {
        bio = profile.bio;
        firstName = profile.firstName;
        id = userId;
        img = profile.img;
        lastName = profile.lastName;
      }
    };

    public var projectIdGenerator : Nat = 0;
    public func makeProject(userId: UserId, project: NewProject): Project {
      projectIdGenerator += 1;
      {
        category = project.category;
        cover = project.cover;
        description = project.description;
        discordLink = project.discordLink;
        goal = project.goal;
        id = Nat.toText(projectIdGenerator);
        nftVolume = project.nftVolume;
        owner = userId;
        rewards = project.rewards;
        status = ?#submitted;
        story = project.story;
        tags = project.tags; 
        title = project.title;
        twitterLink = project.twitterLink;
        walletId = project.walletId;
        wetransferLink = project.wetransferLink;
        video = project.video;
      };
    };

    func includesText(string: Text, term: Text): Bool {
      let stringLowercase = Text.map(string, Prim.charToLower);
      let termLowercase = Text.map(term, Prim.charToLower);

      let stringArray = Iter.toArray<Char>(stringLowercase.chars());
      let termArray = Iter.toArray<Char>(termLowercase.chars());

      var i = 0;
      var j = 0;

      while (i < stringArray.size() and j < termArray.size()) {
        if (stringArray[i] == termArray[j]) {
          i += 1;
          j += 1;
          if (j == termArray.size()) { return true; }
        } else {
          i += 1;
          j := 0;
        }
      };
      false
    };

    public func textToNat(t : Text) : ?Nat {
      var i : Nat = 0;
      while (i <= projectIdGenerator) {
        if (t == Nat.toText(i)) { return ?i; };
        i += 1;
      };
      return null;
    };

  };

  func isEqUserId(x: UserId, y: UserId): Bool { x == y };
  func isEqProjectId(x: ProjectId, y: ProjectId): Bool { x == y };
};
