import type { Principal } from '@dfinity/principal';
export type AccountId = string;
export type CanisterId = Principal;
export type ProjectId = bigint;
export interface _SERVICE {
  'createEscrowCanister' : (
      arg_0: ProjectId,
      arg_1: Principal,
      arg_2: bigint,
      arg_3: bigint,
    ) => Promise<undefined>,
  'getProjectEscrowCanisterPrincipal' : (arg_0: ProjectId) => Promise<
      [] | [CanisterId]
    >,
  'requestSubaccount' : (arg_0: ProjectId, arg_1: Principal) => Promise<
      AccountId
    >,
}
