import React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { useAccount, useWriteContract } from "wagmi"
import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit"
import { decodeAbiParameters, toHex } from "viem"
import WorldverifyAbi from "../abi/Worldverify.json" // Adjust the path as necessary

const GovernancePage = () => {
  const { address: connectedAddress } = useAccount() // Get type address from useAccount and assigning it to const connectedAddress

  const onSuccess = async (result: ISuccessResult) => {
    const {
      data: hash,
      isPending,
      error,
      writeContractAsync,
    } = useWriteContract()

    const unpackedProof = decodeAbiParameters(
      [{ type: "uint256[8]" }],
      result.proof as `0x${string}`
    )[0]
    console.log("result", result)
    console.log("unpackedProof", unpackedProof)

    try {
      await writeContractAsync({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`, // Replace with your contract address
        account: connectedAddress!,
        abi: WorldverifyAbi, // Replace with your contract ABI
        functionName: "registerAccount",
        args: [
          connectedAddress!,
          BigInt(result!.merkle_root),
          BigInt(result!.nullifier_hash),
          unpackedProof,
          toHex(
            "0xbafkreibpppzeta6odb3k25ctwwqqq3zxqa4v67k3lc7ryh7dw2vcjot63u"
          ),
        ],
      })
    } catch (error) {
      console.error("Error", error)
    }
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <Card className="sm:col-span-2 p-4 min-w-7/12 w-9/12">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl">Proposals</CardTitle>
          <IDKitWidget
            app_id="app_GBkZ1KlVUdFTjeMXKlVUdFT" // must be an app set to on-chain in Developer Portal
            action="claim_nft"
            signal={connectedAddress} // proof will only verify if the signal is unchanged, this prevents tampering
            onSuccess={onSuccess} // use onSuccess to call your smart contract
            // no use for handleVerify, so it is removed
            // use default verification_level (orb-only), as device credentials are not supported on-chain
          >
            {({ open }) => <Button onClick={open}>{"+ New Proposal"}</Button>}
          </IDKitWidget>
        </CardHeader>
      </Card>
      <div className="grid flex-1 mt-4 items-start gap-4 p-4 min-w-7/12 w-9/12 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Archived
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all">
            <div className="flex flex-col gap-4">
              <Card className="">
                <CardHeader className="flex flex-row items-center justify-between">
                  <p className="text-3xl font-semibold">Donation</p>
                  <Badge className="text-lg" variant="outline">
                    Active
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <p className="text-lg">Donation to the community</p>
                  </CardDescription>
                </CardContent>
                <CardFooter className="text-sm">
                  Published by 0x1234...5678
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default GovernancePage
