import React from 'react';
import { Dispatch } from 'redux';
import {
  Field,
  InjectedFormProps,
  change,
  formValueSelector,
  reduxForm,
} from 'redux-form';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import dayjs from '../lib/dayjs-ja';
import { HabitsActions } from '../redux/modules/Habits';
import {
  ButtonDanger,
  ButtonPrimary,
  CustomCheckbox,
  CustomRadio,
  CustomSelect,
  CustomText,
  Form,
} from '../components/Form';
import HabitHeader from '../components/HabitHeader';
import { State } from '../redux/store';
import Habits from '../models/Habits';
import StyledCard from '../components/Card';

type HabitFormProps = {
  habits: Habits;
  dispatch: Dispatch;
  repeatTypeValue: string;
  resetRepeatValue: (repeatType: string) => void;
} & InjectedFormProps<{}, HabitFormProps> &
  RouteComponentProps<{ id: string }>;

const initialValues = {
  habitName: '',
  repeatType: 'dayOfWeek',
  repeatValue: 127,
  startedAt: dayjs().format('YYYY-MM-DD'),
  targetTime: null,
  timeOfDay: 'always',
};

export class HabitForm extends React.Component<HabitFormProps> {
  componentDidMount() {
    const { id } = this.props.match.params;
    const { dispatch } = this.props;
    if (id) {
      dispatch(HabitsActions.formInitialize(Number(id)));
    }
  }

  onClickRemove(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    habitId: number,
  ) {
    event.preventDefault();
    const { dispatch } = this.props;
    const isYes = window.confirm(
      'この習慣に関する全てのデータが削除されます。この習慣を削除しますか？',
    );
    if (isYes) {
      dispatch(HabitsActions.removeHabit(habitId));
    }
  }

  render() {
    const { repeatTypeValue, handleSubmit, resetRepeatValue } = this.props;
    const { id } = this.props.match.params;
    const { habits } = this.props;
    const habit = habits ? habits.getById(Number(id)) : null;
    return (
      <>
        <HabitHeader
          backTo='/records'
          habitName={habit ? habit.habitName : ''}
        />
        <StyledCard>
          <Form onSubmit={handleSubmit}>
            <div>
              <Field component={CustomText} label='習慣名' name='habitName' />
            </div>
            <div>
              <Field
                component={CustomSelect}
                label='繰り返し'
                name='repeatType'
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  resetRepeatValue(e.target.value);
                }}
                options={[
                  { value: 'dayOfWeek', displayName: '日単位' },
                  { value: 'week', displayName: '週単位' },
                  { value: 'interval', displayName: 'インターバル' },
                ]}
              ></Field>
            </div>

            {repeatTypeValue === 'week' && (
              <div>
                <label>
                  <Field
                    component={CustomRadio}
                    name='repeatValue'
                    options={[
                      { value: '1', displayName: '週に1回' },
                      { value: '2', displayName: '週に2回' },
                      { value: '3', displayName: '週に3回' },
                      { value: '4', displayName: '週に4回' },
                      { value: '5', displayName: '週に5回' },
                      { value: '6', displayName: '週に6回' },
                    ]}
                  />
                </label>
              </div>
            )}

            {repeatTypeValue === 'interval' && (
              <div>
                <label>
                  <Field
                    component={CustomRadio}
                    name='repeatValue'
                    options={[
                      { value: '2', displayName: '2日ごと' },
                      { value: '3', displayName: '3日ごと' },
                      { value: '4', displayName: '4日ごと' },
                      { value: '5', displayName: '5日ごと' },
                      { value: '6', displayName: '6日ごと' },
                    ]}
                  />
                </label>
              </div>
            )}

            {repeatTypeValue === 'dayOfWeek' && (
              <div>
                <Field
                  component={CustomCheckbox}
                  name='repeatValue'
                  options={[
                    { value: 0b1000000, displayName: '日曜日' },
                    { value: 0b0100000, displayName: '月曜日' },
                    { value: 0b0010000, displayName: '火曜日' },
                    { value: 0b0001000, displayName: '水曜日' },
                    { value: 0b0000100, displayName: '木曜日' },
                    { value: 0b0000010, displayName: '金曜日' },
                    { value: 0b0000001, displayName: '土曜日' },
                  ]}
                />
              </div>
            )}

            <div>
              <Field component={CustomText} label='開始日' name='startedAt' />
            </div>
            <div>
              <Field
                component={CustomText}
                label='目標時間(単位:分)'
                name='targetTime'
              />
            </div>
            <div>
              <Field
                component={CustomText}
                label='数値目標'
                name='numericalGoal'
              />
              <Field
                component={CustomText}
                label='数値目標の単位'
                name='numericalGoalUnit'
              />
              <Field
                component={CustomSelect}
                label='数値目標の期間'
                name='perWhat'
                options={[
                  { value: 'perDay', displayName: '1日あたり' },
                  { value: 'perWeek', displayName: '1週間あたり' },
                  { value: 'perMonth', displayName: '1ヶ月あたり' },
                ]}
              />
            </div>
            <div>
              <Field
                component={CustomSelect}
                label='時間帯'
                name='timeOfDay'
                options={[
                  { value: 'am', displayName: '午前' },
                  { value: 'pm', displayName: '午後' },
                  { value: 'night', displayName: '夜' },
                  { value: 'always', displayName: 'いつでも' },
                ]}
              ></Field>
            </div>
            <ButtonPrimary type='submit'>
              {id ? '更新する' : '追加する'}
            </ButtonPrimary>
            {id ? (
              <ButtonDanger
                onClick={e => {
                  this.onClickRemove(e, Number(id));
                }}
                type='button'
              >
                習慣を削除する
              </ButtonDanger>
            ) : null}
          </Form>
        </StyledCard>
      </>
    );
  }
}

const selector = formValueSelector('habit');
export default connect(
  (state: State) => ({
    habits: state.habits,
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
      if (id) {
        const params = {
          habitId: Number(id),
          values,
        };
        dispatch(HabitsActions.updateHabit(params));
      } else {
        dispatch(HabitsActions.addHabit(values));
      }
    },
  })(HabitForm),
);
