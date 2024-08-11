import { mockAlumn } from "~/components/alumnos/tables/data";
import { Alumn, NewAlumn } from "~/lib/types";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { alumnos } from "./db/schema";

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
      });
      return data;
    },
    getById: async (id: number): Promise<Alumn | null> => {
      return new Promise((resolve, reject) => {
        const alumn = mockAlumn.find((a) => a.id === id);
        if (alumn) {
          resolve(alumn);
        } else {
          reject(new Error("Alumn not found"));
        }
      });
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
    update: async (alumn: Alumn) => {
      const index = mockAlumn.findIndex((a) => a.id === alumn.id);
      mockAlumn[index] = alumn;
      return alumn;
    },
    delete: async (id: number) => {
      const index = mockAlumn.findIndex((a) => a.id === id);
      mockAlumn.splice(index, 1);
      return true;
    },
  },
  cinturones: {
    list: async () => {
      const data = await db.query.cinturones.findMany();
      return data;
    },
  },
};
