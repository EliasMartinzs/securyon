import { type ClassValue, clsx } from "clsx";
import { ChangeEvent } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { useCopyToClipboard } from "usehooks-ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePassword = (
  length: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
): string => {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let allChars = "";
  if (includeUppercase) allChars += uppercaseChars;
  if (includeLowercase) allChars += lowercaseChars;
  if (includeNumbers) allChars += numberChars;
  if (includeSymbols) allChars += symbolChars;

  if (allChars === "") {
    throw new Error("Pelo menos um tipo de caractere deve ser selecionado.");
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
};

export const getCardType = (cardNumber: string) => {
  const bin = cardNumber.slice(0, 6);
  const cardTypeMap: { [key: string]: string } = {
    "4": "Visa",
    "51": "MasterCard",
    "52": "MasterCard",
    "53": "MasterCard",
    "54": "MasterCard",
    "55": "MasterCard",
    "34": "American Express",
    "37": "American Express",
    "401178": "Elo",
    "401179": "Elo",
    "431274": "Elo",
    "438935": "Elo",
    "451416": "Elo",
    "457393": "Elo",
    "504175": "Elo",
    "627780": "Elo",
    "636297": "Elo",
    "636368": "Elo",
    "606282": "Hipercard",
    "6011": "Discover",
    "622126": "Discover",
    "622925": "Discover",
    "644": "Discover",
    "645": "Discover",
    "646": "Discover",
    "647": "Discover",
    "648": "Discover",
    "649": "Discover",
    "65": "Discover",
    "3528": "JCB",
    "3589": "JCB",
    "300": "Diners Club",
    "305": "Diners Club",
    "36": "Diners Club",
    "38": "Diners Club",
    "39": "Diners Club",
  };

  for (const [key, value] of Object.entries(cardTypeMap)) {
    if (bin.startsWith(key)) {
      return value;
    }
  }

  return undefined;
};

export const formatCardNumber = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

export const formatCardDateExpiration = (e: ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value.replace(/\D/g, "");

  if (value.length > 4) {
    value = value.slice(0, 4);
  }

  if (value.length > 2) {
    value = value.slice(0, 2) + "/" + value.slice(2);
  }

  return value;
};
