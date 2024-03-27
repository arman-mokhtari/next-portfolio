import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(5, {
    message: "نام و نام خانوادگی باید حداقل حاوی 5 کاراکتر باشد!",
  }).max(50, {
    message: "نام و نام خانوادگی نباید بیشتر از 50 کاراکتر باشد!",
  }),
  email: z.string().email({
    message: "ایمیل با فرمت صحیح را وارد کنید!",
  }),
  phone: z.string().regex(/^0\d{10}$/, { message: "شماره موبایل باید 11 رقم باشد و با 0 شروع شود" }),
  message: z
    .string()
    .min(5, { message: "متن پیام باید حداقل حاوی 5 کاراکتر باشد!" })
    .max(500, { message: "متن پیام نمی‌تواند بیشتر از 500 کاراکتر باشد!" }),
});
