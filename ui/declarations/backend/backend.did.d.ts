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
  'id' : string,
  'imgUrl' : string,
  'owner' : UserId,
  'goal' : number,
  'name' : string,
  'tags' : Array<string>,
  'description' : string,
}
export type UserId = Principal;
export type UserId__1 = Principal;
export interface _SERVICE {
  'createProfile' : (arg_0: NewProfile) => Promise<undefined>,
  'createProject' : (arg_0: NewProject) => Promise<Project>,
  'getMyProfile' : () => Promise<Profile>,
  'getOwnId' : () => Promise<UserId__1>,
  'getProfile' : (arg_0: UserId__1) => Promise<Profile>,
  'greet' : () => Promise<string>,
  'healthcheck' : () => Promise<boolean>,
  'searchProfiles' : (arg_0: string) => Promise<Array<Profile>>,
  'updateProfile' : (arg_0: Profile) => Promise<undefined>,
}
