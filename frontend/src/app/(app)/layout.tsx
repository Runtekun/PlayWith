import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { FlashBanner } from "@/components/layout/FlashBanner";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />
      <FlashBanner />
      <main className="flex-1">{children}</main>
      <BottomNav />
    </div>
  );
}
