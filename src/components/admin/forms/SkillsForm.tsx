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
import { skillsEditSchema } from "@/lib/validation";
import { Trash2 } from "lucide-react";
import SubmitButton from "../shared/SubmitButton";
import { Button } from "@/components/ui/button";

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

  const proSkills = parsedUser?.skillsItem?.filter(
    (item: any) => item.type === "pro"
  );
  const publicSkills = parsedUser?.skillsItem?.filter(
    (item: any) => item.type === "public"
  );

  const groupedProTitle = proSkills?.map((item: any) => item.title);
  const groupedPublicTitle = publicSkills?.map((item: any) => item.title);

  const form = useForm<z.infer<typeof skillsEditSchema>>({
    resolver: zodResolver(skillsEditSchema),
    defaultValues: {
      title: parsedUser.skills?.title || "",
      desc: parsedUser.skills?.desc || "",
      metaTitle: parsedUser.skills?.metaTitle || "",
      metaDesc: parsedUser.skills?.metaDesc || "",
      proTitle: groupedProTitle || [],
      publicTitle: groupedPublicTitle || [],
    },
  });

  const placeholders: Placeholders = {
    title: "تایتل",
    desc: "توضیحات",
    metaTitle: "متا تایتل",
    metaDesc: "توضیحات متا",
  };

  const fieldNames: FieldName[] = ["title", "desc", "metaTitle", "metaDesc"];

  const onSubmit = async (values: z.infer<typeof skillsEditSchema>) => {
    setIsSubmit(true);

    try {
      const { title, desc, metaTitle, metaDesc, proTitle, publicTitle } =
        values;

      // Define the type for skillsItem
      type SkillsItem = {
        title: string;
        type: string;
      };

      // Update the type of updateData.skillsItem
      const data: {
        clerkId: string;
        updateData: {
          skills: {
            title: string;
            desc: string;
            metaTitle: string;
            metaDesc: string;
          };
          skillsItem: SkillsItem[]; // Explicitly define the type as SkillsItem[]
        };
        path: string;
      } = {
        clerkId,
        updateData: {
          skills: {
            title,
            desc,
            metaTitle,
            metaDesc,
          },
          skillsItem: [], // Initialize as an empty array
        },
        path: pathname,
      };

      // Populate skillsItem array with professional skills
      for (let i = 0; i < proTitle.length; i++) {
        const skillItem: SkillsItem = {
          title: proTitle[i] || "عنوان & 0",
          type: "pro",
        };
        data.updateData.skillsItem.push(skillItem);
      }

      // Populate skillsItem array with public skills
      for (let i = 0; i < publicTitle.length; i++) {
        const skillItem: SkillsItem = {
          title: publicTitle[i] || "عنوان & 0",
          type: "public",
        };
        data.updateData.skillsItem.push(skillItem);
      }

      // Send data to the backend
      await updateUser(data);

      // Redirect to the dashboard after successful submission
      router.push("/admin/dashboard");

      // Show success message to the user
      toast({
        title: "تغییرات ثبت شد!",
        variant: !isSubmit ? "default" : "destructive",
      });
    } catch (error) {
      console.error(error);

      // Handle errors gracefully, inform the user about the error
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
        const newValue = Array.isArray(field.value) ? [...field.value] : [];
        // Check if the field is a number field
        const maxLength = 100;
        const minLength = 5;

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

        if (!typedValue.includes("&")) {
          return form.setError(field.name, {
            type: "required",
            message:
              "ابتدا باید عنوان مهارت سپس علامت & و بعد میزان عددی مهارت بین 0 تا 100 را وارد کنید",
          });
        }
        const numberValue = Number(typedValue.split("&")[1]);
        if (numberValue > 100 || numberValue < 0) {
          return form.setError(field.name, {
            type: "required",
            message: "میزان عددی مهارت باید بین 0 تا 100 باشد",
          });
        }

        // Push the value to the array
        newValue.push(typedValue);
        form.setValue(field.name, newValue);
      } else {
        // Trigger validation for empty input
        form.trigger();
      }
      // Clear the input after handling the value
      typedInput.value = "";
    }
  };

  const handleTagAction = (tag: string, field: any, isRemove: boolean) => {
    const newValue = isRemove
      ? field.value.filter((t: string) => t !== tag)
      : [...field.value, tag];
    form.setValue(field.name, newValue);
  };

  const skillFields = [
    { title: "عنوان و مهارت تخصصی", name: "proTitle" as const, type: "text" },
    {
      title: "عنوان و مهارت عمومی",
      name: "publicTitle" as const,
      type: "text",
    },
  ];

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
            {skillFields.map(({ title, name, type }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem className="mt-6 flex w-full flex-col">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                      {title}
                    </FormLabel>
                    <FormControl className="mt-3.5">
                      <>
                        <Input
                          type={type}
                          className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                          placeholder={title}
                          onKeyDown={(e) => handleFieldChange(e, field, name)}
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
            ))}
          </div>

          <div>
            <p className="body-regular text-light-500">
            <span className="ml-1 text-rose-500">*</span>
            در فیلدهای بالا ابتدا نام مهارت سپس علامت & و سپس مقدار عددی مهارت را مشابه نمونه &quot;فتوشاپ & 85&quot; وارد کنید و سپس کلید Enter را بفشارید و برای اضافه کردن موارد بیشتر این پروسه را تکرار نمایید.
            </p>
          </div>
        </div>

        <SubmitButton isSubmit={isSubmit} />
      </form>
    </Form>
  );
};

export default SkillsEditForm;
