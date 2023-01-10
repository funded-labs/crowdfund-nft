export const idlFactory = ({ IDL }) => {
  const ProjectId = IDL.Nat
  const NFTInfo = IDL.Record({ number: IDL.Nat, priceE8S: IDL.Nat })
  const Time = IDL.Int
  const AccountIdText = IDL.Text
  const Result_1 = IDL.Variant({ ok: IDL.Null, err: IDL.Text })
  const AccountIdAndTime = IDL.Record({
    accountId: AccountIdText,
    time: Time,
  })
  const NFTInfo__1 = IDL.Record({ number: IDL.Nat, priceE8S: IDL.Nat })
  const ProjectId__1 = IDL.Nat
  const NFTInfoIndex = IDL.Nat
  const Result = IDL.Variant({ ok: AccountIdText, err: IDL.Text })
  const ProjectState = IDL.Variant({
    closed: IDL.Null,
    whitelist: IDL.Vec(IDL.Principal),
    live: IDL.Null,
    noproject: IDL.Null,
  })
  const NFTStats = IDL.Record({
    sold: IDL.Nat,
    openSubaccounts: IDL.Nat,
    number: IDL.Nat,
    priceE8S: IDL.Nat,
  })
  const EscrowStats = IDL.Record({
    endTime: Time,
    nftStats: IDL.Vec(NFTStats),
  })
  const SubaccountBlob = IDL.Vec(IDL.Nat8)
  const APS = IDL.Tuple(AccountIdText, IDL.Principal, SubaccountBlob)
  const EscrowCanister = IDL.Service({
    addConfirmedAccountsToConfirmedAccountsArray: IDL.Func([], [], []),
    cancelTransfer: IDL.Func([AccountIdText], [], []),
    confirmTransfer: IDL.Func([AccountIdText], [Result_1], []),
    getAccountsInfo: IDL.Func([], [IDL.Text], ['query']),
    getConfirmedAccountsArray: IDL.Func(
      [],
      [IDL.Vec(AccountIdAndTime)],
      ['query'],
    ),
    getDisbursements: IDL.Func([], [IDL.Text], ['query']),
    getLogs: IDL.Func([], [IDL.Text], ['query']),
    getMetadata: IDL.Func(
      [],
      [
        IDL.Record({
          endTime: Time,
          nfts: IDL.Vec(NFTInfo__1),
          recipient: IDL.Principal,
          maxNFTsPerWallet: IDL.Nat,
          projectId: ProjectId__1,
        }),
      ],
      ['query'],
    ),
    getNewAccountId: IDL.Func([IDL.Principal, NFTInfoIndex], [Result], []),
    getProjectState: IDL.Func([], [ProjectState], ['query']),
    getStats: IDL.Func([], [EscrowStats], ['query']),
    getSubaccountsInfo: IDL.Func(
      [],
      [
        IDL.Record({
          toRefund: IDL.Record({
            arr: IDL.Vec(APS),
            count: IDL.Nat,
            index: IDL.Nat,
          }),
          toDrain: IDL.Record({
            arr: IDL.Vec(APS),
            count: IDL.Nat,
            index: IDL.Nat,
          }),
        }),
      ],
      ['query'],
    ),
    releaseFunds: IDL.Func([], [], []),
    returnFunds: IDL.Func([], [], []),
    testHasCNFT: IDL.Func([IDL.Principal], [IDL.Bool], []),
    updateProjectState: IDL.Func([], [ProjectState], []),
  })
  return EscrowCanister
}
export const init = ({ IDL }) => {
  const ProjectId = IDL.Nat
  const NFTInfo = IDL.Record({ number: IDL.Nat, priceE8S: IDL.Nat })
  const Time = IDL.Int
  return [ProjectId, IDL.Principal, IDL.Vec(NFTInfo), Time, IDL.Nat]
}
