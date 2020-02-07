import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Field, InjectedFormProps, WrappedFieldProps, change, formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

type CustomCheckboxProps = {
  label: string;
  code: number;
} & WrappedFieldProps;

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ code, label, input }: CustomCheckboxProps) => (
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

interface HabitFormProps {
  habit: object;
  repeatTypeValue: string;
  dispatch: any;
  change: any;
}
interface HabitFormState {
  habitName: string;
  repeatType: string;
  repeatValue: number;
  startedDate: Dayjs;
  targetTime: number;
  timeOfDay: string;
}
const initialValues = {
  habitName: '',
  repeatType: 'dayOfWeek',
  repeatValue: 127,
  startedDate: dayjs().format('YYYY-MM-DD'),
  targetTime: 0,
  timeOfDay: 'always',
};
const HabitForm: React.FC<HabitFormProps & InjectedFormProps<{}, HabitFormProps>> = ({
  repeatTypeValue,
  handleSubmit,
  dispatch,
  change,
}: HabitFormProps & InjectedFormProps<{}, HabitFormProps>) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='habitName'>習慣名</label>
        <Field name='habitName' component='input' type='text' />
      </div>
      <div>
        <Field
          name='repeatType'
          component='select'
          onChange={() => {
            dispatch(change('repeatValue', null));
          }}
        >
          <option value={'dayOfWeek'}>日単位</option>
          <option value={'week'}>週単位</option>
          <option value={'interval'}>インターバル</option>
        </Field>
      </div>

      {repeatTypeValue === 'week' && (
        <div>
          <label>
            <Field name='repeatValue' component='input' type='radio' value='1' />
            週に1回
          </label>
          <label>
            <Field name='repeatValue' component='input' type='radio' value='2' />
            週に2回
          </label>
          <label>
            <Field name='repeatValue' component='input' type='radio' value='3' />
            週に3回
          </label>
          <label>
            <Field name='repeatValue' component='input' type='radio' value='4' />
            週に4回
          </label>
          <label>
            <Field name='repeatValue' component='input' type='radio' value='5' />
            週に5回
          </label>
          <label>
            <Field name='repeatValue' component='input' type='radio' value='6' />
            週に6回
          </label>
        </div>
      )}

      {repeatTypeValue === 'interval' && (
        <div>
          <label>
            <Field name='repeatValue' component='input' type='radio' value='2' />
            2日ごと
          </label>
          <label>
            <Field name='repeatValue' component='input' type='radio' value='3' />
            3日ごと
          </label>
          <label>
            <Field name='repeatValue' component='input' type='radio' value='4' />
            4日ごと
          </label>
          <label>
            <Field name='repeatValue' component='input' type='radio' value='5' />
            5日ごと
          </label>
          <label>
            <Field name='repeatValue' component='input' type='radio' value='6' />
            6日ごと
          </label>
        </div>
      )}

      {repeatTypeValue === 'dayOfWeek' && (
        <div>
          <Field name='repeatValue' component={CustomCheckbox} code={0b1000000} label='日曜日' />
          <Field name='repeatValue' component={CustomCheckbox} code={0b0100000} label='月曜日' />
          <Field name='repeatValue' component={CustomCheckbox} code={0b0010000} label='火曜日' />
          <Field name='repeatValue' component={CustomCheckbox} code={0b0001000} label='水曜日' />
          <Field name='repeatValue' component={CustomCheckbox} code={0b0000100} label='木曜日' />
          <Field name='repeatValue' component={CustomCheckbox} code={0b0000010} label='金曜日' />
          <Field name='repeatValue' component={CustomCheckbox} code={0b0000001} label='土曜日' />
        </div>
      )}

      <div>
        <label htmlFor='startedDate'>開始日</label>
        <Field name='startedDate' component='input' type='text' />
      </div>
      <div>
        <label htmlFor='targetTime'>目標時間</label>
        <Field name='targetTime' component='input' type='text' />
      </div>
      <div>
        <label htmlFor='timeOfDay'>時間帯</label>
        <Field name='timeOfDay' component='select'>
          <option value='am'>午前</option>
          <option value='pm'>午後</option>
          <option value='night'>夜</option>
          <option value='always'>いつでも</option>
        </Field>
      </div>
    </form>
  );
};

const selector = formValueSelector('habit');
export default connect((state, props: HabitFormProps) => ({
  initialValues: props.habit || initialValues,
  repeatTypeValue: selector(state, 'repeatType'),
}))(
  reduxForm<{}, HabitFormProps>({
    form: 'habit',
  })(HabitForm),
);
