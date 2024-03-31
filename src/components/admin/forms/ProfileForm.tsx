"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { userValidationSchema } from "@/lib/validation";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/backend/libs/actions/user.action";

// Define type for field names and placeholders
type FieldName =
  | "name"
  | "phone"
  | "bio"
  | "location"
  | "nationality"
  | "age"
  | "expertise"
  | "languages"
  | "profileImage"
  | "instagram"
  | "twitter"
  | "telegram"
  | "facebook";

type Placeholders = Record<FieldName, string>;

interface Props {
  clerkId: string;
  user: string;
}

const ProfileForm = ({ clerkId, user }: Props) => {
  const parsedUser = JSON.parse(user);
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Define your form.
  const form = useForm<z.infer<typeof userValidationSchema>>({
    resolver: zodResolver(userValidationSchema),
    defaultValues: {
      name: parsedUser.name || "",
      phone: parsedUser.phone || "",
      bio: parsedUser.bio || "",
      location: parsedUser.location || "",
      nationality: parsedUser.nationality || "",
      age: parsedUser.age || "",
      expertise: parsedUser.expertise || "",
      languages: parsedUser.languages || "",
      profileImage: parsedUser.profileImage || "",
      instagram: parsedUser.instagram || "",
      twitter: parsedUser.twitter || "",
      telegram: parsedUser.telegram || "",
      facebook: parsedUser.facebook || "",
    },
  });

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof userValidationSchema>) {
    setIsSubmit(true);
    try {
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          phone: values.phone,
          bio: values.bio,
          location: values.location,
          nationality: values.nationality,
          age: values.age,
          expertise: values.expertise,
          languages: values.languages,
          profileImage: values.profileImage,
          instagram: values.instagram,
          twitter: values.twitter,
          telegram: values.telegram,
          facebook: values.facebook,
        },
        path: pathname,
      });
      router.back();
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmit(false);
    }

    return toast({
      title: "تغییرات ثبت شد!",
      variant: !isSubmit ? "default" : "destructive",
    });
  }

  // Object to store field names and placeholders
  const placeholders: Placeholders = {
    name: "نام و نام خانوادگی",
    phone: "موبایل",
    bio: "بیوگرافی",
    location: "آدرس",
    nationality: "ملیت",
    age: "سن",
    expertise: "تخصص",
    languages: "زبان‌ها",
    profileImage: "تصویر پروفایل",
    instagram: "لینک اینستاگرام",
    twitter: "لینک توییتر",
    telegram: "لینک تلگرام",
    facebook: "لینک فیسبوک",
  };

  const fieldNames: FieldName[] = [
    "name",
    "phone",
    "bio",
    "location",
    "nationality",
    "age",
    "expertise",
    "languages",
    "profileImage",
    "instagram",
    "twitter",
    "telegram",
    "facebook",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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

export default ProfileForm;
