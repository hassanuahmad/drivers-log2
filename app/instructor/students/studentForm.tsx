"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { newStudentSchema } from "@/zod/schemas";
import { StudentFormValues } from "@/types/shared/forms";
import { addStudentAction } from "@/app/instructor/students/actions";

export default function StudentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  const [hiddenDrivingClassValue, setHiddenDrivingClassValue] = useState("G2");
  const [hiddenBdeValue, setHiddenBdeValue] = useState("No");

  const [state, formAction] = useFormState(addStudentAction, {
    message: "",
    error: "",
  });

  useEffect(() => {
    const { message, error } = state || {};

    if (message || error) {
      const variant = message ? "success" : "error";
      const description = message || error || "";

      toast[variant](description, {
        duration: 3000,
      });
      if (message) form.reset(initialStudentFormValues);
    }
  }, [state, toast]);

  const initialStudentFormValues: StudentFormValues = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    driving_class: "G2",
    bde: "No",
    street_address: "",
    postal_code: "",
    city: "",
    province: "",
    country: "",
    remarks: "",
    ...(state?.fields ?? {}),
  };

  const form = useForm<z.infer<typeof newStudentSchema>>({
    resolver: zodResolver(newStudentSchema),
    defaultValues: initialStudentFormValues,
  });

  return (
    <>
      <Form {...form}>
        <form
          ref={formRef}
          action={formAction}
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit(() => {
              formAction(new FormData(formRef.current!));
            })(event);
          }}
          className="space-y-8"
        >
          <div className="my-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="driving_class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driving Class</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setHiddenDrivingClassValue(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="G2">G2</SelectItem>
                      <SelectItem value="G">G</SelectItem>
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    name="driving_class"
                    value={hiddenDrivingClassValue}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bde"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BDE</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setHiddenBdeValue(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="bde" value={hiddenBdeValue} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                    {/*
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <Input {...field} />
                </Autocomplete>
                */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={pending}>
              Save Student
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
