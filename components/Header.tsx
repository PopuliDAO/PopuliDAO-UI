"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import Link from "next/link"
import { usePathname } from "next/navigation"

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="py-4 px-24 border-b mb-0 flex items-center justify-between">
      <div className="flex justify-center items-center gap-6">
        <Link href="/" className="text-lg md:text-xl font-bold text-cyan-500">
          DAO-Fi
        </Link>
        <Link href="/dao-config" className={` ${pathname === "/dao-config" ? "text-cyan-600 font-bold" : "text-gray-700 font-semibold"}`}>Config</Link>
        <Link href="/interaction" className={` ${pathname === "/interaction" ? "text-cyan-600 font-bold" : "text-gray-700 font-semibold"}`}>Interact</Link>
      </div>
      <div>
        <ConnectButton
          showBalance={false}
          accountStatus="address"
          label="Connect"
        />
      </div>
    </header>
  )
}

export { Header }
