"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { DialogClose, DialogFooter } from "~/components/ui/dialog";
import { AlumnCreateSchema } from "~/lib/validations/alumn.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { cn } from "~/lib/utils";
import { Input } from "~/components/ui/input";
import { Belt } from "~/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import createAlumnAction from "~/server/actions/alumnos/create-action";

type Props = {
  belts?: Belt[];
};

export default function CreateAlumnForm({ belts }: Props) {
  const [error, setError] = useState<string | undefined | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AlumnCreateSchema>>({
    resolver: zodResolver(AlumnCreateSchema),
    defaultValues: {
      fullname: "",
      birthday: undefined,
      phoneNumber: "",
      tutor: "",
      idBelt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AlumnCreateSchema>) {
    setError(null);
    startTransition(async () => {
      const response = await createAlumnAction(values);
      if (response.success) {
        setError(null);
        window.location.reload();
      } else {
        setError(response.message);
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
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
                    "leading-1 mt-2 block text-sm font-medium text-gray-900",
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
                    <SelectTrigger className="w-[180px]">
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

          <div>
            <DialogFooter>
              <DialogClose asChild>
                <Button disabled={isPending} type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                disabled={isPending}
                className={cn(
                  "flex w-full justify-center rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-4 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                )}
                type="submit"
              >
                Guardar
              </Button>
            </DialogFooter>
          </div>
        </form>
      </Form>
      <div>
        {error !== null && (
          <p className="mt-1 text-center text-sm text-red-500">{error}</p>
        )}
      </div>
    </>
  );
}
