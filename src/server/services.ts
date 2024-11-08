import {
  Inventory,
  NewAlumnToSave,
  NewInventory,
  NewOrder,
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
  cinturones,
  inventario,
  pagos,
  pedidos,
  precioCuota,
  precios,
  recibos,
} from "./db/schema";
import {
  formatPedidoResponse,
  formatPedidosResponse,
  getFirstAndLastDayOfMonth,
} from "~/lib/utils";

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
        orderBy: [desc(alumnos.fullname)],
      });
      const orderdDataByActive = data.sort(
        (a, b) => Number(b.active) - Number(a.active),
      );
      return orderdDataByActive;
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
    getFullnameById: async (id: number) => {
      const alumn = await db.query.alumnos.findFirst({
        where: eq(alumnos.id, id),
        columns: {
          id: true,
          fullname: true,
        },
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
    save: async (alumn: NewAlumnToSave) => {
      const { fullname, birthday, phoneNumber, tutor, idBelt } = alumn;
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
      const data = await db.query.cinturones.findMany({
        orderBy: [asc(cinturones.id)],
      });
      return data;
    },
    save: async (cinturon: { name: string; description: string | null }) => {
      const { name, description } = cinturon;
      await db.insert(cinturones).values({ name, description });
      return cinturon;
    },
    delete: async (id: number) => {
      const data = await db
        .delete(pedidos)
        .where(eq(pedidos.id, id))
        .returning({ id: pedidos.id });

      return data;
    },
    update: async (belt: {
      id: number;
      name: string;
      description: string | null;
    }) => {
      const { name, description } = belt;
      const data = await db
        .update(cinturones)
        .set({ name, description })
        .where(eq(cinturones.id, belt.id))
        .returning({ id: cinturones.id });
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
        orderBy: [desc(pagos.id)],
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
    getAllByAlumnId: async (id: number) => {
      const data = await db.query.recibos.findMany({
        where: eq(recibos.idAlumn, id),
        orderBy: [desc(recibos.date)],
      });
      return data;
    },
    getLastMonthIncome: async (year: number, month: number) => {
      const { firstDay, lastDay } = getFirstAndLastDayOfMonth(year, month);
      const data = await db.query.recibos.findMany({
        where: between(recibos.date, firstDay, lastDay),
        columns: {
          amount: true,
          tipo: true,
          total: true,
        },
      });
      const income = data.reduce((acc, item) => {
        if (item.tipo === "cuota") return acc + item.total;
        else return acc;
      }, 0);
      return income;
    },
  },
  precioServicio: {
    getAmount: async () => {
      const amount = db.query.precioCuota.findFirst({
        where: eq(precioCuota.name, "cuota"),
      });
      return amount;
    },
    getCuotaService: async () => {
      const data = await db.query.precioCuota.findFirst({
        where: eq(precioCuota.name, "cuota"),
      });
      return data;
    },
    updateCuotaService: async (cuota: {
      id: number;
      name: string;
      price: number;
      updatedAt: Date;
    }) => {
      const { id, name, price, updatedAt } = cuota;
      const data = await db
        .update(precioCuota)
        .set({ name, price, updatedAt })
        .where(eq(precioCuota.id, id))
        .returning({ id: precioCuota.id });
      return data;
    },
    createCuotaService: async (cuota: { price: number }) => {
      const { price } = cuota;
      const name = "cuota";
      const updatedAt = new Date();
      
      const data = await db
        .insert(precioCuota)
        .values({ price, name,updatedAt })
        .returning({ id: precioCuota.id });
      return data;
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
    getAllById: async (id: number) => {
      const response = await db.query.pedidos.findMany({
        where: eq(pedidos.idAlumn, id),
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
    save: async (pedido: NewOrder) => {
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
    delete: async (id: number) => {
      const response = await db
        .delete(pedidos)
        .where(eq(pedidos.id, id))
        .returning({ id: pedidos.id });

      return response;
    },
    getPendingOrders: async () => {
      const data = await db.query.pedidos.findMany({
        orderBy: [desc(pedidos.id)],
        where: eq(pedidos.state, "pendiente"),
        columns: {
          id: true,
          idProduct: true,
          quantity: true,
        },
        with: {
          producto: {
            columns: {
              name: true,
              teacherPrice: true,
            },
          },
        },
      });
      return data;
    },
    getPendingOrdersCount: async () => {
      const data = await db
        .select({ count: count() })
        .from(pedidos)
        .where(eq(pedidos.state, "pendiente"));
      return data;
    },
    getLastPendingOrders: async (limit = 5) => {
      const data = await db.query.pedidos.findMany({
        orderBy: [desc(pedidos.id)],
        where: eq(pedidos.state, "pendiente"),
        limit: limit,
        columns: {
          id: true,
          idProduct: true,
          quantity: true,
          total: true,
        },
        with: {
          producto: {
            columns: {
              name: true,
              publicPrice: true,
              teacherPrice: true,
            },
          },
        },
      });

      return data;
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
        where: eq(precios.active, true),
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
  inventario: {
    list: async () => {
      const data = await db.query.inventario.findMany({
        orderBy: [desc(inventario.id)],
      });
      return data;
    },
    save: async (inventory: NewInventory) => {
      const { name, quantity, observation } = inventory;
      const data = await db
        .insert(inventario)
        .values({ name, quantity, observation })
        .returning({ id: inventario.id });
      return data;
    },
    update: async (inventory: Inventory) => {
      const { id, name, quantity, observation } = inventory;
      const data = await db
        .update(inventario)
        .set({ name, quantity, observation })
        .where(eq(inventario.id, id))
        .returning({ id: inventario.id });
      return data;
    },
    delete: async (id: number) => {
      const data = await db
        .delete(inventario)
        .where(eq(inventario.id, id))
        .returning({ id: inventario.id });
      return data;
    },
    count: async () => {
      const data = await db.select({ count: count() }).from(inventario);
      return data;
    },
  },
};
