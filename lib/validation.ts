import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const signupSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  phone: z.string().refine(
    (val) => {
      const p = parsePhoneNumberFromString(val, "US");
      return p?.isValid() ?? false;
    },
    { message: "Invalid US phone number" }
  ),
  consent: z.literal(true, {
    error: "You must agree to the terms",
  }),
});

export type SignupInput = z.infer<typeof signupSchema>;