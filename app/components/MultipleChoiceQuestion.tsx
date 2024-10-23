import { 
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
} from '@mui/material';

import { Question, QuestionTypes } from "../data/questions";
import { useAppSelector } from '../store/store';


interface MultipleChoiceQuestionProps {
  handleOptionChange: (option: String) => void;
}
const MultipleChoiceQuestion = ({ handleOptionChange }: MultipleChoiceQuestionProps) => {
  const question: Question = useAppSelector(state => state.questionaire.currentQuestion!);
  const selectedOptions = useAppSelector(state => state.questionaire.selectedOptions);
  const isMultipleSelect = question.type == QuestionTypes.MultiSelect;

  return (
    <div>
        <FormLabel component="legend">Choose your answer{isMultipleSelect ? '(s)' : ''}</FormLabel>
        {isMultipleSelect ? (
          <FormGroup>
            {Object.entries(question.options).map(([id, option]) => (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionChange(option)}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        ) : (
          <RadioGroup
            value={selectedOptions}
            onChange={(e,s) => handleOptionChange(s)}
          >
            {Object.entries(question.options).map(([id, option]) => (
              <FormControlLabel
                key={id}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        )}
    </div>);
};

export default MultipleChoiceQuestion;