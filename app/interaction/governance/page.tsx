"use client"

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
import WorldverifyAbi from "@/abi/Worldverify.json"
import { worldIdApp, worldAction } from "@/app/constants"

const GovernancePage: React.FC = () => {
  const { address: connectedAddress } = useAccount()

  const {
    data: hash,
    isPending,
    error,
    writeContractAsync,
  } = useWriteContract()

  const onSuccess = async (result: ISuccessResult) => {
    const unpackedProof = decodeAbiParameters(
      [{ type: "uint256[8]" }],
      result.proof as `0x${string}`
    )[0]
    console.log("result", result)
    console.log("unpackedProof", unpackedProof)

    try {
      await writeContractAsync({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        account: connectedAddress!,
        abi: WorldverifyAbi,
        functionName: "registerAccount",
        args: [
          connectedAddress!,
          BigInt(result.merkle_root),
          BigInt(result.nullifier_hash),
          unpackedProof,
          toHex(
            "0xbafkreibpppzeta6odb3k25ctwwqqq3zxqa4v67k3lc7ryh7dw2vcjot63u"
          ),
        ],
      })
    } catch (err) {
      console.error("Error", err)
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center mt-4">
      {!connectedAddress && (
        <div className="text-lg text-red-500 font-semibold">
          You have not connected your wallet
        </div>
      )}
      <Card className="sm:col-span-2 rounded-xl p-4 min-w-7/12 w-9/12">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl">Proposals</CardTitle>
          <IDKitWidget
            app_id={worldIdApp}
            action={worldAction}
            signal={connectedAddress}
            onSuccess={onSuccess}
          >
            {({ open }) => (
              <Button className="rounded-xl" onClick={open}>
                + New Proposal
              </Button>
            )}
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
              <Card className="rounded-b-xl">
                <CardHeader className="flex flex-row items-center text-3xl font-semibold justify-between">
                  Donation
                  <Badge className="text-lg font-normal" variant="outline">
                    Active
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">
                    Donation to the community
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
    </div>
    
  )
}

export default GovernancePage
