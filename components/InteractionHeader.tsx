"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import Link from "next/link"
import { usePathname } from "next/navigation"

const InteractionHeader = () => {
    const pathname = usePathname();

    return (
        <header className="py-4 px-24 border-b mb-0 flex items-center justify-between">
            <div className="flex justify-center items-center gap-6">
                <Link href="/" className="text-lg md:text-xl font-bold text-cyan-500">
                    DAO-Fi
                </Link>
                <Link href="/interaction/dashboard" className={` ${pathname === "/interaction/dashboard" ? "text-cyan-600 font-bold" : "text-gray-700 font-semibold"}`}>Dashboard</Link>
                <Link href="/interaction/governance" className={` ${pathname === "/interaction/governance" ? "text-cyan-600 font-bold" : "text-gray-700 font-semibold"}`}>Governance</Link>
                <Link href="/interaction/finance" className={` ${pathname === "/interaction/finance" ? "text-cyan-600 font-bold" : "text-gray-700 font-semibold"}`}>Finance</Link>
                <Link href="/interaction/members" className={` ${pathname === "/interaction/members" ? "text-cyan-600 font-bold" : "text-gray-700 font-semibold"}`}>Members</Link>
                <Link href="/interaction/settings" className={` ${pathname === "/interaction/settings" ? "text-cyan-600 font-bold" : "text-gray-700 font-semibold"}`}>Settings</Link>
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

export { InteractionHeader }
