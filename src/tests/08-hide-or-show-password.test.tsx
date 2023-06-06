import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { validForm } from './utils';

describe('8 - Implemente um checkbox para Esconder/Mostrar as senhas', () => {
  it('A aplicação deve possuir um input do tipo checkbox com o texto "Esconder senhas" como label e começar desmarcado', () => {
    render(<App />);
    userEvent.click(screen.getByRole('button', { name: /cadastrar nova senha/i }));

    userEvent.type(screen.getByLabelText(/Nome do Serviço/i), validForm.service);
    userEvent.type(screen.getByLabelText(/Login/i), validForm.login);
    userEvent.type(screen.getByLabelText(/^Senha/i), validForm.password);
    userEvent.type(screen.getByLabelText(/url/i), validForm.url);

    userEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    const hidePasswordsCheckbox = screen.getByLabelText(/Esconder senhas/i);

    expect(hidePasswordsCheckbox).toBeInTheDocument();
    expect(hidePasswordsCheckbox).toHaveAttribute('type', 'checkbox');
    expect(hidePasswordsCheckbox).not.toBeChecked();
  });

  it('Com o checkbox marcado, todas as senhas cadastradas deverão ser substituídas por ******', () => {
    render(<App />);
    userEvent.click(screen.getByRole('button', { name: /cadastrar nova senha/i }));

    userEvent.type(screen.getByLabelText(/Nome do Serviço/i), validForm.service);
    userEvent.type(screen.getByLabelText(/Login/i), validForm.login);
    userEvent.type(screen.getByLabelText(/^Senha/i), validForm.password);
    userEvent.type(screen.getByLabelText(/url/i), validForm.url);

    userEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    expect(screen.getByText(validForm.password)).toBeInTheDocument();

    const hidePasswordsCheckbox = screen.getByLabelText(/Esconder senhas/i);
    expect(hidePasswordsCheckbox).toBeInTheDocument();

    userEvent.click(hidePasswordsCheckbox);

    expect(hidePasswordsCheckbox).toBeChecked();
    expect(screen.getByText('******')).toBeInTheDocument();
  });

  it('Ao clicar para desmarcar o checkbox, todas as senhas cadastradas devem voltar a aparecer', () => {
    render(<App />);
    userEvent.click(screen.getByRole('button', { name: /cadastrar nova senha/i }));

    userEvent.type(screen.getByLabelText(/Nome do Serviço/i), validForm.service);
    userEvent.type(screen.getByLabelText(/Login/i), validForm.login);
    userEvent.type(screen.getByLabelText(/^Senha/i), validForm.password);
    userEvent.type(screen.getByLabelText(/url/i), validForm.url);

    userEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    const hidePasswordsCheckbox = screen.getByLabelText(/Esconder senhas/i);
    expect(hidePasswordsCheckbox).toBeInTheDocument();

    userEvent.click(hidePasswordsCheckbox);

    expect(hidePasswordsCheckbox).toBeChecked();
    expect(screen.getByText('******')).toBeInTheDocument();

    userEvent.click(hidePasswordsCheckbox);

    expect(hidePasswordsCheckbox).not.toBeChecked();
    expect(screen.getByText(validForm.password)).toBeInTheDocument();
  });
});
