import Link from "next/link";
import { cn } from "~/lib/utils";

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/admin/alumnos"
        className="hover:text-primary rounded-md px-2 py-1 text-sm font-medium transition-colors hover:bg-slate-400/25"
      >
        Alumnos
      </Link>
      <Link
        href="/admin/pedidos"
        className="text-muted-foreground hover:text-primary rounded-md px-2 py-1 text-sm font-medium transition-colors hover:bg-slate-400/25"
      >
        Pedidos
      </Link>
      <Link
        href="/admin/equipamiento"
        className="text-muted-foreground hover:text-primary rounded-md px-2 py-1 text-sm font-medium transition-colors hover:bg-slate-400/25"
      >
        Equipamiento
      </Link>
      <Link
        href="/admin/productos"
        className="text-muted-foreground hover:text-primary rounded-md px-2 py-1 text-sm font-medium transition-colors hover:bg-slate-400/25"
      >
        Productos
      </Link>
      <Link
        href="/admin/ajustes"
        className="text-muted-foreground hover:text-primary rounded-md px-2 py-1 text-sm font-medium transition-colors hover:bg-slate-400/25"
      >
        Ajustes{" "}
        {/* aca van los precios de cuota, lista cinturones y otras configs */}
      </Link>
    </nav>
  );
}
