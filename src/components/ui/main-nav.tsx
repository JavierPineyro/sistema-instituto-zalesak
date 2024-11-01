import Link from "next/link";
import { cn } from "~/lib/utils";

const links = [
  { label: "Alumnos", href: "/admin/alumnos" },
  { label: "Pedidos", href: "/admin/pedidos" },
  { label: "Equipamiento", href: "/admin/equipamiento" },
  { label: "Productos", href: "/admin/productos" },
  { label: "Ajustes", href: "/admin/ajustes" },
];

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:text-primary rounded-md px-2 py-1 text-sm font-medium transition-colors hover:bg-slate-400/25"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
