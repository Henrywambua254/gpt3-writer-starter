import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
    `
Write a detailed article outline to cover everything with the topic below
Before the conclusion have a FAQs section which will have 3 o 5 questions.
Topic:
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
  Take the table of contents and title of the blog post below and generate a blog post that adheres to the following strictly:
Additional Tips:

Use a conversational and friendly tone to engage the reader.
Must use heading markers for all subtitles and titles
Use subheadings, bullet points, and short paragraphs to make the article easy to read and digest.
Use simple and concise language that's easy to understand, aimed at an audience with a reading level of 8th to 10th grade.
Provide helpful tips and insights that the reader can apply in their own financial situation.

  Title: ${req.body.userInput}

  Table of Contents: ${basePromptOutput.text}

  Blog Post:
  `

    // I call the OpenAI API a second time with Prompt #2
    const secondPromptCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${secondPrompt}`,
        // I set a higher temperature for this one. Up to you!
        temperature: 0.85,
        // I also increase max_tokens.
        max_tokens: 1050,
    });

    // Get the output
    const secondPromptOutput = secondPromptCompletion.data.choices.pop();

    // Send over the Prompt #2's output to our UI instead of Prompt #1's.
    res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;