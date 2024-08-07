import { mockAlumn } from "~/components/alumnos/tables/data";
import { Alumn } from "~/lib/types";
import { db } from "./db";

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
    save: async (alumn: Alumn) => {
      mockAlumn.push(alumn);
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
};
