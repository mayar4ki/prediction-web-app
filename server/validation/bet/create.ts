import type { ServerFile } from "nuxt-file-storage";
import type { ByteArray, Hex, Signature } from "viem";
import * as yup from "yup";

export const formSchema = yup.object({
  files: yup.array().of(yup.mixed<ServerFile>().required()),
  signature: yup.mixed<Hex | ByteArray | Signature>().required(),
  itemId: yup.string().required(),
  tags: yup.array().of(yup.number().required()),
});

export type FormSchema = yup.InferType<typeof formSchema>;
