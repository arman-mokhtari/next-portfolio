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
import SubmitButton from "../shared/SubmitButton";
import CustomTimePicker from "./TimePicker";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

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

  const form = useForm<z.infer<typeof resumeEditSchema>>({
    resolver: zodResolver(resumeEditSchema),
    defaultValues: {
      title: parsedUser.resume?.title || "",
      desc: parsedUser.resume?.desc || "",
      metaTitle: parsedUser.resume?.metaTitle || "",
      metaDesc: parsedUser.resume?.metaDesc || "",
      docDesc:
        parsedUser?.resumeItems
          ?.filter((item: any) => item.type === "degree")
          .map((item: any) => item.desc) || [],
      docDate:
        parsedUser?.resumeItems
          ?.filter((item: any) => item.type === "degree")
          .map((item: any) => item.date) || [],
      expDesc:
        parsedUser?.resumeItems
          ?.filter((item: any) => item.type === "experience")
          .map((item: any) => item.desc) || [],
      expDate:
        parsedUser?.resumeItems
          ?.filter((item: any) => item.type === "experience")
          .map((item: any) => item.date) || [],
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

      if (
        docDesc.length !== docDate.length ||
        expDesc.length !== expDate.length
      ) {
        throw new Error("باید برای هر عنوان یک تاریخ ثبت شود.");
      }

      const resumeItems = [
        ...docDesc.map((desc: string, index: number) => ({
          desc,
          date: docDate[index],
          type: "degree",
        })),
        ...expDesc.map((desc: string, index: number) => ({
          desc,
          date: expDate[index],
          type: "experience",
        })),
      ];

      const data = {
        clerkId,
        updateData: {
          resume: {
            title,
            desc,
            metaTitle,
            metaDesc,
          },
          resumeItems,
        },
        path: pathname,
      };

      await updateUser(data);
      router.push("/admin/dashboard");
      toast({
        title: "تغییرات ثبت شد!",
        variant: !isSubmit ? "default" : "destructive",
      });
    } catch (error: any) {
      console.error(error);

      toast({
        title: (error as Error).message || "خطا در ذخیره اطلاعات!",
        variant: "destructive",
      });
    } finally {
      setIsSubmit(false);
    }
  };

  const handleFieldChange = (
    e: KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const typedInput = e.target as HTMLInputElement;
      const typedValue = typedInput.value;

      if (typedValue !== "") {
        const isDateField = field.name.includes("Date");
        const newValue = Array.isArray(field.value) ? [...field.value] : [];

        if (isDateField) {
          newValue.push(typedValue);
          form.setValue(field.name, newValue);
        } else {
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
              name="docDesc"
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
                        onKeyDown={(e) => handleFieldChange(e, field)}
                      />
                      <FormMessage className="text-xs text-rose-600" />
                      {field.value.length > 0 && (
                        <div className="mt-2.5 flex flex-col items-start gap-2.5">
                          {field.value.map((tag: any, index: number) => (
                            <div className="flex w-full" key={index}>
                              <Input
                                className="background-light800_dark400  text-dark300_light700"
                                value={tag}
                                onChange={(e) => {
                                  const newValue = [...field.value].map(
                                    (value: string) => String(value)
                                  );
                                  newValue[index] = e.target.value; // Set the new value
                                  form.setValue(field.name, newValue);
                                }}
                              />

                              <Button
                                onClick={() =>
                                  handleTagAction(tag, field, true)
                                }
                                type="button"
                              >
                                <Trash2 className="size-4 text-red-600" />
                              </Button>
                            </div>
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
                    تاریخ دریافت مدرک تحصیلی
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <>
                      <CustomTimePicker
                        className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                        placeholder="تاریخ دریافت"
                        onChange={() => {}}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                          handleFieldChange(e, field)
                        }
                        form={form}
                      />
                      <FormMessage className="text-xs text-rose-600" />
                      {field.value.length > 0 && (
                        <div className="mt-2.5 flex flex-col items-start gap-2.5">
                          {field.value.map((tag: any, index: number) => (
                            <div className="flex w-full" key={index}>
                              <CustomTimePicker
                                className="background-light800_dark400 text-dark300_light700"
                                value={tag}
                                onChange={(newValue: string) => {
                                  const updatedTags = [...field.value];
                                  updatedTags[index] = newValue;
                                  form.setValue(field.name, updatedTags);
                                }}
                              />
                              <Button
                                onClick={() =>
                                  handleTagAction(tag, field, true)
                                }
                                type="button"
                              >
                                <Trash2 className="size-4 text-red-600" />
                              </Button>
                            </div>
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
              name="expDesc"
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
                        onKeyDown={(e) => handleFieldChange(e, field)}
                      />
                      <FormMessage className="text-xs text-rose-600" />
                      {field.value.length > 0 && (
                        <div className="mt-2.5 flex flex-col items-start gap-2.5">
                          {field.value.map((tag: any, index: number) => (
                            <div className="flex w-full" key={index}>
                              <Input
                                className="background-light800_dark400  text-dark300_light700"
                                value={tag}
                                onChange={(e) => {
                                  const newValue = [...field.value].map(
                                    (value: string) => String(value)
                                  );
                                  newValue[index] = e.target.value; // Set the new value
                                  form.setValue(field.name, newValue);
                                }}
                              />

                              <Button
                                onClick={() =>
                                  handleTagAction(tag, field, true)
                                }
                                type="button"
                              >
                                <Trash2 className="size-4 text-red-600" />
                              </Button>
                            </div>
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
                    حدود زمانی تجربه کاری
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <>
                      <CustomTimePicker
                        className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                        placeholder="محدوده زمانی"
                        onChange={() => {}}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                          handleFieldChange(e, field)
                        }
                        form={form}
                      />
                      <FormMessage className="text-xs text-rose-600" />
                      {field.value.length > 0 && (
                        <div className="mt-2.5 flex flex-col items-start gap-2.5">
                          {field.value.map((tag: any, index: number) => (
                            <div className="flex w-full" key={index}>
                              <CustomTimePicker
                                className="background-light800_dark400 text-dark300_light700"
                                value={tag}
                                onChange={(newValue: string) => {
                                  const updatedTags = [...field.value];
                                  updatedTags[index] = newValue;
                                  form.setValue(field.name, updatedTags);
                                }}
                              />
                              <Button
                                onClick={() =>
                                  handleTagAction(tag, field, true)
                                }
                                type="button"
                              >
                                <Trash2 className="size-4 text-red-600" />
                              </Button>
                            </div>
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
              توجه داشته باشید بابت هر عنوان باید تاریخ وارد شود.
            </p>
          </div>
        </div>

        <SubmitButton isSubmit={isSubmit} />
      </form>
    </Form>
  );
};

export default SkillsEditForm;
