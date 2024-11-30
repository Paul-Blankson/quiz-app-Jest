export interface QuizData {
  title: string;
  icon: string;
  questions: Question[];
}

interface Question {
  question: string;
  options: string[];
  answer: string;
}
