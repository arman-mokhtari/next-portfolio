import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(5, {
      message: "نام و نام خانوادگی باید حداقل حاوی 5 کاراکتر باشد!",
    })
    .max(50, {
      message: "نام و نام خانوادگی نباید بیشتر از 50 کاراکتر باشد!",
    }),
  email: z.string().email({
    message: "ایمیل با فرمت صحیح را وارد کنید!",
  }),
  phone: z.string().regex(/^0\d{10}$/, {
    message: "شماره موبایل باید 11 رقم باشد و با 0 شروع شود",
  }),
  message: z
    .string()
    .min(5, { message: "متن پیام باید حداقل حاوی 5 کاراکتر باشد!" })
    .max(500, { message: "متن پیام نمی‌تواند بیشتر از 500 کاراکتر باشد!" }),
});

export const userValidationSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "نام و نام خانوادگی باید حداقل حاوی 5 کاراکتر باشد!",
    })
    .max(50, {
      message: "نام و نام خانوادگی نباید بیشتر از 50 کاراکتر باشد!",
    }),
  email: z.string().email({
    message: "ایمیل با فرمت صحیح را وارد کنید!",
  }),
  phone: z.string().regex(/^0\d{10}$/, {
    message: "شماره موبایل باید 11 رقم باشد و با 0 شروع شود",
  }),
  bio: z.string().max(20, {
    message: "بیوگرافی نباید بیشتر از 20 کاراکتر باشد!",
  }),
  location: z.string().max(20, {
    message: "آدرس نباید بیشتر از 20 کاراکتر باشد!",
  }),
  nationality: z.string().max(10, {
    message: "ملیت نباید بیشتر از 10 کاراکتر باشد!",
  }),
  age: z.string().regex(/^\d{2}$/, {
    message: "سن باید 2 رقم باشد",
  }),
  expertise: z.string().max(10, {
    message: "تخصص نباید بیشتر از 10 کاراکتر باشد!",
  }),
  languages: z.string(),
  avatar: z.string().min(1, {
    message: "لینک آواتار را وارد کنید",
  }),
  profileImage: z.string().min(1, {
    message: "لینک تصویر پروفایل را وارد کنید",
  }),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  telegram: z.string().optional(),
  facebook: z.string().optional(),
});
