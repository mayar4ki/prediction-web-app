import * as yup from "yup";



interface GetFormSchemaProps {
    balance: ComputedRef<number>
    minBetAmount: ComputedRef<number>
}

export const getFormSchema = ({ balance, minBetAmount }: GetFormSchemaProps) => yup.object({
    amount: yup.number().typeError('${path} is Invalid').min(minBetAmount.value).max(balance.value).required().label("Amount")
});


export type FormSchema = yup.InferType<ReturnType<typeof getFormSchema>>;


