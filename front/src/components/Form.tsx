import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { WrappedFieldProps } from 'redux-form';

type CustomCommonProps = {
  label: string;
  code: number;
} & WrappedFieldProps;

type CustomCheckRadioProps = {
  code: number;
} & CustomCommonProps;
export const CustomCheckbox: React.FC<CustomCheckRadioProps> = ({ code, label, input }: CustomCheckRadioProps) => (
  <label>
    <input
      {...input}
      type='checkbox'
      value={code}
      checked={Boolean(Number(input.value) & Number(code))}
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
    {label}
  </label>
);

export const CustomRadio: React.FC<CustomCheckRadioProps> = ({ code, label, input }: CustomCheckRadioProps) => (
  <label>
    <input
      {...input}
      type='radio'
      value={code}
      checked={Number(input.value)===Number(code)}
      onBlur={e => {
        e.preventDefault();
      }}
    />
    {label}
  </label>
);

export const CustomText: React.FC<CustomCommonProps> = ({ label, input }: CustomCommonProps) => (
  <input
    {...input}
    type='text'
    value={input.value}
    placeholder={label}
    onBlur={e => {
      e.preventDefault();
    }}
  />
);


type CustomSelectProps = {
  options: Array<{value: string,displayName: string}>;
  callback: (e: React.ChangeEvent<HTMLSelectElement>) => void;
} & CustomCommonProps;
export const CustomSelect: React.FC<CustomSelectProps> = ({ label, input, options, callback }: CustomSelectProps) => (
  <select {...input} onChange={(e)=>{input.onChange(e);callback(e);}} onBlur={e => {e.preventDefault();}}
>
    {label&&<option disabled>{label}</option>}
    {options.map(elem=>(
      <option value={elem.value}>{elem.displayName}</option>
    ))}
  </select>
);

