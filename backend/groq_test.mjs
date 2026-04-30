import 'dotenv/config';
import Groq from 'groq-sdk';

const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });

(async () => {
  try {
    const response = await groqClient.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: 'Write a professional resume Summary for Software Engineer',
        },
      ],
      model: 'llama3-70b-8192',
    });
    console.log('response', response);
  } catch (e) {
    console.error('ERROR', e);
    if (e?.response) {
      console.error('ERROR response', e.response);
      if (e.response.body) {
        console.error('ERROR body', e.response.body);
      }
    }
    process.exit(1);
  }
})();
