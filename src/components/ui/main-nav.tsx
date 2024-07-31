import Link from "next/link"
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
        className="text-sm font-medium transition-colors hover:text-primary hover:bg-slate-400/25 px-2 py-1 rounded-md"
      >
        Alumnos
      </Link>
      <Link
        href="/admin/pedidos"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-slate-400/25 px-2 py-1 rounded-md"
      >
        Pedidos
      </Link>
      <Link
        href="/admin/equipamiento"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-slate-400/25 px-2 py-1 rounded-md"
      >
        Equipamiento
      </Link>
      <Link
        href="/admin/precios"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-slate-400/25 px-2 py-1 rounded-md"
      >
        Lista de Precios
      </Link>
      <Link
        href="/admin/pagos"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-slate-400/25 px-2 py-1 rounded-md"
      >
        Pagos
      </Link>
      <Link
        href="/admin/recibos"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-slate-400/25 px-2 py-1 rounded-md"
      >
        Recibos
      </Link>
      <Link
        href="/admin/ajustes"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-slate-400/25 px-2 py-1 rounded-md"
      >
        Ajustes {/* aca van los precios de cuota, lista cinturones y otras configs */}
      </Link>
    </nav>
  )
}