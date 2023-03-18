import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const promptPrefix =
    `
    You are a helpful professor. You can help the writer achieve anything they request you.
    
    Based on the instructions you receive, write a creative and engaging piece of content that follows the guidelines provided. Make sure to include all relevant information and adhere to any specific requirements or preferences given by the user. 
    
    Remember to keep the tone and style of the writing consistent and appropriate for the topic and intended audience. Good luck!
Here are the instructions and requirement the user has given you:  
${req.body.userInput}
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
