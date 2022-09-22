export const idlFactory = ({ IDL }) => {
  const ProjectId = IDL.Text;
  const Link = IDL.Text;
  const NewProfile = IDL.Record({
    'bio' : IDL.Text,
    'img' : Link,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const NewProject = IDL.Record({
    'title' : IDL.Text,
    'wetransferLink' : Link,
    'video' : IDL.Opt(Link),
    'goal' : IDL.Float64,
    'twitterLink' : Link,
    'cover' : Link,
    'tags' : IDL.Vec(IDL.Text),
    'description' : IDL.Text,
    'discordLink' : Link,
    'story' : IDL.Text,
    'rewards' : IDL.Text,
    'category' : IDL.Text,
    'nftVolume' : IDL.Nat,
    'walletId' : IDL.Text,
  });
  const ProjectId__1 = IDL.Text;
  const ProjectStatus__1 = IDL.Opt(
    IDL.Variant({
      'fully_funded' : IDL.Null,
      'submitted' : IDL.Null,
      'whitelist' : IDL.Null,
      'live' : IDL.Null,
      'approved' : IDL.Null,
    })
  );
  const UserId = IDL.Principal;
  const Project = IDL.Record({
    'id' : ProjectId__1,
    'status' : ProjectStatus__1,
    'title' : IDL.Text,
    'wetransferLink' : Link,
    'video' : IDL.Opt(Link),
    'owner' : UserId,
    'goal' : IDL.Float64,
    'twitterLink' : Link,
    'cover' : Link,
    'tags' : IDL.Vec(IDL.Text),
    'description' : IDL.Text,
    'discordLink' : Link,
    'story' : IDL.Text,
    'rewards' : IDL.Text,
    'category' : IDL.Text,
    'nftVolume' : IDL.Nat,
    'walletId' : IDL.Text,
  });
  const Date = IDL.Text;
  const MarketplaceLink = IDL.Variant({
    'ccc' : Link,
    'other' : Link,
    'entrepot' : Link,
  });
  const MarketplaceLinks = IDL.Vec(MarketplaceLink);
  const Profile = IDL.Record({
    'id' : UserId,
    'bio' : IDL.Text,
    'img' : Link,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const GUID = IDL.Text;
  const NFTInfo = IDL.Record({ 'index' : IDL.Nat, 'canisterId' : IDL.Text });
  const UserId__1 = IDL.Principal;
  const ProjectState = IDL.Variant({
    'closed' : IDL.Null,
    'whitelist' : IDL.Vec(IDL.Principal),
    'live' : IDL.Null,
    'noproject' : IDL.Null,
  });
  const Profile__1 = IDL.Record({
    'id' : UserId,
    'bio' : IDL.Text,
    'img' : Link,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Project__1 = IDL.Record({
    'id' : ProjectId__1,
    'status' : ProjectStatus__1,
    'title' : IDL.Text,
    'wetransferLink' : Link,
    'video' : IDL.Opt(Link),
    'owner' : UserId,
    'goal' : IDL.Float64,
    'twitterLink' : Link,
    'cover' : Link,
    'tags' : IDL.Vec(IDL.Text),
    'description' : IDL.Text,
    'discordLink' : Link,
    'story' : IDL.Text,
    'rewards' : IDL.Text,
    'category' : IDL.Text,
    'nftVolume' : IDL.Nat,
    'walletId' : IDL.Text,
  });
  const ProjectWithOwner = IDL.Record({
    'owner' : Profile__1,
    'project' : Project__1,
  });
  const ProjectStatus = IDL.Opt(
    IDL.Variant({
      'fully_funded' : IDL.Null,
      'submitted' : IDL.Null,
      'whitelist' : IDL.Null,
      'live' : IDL.Null,
      'approved' : IDL.Null,
    })
  );
  return IDL.Service({
    'addWhitelist' : IDL.Func([ProjectId, IDL.Vec(IDL.Principal)], [], []),
    'adminCreateProfile' : IDL.Func([IDL.Principal, NewProfile], [], []),
    'adminCreateProject' : IDL.Func([IDL.Principal, NewProject], [Project], []),
    'approveProject' : IDL.Func([ProjectId], [], []),
    'archiveProject' : IDL.Func([ProjectId], [], []),
    'closeProject' : IDL.Func([ProjectId], [], []),
    'createFirstProject' : IDL.Func([NewProfile, NewProject], [Project], []),
    'createProfile' : IDL.Func([NewProfile], [], []),
    'createProject' : IDL.Func([NewProject], [Project], []),
    'deleteProject' : IDL.Func([ProjectId], [IDL.Opt(Project)], []),
    'getLaunchDate' : IDL.Func([ProjectId], [IDL.Opt(Date)], ['query']),
    'getMarketplaceLinks' : IDL.Func(
        [ProjectId],
        [MarketplaceLinks],
        ['query'],
      ),
    'getMyProfile' : IDL.Func([], [Profile], ['query']),
    'getMyProjects' : IDL.Func([], [IDL.Vec(Project)], ['query']),
    'getNFTInfo' : IDL.Func([GUID], [IDL.Opt(NFTInfo)], ['query']),
    'getOwnId' : IDL.Func([], [UserId__1], ['query']),
    'getOwnIdText' : IDL.Func([], [IDL.Text], ['query']),
    'getProfile' : IDL.Func([UserId__1], [Profile], ['query']),
    'getProject' : IDL.Func([ProjectId], [Project], ['query']),
    'getProjectState' : IDL.Func([ProjectId], [ProjectState], ['query']),
    'getProjectWithOwner' : IDL.Func(
        [ProjectId],
        [ProjectWithOwner],
        ['query'],
      ),
    'getProjectWithOwnerAndMarketplace' : IDL.Func(
        [ProjectId],
        [
          IDL.Record({
            'owner' : Profile,
            'marketplaceLinks' : MarketplaceLinks,
            'project' : Project,
          }),
        ],
        ['query'],
      ),
    'getProjects' : IDL.Func([UserId__1], [IDL.Vec(Project)], ['query']),
    'getWhitelist' : IDL.Func([ProjectId], [IDL.Vec(IDL.Principal)], ['query']),
    'greet' : IDL.Func([], [IDL.Text], []),
    'healthcheck' : IDL.Func([], [IDL.Bool], []),
    'isAdmin' : IDL.Func([], [IDL.Bool], ['query']),
    'listProjects' : IDL.Func(
        [IDL.Vec(ProjectStatus), IDL.Text, IDL.Vec(IDL.Text)],
        [IDL.Vec(ProjectWithOwner)],
        ['query'],
      ),
    'makeProjectLive' : IDL.Func([ProjectId], [], []),
    'openProjectToWhiteList' : IDL.Func([ProjectId], [], []),
    'putLaunchDate' : IDL.Func([ProjectId, Date], [], []),
    'putNFTGUIDs' : IDL.Func([IDL.Vec(IDL.Tuple(GUID, NFTInfo))], [], []),
    'resetWhitelist' : IDL.Func([ProjectId], [], []),
    'searchProfiles' : IDL.Func([IDL.Text], [IDL.Vec(Profile)], ['query']),
    'setMarketplaceLinks' : IDL.Func([ProjectId, MarketplaceLinks], [], []),
    'setProjectFullyFunded' : IDL.Func([ProjectId], [], []),
    'unapproveProject' : IDL.Func([ProjectId], [], []),
    'updateProfile' : IDL.Func([Profile], [], []),
    'updateProject' : IDL.Func([Project], [], []),
    'updateProjectStatus' : IDL.Func([ProjectId, ProjectStatus], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
