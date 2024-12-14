export interface Question {
  question: string;
  options: string[];
  answer: string;
}
export interface QuizData {
  title: string;
  icon: string;
  questions: Question[];
}
