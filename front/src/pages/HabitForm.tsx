import React from 'react';
import { Dispatch } from 'redux';
import { Field, InjectedFormProps, change, formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';

import dayjs from '../lib/dayjs-ja';
import { HabitsActions } from '../redux/modules/Habits';
import { RouteComponentProps } from 'react-router-dom';
import { CustomRadio, CustomCheckbox, CustomText, CustomSelect } from '../components/Form';

type HabitFormProps = {
  habit: object;
  dispatch: Dispatch;
  repeatTypeValue: string;
  resetRepeatValue: (repeatType: string)=>void;
} & InjectedFormProps<{}, HabitFormProps> & RouteComponentProps<{id: string}>;

const initialValues = {
  habitName: '',
  repeatType: 'dayOfWeek',
  repeatValue: 127,
  startedAt: dayjs().format('YYYY-MM-DD'),
  targetTime: null,
  timeOfDay: 'always',
};

export class HabitForm extends React.Component<HabitFormProps> {
  componentDidMount(){
    const { id } = this.props.match.params;
    const { dispatch } = this.props;
    if(id){
      dispatch(HabitsActions.formInitialize(Number(id))); 
    }
  }

  onClickRemove(event: React.MouseEvent<HTMLButtonElement, MouseEvent>,habitId: number){
    event.preventDefault();
    const { dispatch } = this.props;
    const isYes = window.confirm('この習慣に関する全てのデータが削除されます。この習慣を削除しますか？');
    if(isYes){
      dispatch(HabitsActions.removeHabit(habitId));
    }
  }

  render(){
    const {
      repeatTypeValue,
      handleSubmit,
      resetRepeatValue,
    } = this.props;
    const { id } = this.props.match.params;
    return (
      <Form onSubmit={handleSubmit}>
        <div>
          <Field name='habitName' component={CustomText} label='習慣名' />
        </div>
        <div>
          <Field
            name='repeatType'
            component={CustomSelect}
            label='繰り返し'
            options={[
              {value: 'dayOfWeek', displayName: '日単位'},
              {value: 'week', displayName: '週単位'},
              {value: 'interval', displayName: 'インターバル'},
            ]}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              resetRepeatValue(e.target.value);
            }}
          >
          </Field>
        </div>

        {repeatTypeValue === 'week' && (
          <div>
            <label>
              <Field name='repeatValue' component={CustomRadio} options={[
                {value: '1', displayName: '週に1回'},
                {value: '2', displayName: '週に2回'},
                {value: '3', displayName: '週に3回'},
                {value: '4', displayName: '週に4回'},
                {value: '5', displayName: '週に5回'},
                {value: '6', displayName: '週に6回'},
              ]} />
            </label>
          </div>
        )}

        {repeatTypeValue === 'interval' && (
          <div>
            <label>
              <Field name='repeatValue' component={CustomRadio} options={[
                {value: '2', displayName: '2日ごと'},
                {value: '3', displayName: '3日ごと'},
                {value: '4', displayName: '4日ごと'},
                {value: '5', displayName: '5日ごと'},
                {value: '6', displayName: '6日ごと'},
              ]}/>
            </label>
          </div>
        )}

        {repeatTypeValue === 'dayOfWeek' && (
          <div>
            <Field name='repeatValue' component={CustomCheckbox} options={[
              {value: 0b1000000, displayName: '日曜日'},
              {value: 0b0100000, displayName: '月曜日'},
              {value: 0b0010000, displayName: '火曜日'},
              {value: 0b0001000, displayName: '水曜日'},
              {value: 0b0000100, displayName: '木曜日'},
              {value: 0b0000010, displayName: '金曜日'},
              {value: 0b0000001, displayName: '土曜日'},
            ]} />
          </div>
        )}

        <div>
          <Field name='startedAt' component={CustomText} label='開始日'/>
        </div>
        <div>
          <Field name='targetTime' component={CustomText} label='目標時間(単位:分)'/>
        </div>
        <div>
          <Field name='timeOfDay' 
            component={CustomSelect} 
            label='時間帯'
            options={[
              {value: 'am', displayName:'午前'},
              {value: 'pm', displayName:'午後'},
              {value: 'night', displayName:'夜'},
              {value: 'always', displayName:'いつでも'},
            ]}>
          </Field>
        </div>
        <ButtonPrimary type='submit'>{id ? '更新する' : '追加する'}</ButtonPrimary>
        {id ? 
          <ButtonDanger 
          type='button' 
          onClick={(e)=>{this.onClickRemove(e,Number(id));}}>
              習慣を削除する
          </ButtonDanger>: null }
      </Form>
    );
  };
}

const Form = styled.form`
  padding: 10px;
`

const ButtonPrimary = styled.button`
  min-width: 8em;
  height: 3em;
  border: 1px solid #2196F3;
  border-radius: 5px 5px 5px 5px;
  background-color: #2196F3;
  color: #fff;
  margin: 5px;
  cursor: pointer;
`
const ButtonDanger = styled.button`
  min-width: 9em;
  height: 3em;
  border: 1px solid #F32121;
  border-radius: 5px 5px 5px 5px;
  background-color: #F32121;
  color: #fff;
  margin: 5px;
  cursor: pointer;
`

const selector = formValueSelector('habit');
export default connect(
  (state) => ({
    initialValues: initialValues,
    repeatTypeValue: selector(state, 'repeatType'),
  }),
  dispatch => ({
    resetRepeatValue: (repeatType: string) => {
      repeatType === 'dayOfWeek' 
      ? dispatch(change('habit', 'repeatValue', 127))
      : dispatch(change('habit', 'repeatValue', null));
    },
  }),
)(
  reduxForm<{}, HabitFormProps>({
    form: 'habit',
    onSubmit: (values, dispatch, props) => {
      const { id } = props.match.params;
      if(id){
        const params = {
          habitId: Number(id),
          values
        };
        dispatch(HabitsActions.updateHabit(params));
      }else{
        dispatch(HabitsActions.addHabit(values));
      }
    },
  })(HabitForm),
);
