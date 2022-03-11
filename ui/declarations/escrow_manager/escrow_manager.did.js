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
  const definite_canister_settings = IDL.Record({
    'freezing_threshold' : IDL.Nat,
    'controllers' : IDL.Opt(IDL.Vec(IDL.Principal)),
    'memory_allocation' : IDL.Nat,
    'compute_allocation' : IDL.Nat,
  });
  return IDL.Service({
    'acceptCycles' : IDL.Func([], [], []),
    'availableCycles' : IDL.Func([], [IDL.Nat], ['query']),
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
    'test' : IDL.Func([], [definite_canister_settings], []),
    'wallet_receive' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
