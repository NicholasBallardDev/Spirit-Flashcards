import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu" // Assuming shadcn/ui components are available at this path

export default function Navbar() {
  return (
    <nav className="flex items-center p-4 px-6 shadow-sm gap-6 w-[90%] mx-auto mt-2 mb-4 rounded-lg border border-solid">
      <div className="text-lg font-bold font-[family-name:var(--font-roboto)]">
        Spirit
      </div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" className={navigationMenuTriggerStyle()}>
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/decks" className={navigationMenuTriggerStyle()}>
                My Decks
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
