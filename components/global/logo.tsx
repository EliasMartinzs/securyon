import LogoIcon from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  width: number;
  height: number;
};

export const Logo: FC<Props> = ({ width, height }) => {
  return (
    <Link href="/dashboard">
      <Image
        src={LogoIcon}
        width={width}
        height={height}
        alt="logo securyon"
        className="cursor-pointer"
      />
    </Link>
  );
};
