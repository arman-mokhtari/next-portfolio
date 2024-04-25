"use client";

import React, { KeyboardEvent, useState } from "react";
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
import { resumeEditSchema } from "@/lib/validation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import SubmitButton from "../shared/SubmitButton";
import CustomTimePicker from "./TimePicker";

type FieldName = "title" | "desc" | "metaTitle" | "metaDesc";
type Placeholders = Record<FieldName, string>;

interface Props {
  clerkId: string;
  user: string;
}

const SkillsEditForm = ({ clerkId, user }: Props) => {
  const parsedUser = JSON.parse(user);
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const doc = parsedUser?.resumeItems?.filter(
    (item: any) => item.type === "degree"
  );
  const exp = parsedUser?.resumeItems?.filter(
    (item: any) => item.type === "experience"
  );

  const groupedDocDesc = doc?.map((item: any) => item.desc);
  const groupedDocDate = doc?.map((item: any) => item.date);
  const groupedExpDesc = exp?.map((item: any) => item.desc);
  const groupedExpDate = exp?.map((item: any) => item.date);

  const form = useForm<z.infer<typeof resumeEditSchema>>({
    resolver: zodResolver(resumeEditSchema),
    defaultValues: {
      title: parsedUser.resume?.title || "",
      desc: parsedUser.resume?.desc || "",
      metaTitle: parsedUser.resume?.metaTitle || "",
      metaDesc: parsedUser.resume?.metaDesc || "",
      docDesc: groupedDocDesc || [],
      docDate: groupedDocDate || [],
      expDesc: groupedExpDesc || [],
      expDate: groupedExpDate || [],
    },
  });

  const placeholders: Placeholders = {
    title: "تایتل",
    desc: "توضیحات",
    metaTitle: "متا تایتل",
    metaDesc: "توضیحات متا",
  };

  const fieldNames: FieldName[] = ["title", "desc", "metaTitle", "metaDesc"];

  const onSubmit = async (values: z.infer<typeof resumeEditSchema>) => {
    setIsSubmit(true);

    try {
      const {
        title,
        desc,
        metaTitle,
        metaDesc,
        docDesc,
        docDate,
        expDesc,
        expDate,
      } = values;

      type resumeItems = {
        desc: string;
        date: any;
        type: string;
      };

      const data: {
        clerkId: string;
        updateData: {
          resume: {
            title: string;
            desc: string;
            metaTitle: string;
            metaDesc: string;
          };
          resumeItems: resumeItems[]; // Explicitly define the type as SkillsItem[]
        };
        path: string;
      } = {
        clerkId,
        updateData: {
          resume: {
            title,
            desc,
            metaTitle,
            metaDesc,
          },
          resumeItems: [], // Initialize as an empty array
        },
        path: pathname,
      };

      for (let i = 0; i < expDesc.length; i++) {
        const resumeItems: resumeItems = {
          desc: expDesc[i] || "عنوان",
          date: expDate[i] || new Date(),
          type: "degree",
        };
        data.updateData.resumeItems.push(resumeItems);
      }

      for (let i = 0; i < docDesc.length; i++) {
        const resumeItems: resumeItems = {
          desc: docDesc[i] || "عنوان",
          date: docDate[i] || new Date(),
          type: "experience",
        };
        data.updateData.resumeItems.push(resumeItems);
      }
      await updateUser(data);
      router.push("/admin/dashboard");
      toast({
        title: "تغییرات ثبت شد!",
        variant: !isSubmit ? "default" : "destructive",
      });
    } catch (error) {
      console.error(error);

      toast({
        title: "خطا در ذخیره اطلاعات!",
        variant: "destructive",
      });
    } finally {
      setIsSubmit(false);
    }
  };

  const handleFieldChange = (
    e: KeyboardEvent<HTMLInputElement>,
    field: any,
    type: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const typedInput = e.target as HTMLInputElement;
      const typedValue = typedInput.value;

      if (typedValue !== "") {
        const isDateField = field.name.includes("Date");
        const newValue = Array.isArray(field.value) ? [...field.value] : [];

        if (isDateField) {
          // Check if the entered value can be parsed as a valid date
          // const parsedDate = new Date(typedValue);

          newValue.push(typedValue);
          form.setValue(field.name, newValue);
        } else {
          // Handle non-date fields
          const maxLength = 400;
          const minLength = 1;

          if (typedValue.length > maxLength) {
            return form.setError(field.name, {
              type: "required",
              message: `آیتم‌ نباید بیشتر از ${maxLength} کاراکتر باشد`,
            });
          }

          if (typedValue.length < minLength) {
            return form.setError(field.name, {
              type: "required",
              message: `آیتم نباید کمتر از ${minLength} کاراکتر باشد`,
            });
          }

          newValue.push(typedValue);
          form.setValue(field.name, newValue);
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
    form.setValue(field.name, newValue);
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
              name="expDesc"
              render={({ field }) => (
                <FormItem className="mt-6 flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    عنوان مدرک تحصیلی
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <>
                      <Input
                        className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                        placeholder="عنوان مدرک تحصیلی"
                        onKeyDown={(e) => handleFieldChange(e, field, "pro")}
                      />
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
            <FormField
              control={form.control}
              name="expDate"
              render={({ field }) => (
                <FormItem className="mt-6 flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    تاریخ دریافت مدرک تحصیلی
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <>
                      <CustomTimePicker
                        className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                        placeholder="تاریخ دریافت"
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                          handleFieldChange(e, field, "Date")
                        }
                        form={form}
                      />
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="docDesc"
              render={({ field }) => (
                <FormItem className="mt-6 flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    عنوان تجربه کاری
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <>
                      <Input
                        className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                        placeholder="عنوان تجربه کاری"
                        onKeyDown={(e) => handleFieldChange(e, field, "pro")}
                      />
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
            <FormField
              control={form.control}
              name="docDate"
              render={({ field }) => (
                <FormItem className="mt-6 flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    حدود زمانی تجربه کاری
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <>
                      <CustomTimePicker
                        className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                        placeholder="محدوده زمانی"
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                          handleFieldChange(e, field, "Date")
                        }
                        form={form}
                      />
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
          </div>
          <div>
            <p className="body-regular text-light-500">
              در فیلدهای بالا مقدار را تایپ کرده و سپس کلید Enter را بفشارید و
              برای اضافه کردن متن‌های بیشتر این پروسه را تکرار نمایید.
            </p>
            <p className="body-regular mt-1 text-light-500">
              <span className="text-rose-500">* </span>
              توجه داشته باشید بابت هر عنوان باید مقدار مهارت وارد شود و بلعکس
              در غیر اینصورت مقادیر از پیش تایید شده جایگزین خواهند شد.
            </p>
          </div>
        </div>

        <SubmitButton isSubmit={isSubmit} />
      </form>
    </Form>
  );
};

export default SkillsEditForm;
