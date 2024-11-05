"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useGetPasswords } from "@/features/passwords/api/use-get-passwords";
import { useBulkDeletePassword } from "@/features/passwords/api/use-bulk-delete-password";

import { useCopyToClipboard, useMediaQuery } from "usehooks-ts";
import { GridIcon, ListIcon, Loader2, Plus, Trash, Trash2 } from "lucide-react";
import { Breadcrumb } from "@/components/global/breadcrumb";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Desk } from "@/components/logins-page/desk";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "react-use";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";
import { OpenAllSheet } from "@/components/global/open-all-sheet";
import { usePathname } from "next/navigation";
import { PiPassword } from "react-icons/pi";
import { PasswordGrid } from "@/features/passwords/components/password-grid";
import { PasswordProps } from "@/lib/types";
import { Sheet, SheetContent } from "@/components/ui/sheet";

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

  const [selectedPasswordId, setSelectedPasswordId] = useState<string | null>(
    null
  );
  const [selectedPasswordDetails, setSelectedPasswordDetails] =
    useState<PasswordProps>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [multipleDelete, setMultipleDelete] = useState(false);
  const [open, setOpen] = useState(false);

  const [value, setValue] = useLocalStorage("layout-password", 0);
  const [copiedText, copy] = useCopyToClipboard();

  const pathname = usePathname();

  const handlePasswordClick = (passwordId: string) => {
    if (selectedPasswordId === passwordId) {
      setOpen((prev) => !prev);
      return;
    }

    const passwordSelected = passwords.find((p) => p.id === passwordId);

    if (passwordSelected) {
      setSelectedPasswordDetails(passwordSelected);
      setOpen(true);
      setSelectedPasswordId(passwordId);
    }
  };

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

      <Topbar
        value={value}
        setValue={setValue}
        handleDelete={handleDelete}
        multipleDelete={multipleDelete}
        selectedIds={selectedIds}
        setMultipleDelete={setMultipleDelete}
      />

      <PasswordGrid
        passwords={passwords}
        handlePasswordClick={handlePasswordClick}
        value={value}
        multipleDelete={multipleDelete}
        handleSelected={handleSelected}
        isMobile={isMobile}
      />

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

      {!isMobile && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent className="rounded-3xl">
            <Desk
              password={selectedPasswordDetails}
              setSelectedPasswordId={setSelectedPasswordId}
              setOpen={setOpen}
              handleCopy={handleCopy}
            />
          </SheetContent>
        </Sheet>
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

const Topbar = ({
  handleDelete,
  multipleDelete,
  selectedIds,
  setMultipleDelete,
  value,
  setValue,
}: {
  selectedIds: string[];
  handleDelete: () => void;
  multipleDelete: boolean;
  setMultipleDelete: Dispatch<SetStateAction<boolean>>;
  value: number | undefined;
  setValue: (prevState: number) => void;
}) => {
  return (
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
  );
};
