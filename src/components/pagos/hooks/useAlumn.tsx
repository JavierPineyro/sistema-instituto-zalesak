"use client";
import { useEffect, useState } from "react";
import { service } from "~/server/services";

type AlumnWithPays = {
  fullname: string;
  pagos: Array<{
    month: string;
  }>;
};

//TODO: HACER QUE DEVUELVA LOS MESES QUE FALTA PAGAR
export function useAlumn(id: number, date: Date) {
  const [alumn, setAlumn] = useState<AlumnWithPays | undefined | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAlumn = async () => {
      return service.alumnos.getAlumnAndPays(id, date.getFullYear());
    };
    setIsLoading(true);
    getAlumn()
      .then((res) => setAlumn(res))
      .catch((reason) => console.error(reason))
      .finally(() => setIsLoading(false));
  }, [id, date]);
  console.log("ALUMNO", alumn);
  return { alumn, isLoading };
}
