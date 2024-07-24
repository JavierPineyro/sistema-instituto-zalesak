import { relations, sql } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  boolean,
  pgTable,
  text,
  primaryKey,
  integer,
  date,
  real,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => `seminario_${name}`);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  password: text("password"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);

export const alumnos = pgTable("alumnos", {
  id: serial("id").primaryKey(),
  fullname: varchar("nombre_completo", { length: 255 }).notNull(),
  birthday: date("fecha_nac").notNull(),
  phoneNumber: varchar("num_tel", { length: 100 }),
  tutor: varchar("tutor", { length: 255 }),
  active: boolean("activo").notNull().default(true), // Actualizado
  idBelt: integer("id_cinturon")
    .notNull()
    .references(() => cinturones.id),
});

export const alumnosRelation = relations(alumnos, ({ one, many }) => ({
  cinturon: one(cinturones, {
    fields: [alumnos.idBelt],
    references: [cinturones.id],
  }),
  pagos: many(pagos),
  pedidos: many(pedidos),
  recibos: many(recibos),
}));

export const cinturones = pgTable("cinturones", {
  id: serial("id").primaryKey(),
  name: varchar("nombre", { length: 100 }).notNull(),
  description: text("descripcion"),
});

export const cinturonesRelation = relations(cinturones, ({ many }) => ({
  alumnos: many(alumnos),
}));

export const precios = pgTable("precios", {
  id: serial("id").primaryKey(),
  name: varchar("nombre", { length: 255 }).notNull(),
  publicPrice: real("precio_publico").notNull(),
  teacherPrice: real("precio_instructor").notNull(),
  active: boolean("activo").notNull().default(true),
});

export const preciosRelation = relations(precios, ({ many }) => ({
  producto: many(pedidos),
}));

export const recibos = pgTable("recibos", {
  id: serial("id").primaryKey(),
  amount: real("monto").notNull(),
  writtenAmount: text("monto_escrito"),
  date: date("fecha")
    .notNull()
    .default(sql`CURRENT_DATE`),
  nameClient: varchar("nombre_receptor", { length: 255 }).notNull(),
  idAlumn: integer("id_alumno").references(() => alumnos.id), // Actualizado
  concept: varchar("concepto", { length: 255 }),
  recharge: boolean("recargo").notNull().default(false),
  total: real("total").notNull(),
});

export const recibosRelation = relations(recibos, ({ one }) => ({
  pago: one(pagos),
  alumno: one(alumnos, {
    fields: [recibos.idAlumn],
    references: [alumnos.id],
  }),
}));

// Actualizado
export const pedidos = pgTable("pedidos", {
  id: serial("id").primaryKey(),
  idProduct: integer("id_producto")
    .references(() => precios.id)
    .notNull(),
  quantity: integer("cantidad").notNull(),
  idAlumn: integer("id_alumno").references(() => alumnos.id),
  total: real("total").notNull(),
  state: varchar("estado", { length: 20 }).notNull().default("pendiente"), //entregado, pendiente, cancelado?
});

export const pedidosRelation = relations(pedidos, ({ one }) => ({
  alumno: one(alumnos, {
    fields: [pedidos.idAlumn],
    references: [alumnos.id],
  }),
  producto: one(precios, {
    fields: [pedidos.idProduct],
    references: [precios.id],
  }),
}));

export const pagos = pgTable("pagos", {
  id: serial("id").primaryKey(),
  month: varchar("mes", { length: 50 }).notNull(),
  date: date("fecha")
    .notNull()
    .default(sql`CURRENT_DATE`),
  idAlumn: integer("id_alumno")
    .references(() => alumnos.id)
    .notNull(),
  idRecieve: integer("id_recibo")
    .references(() => recibos.id)
    .notNull(),
});

export const pagosRelation = relations(pagos, ({ one }) => ({
  alumno: one(alumnos, {
    fields: [pagos.idAlumn],
    references: [alumnos.id],
  }),
  recibo: one(recibos, {
    fields: [pagos.idRecieve],
    references: [recibos.id],
  }),
}));

export const inventario = pgTable("inventario", {
  id: serial("id").primaryKey(),
  name: varchar("nombre", { length: 255 }).notNull(),
  quantity: integer("cantidad").notNull(),
  observation: text("observaciones"),
});

export const precioCuota = pgTable("precio_servicios", {
  id: serial("id").primaryKey(),
  name: varchar("nombre", { length: 255 }).notNull(),
  price: real("valor").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
