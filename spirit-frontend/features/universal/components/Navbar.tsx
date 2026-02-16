import Link from "next/link"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  return (
    <nav className="flex items-center p-4 px-6 shadow-sm gap-4 w-[90%] mx-auto mt-2 mb-4 rounded-lg border border-solid">
      <div className="flex items-center text-lg font-bold font-[family-name:var(--font-roboto)]">
        <Image
          src="/spiritlogo.png"
          alt="Spirit Flashcards Logo"
          width={60}
          height={60}
        />
        Spirit Flashcards
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
