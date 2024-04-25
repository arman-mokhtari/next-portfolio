"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/backend/libs/actions/user.action";
import { contactEditSchema } from "@/lib/validation";
import SubmitButton from "../shared/SubmitButton";

type FieldName = "title" | "desc" | "metaTitle" | "metaDesc";

type Placeholders = Record<FieldName, string>;

interface Props {
  clerkId: string;
  user: string;
}

const ContactEditForm = ({ clerkId, user }: Props) => {
  const parsedUser = JSON.parse(user);
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof contactEditSchema>>({
    resolver: zodResolver(contactEditSchema),
    defaultValues: {
      title: parsedUser.contact?.title || "",
      desc: parsedUser.contact?.desc || "",
      metaTitle: parsedUser.contact?.metaTitle || "",
      metaDesc: parsedUser.contact?.metaDesc || "",
    },
  });

  const placeholders: Placeholders = {
    title: "تایتل",
    desc: "توضیحات",
    metaTitle: "متا تایتل",
    metaDesc: "توضیحات متا",
  };

  const fieldNames: FieldName[] = ["title", "desc", "metaTitle", "metaDesc"];

  const onSubmit = async (values: z.infer<typeof contactEditSchema>) => {
    setIsSubmit(true);
    const { title, desc, metaTitle, metaDesc } = values;
    try {
      await updateUser({
        clerkId,
        updateData: {
          contact: {
            title,
            desc,
            metaTitle,
            metaDesc,
          },
        },
        path: pathname,
      });
      router.push("/admin/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmit(false);
    }

    return toast({
      title: "تغییرات ثبت شد!",
      variant: !isSubmit ? "default" : "destructive",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {fieldNames.map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem className="flex-1 space-y-1" key={fieldName}>
                  <FormLabel className="paragraph-semibold text-dark400_light800 ">
                    {placeholders[fieldName]}
                  </FormLabel>
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
        <SubmitButton isSubmit={isSubmit} />
      </form>
    </Form>
  );
};

export default ContactEditForm;
