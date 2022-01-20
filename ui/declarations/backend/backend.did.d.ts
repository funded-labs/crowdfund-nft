import type { Principal } from '@dfinity/principal';
export type Image = Array<number>;
export type Link = string;
export interface NewProfile {
  'bio' : string,
  'img' : Image,
  'lastName' : string,
  'firstName' : string,
}
export interface NewProject {
  'title' : string,
  'wetransferLink' : Link,
  'goal' : number,
  'twitterLink' : Link,
  'tags' : Array<string>,
  'description' : string,
  'discordLink' : Link,
  'story' : string,
  'category' : string,
  'coverImg' : Image,
  'nftVolume' : bigint,
  'walletId' : string,
}
export interface Profile {
  'id' : UserId,
  'bio' : string,
  'img' : Image,
  'lastName' : string,
  'firstName' : string,
}
export interface Profile__1 {
  'id' : UserId,
  'bio' : string,
  'img' : Image,
  'lastName' : string,
  'firstName' : string,
}
export interface Project {
  'id' : ProjectId,
  'title' : string,
  'wetransferLink' : Link,
  'owner' : UserId,
  'goal' : number,
  'twitterLink' : Link,
  'tags' : Array<string>,
  'description' : string,
  'discordLink' : Link,
  'story' : string,
  'category' : string,
  'coverImg' : Image,
  'nftVolume' : bigint,
  'walletId' : string,
}
export type ProjectId = string;
export interface ProjectWithOwner { 'owner' : Profile__1, 'project' : Project }
export interface Project__1 {
  'id' : ProjectId,
  'title' : string,
  'wetransferLink' : Link,
  'owner' : UserId,
  'goal' : number,
  'twitterLink' : Link,
  'tags' : Array<string>,
  'description' : string,
  'discordLink' : Link,
  'story' : string,
  'category' : string,
  'coverImg' : Image,
  'nftVolume' : bigint,
  'walletId' : string,
}
export type UserId = Principal;
export type UserId__1 = Principal;
export interface _SERVICE {
  'createFirstProject' : (arg_0: NewProfile, arg_1: NewProject) => Promise<
      Project__1
    >,
  'createProfile' : (arg_0: NewProfile) => Promise<undefined>,
  'createProject' : (arg_0: NewProject) => Promise<Project__1>,
  'getMyProfile' : () => Promise<Profile>,
  'getMyProjects' : () => Promise<Array<Project__1>>,
  'getOwnId' : () => Promise<UserId__1>,
  'getOwnIdText' : () => Promise<string>,
  'getProfile' : (arg_0: UserId__1) => Promise<Profile>,
  'getProjects' : (arg_0: UserId__1) => Promise<Array<Project__1>>,
  'greet' : () => Promise<string>,
  'healthcheck' : () => Promise<boolean>,
  'listProjects' : () => Promise<Array<ProjectWithOwner>>,
  'searchProfiles' : (arg_0: string) => Promise<Array<Profile>>,
  'updateProfile' : (arg_0: Profile) => Promise<undefined>,
}
