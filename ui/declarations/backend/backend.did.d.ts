import type { Principal } from '@dfinity/principal';
export type Date = string;
export type GUID = string;
export type Link = string;
export interface NFTInfo { 'index' : bigint, 'canisterId' : string }
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
export interface ProfileNoImage {
  'id' : UserId__1,
  'bio' : string,
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
  'id' : ProjectId,
  'status' : ProjectStatus,
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
export interface ProjectNoImage {
  'id' : ProjectId__1,
  'status' : ProjectStatus__1,
  'title' : string,
  'wetransferLink' : Link,
  'owner' : UserId__1,
  'goal' : number,
  'twitterLink' : Link,
  'tags' : Array<string>,
  'description' : string,
  'discordLink' : Link,
  'story' : string,
  'rewards' : string,
  'category' : string,
  'nftVolume' : bigint,
  'walletId' : string,
}
export type ProjectState = { 'closed' : null } |
  { 'whitelist' : Array<Principal> } |
  { 'live' : null } |
  { 'noproject' : null };
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
export interface ProjectWithOwner {
  'owner' : Profile__1,
  'project' : Project__1,
}
export interface ProjectWithOwnerNoImage {
  'owner' : ProfileNoImage,
  'project' : ProjectNoImage,
}
export interface Project__1 {
  'id' : ProjectId,
  'status' : ProjectStatus,
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
  'addToWhitelist' : (arg_0: ProjectId__1, arg_1: Principal) => Promise<
      undefined
    >,
  'adminCreateProfile' : (arg_0: Principal, arg_1: NewProfile) => Promise<
      undefined
    >,
  'adminCreateProject' : (arg_0: Principal, arg_1: NewProject) => Promise<
      Project
    >,
  'approveProject' : (arg_0: ProjectId__1) => Promise<undefined>,
  'createFirstProject' : (arg_0: NewProfile, arg_1: NewProject) => Promise<
      Project
    >,
  'createProfile' : (arg_0: NewProfile) => Promise<undefined>,
  'createProject' : (arg_0: NewProject) => Promise<Project>,
  'deleteProject' : (arg_0: ProjectId__1) => Promise<[] | [Project]>,
  'getLaunchDate' : (arg_0: ProjectId__1) => Promise<[] | [Date]>,
  'getMyProfile' : () => Promise<Profile>,
  'getMyProjects' : () => Promise<Array<Project>>,
  'getNFTInfo' : (arg_0: GUID) => Promise<[] | [NFTInfo]>,
  'getOwnId' : () => Promise<UserId__1>,
  'getOwnIdText' : () => Promise<string>,
  'getProfile' : (arg_0: UserId__1) => Promise<Profile>,
  'getProject' : (arg_0: ProjectId__1) => Promise<Project>,
  'getProjectState' : (arg_0: ProjectId__1) => Promise<ProjectState>,
  'getProjectWithOwner' : (arg_0: ProjectId__1) => Promise<ProjectWithOwner>,
  'getProjects' : (arg_0: UserId__1) => Promise<Array<Project>>,
  'getWhitelist' : (arg_0: ProjectId__1) => Promise<Array<Principal>>,
  'greet' : () => Promise<string>,
  'healthcheck' : () => Promise<boolean>,
  'isAdmin' : () => Promise<boolean>,
  'listProjects' : (arg_0: Array<ProjectStatus__1>) => Promise<
      Array<ProjectWithOwner>
    >,
  'listProjectsWithoutImages' : () => Promise<Array<ProjectWithOwnerNoImage>>,
  'makeProjectLive' : (arg_0: ProjectId__1) => Promise<undefined>,
  'openProjectToWhiteList' : (arg_0: ProjectId__1) => Promise<undefined>,
  'putLaunchDate' : (arg_0: ProjectId__1, arg_1: Date) => Promise<undefined>,
  'putNFTGUIDs' : (arg_0: Array<[GUID, NFTInfo]>) => Promise<undefined>,
  'searchProfiles' : (arg_0: string) => Promise<Array<Profile>>,
  'updateProfile' : (arg_0: Profile) => Promise<undefined>,
  'updateProject' : (arg_0: Project) => Promise<undefined>,
}
