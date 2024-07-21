import { auth } from "auth"
import { redirect } from "next/navigation";
import LoginForm from "~/components/auth/login-form";

export default async function LoginPage() {

  const session = await auth();

  if (session !== null) {
    redirect("/admin")
  }

  return (
    <section>
      <LoginForm />
    </section>
  )
}