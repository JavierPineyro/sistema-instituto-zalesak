import { Metadata } from "next"
import { ProfileSidebar } from "~/components/alumnos/profile-sidebar"
import { service } from "~/server/services"

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const data = await service.alumnos.getById(Number(params.id))
  return {
    title: `Perfil del Alumno ${data?.fullname}`,
    description: `Página gestion de perfil del Alumno ${data?.fullname}`,
  }
}

export default function LayoutAlumnInfo({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Props["params"];
}) {
  return (
    <section className="h-full flex">
      <ProfileSidebar id={Number(params.id)} />
      {children}
    </section>
  )
}