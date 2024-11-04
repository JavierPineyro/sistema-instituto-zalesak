import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { LogOut, Settings, Archive, HomeIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { auth, signOut } from "auth";
import { redirect } from "next/navigation";

export default async function UserNav() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/admin.png" alt="administrador" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs font-medium leading-none">Administrador</p>
            <p className="text-muted-foreground text-xs leading-none">
              {session.user?.name}, tienes todos los permisos
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className={cn("p-0")}>
            <Link
              className="flex w-full gap-1 px-2 py-3 transition-colors hover:bg-gray-300"
              href="/admin"
            >
              <HomeIcon className="h-4 w-4 text-black/60" />
              Inicio
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={cn("p-0")}>
            <Link
              className="flex w-full gap-1 px-2 py-3 transition-colors hover:bg-gray-300"
              href="/admin/equipamiento"
            >
              <Archive className="h-4 w-4 text-black/60" />
              Ver inventario
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={cn("p-0")}>
            <Link
              className="flex w-full gap-1 px-2 py-3 transition-colors hover:bg-gray-300"
              href="/admin/ajustes"
            >
              <Settings className="h-4 w-4 text-black/60" />
              Ajustes
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={cn("p-0")}>
          <form
            className="flex w-full justify-start"
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              className="flex w-full items-center justify-start gap-1 bg-transparent px-2 py-3 transition-colors hover:bg-gray-300"
              type="submit"
            >
              <LogOut className="mr-auto h-4 w-4 text-black/60" />
              Cerrar Sesión
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
