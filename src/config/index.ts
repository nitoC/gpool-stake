import { cookieStorage, createStorage } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import {
  arbitrum,
  base,
} from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";
// import { injected, walletConnect } from "wagmi/connectors"; // 👈 Add these connectors

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID; // this is a public projectId only to use on localhost

console.log(projectId);

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [base, arbitrum] as [AppKitNetwork, ...AppKitNetwork[]];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const solanaWeb3JsAdapter = new SolanaAdapter();

export const config = wagmiAdapter.wagmiConfig;
