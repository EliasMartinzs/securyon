import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FC } from "react";

interface Props {
  icon: React.ReactNode;
  label: string;
}

export const TooltipCustom: FC<Props> = ({ icon, label }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{icon}</TooltipTrigger>
        <TooltipContent className="max-lg:hidden">
          <p className="text-foreground">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
