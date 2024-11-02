"use client";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function ErrorPage() {
  return (
    <section className="flex min-h-96 w-full flex-col items-center justify-center bg-gray-800 text-yellow-50">
      <h1 className="text-2xl">Ocurrió un error!</h1>
      <div className="mx-2">
        <p className="text-center">
          Lo sentimos, pero ha ocurrido un error inesperado.
        </p>
        <p className="text-center">Por favor, inténtalo de nuevo más tarde.</p>
      </div>
      <div>
        <Button asChild>
          <Link href="/admin/">Volver al inicio</Link>
        </Button>
      </div>
    </section>
  );
}
