import { GenerationResponse } from '../types';

const WEBHOOK_URL = 'https://hook.us1.make.com/gqafjqf4plvbomygtpmxmal3llsi0aq2';

export async function generateContent(prompt: string): Promise<GenerationResponse> {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.text();
    let parsedContent: string;

    try {
      const jsonData = JSON.parse(rawData);
      parsedContent = typeof jsonData === 'string' ? jsonData : JSON.stringify(jsonData);
    } catch {
      parsedContent = rawData;
    }

    return {
      success: true,
      data: parsedContent,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: 'Failed to generate content. Please try again.',
    };
  }
}