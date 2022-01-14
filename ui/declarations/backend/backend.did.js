export const idlFactory = ({ IDL }) => {
  const Image = IDL.Vec(IDL.Nat8);
  const NewProfile = IDL.Record({
    'bio' : IDL.Text,
    'img' : Image,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Link = IDL.Text;
  const NewProject = IDL.Record({
    'title' : IDL.Text,
    'wetransferLink' : Link,
    'goal' : IDL.Float64,
    'twitterLink' : Link,
    'tags' : IDL.Vec(IDL.Text),
    'description' : IDL.Text,
    'discordLink' : Link,
    'story' : IDL.Text,
    'category' : IDL.Text,
    'coverImg' : Image,
    'nftVolume' : IDL.Nat,
    'walletId' : IDL.Text,
  });
  const ProjectId = IDL.Text;
  const UserId = IDL.Principal;
  const Project = IDL.Record({
    'id' : ProjectId,
    'title' : IDL.Text,
    'wetransferLink' : Link,
    'owner' : UserId,
    'goal' : IDL.Float64,
    'twitterLink' : Link,
    'tags' : IDL.Vec(IDL.Text),
    'description' : IDL.Text,
    'discordLink' : Link,
    'story' : IDL.Text,
    'category' : IDL.Text,
    'coverImg' : Image,
    'nftVolume' : IDL.Nat,
    'walletId' : IDL.Text,
  });
  const Profile = IDL.Record({
    'id' : UserId,
    'bio' : IDL.Text,
    'img' : Image,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const UserId__1 = IDL.Principal;
  return IDL.Service({
    'createFirstProject' : IDL.Func([NewProfile, NewProject], [Project], []),
    'createProfile' : IDL.Func([NewProfile], [], []),
    'createProject' : IDL.Func([NewProject], [Project], []),
    'getMyProfile' : IDL.Func([], [Profile], ['query']),
    'getMyProjects' : IDL.Func([], [IDL.Vec(Project)], ['query']),
    'getOwnId' : IDL.Func([], [UserId__1], ['query']),
    'getOwnIdText' : IDL.Func([], [IDL.Text], ['query']),
    'getProfile' : IDL.Func([UserId__1], [Profile], ['query']),
    'getProjects' : IDL.Func([UserId__1], [IDL.Vec(Project)], ['query']),
    'greet' : IDL.Func([], [IDL.Text], []),
    'healthcheck' : IDL.Func([], [IDL.Bool], []),
    'listProjects' : IDL.Func([], [IDL.Vec(Project)], ['query']),
    'searchProfiles' : IDL.Func([IDL.Text], [IDL.Vec(Profile)], ['query']),
    'testVal' : IDL.Func([], [IDL.Nat], ['query']),
    'updateProfile' : IDL.Func([Profile], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
