import { Injectable } from '@nestjs/common';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { CreateAddDto } from '../adds/dto/createAdd.dto';
import * as dotenv from 'dotenv'
dotenv.config()
@Injectable()
export class AiService {
  private model: GenerativeModel;

  constructor() {
    if (!process.env.AI_TOKEN) {
      throw new Error('AI_TOKEN environment variable is not set');
    }
    const genAI = new GoogleGenerativeAI("AIzaSyD9hU3LvJdi3huNtF5T66wK26j5DClIXgE");
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async generateText(body: CreateAddDto): Promise<string> {
  const prompt = `Quyidagi ma'lumotlardan foydalangan holda qisqa va tushunarli uy tavsifi yozib ber:
- Uy turi: ${body.flatorhouse}
- Kim uchun: ${body.for_who}
- Qulayliklar: ${body.comforts}
- Viloyat: ${body.region}
- Tuman: ${body.district}`;

    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }
}

