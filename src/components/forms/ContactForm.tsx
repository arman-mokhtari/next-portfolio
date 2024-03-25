"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { contactSchema } from "@/lib/validation";
import { useState } from "react";

// Define type for field names and placeholders
type FieldName = "fullName" | "email" | "phone" | "message";
type Placeholders = Record<FieldName, string>;

const ContactForm = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  // Define your form.
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof contactSchema>) {
    setIsSubmit(true);
    try {
      console.log(values);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmit(false);
    }
  }

  // Object to store field names and placeholders
  const placeholders: Placeholders = {
    fullName: "نام کامل",
    email: "ایمیل",
    phone: "تلفن",
    message: "پیام",
  };

  // Array of field names excluding 'message'
  const fieldNames: FieldName[] = ["fullName", "email", "phone"];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          {fieldNames.map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem className="flex-1" key={fieldName}>
                  <FormControl>
                    <Input
                      className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                      placeholder={placeholders[fieldName]}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-rose-600" />
                </FormItem>
              )}
            />
          ))}
        </div>
        <FormField
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  rows={6}
                  className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                  placeholder={placeholders.message}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-rose-600" />
            </FormItem>
          )}
        />

        <Button
          className="hover-gradient mt-4 min-h-[46px] min-w-[140px] rounded-full px-4 py-3 text-base !text-light-900 shadow-lg shadow-slate-400 active:shadow-md dark:shadow-none"
          type="submit"
          disabled={isSubmit}
        >
          {isSubmit ? "در حال ارسال..." : "ارسال"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
