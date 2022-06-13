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
        'endTime' : Time,
        'nfts' : Array<NFTInfo__1>,
        'recipient' : Principal,
        'maxNFTsPerWallet' : bigint,
        'projectId' : ProjectId__1,
      }
    >,
  'getNewAccountId' : (arg_0: Principal, arg_1: NFTInfoIndex) => Promise<
      Result
    >,
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
export interface EscrowStats { 'endTime' : Time, 'nftStats' : Array<NFTStats> }
export interface NFTInfo { 'number' : bigint, 'priceE8S' : bigint }
export type NFTInfoIndex = bigint;
export interface NFTInfo__1 { 'number' : bigint, 'priceE8S' : bigint }
export interface NFTStats {
  'sold' : bigint,
  'openSubaccounts' : bigint,
  'number' : bigint,
  'priceE8S' : bigint,
}
export type ProjectId = bigint;
export type ProjectId__1 = bigint;
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
