import { HabitsActions, habitsReducer } from '../Habits';
import Habits from '../../../models/Habits';

const habits = new Habits();

describe('habitsReducer:', () => {
  it('Can set Habits', () => {
    const state = habitsReducer(undefined, HabitsActions.setHabits(habits));
    expect(state.equals(habits)).toBeTruthy();
  });
});
