import Array "mo:base/Array";
import Database "./database";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Types "./types";

module {
  type NewProfile = Types.NewProfile;
  type Profile = Types.Profile;
  type Project = Types.Project;
  type ProjectId = Types.ProjectId;
  type ProjectWithOwner = Types.ProjectWithOwner;
  type UserId = Types.UserId;

  // Profiles

  public func getProfile(db: Database.Directory, userId: UserId): Profile {
    let existing = db.getUser(userId);
    switch (existing) {
      case (?existing) { existing };
      case (null) {
        {
          bio = "";
          firstName = "";
          id = userId;
          img = [];
          lastName = "";
        }
      };
    };
  };

  // Projects

  public func getProject(db: Database.Directory, projectId: ProjectId): Project {
    let existing = db.getProject(projectId);
    switch (existing) {
      case (?existing) { existing };
      case (null) {
        {
          category = "";
          coverImg = [];
          description = "";
          discordLink = "";
          goal = 0;
          id = "";
          nftVolume = 0;
          owner = Principal.fromText("");
          rewards = "";
          status= "";
          story = "";
          tags = [];
          title = "";
          twitterLink = "";
          walletId = "";
          wetransferLink = "";
        }
      };
    };
  };

  public func getProjectWithOwner(db: Database.Directory, p: Project): ProjectWithOwner {
    {
      project = p;
      owner = getProfile(db, p.owner);
    }
  };

  // Connections

  public func includes(x: UserId, xs: [UserId]): Bool {
    func isX(y: UserId): Bool { x == y };
    switch (Array.find<UserId>(xs, isX)) {
      case (null) { false };
      case (_) { true };
    };
  };

  // Authorization

  let adminIds: [Text] = ["rwvfd-5wxx6-yeevy-xe4wu-rnywu-nrkxe-vxnup-yg3uz-5rgmo-hvtbd-sqe"];

  public func isAdmin(userId: UserId): Bool {
    func identity(x: Text): Bool { x == Principal.toText(userId) };
    Option.isSome(Array.find<Text>(adminIds,identity))
  };

  public func hasAccess(userId: UserId, profile: Profile): Bool {
    userId == profile.id or isAdmin(userId)
  };

  public func hasProjectAccess(userId: UserId, project: Project): Bool {
    userId == project.owner or isAdmin(userId)
  };
};
