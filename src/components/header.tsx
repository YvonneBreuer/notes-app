import Link from "next/link";
import { Separator } from "@/components/ui/separator";

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
