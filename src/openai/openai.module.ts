// openai.module.ts
import { Module } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { OpenAiController } from './openai.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [OpenAiController],
  providers: [OpenAiService],
})
export class OpenAiModule {}