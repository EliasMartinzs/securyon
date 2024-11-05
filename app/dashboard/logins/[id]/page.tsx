"use client";

import { Mobile } from "@/components/logins-page/mobile";
import { companies } from "@/constants";
import { useGetPassword } from "@/features/passwords/api/use-get-password";
import { cn } from "@/lib/utils";
import { Edit2, Loader2, MoveLeft, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

export default function Password({ params: { id } }: Props) {
  const { data, isLoading } = useGetPassword(id);
  const [edit, setEdit] = useState(false);

  if (isLoading) {
    <div>
      <Loader2 className="size-40 animate-spin" />
    </div>;
  }

  const handleBackClick = () => {
    window.history.back();
  };

  const companyMatchers = companies.find(
    (company) => company.name === data?.companyName
  );

  return (
    <main className="absolute top-0 left-0 bg-background w-full h-full z-50">
      <div
        className={cn(
          "w-full h-96 bg-gradient-to-b space-y-10 p-8",
          companyMatchers === undefined
            ? "from-primary to-transparent"
            : `from-[${companyMatchers?.color}] to-transparent`
        )}
        style={
          companyMatchers
            ? {
                backgroundImage: `linear-gradient(to bottom, ${companyMatchers.color}, transparent)`,
              }
            : {}
        }
      >
        <div className="w-full flex items-center">
          <button onClick={handleBackClick}>
            <MoveLeft />
          </button>
        </div>

        <div className="flex items-center gap-x-3">
          <Image
            src={
              companyMatchers === undefined
                ? "/image-not-found.png"
                : companyMatchers.logoUrl
            }
            alt={data?.companyName ?? "none"}
            width={48}
            height={48}
            className="object-cover"
          />

          <div className="">
            <h6 className="text-2xl font-medium">
              {companyMatchers === undefined
                ? data?.companyName
                : companyMatchers.name}
            </h6>
            <p className="text-muted-foreground">{data?.siteUrl}</p>
          </div>
        </div>

        <div className="flex w-full items-center gap-x-3">
          <div className="flex flex-1 items-center justify-center bg-background rounded-2xl p-6 cursor-pointer">
            <Trash />
          </div>
          <div
            onClick={() => setEdit((prev) => !prev)}
            className="flex flex-1 items-center justify-center bg-background rounded-2xl p-6 cursor-pointer"
          >
            <Edit2 />
          </div>
        </div>

        <div className="w-full">
          <Mobile password={data} edit={edit} />
        </div>
      </div>
    </main>
  );
}
