import React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { Navlinks } from "@/lib/navlinks"

export default function Navigationmenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {Navlinks.map((navlink) => (
          <NavigationMenuItem key={navlink.id}>
            <Link href={navlink.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {navlink.name}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
