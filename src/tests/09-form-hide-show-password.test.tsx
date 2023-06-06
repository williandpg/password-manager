import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { testId } from './utils';

describe('9 - No formulário, implemente um botão para esconder/mostrar a senha que está sendo digitada', () => {
  it('O formulário deve possuir um botão contendo o atributo data-testid="show-hide-form-password".', () => {
    render(<App />);
    userEvent.click(screen.getByRole('button', { name: /cadastrar nova senha/i }));

    expect(screen.getByTestId(testId.showHideForm)).toBeInTheDocument();
  });

  it('Ao clicar no botão, o input correspondente à senha deverá ter seu tipo alterado para "text".', () => {
    render(<App />);
    userEvent.click(screen.getByRole('button', { name: /cadastrar nova senha/i }));

    const passwordInput = screen.getByLabelText(/^Senha/i);
    userEvent.click(screen.getByTestId(testId.showHideForm));
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('Se o input de senha estiver com o tipo "text", ao clicar no botão o seu tipo deverá ser alterado para "password".', () => {
    render(<App />);
    userEvent.click(screen.getByRole('button', { name: /cadastrar nova senha/i }));

    const passwordInput = screen.getByLabelText(/^Senha/i);
    const showHidePassword = screen.getByTestId(testId.showHideForm);
    userEvent.click(showHidePassword);

    expect(passwordInput).toHaveAttribute('type', 'text');

    userEvent.click(showHidePassword);

    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
