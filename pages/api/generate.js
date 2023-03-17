import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async(req, res) => {
    // Run first prompt
    const introductionPromptPrefix = `
        Write an introduction for an article on ${req.body.userInput} that includes the following:
        - A hook to capture attention
        - A direct answer to the question/topic
        - A preview of what's to come
    `;
    const introductionCompletion = await openai.createCompletion({
        model: 'text-davinci-002',
        prompt: introductionPromptPrefix,
        temperature: 0.7,
        max_tokens: 200,
        n: 1,
        stop: '\n',
    });
    const introductionOutput = introductionCompletion.data.choices[0].text.trim();

    // Run second prompt for table
    const tablePrompt = `
        ${introductionOutput}

        Table:
        Write a subheading in H2 format that starts with "An overview of" and describes the topic of the table. Write a small sentence after the heading to introduce the table content. Then, create a table with a numbering column and other necessary columns for the topic in context. Use bullet points, subheadings, and short paragraphs to make the table easy to read and digest.
    `;
    const tableCompletion = await openai.createCompletion({
        model: 'text-davinci-002',
        prompt: tablePrompt,
        temperature: 0.7,
        max_tokens: 500,
        n: 1,
        stop: '\n',
    });
    const tableOutput = tableCompletion.data.choices[0].text.trim();

    // Run third prompt for body
    const bodyPromptPrefix = `
        Write an article on ${req.body.userInput} that includes the following:
        - H2 and H3 headings with markers
        - Use 8th to 10th grade language
        - Avoid repetitions
        - Be creative and get into the depth of everything, explaining each in a detailed way with no fluff
        - FAQs section with 3 to 5 relevant and related questions that have not been answered in the article. No questions which already have answers
    `;
    const bodyCompletion = await openai.createCompletion({
        model: 'text-davinci-002',
        prompt: bodyPromptPrefix,
        temperature: 0.7,
        max_tokens: 2000,
        n: 1,
        stop: '\n',
    });
    const bodyOutput = bodyCompletion.data.choices[0].text.trim();

    res.status(200).json({ output: `${introductionOutput}\n\n${tableOutput}\n\n${bodyOutput}` });
};

export default generateAction;