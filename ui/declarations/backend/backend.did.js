export const idlFactory = ({ IDL }) => {
  const NewProfile = IDL.Record({
    'imgUrl' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const NewProject = IDL.Record({
    'imgUrl' : IDL.Text,
    'goal' : IDL.Float64,
    'name' : IDL.Text,
    'tags' : IDL.Vec(IDL.Text),
    'description' : IDL.Text,
  });
  const ProjectId = IDL.Text;
  const UserId = IDL.Principal;
  const Project = IDL.Record({
    'id' : ProjectId,
    'imgUrl' : IDL.Text,
    'owner' : UserId,
    'goal' : IDL.Float64,
    'name' : IDL.Text,
    'tags' : IDL.Vec(IDL.Text),
    'description' : IDL.Text,
  });
  const Profile = IDL.Record({
    'id' : UserId,
    'imgUrl' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const UserId__1 = IDL.Principal;
  return IDL.Service({
    'createProfile' : IDL.Func([NewProfile], [], []),
    'createProject' : IDL.Func([NewProject], [Project], []),
    'getMyProfile' : IDL.Func([], [Profile], ['query']),
    'getMyProjects' : IDL.Func([], [IDL.Vec(Project)], ['query']),
    'getOwnId' : IDL.Func([], [UserId__1], ['query']),
    'getProfile' : IDL.Func([UserId__1], [Profile], ['query']),
    'getProject' : IDL.Func([UserId__1], [IDL.Vec(Project)], ['query']),
    'greet' : IDL.Func([], [IDL.Text], []),
    'healthcheck' : IDL.Func([], [IDL.Bool], []),
    'searchProfiles' : IDL.Func([IDL.Text], [IDL.Vec(Profile)], ['query']),
    'testVal' : IDL.Func([], [IDL.Nat], ['query']),
    'updateProfile' : IDL.Func([Profile], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
