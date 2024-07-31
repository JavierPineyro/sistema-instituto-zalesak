import { cn } from "~/lib/utils"

type Props = {
  children: React.ReactNode,
  isGray?: boolean
}

export default function TextMessage({ children, isGray }: Props) {
  return (
    <p className={cn({
      "mt-8 text-center text-sm text-gray-500": isGray,
      "mt-8 text-center text-sm": !isGray
    })}>
      {children}
    </p>
  )
}