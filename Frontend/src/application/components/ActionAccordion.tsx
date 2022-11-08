import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { ReactNode } from 'react';
import { useStyles } from '../../presentation/theme';

type ActionAccordionProps = {
  label: string;
  body: ReactNode;
};

const ActionAccordion = ({ body, label }: ActionAccordionProps) => {
  const classes = useStyles();

  return (
    <Accordion classes={{ root: classes.accordion }}>
      <AccordionSummary
        classes={{ root: classes.accordionSummary }}
        expandIcon={<ExpandMore style={{ fill: 'white' }} />}
      >
        <Typography>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>{body}</AccordionDetails>
    </Accordion>
  );
};

export default ActionAccordion;
