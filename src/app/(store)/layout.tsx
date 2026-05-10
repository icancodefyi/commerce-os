import { StoreNavbar } from "@/modules/cart/components/store-navbar";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <StoreNavbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
