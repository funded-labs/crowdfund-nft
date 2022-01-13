import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Types "./types";
import Text "mo:base/Text";

module {
  type NewProfile = Types.NewProfile;
  type NewProject = Types.NewProject;
  type Profile = Types.Profile;
  type Project = Types.Project;
  type UserId = Types.UserId;
  type ProjectId = Types.ProjectId;

  public class Directory() {
    // The "database" is just a local hash map
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

    public func findOne(userId: UserId): ?Profile {
      userMap.get(userId)
    };

    public func findMany(userIds: [UserId]): [Profile] {
      func getProfile(userId: UserId): Profile {
        Option.unwrap<Profile>(userMap.get(userId))
      };
      Array.map<UserId, Profile>(userIds, getProfile)
    };

    public func findBy(term: Text): [Profile] {
      var profiles: [Profile] = [];
      for ((id, profile) in userMap.entries()) {
        let fullName = profile.firstName # " " # profile.lastName;
        if (includesText(fullName, term)) {
          profiles := Array.append<Profile>(profiles, [profile]);
        };
      };
      profiles
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

    // public func getProject(id: ProjectId): ?Project {
    //   projectMap.get(id)
    // };

    public func getProjects(userId: UserId): [Project] {
      switch (userToProjectsMap.get(userId)) {
        case (null) { [] };
        case (?projects) {
          func getProject(projectId: ProjectId): Project {
            Option.unwrap<Project>(projectMap.get(projectId))
          };
          Array.map<ProjectId, Project>(projects, getProject)
        };
      };
    };

    public func listProjects() : [Project] {
      Iter.toArray(projectMap.vals())
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

    var projectIdGenerator : Nat = 0;
    public func makeProject(userId: UserId, project: NewProject): Project {
      projectIdGenerator += 1;
      {
        category = project.category;
        coverImg = project.coverImg;
        description = project.description;
        discordLink = project.discordLink;
        goal = project.goal;
        id = Nat.toText(projectIdGenerator);
        nftVolume = project.nftVolume;
        owner = userId;
        story = project.story;
        tags = project.tags; 
        title = project.title;
        twitterLink = project.twitterLink;
        walletId = project.walletId;
        wetransferLink = project.wetransferLink;
      };
    };

    func includesText(string: Text, term: Text): Bool {
      let stringArray = Iter.toArray<Char>(string.chars());
      let termArray = Iter.toArray<Char>(term.chars());

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
  };

  func isEqUserId(x: UserId, y: UserId): Bool { x == y };
  func isEqProjectId(x: ProjectId, y: ProjectId): Bool { x == y };
};
