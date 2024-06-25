import {
  Breadcrumb as BreadcrumbMain,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

type Props = {
  items: {
    label: string;
    href: string;
  }[];
};

export const Breadcrumb = ({ items }: Props) => {
  return (
    <BreadcrumbMain>
      <BreadcrumbList>
        {items.map(({ label, href }, index) => (
          <BreadcrumbItem key={href}>
            {href ? (
              <BreadcrumbLink>
                <Link href={href}>{label}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{label}</BreadcrumbPage>
            )}
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbMain>
  );
};
