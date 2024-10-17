"use client";

import { Belt } from "~/lib/types";
import updateAlumnAction from "~/server/actions/alumnos/update-action";
import { AlumnUpdateSchema } from "~/lib/validations/alumn.schema";
import { z } from "zod";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { cn } from "~/lib/utils";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

type Props = {
  belts: Belt[] | null;
  alumn: {
    id: number;
    active: boolean;
    fullname: string;
    birthday: string;
    idBelt: number;
    phoneNumber: string | null;
    tutor: string | null;
  };
};

export default function UpdateAlumnForm({ belts, alumn }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof AlumnUpdateSchema>>({
    resolver: zodResolver(AlumnUpdateSchema),
    defaultValues: {
      id: alumn.id,
      fullname: alumn.fullname,
      birthday: alumn.birthday,
      phoneNumber: alumn.phoneNumber ?? "",
      tutor: alumn.tutor ?? "",
      idBelt: String(alumn.idBelt),
    },
  });

  async function onSubmit(values: z.infer<typeof AlumnUpdateSchema>) {
    const { id, ...valuesWithoutId } = values;
    const data = { ...valuesWithoutId, id: alumn.id };
    const updateAlumn = {
      id: data.id,
      fullname: data.fullname.trim(),
      birthday: data.birthday,
      phoneNumber: data.phoneNumber?.trim(),
      tutor: data.tutor?.trim(),
      idBelt: data.idBelt,
    };
    startTransition(async () => {
      const response = await updateAlumnAction(updateAlumn);
      if (response.success) {
        router.push(`/admin/alumnos/${alumn.id}`);
      } else {
        toast.error(response.message);
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="id"
                    className={cn("hidden")}
                    type="number"
                    {...field}
                  />
                </FormControl>
                <div className="h-3 items-center text-sm">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="fullname"
                  className={cn(
                    "leading-1 mt-2 block text-sm font-medium text-gray-900",
                  )}
                >
                  Nombre Completo
                </FormLabel>
                <FormControl>
                  <Input
                    id="fullname"
                    className={cn(
                      "block w-full rounded-md border-0 py-1 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4",
                    )}
                    type="text"
                    placeholder="ej: Luis Antonio ..."
                    {...field}
                  />
                </FormControl>
                <div className="h-3 items-center text-sm">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="birthday"
                  className={cn(
                    "leading-1 mt-2 block w-full text-sm font-medium text-gray-900",
                  )}
                >
                  Fecha de nac.
                </FormLabel>
                <FormControl>
                  <Input
                    id="birthday"
                    className={cn(
                      "block w-full rounded-md border-0 py-1 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4",
                    )}
                    type="date"
                    {...field}
                  />
                </FormControl>
                <div className="h-3 items-center text-sm">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="idBelt"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="idBelt"
                  className={cn(
                    "leading-1 mt-2 block text-sm font-medium text-gray-900",
                  )}
                >
                  Cinturón
                </FormLabel>
                <Select
                  required
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger aria-required className="w-full">
                      <SelectValue placeholder="Cinturón" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.isArray(belts) &&
                      belts.map((belt) => {
                        return (
                          <SelectItem key={belt.id} value={String(belt.id)}>
                            {belt.name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <div className="h-3 items-center text-sm">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="phoneNumber"
                  className={cn(
                    "leading-1 mt-2 block text-sm font-medium text-gray-900",
                  )}
                >
                  Núm. Teléfono
                </FormLabel>
                <FormControl>
                  <Input
                    id="phoneNumber"
                    className={cn(
                      "block w-full rounded-md border-0 py-1 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4",
                    )}
                    type="text"
                    placeholder="ej: 376-430329"
                    {...field}
                  />
                </FormControl>
                <div className="h-3 items-center text-sm">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tutor"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="tutor"
                  className={cn(
                    "leading-1 mt-2 block text-sm font-medium text-gray-900",
                  )}
                >
                  Nombre de un tutor
                </FormLabel>
                <FormControl>
                  <Input
                    id="tutor"
                    className={cn(
                      "block w-full rounded-md border-0 py-1 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4",
                    )}
                    type="text"
                    placeholder="ej: Carlos Alvarez"
                    {...field}
                  />
                </FormControl>
                <div className="h-3 items-center text-sm">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            type="submit"
            className={cn(
              "flex h-10 w-full items-center justify-center rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-4 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
            )}
          >
            Guardar
          </Button>
        </form>
      </Form>
    </>
  );
}
