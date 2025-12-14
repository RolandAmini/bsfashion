"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  // Redirection après 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black px-4">
      <Image
        src="/logoor.png"
        alt="Logo"
        width={500}
        height={500}
        className="dark:invert w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
        priority
      />
    </div>
  );
}