export default ({ IDL }) => {
  const AccountIdText = IDL.Text;
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Time = IDL.Int;
  const AccountIdAndTime = IDL.Record({
    'accountId' : AccountIdText,
    'time' : Time,
  });
  const NFTInfo__2 = IDL.Record({ 'number' : IDL.Nat, 'priceE8S' : IDL.Nat });
  const ProjectId__2 = IDL.Nat;
  const NFTInfoIndex = IDL.Nat;
  const Result = IDL.Variant({ 'ok' : AccountIdText, 'err' : IDL.Text });
  const ProjectState = IDL.Variant({
    'closed' : IDL.Null,
    'whitelist' : IDL.Vec(IDL.Principal),
    'live' : IDL.Null,
    'noproject' : IDL.Null,
  });
  const NFTStats = IDL.Record({
    'sold' : IDL.Nat,
    'openSubaccounts' : IDL.Nat,
    'number' : IDL.Nat,
    'priceE8S' : IDL.Nat,
  });
  const EscrowStats = IDL.Record({
    'endTime' : Time,
    'nftStats' : IDL.Vec(NFTStats),
  });
  const SubaccountBlob = IDL.Vec(IDL.Nat8);
  const APS = IDL.Tuple(AccountIdText, IDL.Principal, SubaccountBlob);
  return IDL.Service({
    'addConfirmedAccountsToConfirmedAccountsArray' : IDL.Func([], [], []),
    'cancelTransfer' : IDL.Func([AccountIdText], [], []),
    'confirmTransfer' : IDL.Func([AccountIdText], [Result_1], []),
    'getAccountsInfo' : IDL.Func([], [IDL.Text], ['query']),
    'getConfirmedAccountsArray' : IDL.Func(
        [],
        [IDL.Vec(AccountIdAndTime)],
        ['query'],
      ),
    'getDisbursements' : IDL.Func([], [IDL.Text], ['query']),
    'getLogs' : IDL.Func([], [IDL.Text], ['query']),
    'getMetadata' : IDL.Func(
        [],
        [
          IDL.Record({
            'endTime' : Time,
            'nfts' : IDL.Vec(NFTInfo__2),
            'recipient' : IDL.Principal,
            'maxNFTsPerWallet' : IDL.Nat,
            'projectId' : ProjectId__2,
          }),
        ],
        ['query'],
      ),
    'getNewAccountId' : IDL.Func([IDL.Principal, NFTInfoIndex], [Result], []),
    'getProjectState' : IDL.Func([], [ProjectState], ['query']),
    'getStats' : IDL.Func([], [EscrowStats], ['query']),
    'getSubaccountsInfo' : IDL.Func(
        [],
        [
          IDL.Record({
            'toRefund' : IDL.Record({
              'arr' : IDL.Vec(APS),
              'count' : IDL.Nat,
              'index' : IDL.Nat,
            }),
            'toDrain' : IDL.Record({
              'arr' : IDL.Vec(APS),
              'count' : IDL.Nat,
              'index' : IDL.Nat,
            }),
          }),
        ],
        ['query'],
      ),
    'releaseFunds' : IDL.Func([], [], []),
    'resetHeartbeat' : IDL.Func([], [], []),
    'returnFunds' : IDL.Func([], [], []),
    'subaccountDrainingInfo' : IDL.Func(
        [],
        [IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat],
        ['query'],
      ),
    'testHasCNFT' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'updateProjectState' : IDL.Func([], [ProjectState], []),
  });
};
export const init = ({ IDL }) => { return []; };