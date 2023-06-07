import React, { useState } from 'react';

type Props = {
  buttonClose: (parametro: boolean) => void;
};

function Form(props:Props) {
  const { buttonClose } = props;
  const [formValues, setFormValues] = useState({
    name: '',
    login: '',
    password: '',
    url: '',
  });
  const handleInputChange = (event: { target: { id: any; value: any; }; }) => {
    const { id, value } = event.target;
    setFormValues({ ...formValues, [id]: value });
    passwordVerification(value);
  };
  const isButtonDisabled = !(formValues.name && formValues.login && formValues.password && formValues.password.length >= 8 && formValues.password.length <= 16 && /\d/.test(formValues.password) && /[a-zA-Z]/.test(formValues.password) && /[^a-zA-Z0-9]/.test(formValues.password));

  const [verificationPassword, setVerificationPassword] = useState({
    caracMax: false,
    caracMin: false,
    numberAndLetter: false,
    specialCarac: false,
  });
  const passwordVerification = (password: string) => {
    const caracMax = password.length <= 16;
    const caracMin = password.length >= 8;
    const numberAndLetter = /\d/.test(password) && /[a-zA-Z]/.test(password);
    const specialCarac = /[^a-zA-Z0-9]/.test(password);
    setVerificationPassword({
      caracMax,
      caracMin,
      numberAndLetter,
      specialCarac,
    });
  };

  return (
    <form action="">
      <label htmlFor="name">Nome do serviço</label>
      <input
        type="text"
        id="name"
        value={ formValues.name }
        onChange={ handleInputChange }
      />
      <label htmlFor="login">Login</label>
      <input
        type="text"
        id="login"
        value={ formValues.login }
        onChange={ handleInputChange }
      />
      <label htmlFor="password">Senha</label>
      <input
        type="password"
        id="password"
        value={ formValues.password }
        onChange={ handleInputChange }
      />

      <label className={ verificationPassword.caracMin ? 'valid-password-check' : 'invalid-password-check' }>
        Possuir 8 ou mais caracteres
      </label>
      <label className={ verificationPassword.caracMax ? 'valid-password-check' : 'invalid-password-check' }>
        Possuir até 16 caracteres
      </label>
      <label className={ verificationPassword.numberAndLetter ? 'valid-password-check' : 'invalid-password-check' }>
        Possuir letras e números
      </label>
      <label className={ verificationPassword.specialCarac ? 'valid-password-check' : 'invalid-password-check' }>
        Possuir algum caractere especial
      </label>

      <label htmlFor="url">URL</label>
      <input
        type="text"
        id="url"
        value={ formValues.url }
        onChange={ handleInputChange }
      />
      <input type="button" value="Cadastrar" disabled={ isButtonDisabled } />
      <input onClick={ () => { buttonClose(true); } } type="button" value="Cancelar" />
    </form>
  );
}

export default Form;
