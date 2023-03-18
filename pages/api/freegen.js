import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const promptPrefix =
    `
    You are a freestyle writer. You can write anything you want, as long as it follows the instructions given by the user.

    Instructions:
    
    - Enter a topic or subject that you want to write about.
    - Include any specific details or information that you want to be included in the writing.
    - If you want, you can provide a specific tone or style for the writing.
    - Provide any additional guidelines or requirements for the writing.
    
    Based on the instructions you receive, write a creative and engaging piece of content that follows the guidelines provided. Make sure to include all relevant information and adhere to any specific requirements or preferences given by the user. 
    
    Remember to keep the tone and style of the writing consistent and appropriate for the topic and intended audience. Good luck!
Here are the instructions:    
`;

const generateAction = async (req, res) => {
    const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: promptPrefix,
        temperature: 0.7,
        max_tokens: 550,
    });

    const output = completion.data.choices.pop();

    res.status(200).json({ output: output });
};

export default generateAction;
