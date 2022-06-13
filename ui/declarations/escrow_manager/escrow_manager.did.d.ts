import type { Principal } from '@dfinity/principal';
export type CanisterIdText = string;
export interface NFTInfo { 'number' : bigint, 'priceE8S' : bigint }
export type ProjectId = bigint;
export type Time = bigint;
export interface definite_canister_settings {
  'freezing_threshold' : bigint,
  'controllers' : [] | [Array<Principal>],
  'memory_allocation' : bigint,
  'compute_allocation' : bigint,
}
export interface _SERVICE {
  'acceptCycles' : () => Promise<undefined>,
  'availableCycles' : () => Promise<bigint>,
  'createEscrowCanister' : (
      arg_0: ProjectId,
      arg_1: Principal,
      arg_2: Array<NFTInfo>,
      arg_3: Time,
      arg_4: bigint,
    ) => Promise<undefined>,
  'getProjectEscrowCanisterPrincipal' : (arg_0: ProjectId) => Promise<
      [] | [CanisterIdText]
    >,
  'test' : () => Promise<definite_canister_settings>,
  'wallet_receive' : () => Promise<undefined>,
}
