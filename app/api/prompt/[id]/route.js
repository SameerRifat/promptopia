import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"


// GET (read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) return new Response("Prompt not found", {status: 404})
        
        return new Response(JSON.stringify(prompt), {status: 200})

    } catch (error) {
        return new Response("Failed to fetch the prompt", {status: 500})
    }
}

// PATCH (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag} = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id).populate('creator');

        if(!existingPrompt) return new Response("Prompt not found", {status: 404})

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        
        return new Response(JSON.stringify(existingPrompt), {status: 200})

    } catch (error) {
        return new Response("Failed to to update prompt", {status: 500})
    }
}

// DELETE (delete)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        const result = await Prompt.findOneAndDelete({ _id: params.id });

        if (!result) {
            return new Response("Prompt not found", { status: 404 });
        }

        return new Response("Prompt deleted", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 });
    }
};


// export const DELETE = async (request, { params }) => {

//     try {
//         await connectToDB();
//         console.log('id: ', params.id)
//         await Prompt.findByIdAndRemove(params.id);
//         // const result = await Prompt.findByIdAndRemove(params.id);

//         // if(!result) return new Response("Prompt not deleted", {status: 404})
        
//         return new Response("Prompt deleted", {status: 200})

//     } catch (error) {
//         return new Response("Failed to to delete prompt", {status: 500})
//     }
// }