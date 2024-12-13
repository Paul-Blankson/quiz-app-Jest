export interface QuizData {
  title: string;
  icon: string;
  questions: [];
}

export interface Question {
  question: string;
  options: string[];
  answer: string;
}
