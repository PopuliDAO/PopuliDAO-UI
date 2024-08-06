import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const cardClassNames = "w-full p-2 flex flex-col items-center justify-center rounded-xl"
const cardItemClassNames = "flex flex-row p-3 items-center justify-start gap-40 w-full"

const SettingsPage = () => {
  return (
    <div className="flex flex-col items-center mt-3">
      <Card className="sm:col-span-2 bg-slate-50 border-none p-4 min-w-8/12 w-9/12">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl">
            {"DAO Settings"}
          </CardTitle>
          <Button>{"Edit Settings"}</Button>
        </CardHeader>
      </Card>

      <div className="flex flex-col mt-6 items-center justify-center gap-3 min-w-6/12 w-7/12">
        <Card className={cardClassNames}>
          <div className={cardItemClassNames}>
            <div className="text-2xl mb-1 font-semibold">{"DAO"}</div>
          </div>
          <CardItem title={"Name"} value={" DAOName"} />
          <Separator orientation="horizontal" />
          <div className={cardItemClassNames}>
            <div className="w-40 text-zinc-700">{"Blockchain"}</div>
            <div className="font-medium">{" Optimism"}</div>
            <Badge className='bg-slate-200' variant="outline">{"Not Changeable"}</Badge>
          </div>
          <Separator orientation="horizontal" />
          <CardItem title={"Summary"} value={" This DAO is made for bla-bla purposes"} />
        </Card>
        <Card className={cardClassNames}>
          <div className={cardItemClassNames}>
            <div className="text-2xl mb-1 font-semibold">{"Governance"}</div>
          </div>
          <CardItem title={"Minimum Approval"} value={"x of n members"} />
          <Separator orientation="horizontal" />
          <CardItem title="Proposal Creation" value="Multisig Members" />
        </Card>
        <Card className={cardClassNames}>
          <div className={cardItemClassNames}>
            <div className="text-2xl mb-1 font-semibold">{"Members"}</div>
          </div>
          <CardItem title="Eligible Voters" value="MultiSig members" />
          <Separator orientation="horizontal" />
          <CardItem title="Members" value="n members" />
        </Card>
      </div>
    </div>
  )
}

function CardItem(props: any) {
  return (
    <div className={cardItemClassNames}>
      <div className="w-40 text-zinc-700">{props.title}</div>
      <div className="font-medium">{props.value}</div>
    </div>
  )
}

export default SettingsPage