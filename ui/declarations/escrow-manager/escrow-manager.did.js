export const idlFactory = ({ IDL }) => {
  const ProjectId = IDL.Nat;
  const CanisterId = IDL.Principal;
  const AccountId = IDL.Text;
  return IDL.Service({
    'createEscrowCanister' : IDL.Func(
        [ProjectId, IDL.Principal, IDL.Nat, IDL.Nat],
        [],
        [],
      ),
    'getProjectEscrowCanisterPrincipal' : IDL.Func(
        [ProjectId],
        [IDL.Opt(CanisterId)],
        ['query'],
      ),
    'requestSubaccount' : IDL.Func([ProjectId, IDL.Principal], [AccountId], []),
  });
};
export const init = ({ IDL }) => { return []; };
