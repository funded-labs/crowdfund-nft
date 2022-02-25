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
      'live' : IDL.Null,
      'approved' : IDL.Null,
    })
  );
  const UserId = IDL.Principal;
  const Project__1 = IDL.Record({
    'id' : ProjectId__1,
    'status' : ProjectStatus__1,
    'title' : IDL.Text,
    'wetransferLink' : Link,
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
  const Profile = IDL.Record({
    'id' : UserId,
    'bio' : IDL.Text,
    'img' : Link,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const UserId__1 = IDL.Principal;
  const Profile__1 = IDL.Record({
    'id' : UserId,
    'bio' : IDL.Text,
    'img' : Link,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Project = IDL.Record({
    'id' : ProjectId__1,
    'status' : ProjectStatus__1,
    'title' : IDL.Text,
    'wetransferLink' : Link,
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
    'project' : Project,
  });
  const ProjectStatus = IDL.Opt(
    IDL.Variant({
      'fully_funded' : IDL.Null,
      'submitted' : IDL.Null,
      'live' : IDL.Null,
      'approved' : IDL.Null,
    })
  );
  return IDL.Service({
    'approveProject' : IDL.Func([ProjectId], [], []),
    'createFirstProject' : IDL.Func([NewProfile, NewProject], [Project__1], []),
    'createProfile' : IDL.Func([NewProfile], [], []),
    'createProject' : IDL.Func([NewProject], [Project__1], []),
    'deleteProject' : IDL.Func([ProjectId], [IDL.Opt(Project__1)], []),
    'getMyProfile' : IDL.Func([], [Profile], ['query']),
    'getMyProjects' : IDL.Func([], [IDL.Vec(Project__1)], ['query']),
    'getOwnId' : IDL.Func([], [UserId__1], ['query']),
    'getOwnIdText' : IDL.Func([], [IDL.Text], ['query']),
    'getProfile' : IDL.Func([UserId__1], [Profile], ['query']),
    'getProject' : IDL.Func([ProjectId], [Project__1], ['query']),
    'getProjectWithOwner' : IDL.Func(
        [ProjectId],
        [ProjectWithOwner],
        ['query'],
      ),
    'getProjects' : IDL.Func([UserId__1], [IDL.Vec(Project__1)], ['query']),
    'greet' : IDL.Func([], [IDL.Text], []),
    'healthcheck' : IDL.Func([], [IDL.Bool], []),
    'isAdmin' : IDL.Func([], [IDL.Bool], ['query']),
    'listProjects' : IDL.Func(
        [IDL.Vec(ProjectStatus)],
        [IDL.Vec(ProjectWithOwner)],
        ['query'],
      ),
    'makeProjectLive' : IDL.Func([ProjectId], [], []),
    'searchProfiles' : IDL.Func([IDL.Text], [IDL.Vec(Profile)], ['query']),
    'updateProfile' : IDL.Func([Profile], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
