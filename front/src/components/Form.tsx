import React from 'react';
import styled from 'styled-components';
import { WrappedFieldProps } from 'redux-form';

type CustomCommonProps = {
  label: string;
} & WrappedFieldProps;

type CustomCheckRadioProps = {
  code: number;
  options: Array<{value: string,displayName: string}>;
} & CustomCommonProps;
export const CustomCheckbox: React.FC<CustomCheckRadioProps> = ({ code, label, input, options }: CustomCheckRadioProps) => (
  <Checkbox>
    {options.map((elem,key)=>(
      <label key={key}>
      <input
      {...input}
      type='checkbox'
      value={elem.value}
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
`

export const CustomRadio: React.FC<CustomCheckRadioProps> = ({ code, label, input, options }: CustomCheckRadioProps) => (
  <Radio>
    {options.map((elem,key)=>(
      <label key={key}>
      <input
          {...input}
          type='radio'
          value={elem.value}
          checked={Number(input.value)===Number(elem.value)}
          onBlur={e => {
            e.preventDefault();
          }}
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
`

export const CustomText: React.FC<CustomCommonProps> = ({ label, input }: CustomCommonProps) => (
  <Text>
    <input
      {...input}
      type='text'
      value={input.value}
      placeholder=' '
      onBlur={e => {
        e.preventDefault();
      }}
    />
    <label htmlFor={input.name}>{label}</label>
  </Text>
);  

const Text = styled.div`
  position: relative;
  height: 5vh;
  margin: 5px 5px 30px 5px;
  & input {
    background: rgba(0,0,0,0);
    width: 50vw;
    margin-top: 2vh;
    border: none;
    border-bottom: 1px solid #aaa;
    @media screen and (max-width: 768px) {
      width: 100vw;
    }
  }
  & input:focus {
    outline: none;
  }
  & input:not(:placeholder-shown), input:focus {
    border-bottom: 1px solid #2196F3;
  }

  & label {
    position: absolute;
    pointer-events: none;
    transition: all 0.2s ease;
    color: #aaa;
    left: 0px;
    top:  1vh;
  }

  & input:not(:placeholder-shown) ~ label, input:focus ~ label {
    top: -1vh;
    color: #2196F3;
    font-size: 75%;
  }
`

type CustomSelectProps = {
  options: Array<{value: string,displayName: string}>;
} & CustomCommonProps;
export const CustomSelect: React.FC<CustomSelectProps> = ({ label, input, options }) => (
  options.length <= 5 ?
    <>
    {label&&<SelectLabel>{label}</SelectLabel>}
    <SelectButton>
        {options.map((elem,key)=>(
        <SelectButtonChild key={key} >
          <input {...input} type='radio' id={input.name+'_'+key} value={elem.value} checked={elem.value === input.value}/>
          <label htmlFor={input.name+'_'+key}>
              {elem.displayName}
          </label>
        </SelectButtonChild>
      ))}
    </SelectButton>
    </>
  : <select {...input} onBlur={e => {e.preventDefault();}}
>
  {label&&<option disabled>{label}</option>}
    {options.map((elem,key)=>(
      <option key={key} value={elem.value}>{elem.displayName}</option>
    ))}
  </select>
);

const SelectLabel = styled.label`
  color: #2196F3;
  font-size: 75%;
  margin: 5px;
`

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
    border: 1px solid #2196F3;
    border-color: #2196F3;
    color: #222;
  }
`
const SelectButton = styled.div`
  margin: 5px 5px 30px 5px;
  & div:first-child:nth-last-child(2),
    div:first-child:nth-last-child(2) ~ div {
      width: calc(50% / 2);
      @media screen and (max-width: 768px) {
        width: calc(90% / 2);
      }
    }
  & div:first-child:nth-last-child(3),
  div:first-child:nth-last-child(3) ~ div {
    width: calc(50% / 3);
    @media screen and (max-width: 768px) {
      width: calc(90% / 3);
    }
}
  & div:first-child:nth-last-child(4),
    div:first-child:nth-last-child(4) ~ div {
      width: calc(50% / 4);
      @media screen and (max-width: 768px) {
        width: calc(90% / 4);
      }
    }
  & div:first-child:nth-last-child(5),
  div:first-child:nth-last-child(5) ~ div {
    width: calc(50% / 5);
    @media screen and (max-width: 768px) {
      width: calc(90% / 5);
    }
}
`