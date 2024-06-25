"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { companies } from "@/constants";
import Image from "next/image";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

type Props = {
  value: string;
  onChange: (...events: any[]) => void;
};

export function CompanyNameCombobox({ value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {currentValue
            ? currentValue
            : value
            ? companies.find(company => company.name === value)?.name
            : "Selecione uma compania..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Buscar compania..."
            onValueChange={e => setCurrentValue(e)}
          />
          <CommandList>
            <CommandEmpty>
              <Button
                className="border bg-primary text-primary-foreground"
                onClick={() => {
                  onChange(currentValue);
                  setOpen(prev => !prev);
                }}
              >
                Criar empresa
              </Button>
            </CommandEmpty>
            <CommandGroup>
              {companies.map(company => (
                <CommandItem
                  key={company.name}
                  value={company.name}
                  onSelect={currentValue => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === company.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="w-full flex items-center justify-between">
                    <p>{company.name}</p>
                    <Image
                      src={company.logoUrl}
                      width={28}
                      height={28}
                      alt={company.name}
                      className="p-1"
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
