import type { Principal } from '@dfinity/principal';
export type Link = string;
export interface NewProfile {
  'bio' : string,
  'img' : Link,
  'lastName' : string,
  'firstName' : string,
}
export interface NewProject {
  'title' : string,
  'wetransferLink' : Link,
  'goal' : number,
  'twitterLink' : Link,
  'cover' : Link,
  'tags' : Array<string>,
  'description' : string,
  'discordLink' : Link,
  'story' : string,
  'rewards' : string,
  'category' : string,
  'nftVolume' : bigint,
  'walletId' : string,
}
export interface Profile {
  'id' : UserId,
  'bio' : string,
  'img' : Link,
  'lastName' : string,
  'firstName' : string,
}
export interface Profile__1 {
  'id' : UserId,
  'bio' : string,
  'img' : Link,
  'lastName' : string,
  'firstName' : string,
}
export interface Project {
  'id' : ProjectId__1,
  'status' : ProjectStatus__1,
  'title' : string,
  'wetransferLink' : Link,
  'owner' : UserId,
  'goal' : number,
  'twitterLink' : Link,
  'cover' : Link,
  'tags' : Array<string>,
  'description' : string,
  'discordLink' : Link,
  'story' : string,
  'rewards' : string,
  'category' : string,
  'nftVolume' : bigint,
  'walletId' : string,
}
export type ProjectId = string;
export type ProjectId__1 = string;
export type ProjectStatus = [] | [
  { 'fully_funded' : null } |
    { 'submitted' : null } |
    { 'whitelist' : null } |
    { 'live' : null } |
    { 'approved' : null }
];
export type ProjectStatus__1 = [] | [
  { 'fully_funded' : null } |
    { 'submitted' : null } |
    { 'whitelist' : null } |
    { 'live' : null } |
    { 'approved' : null }
];
export interface ProjectWithOwner { 'owner' : Profile__1, 'project' : Project }
export interface Project__1 {
  'id' : ProjectId__1,
  'status' : ProjectStatus__1,
  'title' : string,
  'wetransferLink' : Link,
  'owner' : UserId,
  'goal' : number,
  'twitterLink' : Link,
  'cover' : Link,
  'tags' : Array<string>,
  'description' : string,
  'discordLink' : Link,
  'story' : string,
  'rewards' : string,
  'category' : string,
  'nftVolume' : bigint,
  'walletId' : string,
}
export type UserId = Principal;
export type UserId__1 = Principal;
export interface _SERVICE {
  'addToWhitelist' : (arg_0: ProjectId, arg_1: Principal) => Promise<undefined>,
  'approveProject' : (arg_0: ProjectId) => Promise<undefined>,
  'createFirstProject' : (arg_0: NewProfile, arg_1: NewProject) => Promise<
      Project__1
    >,
  'createProfile' : (arg_0: NewProfile) => Promise<undefined>,
  'createProject' : (arg_0: NewProject) => Promise<Project__1>,
  'deleteProject' : (arg_0: ProjectId) => Promise<[] | [Project__1]>,
  'getMyProfile' : () => Promise<Profile>,
  'getMyProjects' : () => Promise<Array<Project__1>>,
  'getOwnId' : () => Promise<UserId__1>,
  'getOwnIdText' : () => Promise<string>,
  'getProfile' : (arg_0: UserId__1) => Promise<Profile>,
  'getProject' : (arg_0: ProjectId) => Promise<Project__1>,
  'getProjectWithOwner' : (arg_0: ProjectId) => Promise<ProjectWithOwner>,
  'getProjects' : (arg_0: UserId__1) => Promise<Array<Project__1>>,
  'getWhitelist' : (arg_0: ProjectId) => Promise<Array<Principal>>,
  'greet' : () => Promise<string>,
  'healthcheck' : () => Promise<boolean>,
  'isAdmin' : () => Promise<boolean>,
  'listProjects' : (arg_0: Array<ProjectStatus>) => Promise<
      Array<ProjectWithOwner>
    >,
  'makeProjectLive' : (arg_0: ProjectId) => Promise<undefined>,
  'openProjectToWhiteList' : (arg_0: ProjectId) => Promise<undefined>,
  'searchProfiles' : (arg_0: string) => Promise<Array<Profile>>,
  'updateProfile' : (arg_0: Profile) => Promise<undefined>,
}
