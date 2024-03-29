import { Configuration, OpenAIApi } from 'openai';
import { createReadStream } from 'fs';

class OpenAI {
    roles = {
        ASSISTANT: 'assistant',
        USER: 'user',
        SYSTEM: 'system'
    };

    constructor(apiKey) {
        const configuration = new Configuration({
            apiKey
        });
        this.openai = new OpenAIApi(configuration);
    }

    async chat(messages) {
        try {
            const response = await this.openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages
            });
            return response.data.choices[0].message;
        } catch (e) {
            console.log('Error while gpt chat', e.message);
        }
    }

    async transcription(filepath) {
        try {
            const response = await this.openai.createTranscription(
                createReadStream(filepath),
                'whisper-1'
            );
            return response.data.text;
        } catch (e) {
            console.log('Error while transcription', e.message);
        }
    }

    async image(imageRequest) {
        try {
            const response = await this.openai.createImage({
                prompt: imageRequest,
                n: 1,
                size: '1024x1024'
            });
            return response.data[0].url;
        } catch (e) {
            console.log('Error while generate image', e.message);
        }
    }
}

export const openai = new OpenAI(process.env.OPENAI_KEY);
