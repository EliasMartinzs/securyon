"use client";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { generatePassword } from "@/lib/utils";
import { Slider } from "../ui/slider";
import { Key } from "lucide-react";

interface Props {
  setPassword: (password: string) => void;
  onChangePassword: (...event: any[]) => void;
}

export const PasswordGenerator = ({ setPassword, onChangePassword }: Props) => {
  const [length, setLength] = useState(1);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const handleGeneratePassword = () => {
    try {
      const newPassword = generatePassword(
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols
      );
      setPassword(newPassword);
      onChangePassword(newPassword);
    } catch (error: any) {}
  };

  return (
    <div className="space-y-5">
      <div className="mt-5 mb-5 flex items-center justify-between gap-x-5">
        <div className="w-full space-y-3">
          <small className="text-muted-foreground">Tamanho da senha</small>
          <Slider
            defaultValue={[0]}
            max={50}
            step={1}
            onValueChange={e => setLength(+e)}
          />
        </div>
        <p className="bg-accent text-accent-foreground p-2 rounded-md font-medium">
          {length}
        </p>
      </div>

      <div className="flex flex-nowrap gap-x-3 items-center">
        <small className="text-muted-foreground">
          Incluir Letras Maiúsculas:
        </small>

        <Checkbox
          checked={includeUppercase}
          onCheckedChange={(e: any) => setIncludeUppercase(e)}
        />
      </div>
      <div className="flex flex-nowrap gap-x-3 items-center">
        <small className="text-muted-foreground">
          Incluir Letras Minúsculas:
        </small>

        <Checkbox
          checked={includeLowercase}
          onCheckedChange={(e: any) => setIncludeLowercase(e)}
        />
      </div>

      <div className="flex flex-nowrap gap-x-3 items-center">
        <small className="text-muted-foreground">Incluir Números:</small>

        <Checkbox
          checked={includeNumbers}
          onCheckedChange={(e: any) => setIncludeNumbers(e)}
        />
      </div>

      <div className="flex flex-nowrap gap-x-3 items-center">
        <small className="text-muted-foreground">Incluir Símbolos:</small>

        <Checkbox
          checked={includeSymbols}
          onCheckedChange={(e: any) => setIncludeSymbols(e)}
        />
      </div>

      <Button
        className="bg-accent text-accent-foreground hover:bg-accent/25 transition-colors"
        type="button"
        onClick={handleGeneratePassword}
      >
        <Key className="size-4 mr-2" /> Gerar nova Senha
      </Button>
    </div>
  );
};
