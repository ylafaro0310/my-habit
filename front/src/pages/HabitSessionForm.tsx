import React from 'react';
import { Dispatch } from 'redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { State } from '../redux/store';
import dayjs from '../lib/dayjs-ja';
import { HabitSessionsActions } from '../redux/modules/HabitSessions';
import {
  ButtonDanger,
  ButtonPrimary,
  CustomText,
  Form,
} from '../components/Form';
import SessionHeader from '../components/SessionHeader';
import Habits from '../models/Habits';

type HabitSessionFormProps = {
  habits: Habits;
  habitSession: object;
  dispatch: Dispatch;
} & InjectedFormProps<{}, HabitSessionFormProps> &
  RouteComponentProps<{ habitId: string; habitSessionId: string }>;

const initialValues = {
  id: 0,
  workingMinutes: 0,
  completedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

export class HabitSessionForm extends React.Component<HabitSessionFormProps> {
  componentDidMount() {
    const { habitId, habitSessionId } = this.props.match.params;
    const { dispatch } = this.props;
    if (habitId && habitSessionId) {
      dispatch(
        HabitSessionsActions.formInitialize({
          habitId: Number(habitId),
          habitSessionId: Number(habitSessionId),
        }),
      );
    }
  }

  onClickRemove(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    habitId: number,
    habitSessionId: number,
  ): void {
    event.preventDefault();
    const { dispatch } = this.props;
    const isYes = window.confirm(
      'この習慣に関する全てのデータが削除されます。この習慣を削除しますか？',
    );
    if (isYes) {
      dispatch(
        HabitSessionsActions.removeHabitSession({ habitId, habitSessionId }),
      );
    }
  }

  render() {
    const { habits, handleSubmit } = this.props;
    const { habitId, habitSessionId } = this.props.match.params;
    return (
      <>
        <SessionHeader
          backTo={'/habits/' + habitId + '/sessions/list'}
          habitName={
            habits
            ? habits.getList().find(elem => elem.id === Number(habitId))
              ?.habitName || ''
            : ''
          }
        />
        <Form onSubmit={handleSubmit}>
          <div>
            <Field
              component={CustomText}
              label='作業時間'
              name='workingMinutes'
            />
          </div>
          <div>
            <Field component={CustomText} label='完了日時' name='completedAt' />
          </div>
          <ButtonPrimary type='submit'>
            {habitSessionId ? '更新する' : '追加する'}
          </ButtonPrimary>
          {habitSessionId ? (
            <ButtonDanger
              onClick={e => {
                this.onClickRemove(e, Number(habitId), Number(habitSessionId));
              }}
              type='button'
            >
              セッションを削除する
            </ButtonDanger>
          ) : null}
        </Form>
      </>
    );
  }
}

export default connect((state: State) => ({
  initialValues: initialValues,
  habits: state.habits,
}))(
  reduxForm<{}, HabitSessionFormProps>({
    form: 'habitSession',
    onSubmit: (values, dispatch, props) => {
      const { habitId, habitSessionId } = props.match.params;
      const params = {
        habitId: Number(habitId),
        habitSessionId: Number(habitSessionId),
        values,
      };
      if (habitSessionId) {
        dispatch(HabitSessionsActions.updateHabitSession(params));
      } else {
        dispatch(HabitSessionsActions.addHabitSession(params));
      }
    },
  })(HabitSessionForm),
);
