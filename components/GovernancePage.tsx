import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
const GovernancePage = () => {
  return (
    <div className="flex flex-col items-center mt-4">
    <Card className="sm:col-span-2 p-4 min-w-7/12 w-9/12">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-3xl">Proposals</CardTitle>
        <Button>{"+ New Proposal"}</Button>
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
                      <Badge className='text-lg' variant="outline">Active</Badge>
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