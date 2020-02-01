import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Field, InjectedFormProps, clearFields, formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

interface HabitFormProps {
  habit: object;
  repeatTypeValue: string;
  clearFields: any;
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
  clearFields,
  pristine,
  reset,
  submitting,
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
            clearFields();
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
          <label>
            <Field name='repeatValue' component='input' type='checkbox' value='6' />
            日曜日
          </label>
          <label>
            <Field name='repeatValue' component='input' type='checkbox' value='2' />
            月曜日
          </label>
          <label>
            <Field name='repeatValue' component='input' type='checkbox' value='3' />
            火曜日
          </label>
          <label>
            <Field name='repeatValue' component='input' type='checkbox' value='4' />
            水曜日
          </label>
          <label>
            <Field name='repeatValue' component='input' type='checkbox' value='5' />
            木曜日
          </label>
          <label>
            <Field name='repeatValue' component='input' type='checkbox' value='6' />
            金曜日
          </label>
          <label>
            <Field name='repeatValue' component='input' type='checkbox' value='6' />
            土曜日
          </label>
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
export default connect(
  (state, props: HabitFormProps) => ({
    initialValues: props.habit || initialValues,
    repeatTypeValue: selector(state, 'repeatType'),
  }),
  dispatch => ({
    clearFields: () => {
      dispatch(clearFields('habit', false, false, 'repeatValue'));
    },
  }),
)(
  reduxForm<{}, HabitFormProps>({
    form: 'habit',
  })(HabitForm),
);
