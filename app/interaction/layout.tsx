"use client"

import { Header } from "@/components/Header"
import { usePathname } from "next/navigation"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname()
  return (
      <div className="p-2">
        {children}
      </div>
  )
}
