import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { noLettersPassword, noNumbersPassword, noSpecialPassword, smallPassword, tooBigPassword, validForm } from './utils';
import App from '../App';

describe('4 - Validar os campos do formulário', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('Botão "Cadastrar" deve estar desabilitado se nenhum campo do formulário for preenchido.', () => {
    const registerButton = screen.getByRole('button', { name: /cadastrar nova senha/i });

    userEvent.click(registerButton);

    const submitButton = screen.getByRole('button', { name: /Cadastrar/i });
    expect(submitButton).toBeDisabled();
  });

  it('Botão "Cadastrar" deve estar desabilitado caso o campo "Nome do Serviço" não esteja preenchido.', () => {
    const registerButton = screen.getByRole('button', { name: /cadastrar nova senha/i });

    userEvent.click(registerButton);

    const loginInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const urlInput = screen.getByLabelText(/url/i);

    userEvent.type(loginInput, validForm.login);
    userEvent.type(passwordInput, validForm.password);
    userEvent.type(urlInput, validForm.url);

    const submitButton = screen.getByRole('button', { name: /Cadastrar/i });
    expect(submitButton).toBeDisabled();
  });

  it('Botão deve estar desabilitado caso o campo "Login" não esteja preenchido.', () => {
    const registerButton = screen.getByRole('button', { name: /cadastrar nova senha/i });

    userEvent.click(registerButton);

    const serviceInput = screen.getByLabelText(/Nome do Serviço/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const urlInput = screen.getByLabelText(/url/i);

    userEvent.type(serviceInput, validForm.service);
    userEvent.type(passwordInput, validForm.password);
    userEvent.type(urlInput, validForm.url);

    const submitButton = screen.getByRole('button', { name: /Cadastrar/i });
    expect(submitButton).toBeDisabled();
  });

  it('Botão deve estar desabilitado caso a senha tenha menos de 8 caracteres.', () => {
    const registerButton = screen.getByRole('button', { name: /cadastrar nova senha/i });

    userEvent.click(registerButton);

    const serviceInput = screen.getByLabelText(/Nome do Serviço/i);
    const loginInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const urlInput = screen.getByLabelText(/url/i);

    userEvent.type(serviceInput, validForm.service);
    userEvent.type(loginInput, validForm.login);
    userEvent.type(passwordInput, smallPassword);
    userEvent.type(urlInput, validForm.url);

    const submitButton = screen.getByRole('button', { name: /Cadastrar/i });
    expect(submitButton).toBeDisabled();
  });

  it('Botão deve estar desabilitado caso a senha tenha mais de 16 caracteres.', () => {
    const registerButton = screen.getByRole('button', { name: /cadastrar nova senha/i });

    userEvent.click(registerButton);

    const serviceInput = screen.getByLabelText(/Nome do Serviço/i);
    const loginInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const urlInput = screen.getByLabelText(/url/i);

    userEvent.type(serviceInput, validForm.service);
    userEvent.type(loginInput, validForm.login);
    userEvent.type(passwordInput, tooBigPassword);
    userEvent.type(urlInput, validForm.url);

    const submitButton = screen.getByRole('button', { name: /Cadastrar/i });
    expect(submitButton).toBeDisabled();
  });

  it('Botão deve estar desabilitado caso a senha não contenha números.', () => {
    const registerButton = screen.getByRole('button', { name: /cadastrar nova senha/i });

    userEvent.click(registerButton);

    const serviceInput = screen.getByLabelText(/Nome do Serviço/i);
    const loginInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const urlInput = screen.getByLabelText(/url/i);

    userEvent.type(serviceInput, validForm.service);
    userEvent.type(loginInput, validForm.login);
    userEvent.type(passwordInput, noNumbersPassword);
    userEvent.type(urlInput, validForm.url);

    const submitButton = screen.getByRole('button', { name: /Cadastrar/i });
    expect(submitButton).toBeDisabled();
  });

  it('Botão deve estar desabilitado caso a senha não contenha letras.', () => {
    const registerButton = screen.getByRole('button', { name: /cadastrar nova senha/i });

    userEvent.click(registerButton);

    const serviceInput = screen.getByLabelText(/Nome do Serviço/i);
    const loginInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const urlInput = screen.getByLabelText(/url/i);

    userEvent.type(serviceInput, validForm.service);
    userEvent.type(loginInput, validForm.login);
    userEvent.type(passwordInput, noLettersPassword);
    userEvent.type(urlInput, validForm.url);

    const submitButton = screen.getByRole('button', { name: /Cadastrar/i });
    expect(submitButton).toBeDisabled();
  });

  it('Botão deve estar desabilitado caso a senha não contenha caracteres especiais.', () => {
    const registerButton = screen.getByRole('button', { name: /cadastrar nova senha/i });

    userEvent.click(registerButton);

    const serviceInput = screen.getByLabelText(/Nome do Serviço/i);
    const loginInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const urlInput = screen.getByLabelText(/url/i);

    userEvent.type(serviceInput, validForm.service);
    userEvent.type(loginInput, validForm.login);
    userEvent.type(passwordInput, noSpecialPassword);
    userEvent.type(urlInput, validForm.url);

    const submitButton = screen.getByRole('button', { name: /Cadastrar/i });
    expect(submitButton).toBeDisabled();
  });

  it('Botão deve estar habilitado caso todos os campos sejam preenchidos corretamente.', () => {
    const registerButton = screen.getByRole('button', { name: /cadastrar nova senha/i });

    userEvent.click(registerButton);

    const serviceInput = screen.getByLabelText(/Nome do Serviço/i);
    const loginInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const urlInput = screen.getByLabelText(/url/i);

    userEvent.type(serviceInput, validForm.service);
    userEvent.type(loginInput, validForm.login);
    userEvent.type(passwordInput, validForm.password);
    userEvent.type(urlInput, validForm.url);

    const submitButton = screen.getByRole('button', { name: /Cadastrar/i });
    expect(submitButton).toBeEnabled();
  });
});
