import NextAuth, { type NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "~/server/db"
import { eq } from "drizzle-orm"
import { users } from "~/server/db/schema"
import { loginSchema } from "~/lib/validations/signin.schema"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session:{
    strategy: "jwt"
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        let user = null
        const {data, success} = loginSchema.safeParse(credentials)
        if(!success){
          throw new Error("Credenciales no válidas")
        }

        // verifico que el usuario exista
        user = await db.query.users.findFirst({
          where: eq(users.email, data.email),
          columns: {
            id: true,
            name: true,
            email: true,
            password: true,
          },
        })

        if(!user || !user.password){
          throw new Error("Email o Contraseña no válidas")
        }

        // verificar si la contraseña es correcta
        const isValid = await bcrypt.compare(data.password, user.password)

        if(!isValid){
          throw new Error("Email o Contraseña no válidas")
        }
        return user
      },
    }),
  ],
} satisfies NextAuthConfig)
