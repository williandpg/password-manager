import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('2 - Crie um componente Form', () => {
  beforeEach(() => {
    render(<App />);

    const registerButton = screen.queryByRole('button', { name: /cadastrar nova senha/i });

    if (registerButton) {
      userEvent.click(registerButton);
    }
  });

  it('Componente Form possui um input associado a uma label com o texto "Nome do Serviço".', () => {
    const serviceInput = screen.getByLabelText(/Nome do Serviço/i);
    expect(serviceInput).toBeInTheDocument();
    expect(serviceInput).toHaveAttribute('type', 'text');

    userEvent.type(serviceInput, 'Trybe Account');
    expect(serviceInput).toHaveValue('Trybe Account');
  });

  it('Componente Form possui um input associado a uma label com o texto "Login".', () => {
    const loginInput = screen.getByLabelText(/Login/i);
    expect(loginInput).toBeInTheDocument();
    expect(loginInput).toHaveAttribute('type', 'text');

    userEvent.type(loginInput, 'tryber@email.com');
    expect(loginInput).toHaveValue('tryber@email.com');
  });

  it('Componente Form possui um input associado a uma label com o texto "Senha".', () => {
    const passwordInput = screen.getByLabelText(/^Senha/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');

    userEvent.type(passwordInput, 'myPassword');
    expect(passwordInput).toHaveValue('myPassword');
  });

  it('Componente Form possui um input associado a uma label com o texto "URL".', () => {
    const urlInput = screen.getByLabelText(/url/i);
    expect(urlInput).toBeInTheDocument();
    expect(urlInput).toHaveAttribute('type', 'text');

    userEvent.type(urlInput, 'https://app.betrybe.com/login');
    expect(urlInput).toHaveValue('https://app.betrybe.com/login');
  });

  it('Componente Form possui um botão com texto "Cadastrar".', () => {
    const submitButton = screen.getByRole('button', { name: /Cadastrar/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('Componente Form possui um botão com o texto "Cancelar".', () => {
    const cancelButton = screen.getByRole('button', { name: /Cancelar/i });
    expect(cancelButton).toBeInTheDocument();
  });
});
