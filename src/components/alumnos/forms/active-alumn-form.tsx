import { useTransition } from "react"
import activeAlumnAction from "~/server/actions/alumnos/active-action"

type Props = {
  id: number,
  active: boolean
}

export default function ActiveForm({ id, active }: Props) {
  const [isPending, startTransition] = useTransition()
  const textContent = active ? "Desactivar" : "Activar"
  const changeActiveAlumnAction = activeAlumnAction.bind(null, { id, active })

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const response = await changeActiveAlumnAction(formData)
      if (response.success) {
        window.location.reload()
      } else {
        alert(response.message)
      }
    })
  }

  return (
    <form action={(handleSubmit)}>
      <input onChange={(e) => console.log("No deberias estar viendo esto")} className="hidden" name="id" type="number" defaultValue={id} />
      <input onChange={(e) => console.log("No deberias estar viendo esto")} className="hidden" name="active" type="text" defaultValue={`${active}`} />
      <button
        type="submit"
        disabled={isPending}
        className="bg-transparent border-none text-inherit cursor-pointer">
        {textContent}
      </button>
    </form>
  )
}