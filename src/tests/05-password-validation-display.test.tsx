import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import {
  noNumbersPassword, noSpecialPassword, passwordClass, smallPassword, tooBigPassword, validForm,
} from './utils';

describe('5 - Crie um display para a validação da senha', () => {
  beforeEach(() => {
    render(<App />);

    const registerButton = screen.getByRole('button', { name: /cadastrar nova senha/i });
    userEvent.click(registerButton);
  });

  it('Renderizar a mensagem "Possuir 8 ou mais caracteres" com a classe "valid-password-check" caso a senha possua 8 ou mais caracteres.', () => {
    const passwordInput = screen.getByLabelText(/^Senha/i);
    userEvent.type(passwordInput, validForm.password);

    const message = screen.getByText(/possuir 8 ou mais caracteres/i);
    expect(message).toHaveClass(passwordClass.valid);
  });

  it('Renderizar a mensagem "Possuir 8 ou mais caracteres" com a classe "invalid-password-check" caso a senha possua menos de 8 caracteres.', () => {
    const passwordInput = screen.getByLabelText(/^Senha/i);
    userEvent.type(passwordInput, smallPassword);

    const message = screen.getByText(/possuir 8 ou mais caracteres/i);
    expect(message).toHaveClass(passwordClass.invalid);
  });

  it('Renderiza a mensagem "Possuir até 16 caracteres" com a classe "valid-password-check" caso a senha possua 16 caracteres ou menos.', () => {
    const passwordInput = screen.getByLabelText(/^Senha/i);
    userEvent.type(passwordInput, validForm.password);

    const message = screen.getByText(/Possuir até 16 caracteres/i);
    expect(message).toHaveClass(passwordClass.valid);
  });

  it('Renderiza a mensagem "Possuir até 16 caracteres" com a classe "invalid-password-check" caso a senha possua mais de 16 caracteres.', () => {
    const passwordInput = screen.getByLabelText(/^Senha/i);
    userEvent.type(passwordInput, tooBigPassword);

    const message = screen.getByText(/Possuir até 16 caracteres/i);
    expect(message).toHaveClass(passwordClass.invalid);
  });

  it('Renderiza a mensagem "Possuir letras e números" com a classe "valid-password-check" caso a senha possua letras e números.', () => {
    const passwordInput = screen.getByLabelText(/^Senha/i);
    userEvent.type(passwordInput, validForm.password);

    const message = screen.getByText(/Possuir letras e números/i);
    expect(message).toHaveClass(passwordClass.valid);
  });

  it('Renderiza a mensagem "Possuir letras e números" com a classe "invalid-password-check" caso a senha não possua letras e números.', () => {
    const passwordInput = screen.getByLabelText(/^Senha/i);
    userEvent.type(passwordInput, noNumbersPassword);

    const message = screen.getByText(/Possuir letras e números/i);
    expect(message).toHaveClass(passwordClass.invalid);
  });

  it('Renderiza a mensagem "Possuir algum caractere especial" com a classe "valid-password-check" caso a senha possua caractere especial.', () => {
    const passwordInput = screen.getByLabelText(/^Senha/i);
    userEvent.type(passwordInput, validForm.password);

    const message = screen.getByText(/Possuir algum caractere especial/i);
    expect(message).toHaveClass(passwordClass.valid);
  });

  it('Renderiza a mensagem "Possuir algum caractere especial" com a classe "invalid-password-check" caso a senha não possua caractere especial.', () => {
    const passwordInput = screen.getByLabelText(/^Senha/i);
    userEvent.type(passwordInput, noSpecialPassword);

    const message = screen.getByText(/Possuir algum caractere especial/i);
    expect(message).toHaveClass(passwordClass.invalid);
  });
});
