"use client"

import { useRouter } from "next/navigation"
import * as React from "react"

export default function Page() {

  const route  = useRouter()
  route.push("/interaction/dashboard")
  return (
    <div className="flex flex-col items-center justify-center text-lg font-bold">
      Redirecting
    </div>
  )
}
