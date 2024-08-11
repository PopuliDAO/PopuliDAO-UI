import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const MembersPage = () => {
	return (
    <div>
      <div className="flex flex-col items-center mt-3">
			<Card className="sm:col-span-2 rounded-xl bg-slate-50 border-none p-4 min-w-8/12 w-9/12">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-3xl">
						{"7 Members"}
					</CardTitle>
					<Button className='rounded-xl'>{"Manage Members"}</Button>
				</CardHeader>
				<CardFooter className="text-base">
					<div>{"Wallet-Based"}</div>
				</CardFooter>
			</Card>

			<div className="flex flex-col mt-6 items-center justify-center gap-3 min-w-8/12 w-9/12">
				<div className='flex items-start justify-start w-full'>
					<div className='font-semibold text-xl'>Members</div>
				</div>

				<ul className="w-full">

					<li className="w-full border flex p-6 flex-row items-center justify-between rounded-xl">
						<div className='flex flex-row items-center justify-center gap-1'>
							<Badge className='bg-slate-50' variant="outline">{"Image"}</Badge>
							<div className="text-lg font-semibold">{"Member address"}</div>
						</div>
						<div>
							<Button className='bg-slate-100 border rounded-xl text-zinc-900 hover:bg-slate-200'>View</Button>
						</div>
					</li>
					
				</ul>

			</div>
		</div>
    </div>
		
	)
}

export default MembersPage