export const idlFactory = ({ IDL }) => {
  const ProjectId = IDL.Nat;
  const AccountIdText = IDL.Text;
  const Time = IDL.Int;
  const CanisterId = IDL.Principal;
  const EscrowStats = IDL.Record({
    'nftNumber' : IDL.Nat,
    'endTime' : Time,
    'nftPriceE8S' : IDL.Nat,
    'openSubaccounts' : IDL.Nat,
    'nftsSold' : IDL.Nat,
  });
  return IDL.Service({
    'cancelTransfer' : IDL.Func([ProjectId, AccountIdText], [], []),
    'confirmTransfer' : IDL.Func([ProjectId, AccountIdText], [], []),
    'createEscrowCanister' : IDL.Func(
        [ProjectId, IDL.Principal, IDL.Nat, IDL.Nat, Time],
        [],
        [],
      ),
    'getProjectEscrowCanisterPrincipal' : IDL.Func(
        [ProjectId],
        [IDL.Opt(CanisterId)],
        ['query'],
      ),
    'getProjectStats' : IDL.Func([ProjectId], [EscrowStats], []),
    'requestSubaccount' : IDL.Func(
        [ProjectId, IDL.Principal],
        [AccountIdText],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
