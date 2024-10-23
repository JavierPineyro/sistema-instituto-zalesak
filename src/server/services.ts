import { mockAlumn } from "~/components/alumnos/tables/data";
import {
  NewAlumn,
  NewPayment,
  Order,
  Product,
  ProductAction,
  UpdateAlumnWithNumberBeltId,
} from "~/lib/types";
import { db } from "./db";
import { count, eq, between, desc, asc } from "drizzle-orm";
import {
  alumnos,
  pagos,
  pedidos,
  precioCuota,
  precios,
  recibos,
} from "./db/schema";
import { formatPedidoResponse, formatPedidosResponse } from "~/lib/utils";

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
    listFullnames: async () => {
      const data = await db.query.alumnos.findMany({
        columns: {
          fullname: true,
          id: true,
        },
        orderBy: [asc(alumnos.fullname)],
      });
      return data;
    },
    getById: async (id: number) => {
      const alumn = await db.query.alumnos.findFirst({
        where: eq(alumnos.id, id),
      });
      return alumn;
    },
    getAlumnAndPays: async (id: number, year: number) => {
      const minDate = `${year}-01-01`;
      const maxDate = `${year}-12-31`;
      const alumn = await db.query.alumnos.findFirst({
        where: eq(alumnos.id, id),
        columns: {
          fullname: true,
          dateAdmission: true,
          active: true,
        },
        with: {
          pagos: {
            where: between(pagos.date, minDate, maxDate),
            columns: {
              month: true,
            },
          },
        },
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
    getAlumnWithBeltAndPayments: async (id: number, year: number) => {
      const minDate = `${year}-01-01`;
      const maxDate = `${year}-12-31`;
      const alumn = await db.query.alumnos.findFirst({
        where: eq(alumnos.id, id),
        with: {
          cinturon: {
            columns: {
              name: true,
              description: true,
            },
          },
          pagos: {
            where: between(pagos.date, minDate, maxDate),
            columns: {
              month: true,
              date: true,
              id: true,
              idAlumn: true,
              idRecieve: true,
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
    getLastPayments: async (limit = 5) => {
      const data = await db.query.pagos.findMany({
        orderBy: [desc(pagos.date), desc(pagos.id)],
        limit: limit,
        columns: {
          id: true,
        },
        with: {
          recibo: {
            columns: {
              total: true,
              nameClient: true,
              concept: true,
            },
          },
        },
      });
      return data;
    },
    getByAlumnId: async (id: number) => {
      const data = await db.query.pagos.findMany({
        where: eq(pagos.idAlumn, id),
        with: {
          recibo: {
            columns: {
              total: true,
              nameClient: true,
              concept: true,
            },
          },
        },
      });

      return data;
    },
  },
  recibos: {
    getById: async (id: number) => {
      const data = await db.query.recibos.findFirst({
        where: eq(recibos.id, id),
      });
      return data;
    },
    save: async (recieve: any) => {
      const response = await db
        .insert(recibos)
        .values(recieve)
        .returning({ id: recibos.id });
      return response;
    },
  },
  precioServicio: {
    getAmount: async () => {
      const amount = db.query.precioCuota.findFirst({
        where: eq(precioCuota.name, "cuota"),
      });
      return amount;
    },
  },
  pedidos: {
    list: async () => {
      const response = await db.query.pedidos.findMany({
        orderBy: [desc(pedidos.id)],
        with: {
          alumno: {
            columns: {
              fullname: true,
            },
          },
          producto: {
            columns: {
              name: true,
              publicPrice: true,
            },
          },
        },
      });
      const data = formatPedidosResponse(response);
      return data;
    },
    getById: async (id: number) => {
      const response = await db.query.pedidos.findFirst({
        where: eq(pedidos.id, id),
        orderBy: [desc(pedidos.id)],
        with: {
          alumno: {
            columns: {
              fullname: true,
            },
          },
          producto: {
            columns: {
              name: true,
              publicPrice: true,
            },
          },
        },
      });

      if (response) return formatPedidoResponse(response);
      else return undefined;
    },
    save: async (pedido: any) => {
      const response = await db
        .insert(pedidos)
        .values(pedido)
        .returning({ id: pedidos.id });
      return response;
    },
    update: async (order: Order) => {
      const response = await db
        .update(pedidos)
        .set({
          idProduct: order.idProduct,
          quantity: order.quantity,
          idAlumn: order.idAlumn,
          state: order.state,
          total: order.total,
        })
        .where(eq(pedidos.id, order.id))
        .returning({ id: pedidos.id });
      return response;
    },
  },
  precios: {
    list: async () => {
      const data = await db.query.precios.findMany({
        orderBy: [desc(precios.active)],
      });
      // order data by active
      const sortedData = data.sort(
        (a, b) => Number(b.active) - Number(a.active),
      );
      return sortedData;
    },
    listWithPublicPriceAndName: async () => {
      const data = await db.query.precios.findMany({
        columns: {
          id: true,
          name: true,
          publicPrice: true,
        },
        orderBy: [asc(precios.name)],
      });
      return data;
    },
    getById: async (id: number) => {
      const data = await db.query.precios.findFirst({
        where: eq(precios.id, id),
      });
      return data;
    },
    save: async (precio: ProductAction) => {
      const response = await db
        .insert(precios)
        .values(precio)
        .returning({ id: precios.id });
      return response;
    },
    delete: async (id: number) => {
      const response = await db
        .delete(precios)
        .where(eq(precios.id, id))
        .returning({ id: precios.id });

      return response;
    },
    update: async (product: Product) => {
      const response = await db
        .update(precios)
        .set({
          name: product.name,
          publicPrice: product.publicPrice,
          teacherPrice: product.teacherPrice,
          active: product.active,
        })
        .where(eq(precios.id, product.id))
        .returning({ id: precios.id });
      return response;
    },
  },
};
