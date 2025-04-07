"use client";
import Link from "next/link";
import React from "react";
import { Search, ShoppingBag, UserRound } from "lucide-react";
import { Button } from "../ui/button";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const pathname = usePathname();
  const { user } = useUser();
  const isSignedIn = !!user;

  return (
    <header
      className={cn(
        "bg-transparent text-primary-foreground fixed top-0 left-0 right-0 z-10 hover:bg-background hover:text-foreground group",
        pathname !== "/" &&
          "sticky top-0 bg-background text-foreground border-b border-border"
      )}
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav aria-label="Global" className="flex-1">
          <ul className="hidden lg:flex items-center gap-6 text-sm">
            <li>
              <Link className="text-inherit text-[15px]" href="#">
                Shop
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
          <Logo />
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="flex gap-5">
            <Link
              href="/search"
              className="flex justify-center items-center size-7"
            >
              <Search className="block size-5 text-inherit " />
            </Link>

            <Link
              href="/cart"
              className="flex justify-center items-center size-7"
            >
              <ShoppingBag className="block size-5 text-inherit" />
            </Link>
            {isSignedIn ? (
              <UserButton afterSwitchSessionUrl="/sign-in" />
            ) : (
              <Link
                href="/sign-in"
                className="flex justify-center items-center size-7"
              >
                <UserRound className="block size-5 text-inherit" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
