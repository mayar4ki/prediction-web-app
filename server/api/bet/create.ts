import { formSchema, FormSchema } from "~~/server/validation/bet/create";
import * as yup from "yup";
import { isAddressEqual, recoverMessageAddress } from 'viem'
import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'
import * as aiPredictionV1 from "~/_config/ai-prediction-v1";
import sharp from 'sharp'
import prisma from "~~/server/lib/prisma";

const getPrefix = (closeAt: number) => '/userFiles/' + closeAt.toString();



const storePhoto = async (body: FormSchema, closeAt: number) => {


    if (!body?.files?.[0]) {
        return '';
    }

    const file = body.files[0];



    const matches = file.content.match(/^data:(image\/\w+);base64,(.+)$/);

    const mimeType = matches![1]!;
    const base64Data = matches![2]!;

    const buffer = Buffer.from(base64Data, 'base64');

    const webpBuffer = await sharp(buffer).png().toBuffer();

    const fileLocation = getPrefix(closeAt);

    const _name = await storeFileLocally(
        {
            type: 'image/png',
            content: `data:image/png;base64,${webpBuffer.toString('base64')}`,
            name: `${body.itemId}.png`,
            lastModified: file.lastModified,
            size: ''
        },         // the file object
        body.itemId,            // you can add a name for the file or length of Unique ID that will be automatically generated!
        fileLocation  // the folder the file will be stored in
    )


    return `${fileLocation}/${_name}`;

}

export default defineEventHandler(async (event) => {

    const payload = await readBody<FormSchema>(event);

    let _bodyTmp: FormSchema | undefined = undefined;

    try {
        _bodyTmp = await formSchema.validate(payload, { abortEarly: false });
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            return createError({ statusCode: 400, data: err.errors, statusMessage: 'Invalid Input' })
        }
    }

    const body = _bodyTmp!;

    // ************  check message ************
    const signerAddress = await recoverMessageAddress({
        signature: body.signature,
        message: body.itemId + body.tags?.join(', ')
    });

    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(process.env.VITE_ETH_SEPOLIA_CHAIN_RPC_URL)
    });

    const result = await publicClient.readContract({
        address: aiPredictionV1.address,
        abi: aiPredictionV1.abi,
        functionName: 'roundsLedger',
        args: [BigInt(body.itemId)]
    });

    const isMaster = isAddressEqual(result[1], signerAddress);

    if (!isMaster) {
        return createError({ statusCode: 401, statusMessage: 'unauthorized' })
    }

    // ^^^^^^^^^^^^^^  check message END ^^^^^^^^^^^^^^

    const photoUrl = await storePhoto(body, Number(result[5]))

    const round = await prisma.round.create({
        data: {
            roundId: BigInt(body.itemId),
            hasPhoto: !!photoUrl,
            tags: {
                connect: (body.tags ?? [])?.map(el => ({ id: el })),
            }
        }
    })


    return { link: photoUrl, round };
})
