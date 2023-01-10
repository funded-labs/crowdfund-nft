# CrowdFund NFT - Crowdfunding on the IC using NFTs as proof of ownership

**Backend**  
The backend stores all the user/project info.

**Frontend**  
Built using Next.js

## Live Demo in IC Mainnet 🥳

https://kn5ky-6iaaa-aaaai-qbikq-cai.ic0.app/

## Quick Start (Run locally)

Install:

- NodeJS 14.\* or higher https://nodejs.org/en/download/
- Internet Computer dfx CLI https://sdk.dfinity.org/docs/quickstart/local-quickstart.html
- Visual Studio Code (Recommended Code Editor) https://code.visualstudio.com/Download
- VSCode extension - Motoko (Recommended) https://marketplace.visualstudio.com/items?itemName=dfinity-foundation.vscode-motoko

```bash
sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

Clone this Git repository:

```bash
git clone https://github.com/CrowdFund-NFT/crowdfund-nft
```

Open command terminal:
Enter the commands to start dfx local server:

```bash
cd crowdfund-nft
dfx start --clean
```

Note: If you run it in MacOS, you may be asked allow connections from dfx local server.

In a new terminal window, enter the commands to install dependencies, deploy canister and run Next.js dev server:

```bash
npm install
dfx deploy
npm run dev
```

Open in Chrome the following URL to try the demo app:  
http://localhost:3000/

Cleanup - stop dfx server running in background:

```bash
dfx stop
```

## Project Structure

Internet Computer has the concept of [Canister](https://sdk.dfinity.org/docs/developers-guide/concepts/canisters-code.html) which is a computation unit. This project has 2 canisters:

- backend
- frontend

Canister configuration are stored in dfx.json.

## Deployment

There 2 sets of Canister on the IC (production and staging)

```bash
dfx deploy --network staging
dfx deploy --network production
```
