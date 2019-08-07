import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

export default function SignUp() {
  const dispatch = useDispatch();
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um email válido')
      .required('O email é obrigatório'),
    password: Yup.string()
      .min(6, 'A senha deve conter no mínimo 6 caracteres')
      .required('A senha é obrigatória'),
  });

  return (
    <>
      <img src={logo} alt="" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu email" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login!</Link>
      </Form>
    </>
  );
}
