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
import { sidebarSettingsSchema } from "@/lib/validation";
import SubmitButton from "../shared/SubmitButton";
import { Checkbox } from "@/components/ui/checkbox";

type FieldName = "instagram" | "twitter" | "telegram" | "facebook";

type Placeholders = Record<FieldName, string>;

interface Props {
  clerkId: string;
  user: string;
}

const SidebarSettingsForm = ({ clerkId, user }: Props) => {
  const parsedUser = JSON.parse(user);
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof sidebarSettingsSchema>>({
    resolver: zodResolver(sidebarSettingsSchema),
    defaultValues: {
      instagram: parsedUser.socials?.instagram?.href || "",
      twitter: parsedUser.socials?.twitter?.href || "",
      telegram: parsedUser.socials?.telegram?.href || "",
      facebook: parsedUser.socials?.facebook?.href || "",
      isDisplayInstagram: parsedUser.socials?.instagram?.isDisplay || true,
      isDisplayTwitter: parsedUser.socials?.twitter?.isDisplay || true,
      isDisplayTelegram: parsedUser.socials?.telegram?.isDisplay || true,
      isDisplayFacebook: parsedUser.socials?.facebook?.isDisplay || true,
    },
  });

  const placeholders: Placeholders = {
    instagram: "لینک اینستاگرام",
    twitter: "لینک توییتر",
    telegram: "لینک تلگرام",
    facebook: "لینک فیسبوک",
  };

  const fieldNames: FieldName[] = [
    "instagram",
    "twitter",
    "telegram",
    "facebook",
  ];

  const onSubmit = async (values: z.infer<typeof sidebarSettingsSchema>) => {
    setIsSubmit(true);
    try {
      await updateUser({
        clerkId,
        updateData: {
          socials: {
            instagram: {
              href: values.instagram,
              isDisplay: values.isDisplayInstagram,
            },
            twitter: {
              href: values.twitter,
              isDisplay: values.isDisplayTwitter,
            },
            telegram: {
              href: values.telegram,
              isDisplay: values.isDisplayTelegram,
            },
            facebook: {
              href: values.facebook,
              isDisplay: values.isDisplayFacebook,
            },
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fieldNames.map((fieldName) => (
            <div
              key={fieldName}
              className="light-border-2 mt-6 space-y-6 rounded-md border p-4"
            >
              <FormField
                control={form.control}
                name={
                  fieldName as "instagram" | "twitter" | "telegram" | "facebook"
                }
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
              <FormField
                control={form.control}
                name={
                  `isDisplay${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}` as
                    | "isDisplayInstagram"
                    | "isDisplayTwitter"
                    | "isDisplayTelegram"
                    | "isDisplayFacebook"
                }
                render={({ field }) => (
                  <FormItem className="text-dark400_light800 flex flex-col items-start space-x-3 space-y-1 ">
                    <FormLabel>
                      در صورت تمایل برای نمایش {placeholders[fieldName]} فیلد
                      زیر را تایید کنید.
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={!!field.value} // ensure boolean value
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
        <SubmitButton isSubmit={isSubmit} />
      </form>
    </Form>
  );
};

export default SidebarSettingsForm;
