import loginAction from "~/server/actions/login"
import registerAction from "~/server/actions/register"

export default function LoginPage() {
  return (
    <section>
      <div>
        <h2>Login</h2>
        <form
          action={loginAction}
        >
          <label>
            Email
            <input name="email" type="email" />
          </label>
          <label>
            Password
            <input name="password" type="password" />
          </label>
          <button>Sign In</button>
        </form>
      </div>
      <div>
        <h2>Register</h2>
        <form
          action={registerAction}
        >
          <label>
            Name
            <input name="name" type="text" />
          </label>
          <label>
            Email
            <input name="email" type="email" />
          </label>
          <label>
            Password
            <input name="password" type="password" />
          </label>
          <button>Sign Up</button>
        </form>
      </div>
    </section>
  )
}