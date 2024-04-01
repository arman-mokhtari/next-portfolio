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
  role: z.string().default("ADMIN"),
  phone: z.string().regex(/^0\d{10}$/, {
    message: "شماره موبایل باید 11 رقم باشد و با 0 شروع شود",
  }),
  bio: z
    .string()
    .min(1, {
      message: "بیوگرافی کوتاه را وارد کنید!",
    })
    .max(40, {
      message: "بیوگرافی نباید بیشتر از 40 کاراکتر باشد!",
    }),
  cv: z.string().min(1, {
    message: "لینک رزومه را وارد کنید!",
  }),
  location: z
    .string()
    .min(1, {
      message: "آدرس را ثبت کنید!",
    })
    .max(25, {
      message: "آدرس باید فقط حاوی شهر و کشور باشد!",
    }),
  nationality: z
    .string()
    .min(1, {
      message: "ملیت را ثبت کنید!",
    })
    .max(20, {
      message: "ملیت نباید بیشتر از 20 کاراکتر باشد!",
    }),
  age: z.string().regex(/^\d{2}$/, {
    message: "سن باید 2 رقمی باشد",
  }),
  expertise: z
    .string()
    .min(1, {
      message: "تخصص خود را ثبت کنید!",
    })
    .max(40, {
      message: "تخصص نباید بیشتر از 40 کاراکتر باشد!",
    }),
  languages: z.string().min(3, {
    message: "زبان‌های گفتاری خود را وارد کنید",
  }),
  avatar: z.string().min(1, {
    message: "لینک آواتار را وارد کنید",
  }),
  status: z
    .string()
    .min(1, {
      message: "وضعیت فعلی را ثبت کنید",
    })
    .max(20, {
      message: "حداکثر 20 کاراکتر",
    }),
});

export const sidebarSettingsSchema = z.object({
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  telegram: z.string().optional(),
  facebook: z.string().optional(),
});

const commonValidation = z.object({
  title: z
    .string()
    .min(1, {
      message: "تایتل را وارد کنید",
    })
    .max(70, {
      message: "تایتل نباید بیشتر از 70 کاراکتر باشد",
    }),
  desc: z
    .string()
    .min(1, {
      message: "توضیحات را وارد کنید",
    })
    .max(250, {
      message: "توضیحات نباید بیشتر از 250 کاراکتر باشد",
    }),
  metaTitle: z
    .string()
    .min(1, {
      message: "متا تایتل را وارد کنید",
    })
    .max(70, {
      message: "متا تایتل نباید بیشتر از 70 کاراکتر باشد",
    }),
  metaDesk: z
    .string()
    .min(1, {
      message: "توضیحات متا را وارد کنید",
    })
    .max(200, {
      message: "توضیحات متا نباید بیشتر از 200 کاراکتر باشد",
    }),
});

export const homeEditSchema = z.object({
  ...commonValidation.shape,
  typed: z
    .array(
      z
        .string()
        .min(10, {
          message: "آیتم نباید کمتر از 10 کاراکتر باشد",
        })
        .max(70, {
          message: "آیتم‌ نباید بیشتر از 70 کاراکتر باشد",
        })
    )
    .min(3, {
      message: "مجموع آیتم‌ها نباید کمتر از 3 آیتم باشند",
    })
    .max(10, {
      message: "مجموع آیتم‌ها نباید بیشتر از 10 آیتم باشند",
    }),
});

export const aboutEditSchema = z.object({
  ...commonValidation.shape,
  profileImage: z.string().min(1, {
    message: "لینک تصویر پروفایل را وارد کنید",
  }),
});
