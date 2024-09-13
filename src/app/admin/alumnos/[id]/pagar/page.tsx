import { parseToLocalDate } from "~/lib/utils"

type Props = {
  params: {
    id: string
  }
}

/* 
  amount, (automatico)
  writtenAmount, (manual)
  date,(automatico)
  nameClient, (manual)
  idAlumn, (automatico)
  concept, (automatico)
  recharge, (automatico)
  total, (automatico)

  month, (manual)
*/

export default function PayPage({ params }: Props) {
  return (
    <section className="px-5">
      <header className="flex justify-between">
        <h2>Pagar cuota</h2>
        <h4>{parseToLocalDate(new Date().toDateString())}</h4>
      </header>
      <div>

      </div>
    </section>
  )
}

