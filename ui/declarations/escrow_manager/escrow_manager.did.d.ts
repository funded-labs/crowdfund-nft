import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

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
  'acceptCycles' : ActorMethod<[], undefined>,
  'availableCycles' : ActorMethod<[], bigint>,
  'createEscrowCanister' : ActorMethod<
    [ProjectId, Principal, Array<NFTInfo>, Time, bigint, bigint],
    undefined
  >,
  'dissociateEscrowCanister' : ActorMethod<[ProjectId], undefined>,
  'getMaxOversellPercentage' : ActorMethod<[], bigint>,
  'getProjectEscrowCanisterPrincipal' : ActorMethod<
    [ProjectId],
    [] | [CanisterIdText]
  >,
  'setMaxOversellPercentage' : ActorMethod<[bigint], undefined>,
  'takeover' : ActorMethod<[string], definite_canister_settings>,
  'wallet_receive' : ActorMethod<[], undefined>,
}
