"use client";

import React, { KeyboardEvent, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { activitiesEditSchema } from "@/lib/validation";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import SubmitButton from "../shared/SubmitButton";

type FieldName = "title" | "desc" | "metaTitle" | "metaDesc";

type Placeholders = Record<FieldName, string>;

interface Props {
  clerkId: string;
  user: string;
}

const ActivitiesEditForm = ({ clerkId, user }: Props) => {
  const parsedUser = JSON.parse(user);
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof activitiesEditSchema>>({
    resolver: zodResolver(activitiesEditSchema),
    defaultValues: {
      title: parsedUser.activities?.title || "",
      desc: parsedUser.activities?.desc || "",
      metaTitle: parsedUser.activities?.metaTitle || "",
      metaDesc: parsedUser.activities?.metaDesc || "",
      activityLinks: parsedUser.activities?.activityLinks || "",
    },
  });

  const placeholders: Placeholders = {
    title: "تایتل",
    desc: "توضیحات",
    metaTitle: "متا تایتل",
    metaDesc: "توضیحات متا",
  };

  const fieldNames: FieldName[] = ["title", "desc", "metaTitle", "metaDesc"];

  const onSubmit = async (values: z.infer<typeof activitiesEditSchema>) => {
    setIsSubmit(true);
    const { activityLinks, title, desc, metaTitle, metaDesc } = values;
    try {
      await updateUser({
        clerkId,
        updateData: {
          activities: {
            title,
            desc,
            metaTitle,
            metaDesc,
            activityLinks,
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
        if (!field.value.includes(typedValue as never)) {
          const newValue = [...field.value, typedValue];
          form.setValue("activityLinks", newValue);
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
    form.setValue("activityLinks", newValue);
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
          name="activityLinks"
          render={({ field }) => (
            <FormItem className="mt-6 flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                لینک تصویر پروژه‌ها
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                    placeholder="لینک تصویر پروژه"
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
        <SubmitButton isSubmit={isSubmit} />
      </form>
    </Form>
  );
};

export default ActivitiesEditForm;
