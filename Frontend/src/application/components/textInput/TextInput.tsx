import { Button, TextField } from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';
import { useStyles } from '../../../presentation/theme';
import './TextInput.css';

type TextInputProps = {
  buttonLabel?: string;
  hasButton: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  buttonAction?: () => void;
  type?: string;
  isDoubleInput?: boolean;
  secondInputProps?: SecondInputProps;
  disabled?: boolean;
};

type SecondInputProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  type?: string;
};

const TextInput = ({
  value,
  setValue,
  hasButton,
  buttonLabel,
  placeholder,
  buttonAction,
  type = 'text',
  isDoubleInput = false,
  secondInputProps,
  disabled = false,
}: TextInputProps) => {
  const classes = useStyles();
  return (
    <div className="text-input">
      <TextField
        className={classes.textField}
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
      />
      {isDoubleInput ? (
        <TextField
          className={classes.textField}
          variant="outlined"
          value={secondInputProps!.value}
          onChange={(e) => secondInputProps!.setValue(e.target.value)}
          placeholder={secondInputProps!.placeholder}
          type={secondInputProps!.type}
        />
      ) : undefined}
      {hasButton ? (
        <Button className={classes.button} onClick={buttonAction}>
          {buttonLabel}
        </Button>
      ) : undefined}
    </div>
  );
};

export default TextInput;
