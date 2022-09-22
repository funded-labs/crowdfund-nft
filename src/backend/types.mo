import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";

module {
  public type UserId = Principal;
  public type ProjectId = Text;

  // general types
  public type Image = [Int8];
  public type Link = Text;
  public type ProjectStatus = ?{ 
    #submitted;
    #approved; // approved submissions can be shown on frontend
    #whitelist;
    #live;
    #fully_funded;
  };

  public type NewProfile = {
    bio: Text;
    firstName: Text;
    img: Link;
    lastName: Text;
  };

  public type Profile = {
    bio: Text;
    firstName: Text;
    id: UserId;
    img: Link;
    lastName: Text;
  };

  public type NewProject = {
    category: Text;
    cover: Link;
    description: Text;
    discordLink: Link;
    goal: Float;
    nftVolume: Nat;
    rewards: Text;
    story: Text;
    tags: [Text]; 
    title: Text;
    twitterLink: Link;
    walletId: Text;
    wetransferLink: Link;
    video: ?Link;
  };

  public type Project = {
    category: Text;
    cover: Link;
    description: Text;
    discordLink: Link;
    goal: Float;
    id: ProjectId;
    nftVolume: Nat;
    owner: UserId;
    rewards: Text;
    status: ProjectStatus;
    story: Text;
    tags: [Text];
    title: Text;
    twitterLink: Link;
    walletId: Text;
    wetransferLink: Link;
    video: ?Link;
  };

  public type ProjectWithOwner = {
    project: Project;
    owner: Profile;
  };

  // Marketplace stuff
  public type MarketplaceLink = {
    #entrepot: Link;
    #ccc: Link;
    #other: Link;
  };

  public type MarketplaceLinks = [MarketplaceLink];
};
