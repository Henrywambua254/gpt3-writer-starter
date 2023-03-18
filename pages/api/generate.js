import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
    `
You are a gpt healper. You follow instructions that you have been given and give an outout.
Now, generate an overview of how your answer will look like based on the instructions given.
For instance, if the instructions are about creating a table, you could write what the table will have, columns and what it will have.
If the instructions are for you to write something, you can give an overview of how the answer will be.
This is an overview or rather outline. So you are not supposed to give the answer, but an outline that will be used to answer or follow the instructions given better.
Instructions:
`;
const generateAction = async(req, res) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}`,
        temperature: 0.7,
        max_tokens: 250,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    // I build Prompt #2.
    const secondPrompt =
        `
  Now take the overview and follow what it says you should do to give a nice output.
  You must follow the overview to the latter and do what it says.

  Title: ${req.body.userInput}

  Overview: ${basePromptOutput.text}

  Output:
  `

    // I call the OpenAI API a second time with Prompt #2
    const secondPromptCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${secondPrompt}`,
        // I set a higher temperature for this one. Up to you!
        temperature: 0.85,
        // I also increase max_tokens.
        max_tokens: 1550,
    });

    // Get the output
    const secondPromptOutput = secondPromptCompletion.data.choices.pop();

    // Send over the Prompt #2's output to our UI instead of Prompt #1's.
    res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;