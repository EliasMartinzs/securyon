import { PiUserListLight, PiVaultLight } from "react-icons/pi";
import { CiCreditCard1 } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

import { IconType } from "react-icons/lib";

export const sidebarIcons: {
  label: string;
  icon: IconType;
  href: string;
}[] = [
  {
    label: "Logins",
    icon: PiVaultLight,
    href: "/dashboard/logins",
  },
  {
    label: "Pagamentos",
    icon: CiCreditCard1,
    href: "/dashboard/payments",
  },
  {
    label: "Minhas Informações",
    icon: CiUser,
    href: "/dashboard/info",
  },
  {
    label: "Meus Documentos",
    icon: PiUserListLight,
    href: "/dashboard/docs",
  },
] as const;
