import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Question, questions } from '../data/questions';

export type QuestionaireState = {
  questions: Question[];
  currentQuestionIndex: number|null;
  currentQuestion: Question|null;
  answers: Record<number, String[]>;
  selectedOptions: String[];
}

export const questionaireSlice = createSlice({
  name: 'questionaire',
  initialState: {
    questions: questions,
    currentQuestionIndex: 0,
    currentQuestion: questions[0],
    answers: {},
    selectedOptions: []
  } as QuestionaireState,
  reducers: {
    answerQuestion: (state, action: PayloadAction<number>) => {
      state.answers[action.payload] = state.selectedOptions;
    },
    goToQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
      state.currentQuestion = state.questions[action.payload as number];
      state.selectedOptions = [];
    },
    lastQuestion: (state) => {
      state.currentQuestionIndex
      ? state.currentQuestionIndex--
      : state.currentQuestionIndex = 0;
      state.currentQuestion = state.questions[state.currentQuestionIndex as number];

      state.selectedOptions = state.answers[state.currentQuestion.id] ?? [];
    },
    finishQuestionaire: (state) => {
      state.currentQuestionIndex = null;
      state.currentQuestion = null;
      state.selectedOptions = [];
    },
    selectOptions: (state, action: PayloadAction<String[]>) => {
      state.selectedOptions = action.payload;
    },
    resetQuestionaire: (state) => {
      state.currentQuestionIndex = 0;
      state.currentQuestion = state.questions[0];
      state.answers = {};
      state.selectedOptions = [];
    }
  },
});

// Export each action by name
export const { 
  answerQuestion, 
  goToQuestion, 
  lastQuestion, 
  finishQuestionaire, 
  selectOptions, 
  resetQuestionaire 
} = questionaireSlice.actions;

export default questionaireSlice.reducer;