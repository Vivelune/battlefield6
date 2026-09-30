"use server";

import prisma from "@/lib/prisma";
import { signupSchema } from "@/lib/validation";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function submitSignup(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = Object.fromEntries(formData);
  const parsed = signupSchema.safeParse({
    ...raw,
    consent: raw.consent === "on",
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const phone = parsePhoneNumberFromString(parsed.data.phone, "US")!;

  try {
    await prisma.signup.create({
      data: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email.toLowerCase(),
        phone: phone.number,
        consent: true,
      },
    });
    return { success: true, message: "Thanks! You're signed up." };
  } catch (e: any) {
    if (e.code === "P2002") {
      return { success: false, message: "Email already registered." };
    }
    return { success: false, message: "Something went wrong." };
  }
}