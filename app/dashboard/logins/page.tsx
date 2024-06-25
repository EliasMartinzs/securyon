"use client";

import { useState } from "react";
import { useGetPasswords } from "@/features/passwords/api/use-get-passwords";
import { useBulkDeletePassword } from "@/features/passwords/api/use-bulk-delete-password";

import { useCopyToClipboard, useMediaQuery } from "usehooks-ts";
import { GridIcon, ListIcon, Loader2, Plus, Trash, Trash2 } from "lucide-react";
import { companies } from "@/constants";
import Image from "next/image";
import { Breadcrumb } from "@/components/global/breadcrumb";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Desk } from "@/components/logins-page/desk";
import { Mobile } from "@/components/logins-page/mobile";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "react-use";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";
import { OpenAllSheet } from "@/components/global/open-all-sheet";
import { usePathname } from "next/navigation";
import { PiPassword } from "react-icons/pi";

const breadcrumbItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Logins",
    href: "/dashboard/logins",
  },
];

export default function LoginPage() {
  const deletePasswords = useBulkDeletePassword();
  const passwordsQuery = useGetPasswords();
  const passwords = passwordsQuery.data || [];
  const isDisabled = passwordsQuery.isLoading || deletePasswords.isPending;

  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedPassword, setSelectedPassword] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [value, setValue, removeValue] = useLocalStorage("layout-password", 0);
  const [copiedText, copy] = useCopyToClipboard();
  const [multipleDelete, setMultipleDelete] = useState(false);
  const pathname = usePathname();

  const handlePasswordClick = (passwordId: string) => {
    setSelectedPassword((prevId) =>
      prevId === passwordId ? null : passwordId
    );

    setOpen((prev) => !prev);
  };

  const selectedPasswordDetails = passwords.find(
    (p) => p.id === selectedPassword
  );

  const handleSelected = (id: string) => {
    setSelectedIds((prevState) =>
      prevState.includes(id)
        ? prevState.filter((selected) => selected !== id)
        : [...prevState, id]
    );
  };

  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza?",
    "Você está prestes a realizar uma exclusão."
  );

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deletePasswords.mutate(
        { ids: selectedIds },
        {
          onSuccess: () => {
            setSelectedIds([]);
          },
          onError: () => {
            setSelectedIds([]);
          },
        }
      );
    }
  };

  const handleCopy = (text: string) => {
    copy(text)
      .then((res) => {
        toast.success("Copiado para a área de transferência");
      })
      .catch((res) => {
        toast.error("Erro ao copiar para a área de transferência");
      });
  };

  if (isDisabled) {
    return (
      <div className="max-w-sm mx-auto mt-24 flex items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container hidden-scrollbar space-y-10 overflow-hidden">
      <ConfirmDialog />
      <div className="w-full items-center justify-end lg:justify-between flex mt-10 gap-5">
        <div className="max-lg:hidden">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="flex items-center gap-x-3">
          {selectedIds.length >= 1 && (
            <div
              className="flex gap-x-2 font-light cursor-pointer max-lg:hidden"
              onClick={handleDelete}
            >
              <Trash className="cursor-pointer" /> Items selecionados (
              {selectedIds.length})
            </div>
          )}

          <div className="lg:hidden flex items-center whitespace-nowrap">
            {selectedIds.length >= 1 && (
              <div
                className="flex gap-x-2 font-light cursor-pointer"
                onClick={handleDelete}
              >
                <Trash className="cursor-pointer size-5" /> Items selecionados (
                {selectedIds.length})
              </div>
            )}
          </div>

          <Button onClick={() => setMultipleDelete((prev) => !prev)}>
            {!multipleDelete ? (
              <>
                <Trash className="size-5 text-muted-foreground mr-2" /> Deletar
                multiplos
              </>
            ) : (
              <>
                <Trash2 className="size-5 text-muted-foreground mr-2" />
                Deletando multiplos
              </>
            )}
          </Button>

          <GridIcon
            onClick={() => {
              setValue(0);
            }}
            className={cn(
              "cursor-pointer max-lg:hidden",
              value === 0 && "text-primary"
            )}
          />
          <ListIcon
            onClick={() => {
              setValue(1);
            }}
            className={cn(
              "cursor-pointer max-lg:hidden",
              value === 1 && "text-primary"
            )}
          />
        </div>
      </div>

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
              className={cn(
                "relative shadow-md flex flex-col items-center justify-center bg-accent dark:bg-accent/30 dark:hover:bg-accent/10 transition-colors rounded-2xl max-lg:p-4 lg:p-10 border dark:border-none",
                value === 0
                  ? "min-w-full max-lg:min-h-40 lg:min-h-52 lg:max-h-52"
                  : "w-full lg:w-1/3 h-20"
              )}
              key={id}
            >
              <div className="absolute top-2 right-2 h-10 z-50">
                {multipleDelete && (
                  <Checkbox
                    className="border-ring"
                    onCheckedChange={(e) => handleSelected(id)}
                  />
                )}
              </div>

              <div
                className={cn(
                  "relative cursor-pointer ",
                  value === 0 && "max-lg:w-24 max-lg:h-24 lg:w-32 lg:h-32"
                )}
                onClick={() => handlePasswordClick(id)}
              >
                {value === 0 ? (
                  logoUrl === "/image-not-found.png" ? (
                    <div className="w-full h-full flex items-center justify-center text-center flex-col gap-3">
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
                    <Image
                      src={logoUrl}
                      fill
                      alt={companyName ?? ""}
                      className="object-contain object-center"
                    />
                  )
                ) : logoUrl === "/image-not-found.png" ? (
                  <div className="w-full h-full flex items-center justify-center text-center gap-3">
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
                  <Image
                    src={logoUrl}
                    width={64}
                    height={64}
                    alt={companyName ?? ""}
                    className="object-contain object-center"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {passwords.length === 0 && (
        <div className="w-full h-1/2 flex items-center justify-center">
          <div className="max-w-sm flex items-center justify-center text-center flex-col gap-y-4 text-muted-foreground ">
            <PiPassword className="size-20" />
            <h4 className="text-lg font-medium">
              Você ainda não salvou nenhuma senha.
            </h4>
            <h6>
              Salve suas senhas com segurança e tenha acesso rápido e fácil a
              todas as suas contas em um só lugar. Com o nosso gerenciador de
              senhas.
            </h6>
          </div>
        </div>
      )}

      {isMobile && (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <Mobile
              password={selectedPasswordDetails}
              setOpen={setOpen}
              handleCopy={handleCopy}
            />
          </DrawerContent>
        </Drawer>
      )}

      {!isMobile && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <Desk
              password={selectedPasswordDetails}
              setSelectedPassword={setSelectedPassword}
              setOpen={setOpen}
              handleCopy={handleCopy}
            />
          </DialogContent>
        </Dialog>
      )}

      <div className="absolute bottom-2 right-2 lg:hidden">
        <Button className="rounded-full w-10 h-10 bg-primary text-primary-foreground shadow-md flex items-center justify-center">
          <OpenAllSheet sheetType={pathname}>
            <Plus />
          </OpenAllSheet>
        </Button>
      </div>
    </div>
  );
}
