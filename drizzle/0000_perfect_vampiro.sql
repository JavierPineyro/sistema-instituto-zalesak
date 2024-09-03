CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "alumnos" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre_completo" varchar(255) NOT NULL,
	"fecha_nac" date NOT NULL,
	"num_tel" varchar(100),
	"tutor" varchar(255),
	"activo" boolean DEFAULT true NOT NULL,
	"fecha_ingreso" date DEFAULT CURRENT_DATE,
	"id_cinturon" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticator_userId_credentialID_pk" PRIMARY KEY("userId","credentialID"),
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cinturones" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(100) NOT NULL,
	"descripcion" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inventario" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(255) NOT NULL,
	"cantidad" integer NOT NULL,
	"observaciones" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pagos" (
	"id" serial PRIMARY KEY NOT NULL,
	"mes" varchar(50) NOT NULL,
	"fecha" date DEFAULT CURRENT_DATE NOT NULL,
	"id_alumno" integer NOT NULL,
	"id_recibo" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pedidos" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_producto" integer NOT NULL,
	"cantidad" integer NOT NULL,
	"id_alumno" integer,
	"total" real NOT NULL,
	"estado" varchar(20) DEFAULT 'pendiente' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "precio_servicios" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(255) NOT NULL,
	"valor" real NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "precios" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(255) NOT NULL,
	"precio_publico" real NOT NULL,
	"precio_instructor" real NOT NULL,
	"activo" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recibos" (
	"id" serial PRIMARY KEY NOT NULL,
	"monto" real NOT NULL,
	"monto_escrito" text,
	"fecha" date DEFAULT CURRENT_DATE NOT NULL,
	"nombre_receptor" varchar(255) NOT NULL,
	"id_alumno" integer,
	"concepto" varchar(255),
	"recargo" boolean DEFAULT false NOT NULL,
	"total" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"password" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "alumnos" ADD CONSTRAINT "alumnos_id_cinturon_cinturones_id_fk" FOREIGN KEY ("id_cinturon") REFERENCES "public"."cinturones"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pagos" ADD CONSTRAINT "pagos_id_alumno_alumnos_id_fk" FOREIGN KEY ("id_alumno") REFERENCES "public"."alumnos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pagos" ADD CONSTRAINT "pagos_id_recibo_recibos_id_fk" FOREIGN KEY ("id_recibo") REFERENCES "public"."recibos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_id_producto_precios_id_fk" FOREIGN KEY ("id_producto") REFERENCES "public"."precios"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_id_alumno_alumnos_id_fk" FOREIGN KEY ("id_alumno") REFERENCES "public"."alumnos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recibos" ADD CONSTRAINT "recibos_id_alumno_alumnos_id_fk" FOREIGN KEY ("id_alumno") REFERENCES "public"."alumnos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
