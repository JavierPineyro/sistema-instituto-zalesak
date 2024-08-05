import { service } from "~/server/services"

type Props = {
  params: {
    id: string
  }
}

export default async function AlumnInfoPage({ params }: Props) {
  const alumn = await service.alumnos.getById(Number(params.id))

  return (
    <div>
      AlumnInfoPage {alumn?.id}
    </div>
  )
}