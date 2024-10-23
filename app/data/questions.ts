export enum QuestionTypes {
  SingleSelect = 1,
  MultiSelect = 2,
}

export type Question = {
  id: number;
  question: String;
  type: QuestionTypes;
  options: Record<number, String>;
}
export const questions = [{
    "id": 0,
    "question": "What residential work are you doing? ",
    "type": QuestionTypes.SingleSelect,
    "options": {0:"Interior Work", 1: "Exterior Work"}
  },
  {
    'id': 1,
    'question': 'What interior work are you doing?',
    'type': QuestionTypes.MultiSelect,
    'options': {0:'Bathroom remodel', 1:'New bathroom', 2:'New laundry room', 3:'Other'}
  },
  {
    'id': 2,
    'question': 'What exterior work are you doing?',
    'type': QuestionTypes.MultiSelect,
    'options': {0:'Garage door replacement', 1:'Exterior doors', 2:'Fencing', 3:'Other'}
  }
]

export const getNextQuestion = (currentIndex: number, selectedOptions: String[]) => {
  switch (currentIndex) {
    case 0:
      return selectedOptions.includes('Interior Work') ? 1 : 2;
    case 1:
    case 2:
    default:
      return null;
  }
};