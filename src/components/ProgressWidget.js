import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

export default function ProgressWidget( {level} ) {

  const sliderWidth = 100;

  const levelMap = {
    UNSTARTED: {
      value: 0,
      color: 'transparent'
    },
    IN_PROGRESS: {
      value: sliderWidth / 2,
      color: 'green'
    },
    COMPLETED: {
      value: sliderWidth,
      color: 'green'
     }
  }

  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 8,
    borderRadius: 4,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: 'lightgray'
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: levelMap[level].color
    },
  }));
  
  return (
    <div>
      <BorderLinearProgress variant="determinate" value={levelMap[level].value} />
    </div>
  );
}

