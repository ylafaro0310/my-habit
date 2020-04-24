import React from 'react';
import { Dispatch } from 'redux';
import { Field, InjectedFormProps, change, formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

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
      <form onSubmit={handleSubmit}>
        <div>
          <Field name='habitName' component={CustomText} label='習慣名' />
        </div>
        <div>
          <Field
            name='repeatType'
            component={CustomSelect}
            label={undefined}
            options={[
              {value: 'dayOfWeek', displayName: '日単位'},
              {value: 'week', displayName: '週単位'},
              {value: 'intervale', displayName: 'インターバル'},
            ]}
            callback={(e: React.ChangeEvent<HTMLSelectElement>) => {
              resetRepeatValue(e.target.value);
            }}
          >
          </Field>
        </div>

        {repeatTypeValue === 'week' && (
          <div>
            <label>
              <Field name='repeatValue' component={CustomRadio} code='1' label='週に1回'/>
            </label>
            <label>
              <Field name='repeatValue' component={CustomRadio} code='2' label='週に2回'/>
            </label>
            <label>
              <Field name='repeatValue' component={CustomRadio} code='3' label='週に3回'/>
            </label>
            <label>
              <Field name='repeatValue' component={CustomRadio} code='4' label='週に4回'/>
            </label>
            <label>
              <Field name='repeatValue' component={CustomRadio} code='5' label='週に5回'/>
            </label>
            <label>
              <Field name='repeatValue' component={CustomRadio} code='6' label='週に6回'/>
            </label>
          </div>
        )}

        {repeatTypeValue === 'interval' && (
          <div>
            <label>
              <Field name='repeatValue' component={CustomRadio} code='2' label='2日ごと'/>
            </label>
            <label>
              <Field name='repeatValue' component={CustomRadio} code='3' label='3日ごと'/>
            </label>
            <label>
              <Field name='repeatValue' component={CustomRadio} code='4' label='4日ごと'/>
            </label>
            <label>
              <Field name='repeatValue' component={CustomRadio} code='5' label='5日ごと'/>
            </label>
            <label>
              <Field name='repeatValue' component={CustomRadio} code='6' label='6日ごと'/>
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
        <button type='submit'>{id ? '更新する' : '追加する'}</button>
        {id ? 
          <button 
          type='button' 
          onClick={(e)=>{this.onClickRemove(e,Number(id));}}>
              習慣を削除する
          </button>: null }
      </form>
    );
  };
}


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
