import React from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header>
      <Link href="/">
        <h1 className="mb-4 text-4xl font-bold text-custom2">My Notes App</h1>
      </Link>
      <Separator />
    </header>
  );
};

export default Header;
