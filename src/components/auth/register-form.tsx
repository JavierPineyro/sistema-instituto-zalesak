import registerAction from "~/server/actions/register"

export default function RegisterForm() {
  return (
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
  )
}