dfx canister call backend createProject '(record { category="art"; cover=""; description=""; discordLink=""; goal=100.0; nftVolume=100; rewards=""; story="";  title="Test"; twitterLink=""; walletId="6ef2j-7xajs-x476v-hn3eb-ocaib-cbhcr-pdjux-jom7m-xlc6w-df774-xae"; wetransferLink=""; tags= vec {}  })'
dfx canister call backend approveProject '("1")'
dfx canister call escrow_manager createEscrowCanister '(1, principal "6ef2j-7xajs-x476v-hn3eb-ocaib-cbhcr-pdjux-jom7m-xlc6w-df774-xae", vec {record { number=500; priceE8S=100000000; };}, 1669899600000, 5, 20)'
dfx canister call backend makeProjectLive '("1")'
dfx canister call escrow_manager getProjectEscrowCanisterPrincipal '(1:nat)'

# r7inp-6aaaa-aaaaa-aaabq-cai
dfx canister call r7inp-6aaaa-aaaaa-aaabq-cai updateProjectState