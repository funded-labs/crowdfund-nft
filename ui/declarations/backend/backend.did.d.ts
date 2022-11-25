import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Date = string;
export type GUID = string;
export type Link = string;
export type Link__1 = string;
export type MarketplaceLink = { 'ccc' : Link } |
  { 'other' : Link } |
  { 'entrepot' : Link };
export type MarketplaceLinks = Array<MarketplaceLink>;
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
  'video' : [] | [string],
  'goal' : number,
  'twitterLink' : Link,
  'cover' : Link,
  'tags' : Array<string>,
  'description' : string,
  'discordLink' : Link,
  'story' : string,
  'rewards' : string,
  'category' : string,
  'fundingType' : [] | [ProjectFundingType],
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
  'fundingType' : [] | [ProjectFundingType],
  'nftVolume' : bigint,
  'walletId' : string,
}
export type ProjectFundingType = [] | [
  { 'btc' : null } |
    { 'icp' : null } |
    { 'usd' : null }
];
export type ProjectId = string;
export type ProjectId__1 = string;
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
  'fundingType' : [] | [ProjectFundingType],
  'nftVolume' : bigint,
  'walletId' : string,
}
export type UserId = Principal;
export type UserId__1 = Principal;
export interface _SERVICE {
  'addWhitelist' : ActorMethod<[ProjectId, Array<Principal>], undefined>,
  'adminCreateProfile' : ActorMethod<[Principal, NewProfile], undefined>,
  'adminCreateProject' : ActorMethod<[Principal, NewProject], Project>,
  'approveProject' : ActorMethod<[ProjectId], undefined>,
  'archiveProject' : ActorMethod<[ProjectId], undefined>,
  'closeProject' : ActorMethod<[ProjectId], undefined>,
  'createFirstProject' : ActorMethod<[NewProfile, NewProject], Project>,
  'createProfile' : ActorMethod<[NewProfile], undefined>,
  'createProject' : ActorMethod<[NewProject], Project>,
  'deleteProject' : ActorMethod<[ProjectId], [] | [Project]>,
  'getLaunchDate' : ActorMethod<[ProjectId], [] | [Date]>,
  'getMarketplaceLinks' : ActorMethod<[ProjectId], MarketplaceLinks>,
  'getMyProfile' : ActorMethod<[], Profile>,
  'getMyProjects' : ActorMethod<[], Array<Project>>,
  'getNFTInfo' : ActorMethod<[GUID], [] | [NFTInfo]>,
  'getOwnId' : ActorMethod<[], UserId__1>,
  'getOwnIdText' : ActorMethod<[], string>,
  'getProfile' : ActorMethod<[UserId__1], Profile>,
  'getProject' : ActorMethod<[ProjectId], Project>,
  'getProjectState' : ActorMethod<[ProjectId], ProjectState>,
  'getProjectVideo' : ActorMethod<[ProjectId], [] | [Link__1]>,
  'getProjectWithOwner' : ActorMethod<[ProjectId], ProjectWithOwner>,
  'getProjectWithOwnerAndMarketplace' : ActorMethod<
    [ProjectId],
    {
      'owner' : Profile,
      'marketplaceLinks' : MarketplaceLinks,
      'project' : Project,
    },
  >,
  'getProjects' : ActorMethod<[UserId__1], Array<Project>>,
  'getWhitelist' : ActorMethod<[ProjectId], Array<Principal>>,
  'greet' : ActorMethod<[], string>,
  'healthcheck' : ActorMethod<[], boolean>,
  'isAdmin' : ActorMethod<[], boolean>,
  'listProjects' : ActorMethod<
    [Array<ProjectStatus>, string, Array<string>],
    Array<ProjectWithOwner>,
  >,
  'makeProjectLive' : ActorMethod<[ProjectId], undefined>,
  'openProjectToWhiteList' : ActorMethod<[ProjectId], undefined>,
  'putLaunchDate' : ActorMethod<[ProjectId, Date], undefined>,
  'putNFTGUIDs' : ActorMethod<[Array<[GUID, NFTInfo]>], undefined>,
  'resetWhitelist' : ActorMethod<[ProjectId], undefined>,
  'searchProfiles' : ActorMethod<[string], Array<Profile>>,
  'setMarketplaceLinks' : ActorMethod<[ProjectId, MarketplaceLinks], undefined>,
  'setProjectFullyFunded' : ActorMethod<[ProjectId], undefined>,
  'unapproveProject' : ActorMethod<[ProjectId], undefined>,
  'updateProfile' : ActorMethod<[Profile], undefined>,
  'updateProject' : ActorMethod<[Project], undefined>,
  'updateProjectStatus' : ActorMethod<[ProjectId, ProjectStatus], undefined>,
}
