import { mockAlumn } from "~/components/alumnos/tables/data";
import { NewAlumn, NewPayment, UpdateAlumnWithNumberBeltId } from "~/lib/types";
import { db } from "./db";
import { count, eq } from "drizzle-orm";
import { alumnos, pagos, recibos } from "./db/schema";

export const service = {
  alumnos: {
    list: async () => {
      const data = await db.query.alumnos.findMany({
        with: {
          cinturon: {
            columns: {
              name: true,
              id: true,
            },
          },
        },
        // orderBy: (alumnos, { asc }) => [asc(alumnos.active)],
      });
      return data;
    },
    getById: async (id: number) => {
      const alumn = await db.query.alumnos.findFirst({
        where: eq(alumnos.id, id),
      });
      return alumn;
    },
    getByIdWithBelt: async (id: number) => {
      const alumn = await db.query.alumnos.findFirst({
        where: eq(alumnos.id, id),
        with: {
          cinturon: {
            columns: {
              name: true,
              description: true,
            },
          },
        },
      });
      return alumn;
    },
    checkIfAlreadyExist: async (name: string) => {
      const data = await db.query.alumnos.findFirst({
        where: eq(alumnos.fullname, name),
        columns: {
          id: true,
        },
      });
      return !!data;
    },
    save: async (alumn: NewAlumn) => {
      const { fullname, birthday, phoneNumber, tutor, idBelt: belt } = alumn;
      const idBelt = Number(belt);
      await db.insert(alumnos).values({
        fullname,
        birthday,
        idBelt,
        phoneNumber,
        tutor,
      });
      return alumn;
    },
    update: async (alumn: UpdateAlumnWithNumberBeltId) => {
      const { fullname, birthday, phoneNumber, tutor, idBelt, id } = alumn;
      const result = await db
        .update(alumnos)
        .set({
          birthday,
          fullname,
          idBelt,
          phoneNumber,
          tutor,
        })
        .where(eq(alumnos.id, id))
        .returning({ id: alumnos.id });
      return result;
    },
    delete: async (id: number) => {
      const index = mockAlumn.findIndex((a) => a.id === id);
      mockAlumn.splice(index, 1);
      return true;
    },
    count: async () => {
      const data = await db.select({ count: count() }).from(alumnos);
      return data;
    },
    changeIsActive: async (id: number, active: boolean) => {
      const result = await db
        .update(alumnos)
        .set({ active: active })
        .where(eq(alumnos.id, id))
        .returning({ id: alumnos.id });
      return result;
    },
  },
  cinturones: {
    list: async () => {
      const data = await db.query.cinturones.findMany();
      return data;
    },
  },
  pagos: {
    list: async () => {
      const data = await db.query.pagos.findMany();
      return data;
    },
    getById: async (id: number) => {
      const data = await db.query.pagos.findFirst({
        where: eq(pagos.id, id),
      });
      return data;
    },
    save: async (payment: NewPayment) => {
      const { idAlumn, idRecieve, month, date } = payment;
      await db.insert(pagos).values({ idAlumn, idRecieve, month, date });
      return payment;
    },
    getByMonthAndYear: async (month: string, year: string) => {
      // get all records of pagos based on a month, and using date  
    }
  },
  recibos: {
    list: async () => {
      const data = await db.query.recibos.findMany();
      return data;
    },
    getById: async (id: number) => {
      const data = await db.query.recibos.findFirst({
        where: eq(recibos.id, id),
      });
      return data;
    },
    save: async (recieve: any) => {
      const {
        amount,
        writtenAmount,
        date,
        nameClient,
        idAlumn,
        concept,
        recharge,
        total,
      } = recieve;
      await db.insert(recibos).values(recieve);
      return recieve;
    },
  },
};
