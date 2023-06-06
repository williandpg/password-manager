import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('3 - Renderize condicionalmente o formulário', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('Renderiza o botão "Cadastrar nova Senha".', () => {
    const registerButton = screen.getByRole('button', { name: /cadastrar nova senha/i });
    expect(registerButton).toBeInTheDocument();
  });

  it('Ao clicar no botão "Cadastrar nova Senha", ele deverá desaparecer.', () => {
    const registerButton = screen.getByRole('button', { name: /cadastrar nova senha/i });
    userEvent.click(registerButton);

    expect(registerButton).not.toBeInTheDocument();
  });

  it('Ao clicar no botão "Cadastrar nova Senha", o formulário deverá ser renderizado.', () => {
    const registerButton = screen.getByRole('button', { name: /cadastrar nova senha/i });
    userEvent.click(registerButton);

    const serviceInput = screen.getByLabelText(/Nome do Serviço/i);
    const loginInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const urlInput = screen.getByLabelText(/url/i);

    expect(serviceInput).toBeInTheDocument();
    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
  });

  it('Ao clicar no botão cancelar do formulário, o formulário deverá desaparecer.', () => {
    const registerButton = screen.getByRole('button', { name: /cadastrar nova senha/i });
    userEvent.click(registerButton);

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    userEvent.click(cancelButton);

    const serviceInput = screen.queryByLabelText(/Nome do Serviço/i);
    const loginInput = screen.queryByLabelText(/Login/i);
    const passwordInput = screen.queryByLabelText(/^Senha/i);
    const urlInput = screen.queryByLabelText(/url/i);

    expect(serviceInput).not.toBeInTheDocument();
    expect(loginInput).not.toBeInTheDocument();
    expect(passwordInput).not.toBeInTheDocument();
    expect(urlInput).not.toBeInTheDocument();
  });

  it('Ao clicar no botão cancelar do formulário, o botão Cadastrar nova Senha deverá aparecer.', () => {
    userEvent.click(screen.getByRole('button', { name: /cadastrar nova senha/i }));

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    userEvent.click(cancelButton);

    expect(screen.getByRole('button', { name: /cadastrar nova senha/i })).toBeInTheDocument();
  });
});
