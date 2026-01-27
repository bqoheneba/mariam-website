import { cn } from "@/lib/utils";
import { IconMenu } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
}

const Header = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "px-10 py-6 w-full flex items-center justify-between",
        className,
      )}
    >
      <Image src="/images/logo.png" alt="Logo" width={120} height={50} />

      <IconMenu className="text-white/60" />
    </div>
  );
};

export default Header;
