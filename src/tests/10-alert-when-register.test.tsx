import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Swal from 'sweetalert2';
import { vi } from 'vitest';
import App from '../App';
import { validForm } from './utils';

(window as any).scrollTo = vi.fn();

describe('10 - Exibe um alerta ao cadastrar um novo serviço corretamente', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  it('Ao cadastrar uma senha, exibe um "sweet alert" com o texto "Serviço cadastrado com sucesso".', async () => {
    vi.spyOn(Swal, 'fire');

    render(<App />);
    userEvent.click(screen.getByRole('button', { name: /cadastrar nova senha/i }));

    const serviceInput = screen.getByLabelText(/Nome do Serviço/i);
    const loginInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const urlInput = screen.getByLabelText(/url/i);

    userEvent.type(serviceInput, validForm.service);
    userEvent.type(loginInput, validForm.login);
    userEvent.type(passwordInput, validForm.password);
    userEvent.type(urlInput, validForm.url);

    const submitButton = screen.getByRole('button', { name: /Cadastrar/i });
    userEvent.click(submitButton);

    // cadastrou ^

    const alertTitle = screen.getByText(/serviço cadastrado com sucesso/i);

    expect(alertTitle).toBeInTheDocument();
    expect(Swal.fire).toHaveBeenCalled();
  });

  it('Após clicar no botão, o alerta deve permanecer na tela por apenas 1.5s', async () => {
    vi.spyOn(Swal, 'fire');

    render(<App />);
    userEvent.click(screen.getByRole('button', { name: /cadastrar nova senha/i }));

    const serviceInput = screen.getByLabelText(/Nome do Serviço/i);
    const loginInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const urlInput = screen.getByLabelText(/url/i);

    userEvent.type(serviceInput, validForm.service);
    userEvent.type(loginInput, validForm.login);
    userEvent.type(passwordInput, validForm.password);
    userEvent.type(urlInput, validForm.url);

    const submitButton = screen.getByRole('button', { name: /Cadastrar/i });
    userEvent.click(submitButton);
    expect(Swal.fire).toHaveBeenCalled();

    // cadastrou ^

    await new Promise((r) => { setTimeout(r, 1500); });

    const alertTitle = screen.queryByText(/serviço cadastrado com sucesso/i);

    expect(alertTitle).not.toBeInTheDocument();
  });
});
