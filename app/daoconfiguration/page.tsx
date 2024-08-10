"use client"
import React, { useState } from "react"
import ConfigureChain from "@/components/ConfigureChain"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function Daoconfiguration() {
  const [configurationPage, setConfigurationPage] = useState<number>(25)

  return (
    <div>
      <div className="flex justify-center">
        {" "}
        <Card className="w-[800px] mt-10 rounded-xl">
          <CardHeader>
            {configurationPage === 25 && (
              <>
                <div className="flex flex-row justify-between">
                  <p className="flex justify-start">Create your DAO</p>
                  <p className="flex justify-end items-end">Step 1 of 4</p>
                </div>
                <Progress value={configurationPage} className="w-[100%] mt-2" />
                <CardTitle className="flex flex-row justify-start mt-10">
                  Select Blockchain
                </CardTitle>
                <CardDescription className="flex justify-start mt-5">
                  The chain you choose is where your tokens and assets are
                  stored. If you already have a token, choose the chain your
                  token is minted on. This cannot be changed later.
                </CardDescription>
              </>
            )}
            {configurationPage === 50 && (
              <>
                <div className="flex flex-row justify-between">
                  <p className="flex justify-start">Create your DAO</p>
                  <p className="flex justify-end items-end">Step 2 of 4</p>
                </div>
                <Progress value={configurationPage} className="w-[100%] mt-2" />
                <CardTitle className="flex flex-row justify-start mt-10">
                  Describe your DAO
                </CardTitle>
                <CardDescription className="flex justify-start mt-5">
                  {"Name and define your DAO so new contributors know they've come to the right place. This information is displayed on the DAOExplore page and can be changed with a vote."}
                </CardDescription>
              </>
            )}
            {configurationPage === 75 && (
              <>
                <div className="flex flex-row justify-between">
                  <p className="flex justify-start">Create your DAO</p>
                  <p className="flex justify-end items-end">Step 3 of 4</p>
                </div>
                <Progress value={configurationPage} className="w-[100%] mt-2" />
                <CardTitle className="flex flex-row justify-start mt-10">
                  Define membership
                </CardTitle>
                <CardDescription className="flex justify-start mt-5">
                  Decide the type of voting your DAO uses. You can change these
                  settings with a vote.
                </CardDescription>
              </>
            )}
            {configurationPage === 100 && (
              <>
                <div className="flex flex-row justify-between">
                  <p className="flex justify-start">Create your DAO</p>
                  <p className="flex justify-end items-end">Step 4 of 4</p>
                </div>
                <Progress value={configurationPage} className="w-[100%] mt-2" />
                <CardTitle className="flex flex-row justify-start mt-10">
                  Select governance settings
                </CardTitle>
                <CardDescription className="flex justify-center mt-5">
                  These are the rules that define how decisions are made in your
                  DAO. How many people have to participate? How much support is
                  needed? How long are proposals open for voting?
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
      <ConfigureChain
        setConfigurationPage={setConfigurationPage}
        configurationPage={configurationPage}
      />
    </div>
  )
}
