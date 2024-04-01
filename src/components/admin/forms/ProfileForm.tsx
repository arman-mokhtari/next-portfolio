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
  FormLabel,
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
  | "phone"
  | "bio"
  | "cv"
  | "location"
  | "nationality"
  | "age"
  | "expertise"
  | "languages"
  | "avatar"
  | "profileImage"
  | "status";

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
      phone: parsedUser.phone || "",
      bio: parsedUser.bio || "",
      cv: parsedUser.cv || "",
      location: parsedUser.location || "",
      nationality: parsedUser.nationality || "",
      age: parsedUser.age || "",
      expertise: parsedUser.expertise || "",
      languages: parsedUser.languages || "",
      avatar: parsedUser.avatar || "",
      profileImage: parsedUser.profileImage || "",
      status: parsedUser.status || "",
    },
  });

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof userValidationSchema>) {
    setIsSubmit(true);
    try {
      await updateUser({
        clerkId,
        updateData: values,
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
  }

  // Object to store field names and placeholders
  const placeholders: Placeholders = {
    phone: "موبایل",
    bio: "بیوگرافی",
    cv: "لینک رزومه",
    location: "آدرس",
    nationality: "ملیت",
    age: "سن",
    expertise: "تخصص",
    languages: "زبان‌ها",
    avatar: "تصویر آواتار",
    profileImage: "تصویر پروفایل",
    status: "وضعیت",
  };

  const fieldNames: FieldName[] = [
    "phone",
    "bio",
    "cv",
    "location",
    "nationality",
    "age",
    "expertise",
    "languages",
    "avatar",
    "profileImage",
    "status",
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
