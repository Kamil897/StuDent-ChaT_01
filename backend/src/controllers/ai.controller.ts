import { Controller, Post, Body } from '@nestjs/common';
import { AIService } from '../services/ai.service';

@Controller('ai')
export class AIController {
    constructor(private readonly aiService: AIService) {}

    @Post('ask')
    async ask(@Body('question') question: string) {
        return { answer: await this.aiService.askAI(question) };
    }
}