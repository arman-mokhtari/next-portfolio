"use client";

import { useState } from "react";
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
import { aboutEditSchema } from "@/lib/validation";
import { Checkbox } from "@/components/ui/checkbox";
import Bubble from "@/components/shared/Bubble";
import SubmitButton from "../shared/SubmitButton";

type FieldName = "title" | "desc" | "metaTitle" | "metaDesc" | "profileImage";

type Placeholders = Record<FieldName, string>;

interface Props {
  clerkId: string;
  user: string;
}

const AboutEditForm = ({ clerkId, user }: Props) => {
  const parsedUser = JSON.parse(user);
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof aboutEditSchema>>({
    resolver: zodResolver(aboutEditSchema),
    defaultValues: {
      title: parsedUser.about?.title || "",
      desc: parsedUser.about?.desc || "",
      metaTitle: parsedUser.about?.metaTitle || "",
      metaDesc: parsedUser.about?.metaDesc || "",
      profileImage: parsedUser.profileImage || "",
      isTopBubble: parsedUser.about?.isTopBubble || true,
      topBubble: parsedUser.about?.topBubble || "",
    },
  });

  const placeholders: Placeholders = {
    title: "تایتل",
    desc: "توضیحات",
    metaTitle: "متا تایتل",
    metaDesc: "توضیحات متا",
    profileImage: "لینک تصویر",
  };

  const fieldNames: FieldName[] = [
    "title",
    "desc",
    "metaTitle",
    "metaDesc",
    "profileImage",
  ];

  const onSubmit = async (values: z.infer<typeof aboutEditSchema>) => {
    setIsSubmit(true);
    const {
      isTopBubble,
      topBubble,
      title,
      desc,
      metaTitle,
      metaDesc,
      profileImage,
    } = values;
    try {
      await updateUser({
        clerkId,
        updateData: {
          profileImage,
          about: {
            title,
            desc,
            metaTitle,
            metaDesc,
            isTopBubble,
            topBubble,
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
        <div className="light-border-2 mt-6 space-y-4 rounded-md border p-4">
          <FormField
            control={form.control}
            name="isTopBubble"
            render={({ field }) => (
              <FormItem className="text-dark400_light800 flex flex-col items-start space-x-3 space-y-2 ">
                <FormLabel>
                  <Bubble
                    otherClasses="after:left-[88%]"
                    text="حباب آبی رنگ بالای نام"
                  />
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="leading-none">
                  <FormDescription>
                    در صورت تمایل به وجود حباب در قسمت بالای نام، فیلد بالا را
                    تایید کنید.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="topBubble"
            render={({ field }) => (
              <FormItem className="space-y-1 sm:w-1/2">
                <FormLabel className="paragraph-semibold text-dark400_light800 ">
                  متن درون حباب
                </FormLabel>
                <FormControl>
                  <Input
                    className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                    placeholder="متن درون حباب"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-rose-600" />
              </FormItem>
            )}
          />
        </div>

        <p className="text-dark400_light800 mt-3 text-sm">
          برخی از اطلاعات صفحه درباره من با اطلاعات پروفایل مشترک هستند، برای
          تغییر آنها به تنظیمات پروفایل مراجعه کنید.
        </p>

        <SubmitButton isSubmit={isSubmit} />
      </form>
    </Form>
  );
};

export default AboutEditForm;
