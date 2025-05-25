import { z } from "zod";

const phoneRegex = /^(?:\+98|0098|0)?9(0[1-5]|1[0-9]|2[0-2]|3[0-9]|9[0-9])\d{7}$/


export const titleSchema = z
    .string()
    .min(8, "عنوان باید حداقل ۸ کاراکتر باشد")
    .max(60, "عنوان باید کمتر از ۶۰ کاراکتر باشد")

export const applyAddressSchema = z.object({
    fullName: z.string().min(8, "نام کاربر باید بیشتر از ۸ کاراکتر باشد."),
    mobile: z.string().regex(phoneRegex, "لطفا یک شماره موبایل معتبر وارد کنید."),
    email: z.string().email("لطفا یک ایمیل معتبر وارد کنید."),
    title: titleSchema,
    state: z.string().min(2, "استان باید حداقل ۲ کاراکتر باشد"),
    city: z.string().min(2, "شهر باید حداقل ۲ کاراکتر باشد"),
    address: z.string().min(10, "آدرس باید حداقل ۱۰ کاراکتر باشد"),
    zipCode: z.string().min(10, "کد پستی باید حداقل ۱۰ کاراکتر باشد"),
});

export type AddressFormData = z.infer<typeof applyAddressSchema>;