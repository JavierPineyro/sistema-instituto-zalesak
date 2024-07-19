import { auth, signOut } from "auth";
import { redirect } from "next/navigation";

export default async function HomePage() {

  // PONER LAS ENV EN VERCEL ANTES DE DESPLEGAR

  const session = await auth()

  if (!session?.user) {
    return <div>Not authenticated</div>;
    // redirigir al login
    // redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1>home, {session.user?.email}</h1>
        <form
          action={async () => {
            "use server"
            await signOut({ redirectTo: "/login" })
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      </div>
    </main>
  );
}
