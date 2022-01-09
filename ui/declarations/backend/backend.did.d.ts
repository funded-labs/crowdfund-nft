import type { Principal } from '@dfinity/principal';
export interface NewProfile {
  'imgUrl' : string,
  'lastName' : string,
  'firstName' : string,
}
export interface NewProject {
  'imgUrl' : string,
  'goal' : number,
  'name' : string,
  'tags' : Array<string>,
  'description' : string,
}
export interface Profile {
  'id' : UserId,
  'imgUrl' : string,
  'lastName' : string,
  'firstName' : string,
}
export interface Project {
  'id' : ProjectId,
  'imgUrl' : string,
  'owner' : UserId,
  'goal' : number,
  'name' : string,
  'tags' : Array<string>,
  'description' : string,
}
export type ProjectId = string;
export type UserId = Principal;
export type UserId__1 = Principal;
export interface _SERVICE {
  'createProfile' : (arg_0: NewProfile) => Promise<undefined>,
  'createProject' : (arg_0: NewProject) => Promise<undefined>,
  'getMyProfile' : () => Promise<Profile>,
  'getMyProjects' : () => Promise<Array<Project>>,
  'getOwnId' : () => Promise<UserId__1>,
  'getProfile' : (arg_0: UserId__1) => Promise<Profile>,
  'getProjects' : (arg_0: UserId__1) => Promise<Array<Project>>,
  'greet' : () => Promise<string>,
  'healthcheck' : () => Promise<boolean>,
  'listProjects' : () => Promise<Array<Project>>,
  'searchProfiles' : (arg_0: string) => Promise<Array<Profile>>,
  'testVal' : () => Promise<bigint>,
  'updateProfile' : (arg_0: Profile) => Promise<undefined>,
}
