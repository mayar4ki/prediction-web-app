import * as yup from "yup";

export const formSchema = yup.object({
    amount: yup.string().required()
});


export type FormSchema = yup.InferType<typeof formSchema>;


