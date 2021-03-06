import React from 'react';
import styled from 'styled-components';
import { WrappedFieldProps } from 'redux-form';

type CustomCommonProps = {
  label: string;
} & WrappedFieldProps;

type CustomCheckRadioProps = {
  code: number;
  options: Array<{ value: string; displayName: string }>;
} & CustomCommonProps;
export const CustomCheckbox: React.FC<CustomCheckRadioProps> = ({
  code,
  label,
  input,
  options,
}) => (
  <Checkbox>
    {options.map((elem, key) => (
      <label key={key}>
        <input
          {...input}
          checked={Boolean(Number(input.value) & Number(elem.value))}
          onBlur={e => {
            e.preventDefault();
          }}
          onChange={e => {
            let values = Number(input.value) || 0;
            const value = Number(e.target.value);
            const checked = e.target.checked;
            const exists = values & value;
            if (checked && !exists) {
              values = values | value;
            }
            if (!checked && exists) {
              values = values & ~value;
            }
            input.onChange(values);
          }}
          type='checkbox'
          value={elem.value}
        />
        {elem.displayName}
      </label>
    ))}
  </Checkbox>
);

const Checkbox = styled.div`
  & label {
    display: block;
  }
  margin: 5px 5px 30px 5px;
`;

export const CustomRadio: React.FC<CustomCheckRadioProps> = ({
  code,
  label,
  input,
  options,
}) => (
  <Radio>
    {options.map((elem, key) => (
      <label key={key}>
        <input
          {...input}
          checked={Number(input.value) === Number(elem.value)}
          onBlur={e => {
            e.preventDefault();
          }}
          type='radio'
          value={elem.value}
        />
        {elem.displayName}
      </label>
    ))}
  </Radio>
);

const Radio = styled.div`
  & label {
    display: block;
  }
  margin: 5px 5px 30px 5px;
`;

type CustomTextProps = {
  type: string;
} & CustomCommonProps;
export const CustomText: React.FC<CustomTextProps> = ({
  label,
  input,
  type,
}) => (
  <Text>
    <input
      {...input}
      onBlur={e => {
        e.preventDefault();
      }}
      placeholder=' '
      type={type ? type : 'text'}
      value={input.value}
    />
    <label htmlFor={input.name}>{label}</label>
  </Text>
);

const Text = styled.div`
  position: relative;
  height: 5vh;
  margin: 5px 5px 30px 5px;
  & input {
    background: rgba(0, 0, 0, 0);
    width: 100%;
    margin-top: 2vh;
    border: none;
    border-bottom: 1px solid #aaa;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  & input:focus {
    outline: none;
  }
  & input:not(:placeholder-shown),
  input:focus {
    border-bottom: 1px solid #2196f3;
  }

  & label {
    position: absolute;
    pointer-events: none;
    transition: all 0.2s ease;
    color: #aaa;
    left: 0px;
    top: 1vh;
  }

  & input:not(:placeholder-shown) ~ label,
  input:focus ~ label {
    top: -1vh;
    color: #2196f3;
    font-size: 75%;
  }
`;

type CustomSelectProps = {
  options: Array<{ value: string; displayName: string }>;
} & CustomCommonProps;
export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  input,
  options,
}) =>
  options.length <= 5 ? (
    <>
      {label && <SelectLabel>{label}</SelectLabel>}
      <SelectButton>
        {options.map((elem, key) => (
          <SelectButtonChild key={key}>
            <input
              {...input}
              checked={elem.value === input.value}
              id={input.name + '_' + key}
              type='radio'
              value={elem.value}
            />
            <label htmlFor={input.name + '_' + key}>{elem.displayName}</label>
          </SelectButtonChild>
        ))}
      </SelectButton>
    </>
  ) : (
    <select
      {...input}
      onBlur={e => {
        e.preventDefault();
      }}
    >
      {label && <option disabled>{label}</option>}
      {options.map((elem, key) => (
        <option key={key} value={elem.value}>
          {elem.displayName}
        </option>
      ))}
    </select>
  );

const SelectLabel = styled.label`
  color: #2196f3;
  font-size: 75%;
  margin: 5px;
`;

const SelectButtonChild = styled.div`
  display: inline-block;
  margin-right: 5px;
  height: 3vh;
  & input {
    display: none;
  }
  & label {
    display: inline-block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border: 1px solid #aaa;
    border-radius: 5px 5px 5px 5px;
    color: #aaa;
  }
  & input:checked + label {
    border: 1px solid #2196f3;
    border-color: #2196f3;
    color: #222;
  }
`;
const SelectButton = styled.div`
  margin: 5px 5px 30px 5px;
  & div:first-child:nth-last-child(2),
  div:first-child:nth-last-child(2) ~ div {
    width: calc(90% / 2);
    @media screen and (max-width: 768px) {
      width: calc(90% / 2);
    }
  }
  & div:first-child:nth-last-child(3),
  div:first-child:nth-last-child(3) ~ div {
    width: calc(90% / 3);
    @media screen and (max-width: 768px) {
      width: calc(90% / 3);
    }
  }
  & div:first-child:nth-last-child(4),
  div:first-child:nth-last-child(4) ~ div {
    width: calc(90% / 4);
    @media screen and (max-width: 768px) {
      width: calc(90% / 4);
    }
  }
  & div:first-child:nth-last-child(5),
  div:first-child:nth-last-child(5) ~ div {
    width: calc(90% / 5);
    @media screen and (max-width: 768px) {
      width: calc(90% / 5);
    }
  }
`;

type FormProps = {
  onSubmit: any;
};
export const Form: React.FC<FormProps> = ({ children, onSubmit }) => (
  <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
);

const StyledForm = styled.form`
  margin: 0 auto;
  width: 50%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const ButtonPrimary: React.FC<React.ButtonHTMLAttributes<
  HTMLButtonElement
>> = ({ children, onClick, type }) => (
  <StyledButtonPrimary onClick={onClick} type={type}>
    {children}
  </StyledButtonPrimary>
);

export const ButtonDanger: React.FC<React.ButtonHTMLAttributes<
  HTMLButtonElement
>> = ({ children, onClick, type }) => (
  <StyledButtonDanger onClick={onClick} type={type}>
    {children}
  </StyledButtonDanger>
);

const StyledButton = styled.button`
  min-width: 8em;
  height: 3em;
  border: 1px solid #2196f3;
  border-radius: 5px 5px 5px 5px;
  background-color: #2196f3;
  color: #fff;
  margin: 5px;
  cursor: pointer;
`;

const StyledButtonPrimary = styled(StyledButton)`
  border-color: #2196f3;
  background-color: #2196f3;
  color: #fff;
`;

const StyledButtonDanger = styled(StyledButton)`
  border-color: #f32121;
  background-color: #f32121;
  color: #fff;
`;
