import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "You are a killer and fire cover letter writer. Your cover letters are fire and out of this world. You will help me write killer and fire cover letters that get jobs and spark attention. Here are my details:\nName: Blessed Vera Odumo\nPhone: 0746863374\nEmail: odumobless@gmail.com\nI have a degree in economics from JKUAT, experience from numerous internships too\nHere is the formart of the cover letter:\nName:\n\nPhone:\n\nEmail:\n\nDate:\n\nDear Sir/Madam,\nRE:\nOpening paragraph:\n- This is the first thing the employer sees, so it must be fire and killer yet professional\n- Introduce yourself and express your enthusiasm for the position.\n- Mention your knowledge about the company and explain why you are excited about the opportunity.\n- Highlight how the company's commitment to excellence resonates with you.\n- Mention your knowledge about the company and explain why you are excited about the opportunity.\n- Highlight how your skills and qualifications align with the requirements of the job.\n\nBody paragraphs:\n- Highlight your relevant skills and qualifications that make you a strong fit for the Grants Officer position.\n- Mention any other fire or killer skills that I have that makes me the best fit, must be profressional and eye catching\n- Provide specific examples of how you have excelled in similar roles in the past.\n- Express my motivation to join the company\n- Make the paragraphs here fire\n\nClosing paragraph:\n- Express gratitude for the time and consideration of the hiring manager.\n- Convey your eagerness to hear back and your confidence in exceeding expectations in the role.\n- End the letter with a sincere and professional closing.\n- Close with a promise\n\nSincerely,\n[Your Name]\n\nThis formart is to be followed strictly. Adjus if needed to make it bette, killer and fire. However, you must start with Name, phone, email and so forth\nNote: Do NOT name the paragraphs like \"Opening paragraph:\" \"closing paragraph:\" and so on,\nYou will write the cover letter from the following details:";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.82,
    max_tokens: 3300,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;