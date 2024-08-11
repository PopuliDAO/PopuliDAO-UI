"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import abi from "@/abi/MyGovernorDAOFactory.json"; // Update the path to your ABI

const useMyGovernorDaoFactory = () => {
  const { address } = useAccount();

  // State for storing the list of DAO addresses
  const [allDAOs, setAllDAOs] = useState<string[]>([]);
  const [daoCount, setDaoCount] = useState<number>(0);

  // Read contract function to get the total number of DAOs
  const {
    data: daoCountData,
    isLoading: getDaoCountLoading,
    isError: getDaoCountError,
    refetch: refetchDaoCount,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_MY_GOVERNOR_DAO_FACTORY_ADDRESS as `0x${string}`,
    abi,
    functionName: "getDAOCount",
  });

  // Read contract function to get a DAO address at a specific index
  const {
    data: daoAtIndexData,
    isLoading: getDaoAtIndexLoading,
    isError: getDaoAtIndexError,
    refetch: refetchDaoAtIndex,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_MY_GOVERNOR_DAO_FACTORY_ADDRESS as `0x${string}`,
    abi,
    functionName: "getDAOAtIndex",
    args: [daoCount > 0 ? daoCount - 1 : 0], // Fetch the latest DAO address if any
  });

  // Update the DAO addresses list when the DAO count changes
  useEffect(() => {
    if (daoCountData) {
      setDaoCount(parseInt(daoCountData as string, 10));
    }
  }, [daoCountData]);

  useEffect(() => {
    if (daoAtIndexData) {
      setAllDAOs((prevDaos) => [...prevDaos, daoAtIndexData as string]);
    }
  }, [daoAtIndexData]);

  // Write contract function to create a new MyGovernorDao
  const {
    data: createDaoHash,
    writeContract: createMyGovernorDao,
    isPending: createDaoLoading,
    isError: createDaoError,
  } = useWriteContract();

  // Wait for transaction to complete
  const {
    isSuccess: createDaoSuccess,
    isLoading: createDaoTxLoading,
  } = useWaitForTransactionReceipt({
    hash: createDaoHash,
    query: {
      enabled: Boolean(createDaoHash),
    }
  });

  useEffect(() => {
    if (createDaoSuccess) {
      refetchDaoCount();
      refetchDaoAtIndex();
    }
  }, [createDaoSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  // Return the hook's state and functions
  return {
    address,
    allDAOs,
    daoCount,
    getDaoCountLoading,
    getDaoCountError,
    getDaoAtIndexLoading,
    getDaoAtIndexError,
    createMyGovernorDao: ({ quorum, votingPeriod }: { quorum: number; votingPeriod: number }) =>
      createMyGovernorDao?.({
        address: process.env.NEXT_PUBLIC_MY_GOVERNOR_DAO_FACTORY_ADDRESS as `0x${string}`,
        abi,
        functionName: "createMyGovernorDao",
        args: [quorum, votingPeriod],
      }),
    createDaoLoading: createDaoLoading || createDaoTxLoading,
    createDaoError,
  };
};

export { useMyGovernorDaoFactory };
