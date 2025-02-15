import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Search, ShoppingBag, UserRound } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="bg-transparent text-primary-foreground fixed top-0 left-0 right-0 z-10 hover:bg-background hover:text-primary group">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav aria-label="Global" className="flex-1">
          <ul className="hidden lg:flex items-center gap-6 text-sm">
            <li>
              <Link className="text-inherit text-[15px]" href="#">
                Shop by category
              </Link>
            </li>

            <li>
              <Link className="text-inherit text-[15px]" href="#">
                Shop by device
              </Link>
            </li>

            <li>
              <Link className="text-inherit text-[15px]" href="#">
                Collections
              </Link>
            </li>
          </ul>
          {/* Menu Toggler */}
          <Button
            variant="ghost"
            size="icon"
            className="text-inherit lg:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="!size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </nav>
        {/* Logo */}
        <Link className="block" href="/">
          <span className="sr-only">Home</span>
          <Image
            alt="Logo"
            width={100}
            height={20}
            src="/logo.avif"
            className="group-hover:invert"
          />
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="flex gap-5">
            <Link href="/search">
              <Search className="block size-5 text-inherit " />
            </Link>
            <Link href="/login">
              <UserRound className="block size-5 text-inherit" />
            </Link>
            <Link href="/cart">
              <ShoppingBag className="block size-5 text-inherit" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
