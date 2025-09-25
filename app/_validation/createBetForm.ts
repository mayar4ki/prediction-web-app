import * as yup from "yup";
import { getLocalTimeZone, type DateValue } from "@internationalized/date";
import type { _Tag } from "~/_types/common";

export const formSchema = yup.object({
    prompt: yup.string().max(240).min(10).required(),
    lockDate: yup
        .mixed<DateValue>()
        .required()
        .transform((item) => (Object.keys(item ?? {}).length === 0 ? null : item)),
    lockTime: yup.string().required(),
    closeDate: yup
        .mixed<DateValue>()
        .required()
        .transform((item) => (Object.keys(item ?? {}).length === 0 ? null : item)),
    closeTime: yup.string().required(),
    fees: yup.string().required(),
    tags: yup.array(yup.mixed<_Tag>().required())
});


export type FormSchema = yup.InferType<typeof formSchema>;


export const createBetAdapter = (values: FormSchema): [string, bigint, bigint] => {

    const closeAt = addTimeToDate(values.closeDate.toDate(getLocalTimeZone()), values.closeTime).getTime() / 1000;
    const lockedAt = addTimeToDate(values.lockDate.toDate(getLocalTimeZone()), values.lockTime).getTime() / 1000;

    return [
        values.prompt,
        BigInt(lockedAt),
        BigInt(closeAt)
    ];
}   