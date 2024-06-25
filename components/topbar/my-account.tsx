"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { UserButtonAccount } from "../global/user-button-account";

const MyAccount = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex gap-x-3 items-center cursor-pointer"
          >
            Minha conta {!isOpen ? <ChevronDown /> : <ChevronUp />}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <UserButtonAccount />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default MyAccount;
