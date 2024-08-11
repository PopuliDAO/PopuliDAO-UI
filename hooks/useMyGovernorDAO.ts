"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import abi from "@/abi/MyGovernorDAO.json"; // Update the path to your ABI

const useMyGovernorDao = () => {
  const { address } = useAccount();

  // State for proposal details
  const [proposers, setProposers] = useState<string[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [voteCounts, setVoteCounts] = useState<number[]>([]);
  const [endTimes, setEndTimes] = useState<number[]>([]);
  const [executedStatuses, setExecutedStatuses] = useState<boolean[]>([]);

  // Read contract function to get proposals
  const {
    data: proposalData,
    isLoading: getProposalsLoading,
    isError: getProposalsError,
    refetch: refetchProposals,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_MY_GOVERNOR_DAO_ADDRESS as `0x${string}`,
    abi,
    functionName: "listProposals",
  });

  useEffect(() => {
    if (proposalData) {
      const [proposers, names, descriptions, voteCounts, endTimes, executedStatuses] = proposalData as [
        string[],
        string[],
        string[],
        any[],
        any[],
        boolean[]
      ];
      setProposers(proposers);
      setNames(names);
      setDescriptions(descriptions);
      setVoteCounts(voteCounts.map((vc) => parseInt(vc)));
      setEndTimes(endTimes.map((et) => parseInt(et)));
      setExecutedStatuses(executedStatuses);
    }
  }, [proposalData]);

  // Write contract function to create a proposal
  const {
    data: createProposalHash,
    writeContract: createProposal,
    isPending: createProposalLoading,
    isError: createProposalError,
  } = useWriteContract();

  // Wait for transaction to complete
  const {
    isSuccess: createProposalSuccess,
    isLoading: createProposalTxLoading,
  } = useWaitForTransactionReceipt({
    hash: createProposalHash,
    query: {
      enabled: Boolean(createProposalHash),
    }
  });

  // Write contract function to vote on a proposal
  const {
    data: voteHash,
    writeContract: voteOnProposal,
    isPending: voteLoading,
    isError: voteError,
  } = useWriteContract();

  // Wait for transaction to complete
  const {
    isSuccess: voteSuccess,
    isLoading: voteTxLoading,
  } = useWaitForTransactionReceipt({
    hash: voteHash,
    query: {
      enabled: Boolean(voteHash),
    }
  });

  useEffect(() => {
    if (createProposalSuccess || voteSuccess) {
      refetchProposals();
    }
  }, [createProposalSuccess, voteSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  // Return the hook's state and functions
  return {
    address,
    proposers,
    names,
    descriptions,
    voteCounts,
    endTimes,
    executedStatuses,
    getProposalsLoading,
    getProposalsError,
    createProposal: ({ name, description }: { name: string; description: string }) =>
      createProposal?.({
        address: process.env.NEXT_PUBLIC_MY_GOVERNOR_DAO_ADDRESS as `0x${string}`,
        abi,
        functionName: "createProposal",
        args: [name, description],
      }),
    createProposalLoading: createProposalLoading || createProposalTxLoading,
    createProposalError,
    voteOnProposal: (proposalId: number, voter: string) =>
      voteOnProposal?.({
        address: process.env.NEXT_PUBLIC_MY_GOVERNOR_DAO_ADDRESS as `0x${string}`,
        abi,
        functionName: "vote",
        args: [voter, proposalId],
      }),
    voteLoading: voteLoading || voteTxLoading,
    voteError,
  };
};

export { useMyGovernorDao };
