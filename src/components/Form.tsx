import React, { useState } from 'react';

type Props = {
  buttonClose: () => void;
  passwordValidation: (event: any, data: ServicesType) => void;
};
export type ServicesType = {
  name: string;
  login: string;
  password: string;
  url: string;
};
const initialFormValues = {
  name: '',
  login: '',
  password: '',
  url: '',
};
function Form({ buttonClose, passwordValidation }: Props) {
  const [formValues, setFormValues] = useState<ServicesType>(initialFormValues);
  const [service, setService] = useState<ServicesType[]>([]);
  const handleInputChange = (event: { target: { id: any; value: any; }; }) => {
    const { id, value } = event.target;
    setFormValues({ ...formValues, [id]: value });
    passwordVerification(value);
  };
  const isButtonDisabled = !(formValues.name && formValues.login && formValues.password && formValues.password.length >= 8 && formValues.password.length <= 16 && /\d/.test(formValues.password) && /[a-zA-Z]/.test(formValues.password) && /[^a-zA-Z0-9]/.test(formValues.password));
  const valid = 'valid-password-check';
  const invalid = 'invalid-password-check';
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
  const handleCadastro = () => {
    setService([...service, formValues]);
    setFormValues({
      name: '',
      login: '',
      password: '',
      url: '',
    });
  };
  const [showPassword, setShowPassword] = useState(false);
  const showHidePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      action=""
      onSubmit={ (event) => {
        event.preventDefault();
        passwordValidation(event, formValues);
      } }
    >
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
        type={ showPassword ? 'text' : 'password' }
        id="password"
        value={ formValues.password }
        onChange={ handleInputChange }
      />

      <label
        htmlFor="password"
        className={ verificationPassword.caracMin
          ? valid
          : invalid }
      >
        Possuir 8 ou mais caracteres
      </label>
      <label
        htmlFor="password"
        className={ verificationPassword.caracMax
          ? valid
          : invalid }
      >
        Possuir até 16 caracteres
      </label>
      <label
        htmlFor="password"
        className={ verificationPassword.numberAndLetter
          ? valid
          : invalid }
      >
        Possuir letras e números
      </label>
      <label
        htmlFor="password"
        className={ verificationPassword.specialCarac
          ? valid
          : invalid }
      >
        Possuir algum caractere especial
      </label>

      <label htmlFor="url">URL</label>
      <input
        type="text"
        id="url"
        value={ formValues.url }
        onChange={ handleInputChange }
      />
      <button
        type="submit"
        disabled={ isButtonDisabled }
      >
        Cadastrar

      </button>
      <button onClick={ buttonClose }>Cancelar</button>
      <button
        type="button"
        onClick={ showHidePassword }
        data-testid="show-hide-form-password"
      >
        {showPassword ? 'Esconder Senha' : 'Mostrar Senha'}
      </button>
    </form>
  );
}

export default Form;
