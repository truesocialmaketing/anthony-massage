"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils";

import navLinks, { isNavItemActive } from "@/constants/navLinks";

import Logo from "@/components/logo";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileNavSheet = ({ open, onOpenChange }: Props) => {
  const pathname = usePathname();

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetTrigger asChild>
        <button
          type="button"
          className="exp-nav-toggle block lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-nav"
        >
          <span />
          <span />
        </button>
      </SheetTrigger>

      <SheetContent
        id="primary-nav"
        side="right"
        className="flex flex-col gap-0 border-l border-white/10 bg-exp-dusk p-0 text-exp-parchment sm:max-w-sm"
      >
        <SheetTitle className="sr-only">Site navigation</SheetTitle>

        <div className="border-b border-white/10 px-8 pt-7 pr-12 pb-6">
          <SheetClose asChild>
            <Logo className="text-lg" />
          </SheetClose>
        </div>

        <nav
          aria-label="Mobile"
          className="flex flex-col gap-1 px-8 pt-6 pb-6"
        >
          {navLinks.map((item) => (
            <SheetClose
              key={item.id}
              asChild
            >
              <Link
                href={item.href}
                className={cn(
                  "border-b border-white/10 py-4 font-display text-2xl italic text-exp-parchment/90 transition-colors duration-200 hover:text-exp-glow",
                  isNavItemActive(item.href, pathname) && "text-exp-glow"
                )}
              >
                {item.title}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavSheet;
