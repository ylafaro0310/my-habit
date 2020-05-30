import React from 'react';
import styled from 'styled-components';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { CustomText, ButtonPrimary } from '../components/Form';
import { AuthActions } from '../redux/modules/Auth';

type RegisterProps = {
  errors?: Array<string>;
} 
type Props = RegisterProps & InjectedFormProps<{}, RegisterProps>;

const Register: React.FC<Props> = ({ errors, handleSubmit }) =>
    <Container>
      <h2 style={{'marginTop': 0}}>ユーザー登録画面</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <Field
            component={CustomText}
            label='名前'
            name='name'
          />
        </div>
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
        <ButtonPrimary type='submit'>登録</ButtonPrimary>
      </form>
      {errors && <div className='alert alert-danger'>
        <ul>
          {errors.map((elem, key) => (
            <li key={key}>{elem}</li>
          ))}
        </ul>
      </div>
      }
    </Container>

export default reduxForm<{}, RegisterProps>({
  form: 'register',
  onSubmit: (values, dispatch) => {
    dispatch(AuthActions.register(values));
  },
})(Register)

const Container = styled.div`
  width: 50%;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;
