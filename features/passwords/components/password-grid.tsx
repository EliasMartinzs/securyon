"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { companies } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

type Props = {
  value: number | undefined;
  passwords: {
    id: string;
    accountEmail: string | null;
    accountName: string;
    accountPassword: string;
    companyName: string | null;
    notes: string | null;
    siteUrl: string | null;
    authorId: string;
  }[];
  handlePasswordClick: (passwordId: string) => void;
  handleSelected: (passwordId: string) => void;
  multipleDelete: boolean;
  isMobile: boolean;
};

export const PasswordGrid = ({
  handlePasswordClick,
  passwords,
  value,
  multipleDelete,
  handleSelected,
  isMobile,
}: Props) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "relative",
        value === 0 && passwords.length >= 1
          ? "grid grid-cols-2 lg:grid-cols-4 gap-3"
          : "flex flex-col gap-3 overflow-y-auto lg:max-h-[768px] hidden-scrollbar"
      )}
    >
      {passwords.map(({ id, companyName }) => {
        const companyMatchers = companies.find(
          (company) => company.name === companyName
        );

        const logoUrl = companyMatchers?.logoUrl || "/image-not-found.png";

        return (
          <div
            onClick={() => isMobile && router.push(`/dashboard/logins/${id}`)}
            className={cn(
              "relative shadow-md flex flex-col items-center justify-center bg-accent dark:bg-accent/30 dark:hover:bg-accent/10 transition-colors rounded-2xl max-lg:p-4 lg:p-10 border dark:border-none cursor-pointer",
              value === 0
                ? "min-w-full max-lg:h-40 lg:h-52"
                : "w-full lg:w-1/3 h-20"
            )}
            key={id}
          >
            {multipleDelete && (
              <Checkbox
                className="border-ring absolute top-3 right-3 Z-[999999]"
                onCheckedChange={() => handleSelected(id)}
              />
            )}

            <div
              onClick={() => handlePasswordClick(id)}
              className={cn(
                "relative cursor-pointer ",
                value === 0 && "min-w-full max-lg:h-40 lg:h-52"
              )}
            >
              {value === 0 ? (
                logoUrl === "/image-not-found.png" ? (
                  <div className="w-full min-h-52 flex items-center justify-center text-center flex-col gap-3">
                    <Image
                      src={logoUrl}
                      width={32}
                      height={32}
                      alt={companyName ?? ""}
                      className="object-contain object-center"
                    />
                    <p className="text-lg capitalize font-semibold text-muted-foreground">
                      {companyName}
                    </p>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-center flex-col gap-3 bg-red-50 min-h-52">
                    <Image
                      src={logoUrl}
                      width={96}
                      height={96}
                      alt={companyName ?? ""}
                      className="object-contain object-center"
                    />
                  </div>
                )
              ) : logoUrl === "/image-not-found.png" ? (
                <div className="w-full min-h-52 flex items-center justify-center text-center gap-3">
                  <Image
                    src={logoUrl}
                    width={32}
                    height={32}
                    alt={companyName ?? ""}
                    className="object-contain object-center"
                  />
                  <p className="text-lg capitalize font-semibold text-muted-foreground">
                    {companyName}
                  </p>
                </div>
              ) : (
                <div className="w-full flex items-center justify-center text-center flex-col gap-3 min-h-52">
                  <Image
                    src={logoUrl}
                    width={64}
                    height={64}
                    alt={companyName ?? ""}
                    className="object-contain object-center"
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
