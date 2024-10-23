import { 
  Button,
  FormControl,
  Typography,
  Box
} from '@mui/material';

import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import Resolution from "./Resolution";
import { QuestionTypes, getNextQuestion } from "../data/questions";
import { 
  answerQuestion, 
  finishQuestionaire, 
  lastQuestion, 
  goToQuestion,
  resetQuestionaire, 
  selectOptions 
} from "../store/questionaireSlice";
import { useAppDispatch, useAppSelector } from '../store/store';

const Questionaire = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector(state => state.questionaire.questions);
  const currentQuestionIndex = useAppSelector(state => state.questionaire.currentQuestionIndex);
  const question = questions[currentQuestionIndex as number];
  const answers = useAppSelector(state => state.questionaire.answers);
  const selectedOptions = useAppSelector(state => state.questionaire.selectedOptions);

  const handleOptionChange = (option: String) => {
    if (question.type == QuestionTypes.MultiSelect) {
      selectedOptions.includes(option) 
      ? dispatch(selectOptions(selectedOptions.filter((item: String) => item !== option)))
      : dispatch(selectOptions([...selectedOptions, option]));
    } else {
      dispatch(selectOptions([option]));
    }
  };


  const handleNext = () => {
    dispatch(answerQuestion(currentQuestionIndex as number));
    const nextQuestion = getNextQuestion(currentQuestionIndex as number, selectedOptions);
    if (nextQuestion == null) {
      dispatch(finishQuestionaire());
      return;
    }
    dispatch(goToQuestion(nextQuestion));
  };

  const handleBack = () => {
    dispatch(lastQuestion());
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      {currentQuestionIndex != null 
      ? <>
        <Typography variant="h6" gutterBottom>
          {question.question}
        </Typography>
        <FormControl component="fieldset" fullWidth>
          <MultipleChoiceQuestion 
                handleOptionChange={handleOptionChange} />
        </FormControl>
        <Box sx={{ 
          display: "flex", 
          marginTop: 2, 
          justifyContent: "flex-end",
          gap: 4 }}>
          <Button variant="text" color="primary" onClick={handleBack} disabled={currentQuestionIndex === 0}>
            Back
          </Button>
          <Button variant="outlined" color="primary" onClick={handleNext} disabled={selectedOptions.length == 0} disableElevation>
            {currentQuestionIndex > 0 ? "Submit" : "Next"}
          </Button>
        </Box>
      </>
      : <>
        <Resolution />
        <Box sx={{ 
          display: "flex", 
          marginTop: 2, 
          justifyContent: "flex-end",
          gap: 4 }}>
          <Button variant="text" color="primary" onClick={() => dispatch(resetQuestionaire())} disabled={currentQuestionIndex === 0}>
            Reset Questionaire
          </Button>
        </Box>
      </>}
    </Box>
  );
};

export default Questionaire;