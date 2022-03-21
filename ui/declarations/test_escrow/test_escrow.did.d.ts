import type { Principal } from '@dfinity/principal';
export type APS = [AccountIdText, Principal, SubaccountBlob];
export interface AccountIdAndTime { 'accountId' : AccountIdText, 'time' : Time }
export type AccountIdText = string;
export interface EscrowCanister {
  'addConfirmedAccountsToConfirmedAccountsArray' : () => Promise<undefined>,
  'cancelTransfer' : (arg_0: AccountIdText) => Promise<undefined>,
  'confirmTransfer' : (arg_0: AccountIdText) => Promise<Result_1>,
  'getAccountsInfo' : () => Promise<string>,
  'getConfirmedAccountsArray' : () => Promise<Array<AccountIdAndTime>>,
  'getDisbursements' : () => Promise<string>,
  'getLogs' : () => Promise<string>,
  'getMetadata' : () => Promise<
      {
        'nftNumber' : bigint,
        'endTime' : Time,
        'nftPriceE8S' : bigint,
        'recipient' : Principal,
        'projectId' : ProjectId,
      }
    >,
  'getNewAccountId' : (arg_0: Principal) => Promise<Result>,
  'getProjectState' : () => Promise<ProjectState>,
  'getStats' : () => Promise<EscrowStats>,
  'getSubaccountsInfo' : () => Promise<
      {
        'toRefund' : { 'arr' : Array<APS>, 'count' : bigint, 'index' : bigint },
        'toDrain' : { 'arr' : Array<APS>, 'count' : bigint, 'index' : bigint },
      }
    >,
  'releaseFunds' : () => Promise<undefined>,
  'returnFunds' : () => Promise<undefined>,
  'testHasCNFT' : (arg_0: Principal) => Promise<boolean>,
  'updateProjectState' : () => Promise<ProjectState>,
}
export interface EscrowStats {
  'nftNumber' : bigint,
  'endTime' : Time,
  'nftPriceE8S' : bigint,
  'openSubaccounts' : bigint,
  'nftsSold' : bigint,
}
export type ProjectId = bigint;
export type ProjectState = { 'closed' : null } |
  { 'whitelist' : Array<Principal> } |
  { 'live' : null } |
  { 'noproject' : null };
export type Result = { 'ok' : AccountIdText } |
  { 'err' : string };
export type Result_1 = { 'ok' : null } |
  { 'err' : string };
export type SubaccountBlob = Array<number>;
export type Time = bigint;
export interface _SERVICE extends EscrowCanister {}
