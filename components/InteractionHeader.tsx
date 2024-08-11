"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import Link from "next/link"
import { usePathname } from "next/navigation"

const InteractionHeader = () => {
    const pathname = usePathname();

    return (
        <header className="py-4 w-full px-24 border-b mb-0 flex items-center justify-between bg-gradient-to-b from-white via-white to-transparent">
            <div className="flex justify-center items-center gap-6">
                <Link href="/" className="text-xl md:text-xl font-bold text-blue-500">
                    PopuliDAO
                </Link>
                {/* <Link href="/interaction/dashboard" className={` rounded-xl hover:bg-gray-50  p-2 ${pathname === "/interaction/dashboard" ? "text-blue-600 font-bold bg-gray-50 " : "text-gray-700 font-semibold hover:text-blue-500"}`}>Dashboard</Link> */}
                <Link href="/interaction/governance" className={`rounded-xl hover:bg-gray-50  p-2 ${pathname === "/interaction/governance" ? "text-blue-600 font-bold bg-gray-50 " : "text-gray-700 font-semibold hover:text-blue-500"}`}>Governance</Link>
                <Link href="/interaction/finance" className={`rounded-xl hover:bg-gray-50 p-2 ${pathname === "/interaction/finance" ? "text-blue-600 font-bold bg-gray-50 " : "text-gray-700 font-semibold hover:text-blue-500"}`}>Finance</Link>
                <Link href="/interaction/members" className={`rounded-xl hover:bg-gray-50 p-2 ${pathname === "/interaction/members" ? "text-blue-600 font-bold bg-gray-50 " : "text-gray-700 font-semibold hover:text-blue-500"}`}>Members</Link>
                <Link href="/interaction/settings" className={`rounded-xl hover:bg-gray-50 p-2 ${pathname === "/interaction/settings" ? "text-blue-600 font-bold bg-gray-50 " : "text-gray-700 font-semibold hover:text-blue-500"}`}>Settings</Link>
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
