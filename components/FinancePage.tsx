import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const FinancePage = () => {
	return (
		<div className="flex flex-col items-center mt-3">
				<Card className="sm:col-span-2 bg-slate-50 border-none p-4 min-w-8/12 w-9/12">
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle className="text-3xl">
							{"Total $ value of all tokens"}
						</CardTitle>
						<Button>{"+ New Transfer"}</Button>
					</CardHeader>
					<CardFooter className="text-base">
						<Badge className='' variant="outline">{"24h"}</Badge>
						<div>{"Total $ value change in 24h"}</div>
						</CardFooter>
				</Card>
				
				<div className="flex flex-col mt-6 items-center justify-center gap-3 min-w-8/12 w-9/12">
					<div className='flex items-start justify-start w-full'>
						<div className='font-semibold text-xl'>Tokens</div>
				</div>
					<Card className="w-full rounded-xl">
						<CardHeader className="flex flex-row items-center justify-between">
							<div className='flex flex-row gap-1'>
									<div className="text-lg font-semibold">{"Token Name"}</div>
									<Badge className='bg-slate-200' variant="outline">{"Percentage Allocation"}</Badge>
							</div>
							<div>
								<div>{"Total $ value"}</div>
							</div>
						</CardHeader>
						<CardFooter className="text-sm flex flex-row items-center pb-5 justify-between">
							<div className='text-slate-700'>
								<div>{"Amount of token " + "$Ticker"+ " . " + "Price of token"}</div>
							</div>
							<div className='flex flex-row gap-1'>
								<div>{"$ value change in 24h"}</div>
								<Badge className='bg-green-200' variant="outline">{"Percentage change in 24h"}</Badge>
							</div>
						</CardFooter>
					</Card>
				</div>
		</div>
	)
}

export default FinancePage