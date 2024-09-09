type Props = {
  params: {
    id: string
  }
}

export default function PayPage({ params }: Props) {
  const id = Number(params.id)
  console.log("ID hacer pedido page", id)
  return (
    <div>PayPage</div>
  )
}