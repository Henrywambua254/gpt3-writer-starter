import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
    `
    Write a detailed article outline to cover everything with the topic below
have a FAQs section which will have 3 o 5 questions, then lastly a conclusion after the FAQs.
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
        Introduction: 
        Write an introduction paragraph for an article about [article title]. The introduction should have three paragraphs. The first paragraph should capture the reader's attention and make them interested in the topic. The second paragraph should answer the main question of the article directly. The third paragraph should encourage the reader to keep reading by promising to provide valuable information or insights. Use a conversational and engaging tone to keep the reader interested throughout.
        
        Table:
        Please create a table to provide more information about the topic discussed in the introduction. The table should be titled 'An overview of [topic]' and should include a numbering column and additional columns as necessary. Write a small sentence to introduce the table content and explain how the information in the table relates to the topic. For example, if the article is about the benefits of different types of exercise, the table could include columns for exercise type, duration, and benefits. Be sure to format the table properly and make it easy to read and understand.
        
        Body Part:
        
        Please write a detailed article about [topic], including multiple subheadings in H2 and H3 format to organize the content. The article should be informative and engaging, avoiding fluff and using interesting examples and analogies where appropriate. It may be helpful to include lists or bullet points to break up longer paragraphs and make the information easier to digest.
        
        For each subheading, provide a clear and concise summary of the topic and provide detailed information to support the main point. Use research and data where possible to back up your claims and make the article more informative. Be sure to use language that is easy to understand for the intended audience and avoid using technical jargon unless necessary.
        
        To ensure the article flows smoothly, consider using transitional phrases or sentences to connect each subheading and create a cohesive narrative. This will help readers follow the main points of the article and stay engaged throughout.
        
        FAQs:
        Have a FAQs section before the conclusion with 3 to 5 questions. Each should be answered in depth.
        
        Conclusion:
        Finally, please conclude the article with a brief summary of the main points covered and any additional insights or recommendations for readers.
        
         Also follow these additional tips:
        
        Use a conversational and friendly tone to engage the reader.
        Must use heading markers for all subtitles and titles for HZ use ## and so on
        Use subheadings, bullet points, and short paragraphs to make the article easy to read and digest.
        Use simple and concise language that's easy to understand, aimed at an audience with a reading level of 8th to 10th grade.
        Provide helpful tips and insights that the reader can apply

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
        max_tokens: 2950,
    });

    // Get the output
    const secondPromptOutput = secondPromptCompletion.data.choices.pop();

    // Send over the Prompt #2's output to our UI instead of Prompt #1's.
    res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;