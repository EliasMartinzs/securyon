import { Logo } from "@/components/global/logo";

export default function LayoutSignIn({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col gap-y-6">
      <div className="flex flex-col items-center text-center gap-y-4">
        <Logo width={80} height={80} />
        <h1 className="text-2xl font-semibold">Securyon</h1>
      </div>
      {children}
    </div>
  );
}
