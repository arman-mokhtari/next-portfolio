"use client";

import React, { KeyboardEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { skillsEditSchema } from "@/lib/validation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

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

  const form = useForm<z.infer<typeof skillsEditSchema>>({
    resolver: zodResolver(skillsEditSchema),
    defaultValues: {
      title: parsedUser.skills?.title || "",
      desc: parsedUser.skills?.desc || "",
      metaTitle: parsedUser.skills?.metaTitle || "",
      metaDesk: parsedUser.skills?.metaDesk || "",
      proTitle: parsedUser.skills?.proTitle || "",
      proNumber: parsedUser.skills?.proNumber || 0,
      publicTitle: parsedUser.skills?.publicTitle || "",
      publicNumber: parsedUser.skills?.publicNumber || 0,
    },
  });

  const placeholders: Placeholders = {
    title: "تایتل",
    desc: "توضیحات",
    metaTitle: "متا تایتل",
    metaDesk: "توضیحات متا",
  };

  const fieldNames: FieldName[] = ["title", "desc", "metaTitle", "metaDesk"];

  const onSubmit = async (values: z.infer<typeof skillsEditSchema>) => {
    setIsSubmit(true);
    const {
      title,
      desc,
      metaTitle,
      metaDesk,
      proTitle,
      proNumber,
      publicTitle,
      publicNumber,
    } = values;
    try {
      console.log("values: ", values);
      await updateUser({
        clerkId,
        updateData: {
          title,
          desc,
          metaTitle,
          metaDesk,
          skillsItem: {
            proTitle,
            proNumber,
            publicTitle,
            publicNumber,
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

  const handleProTitleChange = (
    e: KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const typedInput = e.target as HTMLInputElement;
      const typedValue = typedInput.value;

      if (typedValue !== "") {
        if (typedValue.length > 70) {
          return form.setError("proTitle", {
            type: "required",
            message: "آیتم‌ نباید بیشتر از 70 کاراکتر باشد",
          });
        }

        if (typedValue.length < 10) {
          return form.setError("proTitle", {
            type: "required",
            message: "آیتم نباید کمتر از 10 کاراکتر باشد",
          });
        }

        // Ensure field.value is always an array before calling includes
        const newValue = Array.isArray(field.value) ? field.value : [];
        if (!newValue.includes(typedValue as never)) {
          newValue.push(typedValue);
          form.setValue("proTitle", newValue);
        }
      } else {
        form.trigger();
      }
      typedInput.value = "";
    }
  };

  const handleProNumberChange = (
    e: KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const typedInput = e.target as HTMLInputElement;
      const typedValue = parseInt(typedInput.value);

      if (!isNaN(typedValue)) {
        if (typedValue > 100) {
          return form.setError("proNumber", {
            type: "required",
            message: "آیتم‌ نباید بیشتر از 100 باشد",
          });
        }

        // Ensure field.value is always an array before calling includes
        const newValue = Array.isArray(field.value) ? field.value : [];
        if (!newValue.includes(typedValue as never)) {
          newValue.push(typedValue);
          form.setValue("proNumber", newValue);
        }
      } else {
        form.trigger();
      }
      typedInput.value = "";
    }
  };

  const handlePublicTitleChange = (
    e: KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const typedInput = e.target as HTMLInputElement;
      const typedValue = typedInput.value;

      if (typedValue !== "") {
        if (typedValue.length > 70) {
          return form.setError("publicTitle", {
            type: "required",
            message: "آیتم‌ نباید بیشتر از 70 کاراکتر باشد",
          });
        }

        if (typedValue.length < 1) {
          return form.setError("publicTitle", {
            type: "required",
            message: "آیتم را وارد کنید",
          });
        }

        // Ensure field.value is always an array before calling includes
        const newValue = Array.isArray(field.value) ? field.value : [];
        if (!newValue.includes(typedValue as never)) {
          newValue.push(typedValue);
          form.setValue("publicTitle", newValue);
        }
      } else {
        form.trigger();
      }
      typedInput.value = "";
    }
  };

  const handlePublicNumberChange = (
    e: KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const typedInput = e.target as HTMLInputElement;
      const typedValue = parseInt(typedInput.value);

      if (!isNaN(typedValue)) {
        if (typedValue > 100) {
          return form.setError("publicNumber", {
            type: "required",
            message: "آیتم‌ نباید بیشتر از 100 باشد",
          });
        }

        // Ensure field.value is always an array before calling includes
        const newValue = Array.isArray(field.value) ? field.value : [];
        if (!newValue.includes(typedValue as never)) {
          newValue.push(typedValue);
          form.setValue("publicNumber", newValue);
        }
      } else {
        form.trigger();
      }
      typedInput.value = "";
    }
  };

  const handleProTitleTagAction = (
    tag: string,
    field: any,
    isRemove: boolean
  ) => {
    const newValue = isRemove
      ? field.value.filter((t: string) => t !== tag)
      : [...field.value, tag];
    form.setValue("proTitle", newValue);
  };
  const handleProNumberTagAction = (
    tag: string,
    field: any,
    isRemove: boolean
  ) => {
    const newValue = isRemove
      ? field.value.filter((t: string) => t !== tag)
      : [...field.value, tag];
    form.setValue("proNumber", newValue);
  };
  const handlePublicTitleTagAction = (
    tag: string,
    field: any,
    isRemove: boolean
  ) => {
    const newValue = isRemove
      ? field.value.filter((t: string) => t !== tag)
      : [...field.value, tag];
    form.setValue("publicTitle", newValue);
  };
  const handlePublicNumberTagAction = (
    tag: string,
    field: any,
    isRemove: boolean
  ) => {
    const newValue = isRemove
      ? field.value.filter((t: string) => t !== tag)
      : [...field.value, tag];
    form.setValue("publicNumber", newValue);
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

        <div className="light-border-2 mt-6 flex flex-col gap-4 space-y-4 rounded-md border p-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="proTitle"
              render={({ field }) => (
                <FormItem className="mt-6 flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    عنوان مهارت تخصصی
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <>
                      <Input
                        className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                        placeholder="عنوان مهارت تخصصی"
                        onKeyDown={(e) => handleProTitleChange(e, field)}
                      />
                      <FormMessage className="text-xs text-rose-600" />
                      {field.value.length > 0 && (
                        <div className="mt-2.5 flex flex-col items-start gap-2.5">
                          {field.value.map((tag: any) => (
                            <Badge
                              key={tag}
                              className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2"
                              onClick={() =>
                                handleProTitleTagAction(tag, field, true)
                              }
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
            <FormField
              control={form.control}
              name="proNumber"
              render={({ field }) => (
                <FormItem className="mt-6 flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    میزان مهارت تخصصی
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <>
                      <Input
                        type="number"
                        className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                        placeholder="میزان مهارت بین 0 تا 100"
                        onKeyDown={(e) => handleProNumberChange(e, field)}
                      />
                      <FormMessage className="text-xs text-rose-600" />
                      {field.value.length > 0 && (
                        <div className="mt-2.5 flex flex-col items-start gap-2.5">
                          {field.value.map((tag: any) => (
                            <Badge
                              key={tag}
                              className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2"
                              onClick={() =>
                                handleProNumberTagAction(tag, field, true)
                              }
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="publicTitle"
              render={({ field }) => (
                <FormItem className="mt-6 flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    عنوان مهارت عمومی
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <>
                      <Input
                        className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                        placeholder="عنوان مهارت عمومی"
                        onKeyDown={(e) => handlePublicTitleChange(e, field)}
                      />
                      <FormMessage className="text-xs text-rose-600" />
                      {field.value.length > 0 && (
                        <div className="mt-2.5 flex flex-col items-start gap-2.5">
                          {field.value.map((tag: any) => (
                            <Badge
                              key={tag}
                              className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2"
                              onClick={() =>
                                handlePublicTitleTagAction(tag, field, true)
                              }
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
            <FormField
              control={form.control}
              name="publicNumber"
              render={({ field }) => (
                <FormItem className="mt-6 flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    میزان مهارت تخصصی
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <>
                      <Input
                        type="number"
                        className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                        placeholder="میزان مهارت بین 0 تا 100"
                        onKeyDown={(e) => handlePublicNumberChange(e, field)}
                      />
                      <FormMessage className="text-xs text-rose-600" />
                      {field.value.length > 0 && (
                        <div className="mt-2.5 flex flex-col items-start gap-2.5">
                          {field.value.map((tag: any) => (
                            <Badge
                              key={tag}
                              className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2"
                              onClick={() =>
                                handlePublicNumberTagAction(tag, field, true)
                              }
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
          </div>

          <p className="body-regular mt-2.5 text-light-500">
            در فیلدهای بالا مقدار را تایپ کرده و سپس کلید Enter را بفشارید و
            برای اضافه کردن متن‌های بیشتر این پروسه را تکرار نمایید.
          </p>
        </div>

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
