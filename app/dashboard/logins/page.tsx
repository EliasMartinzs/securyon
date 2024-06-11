"use client";

import { Button } from "@/components/ui/button";
import { useCreatePassword } from "@/features/passwords/api/use-create-password";

export default function LoginPage() {
  const mutation = useCreatePassword();

  const onClick = () => {
    mutation.mutate({
      accountEmail: "111111111111111",
    });
  };

  return (
    <div>
      <Button onClick={onClick}>bora testar</Button>
    </div>
  );
}
