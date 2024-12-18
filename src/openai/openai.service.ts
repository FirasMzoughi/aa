import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
    private openai: OpenAI;

    constructor(private readonly configService: ConfigService) {
        const apiKey = this.configService.get<string>('OPENAI_API_KEY');

        if (!apiKey) {
            throw new Error('OpenAI API key is missing.');
        }

        this.openai = new OpenAI({ apiKey });
    }

    async getChatResponse(message: string): Promise<string> {
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo', // أو استخدم 'gpt-4' إذا كانت متاحة
                messages: [{ role: 'user', content: message }],
            });

            return completion.choices[0].message.content || '';
        } catch (error) {
            console.error('Error with OpenAI API:', error);

            if (error.response) {
                throw new Error(`OpenAI API Error (${error.response.status}): ${error.response.data}`);
            }

            throw new Error('An unexpected error occurred.');
        }
    }
}
