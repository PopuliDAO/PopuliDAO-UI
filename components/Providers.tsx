"use client"

import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import {
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit"
import { hardhat, sepolia, baseSepolia } from "wagmi/chains"

const queryClient = new QueryClient()

const config = getDefaultConfig({
  appName: "PopuliDAO",
  projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID ?? "",
  chains: [hardhat, sepolia, baseSepolia],
  ssr: true,
})

const Providers = ({ children }: { children: ReactNode }) => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider >{children}</RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
)

export { Providers }
