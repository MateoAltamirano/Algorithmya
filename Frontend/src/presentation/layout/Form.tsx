import { Button, CircularProgress, Link, Typography } from '@material-ui/core';
import { ReactNode } from 'react';
import { useStyles } from '../theme';

type FormProps = {
  title: string;
  inputs: ReactNode;
  isLoading: boolean;
  btnLabel: string;
  onClick: () => Promise<void>;
  href: string;
  linkDescription: string;
};
const Form = ({
  title,
  inputs,
  isLoading,
  btnLabel,
  onClick,
  href,
  linkDescription,
}: FormProps) => {
  const classes = useStyles();

  return (
    <div className="form-page">
      <div className="form">
        <Typography
          variant="h4"
          style={{ color: 'white', marginBottom: '1rem' }}
        >
          {title}
        </Typography>
        {inputs}
        <div className="form-btn">
          {isLoading ? (
            <CircularProgress style={{ color: 'var(--color-primary)' }} />
          ) : (
            <Button
              className={classes.button}
              onClick={onClick}
              style={{ backgroundColor: 'var(--color-primary)', width: '100%' }}
            >
              {btnLabel}
            </Button>
          )}
        </div>
        <Link href={href} underline="none" style={{ color: 'white' }}>
          {linkDescription}
        </Link>
      </div>
    </div>
  );
};

export default Form;
