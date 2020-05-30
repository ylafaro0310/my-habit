import React from 'react';
import styled from 'styled-components';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';

import { CustomText } from '../components/Form';
import { AuthActions } from '../redux/modules/Auth';
import { Path } from '../routes';

type Props = {
  isLoggedIn: boolean;
  errors: Array<string>;
} & InjectedFormProps<{}, Props, string>;

const Login: React.FC<Props> = ({ isLoggedIn, errors, handleSubmit }) =>
  isLoggedIn ? (
    <Redirect to={Path.records} />
  ) : (
    <Container>
      <h2>ログイン画面</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <Field
            component={CustomText}
            label='メールアドレス'
            name='email'
            type='email'
          />
        </div>
        <div>
          <Field
            component={CustomText}
            label='パスワード'
            name='password'
            type='password'
          />
        </div>
        <div>
          <Field
            component={CustomText}
            label='パスワード(確認用)'
            name='password_confirmation'
            type='password'
          />
        </div>
        <div>
          <Field
            component='input'
            id='remember'
            name='remember'
            type='checkbox'
          />
          <label htmlFor='remember'>ログイン状態を記憶する</label>
        </div>
        <button type='submit'>ログイン</button>
      </form>
      <div className='alert alert-danger'>
        <ul>
          {errors.map((elem, key) => (
            <li key={key}>{elem}</li>
          ))}
        </ul>
      </div>
    </Container>
  );

export default reduxForm<{}, Props>({
  form: 'login',
  onSubmit: (values, dispatch) => {
    dispatch(AuthActions.login(values));
  },
})(Login);

const Container = styled.div`
  width: 50%;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;
