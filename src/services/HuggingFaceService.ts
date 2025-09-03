import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to always download models
env.allowLocalModels = false;
env.useBrowserCache = true;

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

export class HuggingFaceService {
  private static imageClassifier: any = null;
  private static textGenerator: any = null;

  private static async initializeModels() {
    if (!this.imageClassifier) {
      console.log('Loading image classification model...');
      this.imageClassifier = await pipeline(
        'image-classification',
        'microsoft/resnet-50',
        { device: 'webgpu' }
      );
    }

    if (!this.textGenerator) {
      console.log('Loading text generation model...');
      this.textGenerator = await pipeline(
        'text-generation',
        'Xenova/gpt2',
        { device: 'webgpu' }
      );
    }
  }

  static async analyzeMathProblem(imageBase64: string): Promise<MathAnalysisResult> {
    try {
      await this.initializeModels();
      
      console.log('Analyzing image...');
      
      // Convert base64 to image element for analysis
      const img = new Image();
      img.src = imageBase64;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // For demo purposes, we'll simulate math problem analysis
      // In a real implementation, you'd use OCR + math understanding models
      const analysis = this.simulateMathAnalysis();
      
      console.log('Analysis complete:', analysis);
      return analysis;

    } catch (error) {
      console.error('Error analyzing math problem:', error);
      
      // Return a fallback result
      return {
        totalQuestions: 1,
        correctAnswers: 0,
        incorrectAnswers: 1,
        grade: 'N/A',
        percentage: 0,
        feedback: 'Unable to analyze the image. Please ensure the math problems are clearly visible and try again.',
        questionAnalysis: [{
          questionNumber: 1,
          isCorrect: false,
          feedback: 'Image analysis failed. Please try with a clearer image.'
        }]
      };
    }
  }

  private static simulateMathAnalysis(): MathAnalysisResult {
    // Simulate a realistic math problem analysis
    const scenarios = [
      {
        totalQuestions: 5,
        correctAnswers: 4,
        incorrectAnswers: 1,
        grade: 'B+',
        percentage: 80,
        feedback: 'Great work! You got most problems correct. Pay attention to order of operations in problem 3.',
        questionAnalysis: [
          { questionNumber: 1, isCorrect: true, feedback: 'Perfect! 2 + 3 = 5 is correct.' },
          { questionNumber: 2, isCorrect: true, feedback: 'Excellent! 12 ÷ 4 = 3 is right.' },
          { questionNumber: 3, isCorrect: false, feedback: 'Remember PEMDAS! 2 + 3 × 4 = 2 + 12 = 14, not 20.' },
          { questionNumber: 4, isCorrect: true, feedback: 'Correct! 15 - 8 = 7.' },
          { questionNumber: 5, isCorrect: true, feedback: 'Well done! 6 × 7 = 42.' }
        ]
      },
      {
        totalQuestions: 3,
        correctAnswers: 2,
        incorrectAnswers: 1,
        grade: 'B',
        percentage: 67,
        feedback: 'Good effort! You understand basic arithmetic well. Review fraction operations for improvement.',
        questionAnalysis: [
          { questionNumber: 1, isCorrect: true, feedback: 'Correct! 1/2 + 1/4 = 2/4 + 1/4 = 3/4.' },
          { questionNumber: 2, isCorrect: false, feedback: 'Not quite. 3/5 × 2/3 = 6/15 = 2/5, not 1/2.' },
          { questionNumber: 3, isCorrect: true, feedback: 'Perfect! 8 - 3.5 = 4.5.' }
        ]
      },
      {
        totalQuestions: 4,
        correctAnswers: 4,
        incorrectAnswers: 0,
        grade: 'A+',
        percentage: 100,
        feedback: 'Outstanding work! You solved all problems correctly with clear work shown.',
        questionAnalysis: [
          { questionNumber: 1, isCorrect: true, feedback: 'Excellent! Your algebra work is perfect.' },
          { questionNumber: 2, isCorrect: true, feedback: 'Great job solving for x = 5.' },
          { questionNumber: 3, isCorrect: true, feedback: 'Perfect geometry calculation!' },
          { questionNumber: 4, isCorrect: true, feedback: 'Outstanding problem-solving approach.' }
        ]
      }
    ];

    // Return a random scenario for demonstration
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  }
}