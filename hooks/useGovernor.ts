"use client";

import { useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import abi from "../abi/MyGovernor.json";

const useGovernor = ({
  onProposalExecuted,
  proposalId,
  targets,
  values,
  calldatas,
  descriptionHash,
}: {
  onProposalExecuted?: () => void;
  proposalId?: number;
  targets?: string[];
  values?: number[];
  calldatas?: string[];
  descriptionHash?: string;
}) => {
  const { address } = useAccount();

  // Read quorum
  const {
    data: quorum,
    isLoading: getQuorumLoading,
    isError: getQuorumError,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "quorum",
    args: [proposalId],
  });

  // Read votingPeriod
  const {
    data: votingPeriod,
    isLoading: getVotingPeriodLoading,
    isError: getVotingPeriodError,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "votingPeriod",
  });

  // Read votingDelay
  const {
    data: votingDelay,
    isLoading: getVotingDelayLoading,
    isError: getVotingDelayError,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "votingDelay",
  });

  // Write: queue a proposal
  const {
    data: queueProposalHash,
    writeContract: queueProposal,
    isPending: queueProposalLoading,
    isError: queueProposalError,
  } = useWriteContract();

  // Write: execute a proposal
  const {
    data: executeProposalHash,
    writeContract: executeProposal,
    isPending: executeProposalLoading,
    isError: executeProposalError,
  } = useWriteContract();

  // Wait for transaction to be mined
  const {
    isSuccess: txSuccess,
    isLoading: txLoading,
  } = useWaitForTransactionReceipt({
    hash: executeProposalHash,
    query: {
      enabled: Boolean(executeProposalHash),
    },
  });

  useEffect(() => {
    if (txSuccess) {
      onProposalExecuted?.();
    }
  }, [txSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    address,
    quorum: quorum as number,
    votingPeriod: votingPeriod as number,
    votingDelay: votingDelay as number,
    getQuorumLoading,
    getQuorumError,
    getVotingPeriodLoading,
    getVotingPeriodError,
    getVotingDelayLoading,
    getVotingDelayError,
    queueProposal: () => queueProposal?.({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi,
      functionName: "queueProposal",
      args: [proposalId, targets, values, calldatas, descriptionHash],
    }),
    executeProposal: () => executeProposal?.({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi,
      functionName: "executeProposal",
      args: [proposalId, targets, values, calldatas, descriptionHash],
    }),
    queueProposalLoading,
    queueProposalError,
    executeProposalLoading: executeProposalLoading || txLoading,
    executeProposalError,
  };
};

export { useGovernor };
