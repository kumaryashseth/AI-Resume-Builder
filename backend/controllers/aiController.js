import dotenv from 'dotenv'
import Groq from 'groq-sdk'

dotenv.config()

const groqClient = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant"
console.log('GROQ API key loaded:', !!process.env.GROQ_API_KEY)
console.log('Using Groq model:', GROQ_MODEL)

export const generateSummary = async (req, res) => {
    console.log('AI generateSummary request body:', req.body)
    try {
        const { role } = req.body;

        const response = await groqClient.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `Write a professional resume Summary for ${role}` ,
                },
            ],
            model: GROQ_MODEL,
        });

        const summary = response.choices?.[0]?.message?.content ?? "No summary returned";
        res.json({ summary });
    } catch (error) {
        console.error('AI generateSummary error:', error);
        if (error?.response) {
            console.error('AI error response:', error.response);
        }
        res.status(500).json({ message: error.message || 'Server error' });
    }
}


export const improveBullet = async (req, res) => {
    console.log('AI improveBullet request body:', req.body)
    try {
        const { text } = req.body;

        const response = await groqClient.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `improve this resume bullet point professionally ${text}` ,
                },
            ],
            model: GROQ_MODEL,
        });

        const summary = response.choices?.[0]?.message?.content ?? "No improved bullet returned";
        res.json({ summary });
    } catch (error) {
        console.error('AI improveBullet error:', error);
        if (error?.response) {
            console.error('AI error response:', error.response);
        }
        res.status(500).json({ message: error.message || 'Server error' });
    }
}


export const suggestSkills = async (req, res) => {
    console.log('AI suggestSkills request body:', req.body)
    try {
        const { role } = req.body;

        const response = await groqClient.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `Give 10 resume skills for ${role}` ,
                },
            ],
            model: GROQ_MODEL,
        });

            const summary = response.choices?.[0]?.message?.content ?? "No suggested skills returned";
        res.json({ summary });
    } catch (error) {
        console.error('AI suggestSkills error:', error);
        if (error?.response) {
            console.error('AI error response:', error.response);
        }
        res.status(500).json({ message: error.message || 'Server error' });
    }
}

