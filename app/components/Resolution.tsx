import React from 'react';
import { Typography } from '@mui/material';

import { ResolutionType, getResolution } from "../data/resolutions";
import { useAppSelector } from '../store/store';

const Resolution = () => {
  const answers = useAppSelector(state => state.questionaire.answers);
  const resolution:  ResolutionType = getResolution(answers);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {resolution.resolution}
      </Typography>
      <ul style={{
        listStyle: "disc",
        paddingLeft: "1rem"
        }}>
        {resolution.notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>);
};

export default Resolution;