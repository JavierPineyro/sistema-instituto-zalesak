type Props = {
  children: React.ReactNode
}

export default function TextMessage({ children }: Props) {
  return (
    <p className="mt-8 text-center text-sm text-gray-500">
      {children}
    </p>
  )
}