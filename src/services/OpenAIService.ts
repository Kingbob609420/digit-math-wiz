interface MathAnalysisResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  grade: string;
  percentage: number;
  feedback: string;
  questionAnalysis: Array<{
    questionNumber: number;
    isCorrect: boolean;
    feedback: string;
  }>;
}

export class OpenAIService {
  private static API_KEY_STORAGE_KEY = 'openai_api_key';

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async analyzeMathProblem(imageBase64: string): Promise<MathAnalysisResult> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5-2025-08-07',
          messages: [
            {
              role: 'system',
              content: `You are a math teacher grading student work. Analyze the image and:
              1. Identify all math problems/questions in the image
              2. Check if the student's answers are correct
              3. Provide specific feedback for each question
              4. Calculate an overall grade and percentage
              5. Return your analysis in JSON format with this structure:
              {
                "totalQuestions": number,
                "correctAnswers": number,
                "incorrectAnswers": number,
                "grade": "A+/A/B+/B/C+/C/D+/D/F",
                "percentage": number,
                "feedback": "overall feedback string",
                "questionAnalysis": [
                  {
                    "questionNumber": number,
                    "isCorrect": boolean,
                    "feedback": "specific feedback for this question"
                  }
                ]
              }
              
              Be thorough and constructive in your feedback. If no math problems are visible, indicate that in the feedback.`
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Please analyze this math worksheet/homework and grade it. Check each problem for correctness and provide detailed feedback.'
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: imageBase64
                  }
                }
              ]
            }
          ],
          max_tokens: 2000,
          temperature: 0.1
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to analyze image');
      }

      const result = await response.json();
      const content = result.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Try to parse JSON from the response
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
      }

      // Fallback: create a basic response if JSON parsing fails
      return {
        totalQuestions: 1,
        correctAnswers: 0,
        incorrectAnswers: 1,
        grade: 'N/A',
        percentage: 0,
        feedback: content,
        questionAnalysis: [{
          questionNumber: 1,
          isCorrect: false,
          feedback: content
        }]
      };

    } catch (error) {
      console.error('Error analyzing math problem:', error);
      throw error;
    }
  }
}