import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const FinancePage = () => {
  return (
    <div>
      <div className="flex flex-col items-center mt-3">
      <Card className="sm:col-span-2 rounded-xl bg-slate-50 border-none p-4 min-w-8/12 w-9/12">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl">
            {"$5423"}
          </CardTitle>
          <Button className="rounded-xl">{"+ New Transfer"}</Button>
        </CardHeader>
        <CardFooter className="text-base">
          <Badge className="" variant="outline">
            {"24h"}
          </Badge>
          <div>{"+231"}</div>
        </CardFooter>
      </Card>

      <div className="flex flex-col mt-6 items-center justify-center gap-3 min-w-8/12 w-9/12">
        <div className="flex items-start justify-start w-full">
          <div className="font-semibold text-xl">Tokens</div>
        </div>
        <Card className="w-full rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-1">
              <div className="text-lg font-semibold">{"Populi"}</div>
              <Badge className="bg-slate-200" variant="outline">
                {"100%"}
              </Badge>
            </div>
            <div>
              <div>{"$5423"}</div>
            </div>
          </CardHeader>
          <CardFooter className="text-sm flex flex-row items-center pb-5 justify-between">
            <div className="text-slate-700">
              <div>
                {"54230 " + "$PPL" + " . " + "$0.10"}
              </div>
            </div>
            <div className="flex flex-row gap-1">
              <div>{"$0.01"}</div>
              <Badge className="bg-green-200" variant="outline">
                {"+1%"}
              </Badge>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
    </div>
  )
}

export default FinancePage
