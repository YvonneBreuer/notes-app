import Header from "@/components/header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col items-center sm:items-start">
        <Link className="text-custom2" href="/notes">
          Start
        </Link>
      </main>
    </div>
  );
}
