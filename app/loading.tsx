import { Logo } from "@/components/global/logo";

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-y-4 animate-pulse">
      <Logo width={180} height={180} />
      <h1 className="text-transparent bg-clip-text bg-gradient-to-tr from-primary to-primary/50 text-2xl text-center font-semibold">
        Securyon
      </h1>
    </div>
  );
}
