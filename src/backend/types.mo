import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";

module {
  public type UserId = Principal;
  public type ProjectId = Text;

  // general types
  public type Image = [Int8];
  public type Link = Text;
  public type ProjectStatus = Text; // Should be any of: submitted, approved, live, fully_funded, example -> need to find a way to enforce this

  public type NewProfile = {
    bio: Text;
    firstName: Text;
    img: Image;
    lastName: Text;
  };

  public type Profile = {
    bio: Text;
    firstName: Text;
    id: UserId;
    img: Image;
    lastName: Text;
  };

  public type NewProject = {
    category: Text;
    coverImg: Image;
    description: Text;
    discordLink: Link;
    goal: Float;
    nftVolume: Nat;
    story: Text;
    tags: [Text]; 
    title: Text;
    twitterLink: Link;
    walletId: Text;
    wetransferLink: Link;
  };

  public type Project = {
    category: Text;
    coverImg: Image;
    description: Text;
    discordLink: Link;
    goal: Float;
    id: ProjectId;
    nftVolume: Nat;
    owner: UserId;
    status: ProjectStatus;
    story: Text;
    tags: [Text];
    title: Text;
    twitterLink: Link;
    walletId: Text;
    wetransferLink: Link;
  };

  public type ProjectWithOwner = {
    project: Project;
    owner: Profile;
  }
};
