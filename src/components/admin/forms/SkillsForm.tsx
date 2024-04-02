"use client";

import React, { useState } from "react";
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
import BlueButton from "@/components/shared/BlueButton";

type FieldName = "title" | "desc" | "metaTitle" | "metaDesk";
type Placeholders = Record<FieldName, string>;

interface Props {
  clerkId: string;
  user: string;
}

const HomeEditForm = ({ clerkId, user }: Props) => {
  const parsedUser = JSON.parse(user);
  const [publicSkill, setPublicSkill] = useState("");
  const [publicSkillNumber, setPublicSkillNumber] = useState("");
  const [proSkill, setProSkill] = useState("");
  const [proSkillNumber, setProSkillNumber] = useState("");
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
      skillsItem: {
        public: parsedUser.skills?.skillsItem?.public || [],
        pro: parsedUser.skills?.skillsItem?.pro || [],
      },
    },
  });

  const placeholders: Placeholders = {
    title: "تایتل",
    desc: "توضیحات",
    metaTitle: "متا تایتل",
    metaDesk: "توضیحات متا",
  };

  const fieldNames: FieldName[] = ["title", "desc", "metaTitle", "metaDesk"];

  const handlePublicSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicSkill(e.target.value);
  };

  const handlePublicSkillNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPublicSkillNumber(e.target.value);
  };

  const handleProSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProSkill(e.target.value);
  };

  const handleProSkillNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProSkillNumber(e.target.value);
  };

  const handleAddPublicSkill = () => {
    // Add the public skill to the form data
    form.setValue("skillsItem.public", [
      ...form.getValues().skillsItem.public,
      { title: publicSkill, number: parseInt(publicSkillNumber) || 0 },
    ]);
    // Clear input fields
    setPublicSkill("");
    setPublicSkillNumber("");
  };

  const handleAddProSkill = () => {
    // Add the pro skill to the form data
    form.setValue("skillsItem.pro", [
      ...form.getValues().skillsItem.pro,
      { title: proSkill, number: parseInt(proSkillNumber) || 0 },
    ]);
    // Clear input fields
    setProSkill("");
    setProSkillNumber("");
  };

  const onSubmit = async (values: z.infer<typeof skillsEditSchema>) => {
    setIsSubmit(true);
    try {
      await updateUser({
        clerkId,
        updateData: {
          skills: values,
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

        {/* Input for Public Skills */}
        <div className="light-border-2 mt-6 flex flex-col gap-4 space-y-4 rounded-md border p-4">
          <div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                placeholder="مهارت عمومی"
                value={publicSkill}
                onChange={handlePublicSkillChange}
              />
              <Input
                className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                placeholder="میزان مهارت عمومی"
                type="number"
                value={publicSkillNumber}
                onChange={handlePublicSkillNumberChange}
              />
            </div>
            <BlueButton onClick={handleAddPublicSkill} text="اضافه" />

            {/* Display Public Skills as tags */}
            {form.getValues().skillsItem.public.map((item, index) => (
              <div key={index}>
                {item.title} - {item.number}
              </div>
            ))}
          </div>

          {/* Input for Pro Skills */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                placeholder="مهارت تخصصی"
                value={proSkill}
                onChange={handleProSkillChange}
              />
              <Input
                className="paragraph-regular background-light800_dark400 theme-border-color text-dark300_light700 input-light"
                placeholder="میزان مهارت تخصصی"
                type="number"
                value={proSkillNumber}
                onChange={handleProSkillNumberChange}
              />
            </div>
            <BlueButton onClick={handleAddProSkill} text="اضافه"/> 
 
            {/* Display Pro Skills as tags */}
            {form.getValues().skillsItem.pro.map((item, index) => (
              <div key={index}>
                {item.title} - {item.number}
              </div>
            ))}
          </div>
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
