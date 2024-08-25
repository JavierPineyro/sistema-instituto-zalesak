import Link from "next/link";
import MainNav from "~/components/ui/main-nav";
import UserNav from "~/components/ui/user-nav";
import { Toaster } from "~/components/ui/sonner"
import { auth } from "auth";
import { redirect } from "next/navigation";

export default async function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await auth()
  if (!session || !session?.user) {
    redirect("/login");
  }

  return (
    <main className="h-full">
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Link href="/admin">
              <h1 className="font-bold">Instituto Zalesak</h1>
            </Link>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
      </div>
      {children}
      <Toaster richColors position="top-center" />
    </main>
  )
}