import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Award, BookOpen } from "lucide-react";

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

interface MathResultsProps {
  result: MathAnalysisResult;
  imageUrl: string;
}

export const MathResults = ({ result, imageUrl }: MathResultsProps) => {
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    if (grade.startsWith('D')) return 'text-orange-600';
    return 'text-red-600';
  };

  const getGradeBgColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 border-green-200';
    if (grade.startsWith('B')) return 'bg-blue-100 border-blue-200';
    if (grade.startsWith('C')) return 'bg-yellow-100 border-yellow-200';
    if (grade.startsWith('D')) return 'bg-orange-100 border-orange-200';
    return 'bg-red-100 border-red-200';
  };

  return (
    <div className="space-y-6">
      {/* Header with image */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Math Problem Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <img 
                src={imageUrl} 
                alt="Analyzed math problem"
                className="w-full max-w-sm h-auto rounded-lg border"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div className={`text-center p-6 rounded-lg border-2 ${getGradeBgColor(result.grade)}`}>
                <div className={`text-4xl font-bold ${getGradeColor(result.grade)}`}>
                  {result.grade}
                </div>
                <div className="text-2xl font-semibold text-gray-700">
                  {result.percentage}%
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{result.totalQuestions}</div>
                  <div className="text-sm text-gray-600">Total Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{result.correctAnswers}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{result.incorrectAnswers}</div>
                  <div className="text-sm text-gray-600">Incorrect</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Overall Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{result.feedback}</p>
        </CardContent>
      </Card>

      {/* Question-by-Question Analysis */}
      {result.questionAnalysis.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Question Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.questionAnalysis.map((question, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-lg border bg-gray-50">
                  <div className="flex-shrink-0">
                    {question.isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">Question {question.questionNumber}</span>
                      <Badge variant={question.isCorrect ? "default" : "destructive"}>
                        {question.isCorrect ? "Correct" : "Incorrect"}
                      </Badge>
                    </div>
                    <p className="text-gray-700 text-sm">{question.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};