"use client";

import React, { KeyboardEvent, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/backend/libs/actions/user.action";
import { homeEditSchema } from "@/lib/validation";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

type FieldName = "title" | "desc" | "metaTitle" | "metaDesk";

type Placeholders = Record<FieldName, string>;

interface Props {
  clerkId: string;
  user: string;
}

const HomeEditForm = ({ clerkId, user }: Props) => {
  const parsedUser = JSON.parse(user);
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof homeEditSchema>>({
    resolver: zodResolver(homeEditSchema),
    defaultValues: {
      title: parsedUser.home?.title || "",
      desc: parsedUser.home?.desc || "",
      metaTitle: parsedUser.home?.metaTitle || "",
      metaDesk: parsedUser.home?.metaDesk || "",
      typed: parsedUser.typed || "",
    },
  });

  const placeholders: Placeholders = {
    title: "تایتل",
    desc: "توضیحات",
    metaTitle: "متا تایتل",
    metaDesk: "توضیحات متا",
  };

  const fieldNames: FieldName[] = ["title", "desc", "metaTitle", "metaDesk"];

  const onSubmit = async (values: z.infer<typeof homeEditSchema>) => {
    setIsSubmit(true);
    const { typed, title, desc, metaTitle, metaDesk } = values;
    try {
      await updateUser({
        clerkId,
        updateData: {
          typed,
          home: {
            title,
            desc,
            metaTitle,
            metaDesk,
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

  const handleTypedChange = (
    e: KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const typedInput = e.target as HTMLInputElement;
      const typedValue = typedInput.value;

      if (typedValue !== "") {
        if (typedValue.length > 70) {
          return form.setError("typed", {
            type: "required",
            message: "آیتم‌ نباید بیشتر از 70 کاراکتر باشد",
          });
        }

        if (typedValue.length < 10) {
          return form.setError("typed", {
            type: "required",
            message: "آیتم نباید کمتر از 10 کاراکتر باشد",
          });
        }

        if (!field.value.includes(typedValue as never)) {
          const newValue = [...field.value, typedValue];
          form.setValue("typed", newValue);
        }
      } else {
        form.trigger();
      }
      typedInput.value = "";
    }
  };

  const handleTagAction = (tag: string, field: any, isRemove: boolean) => {
    const newValue = isRemove
      ? field.value.filter((t: string) => t !== tag)
      : [...field.value, tag];
    form.setValue("typed", newValue);
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

        <FormField
          control={form.control}
          name="typed"
          render={({ field }) => (
            <FormItem className="mt-6 flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                متن در حال تایپ صفحه نخست
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                    placeholder="متن در حال تایپ صفحه نخست"
                    onKeyDown={(e) => handleTypedChange(e, field)}
                  />
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    متن را تایپ کرده و سپس کلید Enter را بفشارید و برای اضافه
                    کردن متن‌های بیشتر این پروسه را تکرار نمایید.
                  </FormDescription>
                  <FormMessage className="text-xs text-rose-600" />
                  {field.value.length > 0 && (
                    <div className="mt-2.5 flex flex-col items-start gap-2.5">
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2"
                          onClick={() => handleTagAction(tag, field, true)}
                        >
                          {tag}

                          <Image
                            src="/assets/icons/close.svg"
                            alt="Close icon"
                            width={12}
                            height={12}
                            className="cursor-pointer object-contain invert-0 dark:invert"
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="hover-gradient mt-4 min-h-[46px] min-w-[140px] rounded-full px-4 py-3 text-base !text-light-900 shadow-lg shadow-slate-400 active:shadow-md dark:shadow-none"
          type="submit"
          disabled={isSubmit}
        >
          {isSubmit ? "در حال ثبت..." : "ثبت"}
        </Button>
      </form>
    </Form>
  );
};

export default HomeEditForm;
