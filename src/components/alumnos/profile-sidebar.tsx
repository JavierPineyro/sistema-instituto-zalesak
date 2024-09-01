import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { CircleDollarSign, Package, Edit } from "lucide-react"

type SidebarProps = {
  id: number,
  className?: string,
}

export function ProfileSidebar({ className, id }: SidebarProps) {

  return (
    <aside className={cn("pb-12 max-w-60", className)}>
      <div className="space-y-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Perfil
          </h2>
          <div className="space-y-1">
            <Button asChild variant="secondary" className="w-full justify-start">
              <Link href={`/admin/alumnos/${id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Información Personal
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href={`/admin/alumnos/${id}/pagos`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
                Pagos
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href={`/admin/alumnos/${id}/recibos`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="m16 6 4 14" />
                  <path d="M12 6v14" />
                  <path d="M8 8v12" />
                  <path d="M4 4v16" />
                </svg>
                Recibos
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href={`/admin/alumnos/${id}/pedidos`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                  <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                  <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                </svg>
                Pedidos
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Acciones
          </h2>
          <div className="space-y-1">
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href={`/admin/alumnos/${id}/editar`}>
                <Edit className="size-4 mr-1" />
                Editar
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href={`/admin/alumnos/${id}/pagar`}>
                <CircleDollarSign className="size-4 mr-1" />
                Pagar Cuota
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href={`/admin/alumnos/${id}/hacer-pedido`}>
                <Package className="size-4 mr-1" />
                Hacer Pedido
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}