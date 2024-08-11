"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccount, useWriteContract } from "wagmi";
import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { decodeAbiParameters, toHex } from "viem";
import WorldverifyAbi from "@/abi/Worldverify.json";
import { worldIdApp, worldAction } from "@/app/constants";
import { useMyGovernorDao } from "@/hooks/useMyGovernorDAO";

const GovernancePage: React.FC = () => {
  const { address: connectedAddress } = useAccount();
  const [verified, setVerified] = React.useState(false);
  const [proposalName, setProposalName] = React.useState("");
  const [proposalDescription, setProposalDescription] = React.useState("");
  const [proposalTarget, setProposalTarget] = React.useState("");
  const [proposalCalldata, setProposalCalldata] = React.useState("");
  const [showCreateProposal, setShowCreateProposal] = React.useState(false);
  const [proposalCreated, setProposalCreated] = React.useState(false);

  const { createProposal, createProposalLoading, createProposalError } = useMyGovernorDao();

  const {
    data: hash,
    isPending,
    error,
    writeContractAsync,
  } = useWriteContract();

  const onSuccess = async (result: ISuccessResult) => {
    const unpackedProof = decodeAbiParameters(
      [{ type: "uint256[8]" }],
      result.proof as `0x${string}`
    )[0];
    console.log("result", result);
    console.log("unpackedProof", unpackedProof);
    setVerified(true);

    try {
      await writeContractAsync({
        address: process.env.NEXT_PUBLIC_WORLD_VERIFY_ADDRESS as `0x${string}`,
        account: connectedAddress!,
        abi: WorldverifyAbi,
        functionName: "registerAccount",
        args: [
          connectedAddress!,
          BigInt(result.merkle_root),
          BigInt(result.nullifier_hash),
          unpackedProof,
          toHex("0xbafkreibpppzeta6odb3k25ctwwqqq3zxqa4v67k3lc7ryh7dw2vcjot63u"),
        ],
      });
    } catch (err) {
      console.error("Error", err);
    }
  };

  const handleCreateProposal = (event: React.FormEvent) => {
    event.preventDefault();
    try{
      if (verified) {
      createProposal({ name: proposalName, description: proposalDescription });

    } else {
      console.log("You need to verify with World ID first.");
    }
    } catch(err) {
      console.error("Error", err);
    } finally{
      setProposalCreated(true);
    }
    
  };

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
            <div className="flex flex-row gap-2 items-center justify-center">
              <IDKitWidget
                app_id={worldIdApp}
                action={worldAction}
                signal={connectedAddress}
                onSuccess={onSuccess}
              >
                {({ open }) => (
                  <Button className="rounded-xl" onClick={open}>
                    {verified ? "WorldID Verified" : "Verify Identity"}
                  </Button>
                )}
              </IDKitWidget>
              <Button className="rounded-xl" onClick={() => setShowCreateProposal(!showCreateProposal)}>
                Create Proposal
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className="mx-auto min-w-7/12 w-9/12 p-10">
          {showCreateProposal && (
            <form>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  value={proposalName}
                  onChange={(e) => setProposalName(e.target.value)}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  value={proposalDescription}
                  onChange={(e) => setProposalDescription(e.target.value)}
                />
              </div>
              <div>
                <Label>Target</Label>
                <Input
                  type="text"
                  value={proposalTarget}
                  onChange={(e) => setProposalTarget(e.target.value)}
                />
              </div>
              <div>
                <Label>Calldata</Label>
                <Input
                  type="text"
                  value={proposalCalldata}
                  onChange={(e) => setProposalCalldata(e.target.value)}
                />
              </div>
            </div>
            <Button
              onClick={handleCreateProposal}
              disabled={createProposalLoading || !verified}
              className="mt-4"
            >
              {createProposalLoading ? "Creating Proposal..." : "Create Proposal"}
            </Button>
          </form>
          )}
        </div>
      <div className="grid flex-1 mt-4 items-start mx-auto gap-4 p-4 min-w-7/12 w-9/12 sm:px-6 sm:py-0 md:gap-8">
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
              {proposalCreated && (
                <Card className="rounded-b-xl">
                <CardHeader className="flex flex-row items-center text-3xl font-semibold justify-between">
                  Airdrop to all members
                  <Badge className="text-lg font-normal" variant="outline">
                    Active
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">
                    Airdrop 20 $PPL to all members of the DAO
                  </CardDescription>
                </CardContent>
                <CardFooter className="text-sm">
                  Published by 0x6922a...5678
                </CardFooter>
              </Card>
              )}
              <Card className="rounded-b-xl">
                <CardHeader className="flex flex-row items-center text-3xl font-semibold justify-between">
                  Staking
                  <Badge className="text-lg font-normal" variant="outline">
                    Active
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">
                    Staking 20% of DAO funds for 6 months
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
  );
};

export default GovernancePage;
