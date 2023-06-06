import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { anotherValidForm, testId, validForm } from './utils';

(window as any).scrollTo = vi.fn();

describe('7 - Permita apagar um serviço cadastrado', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    vi.useFakeTimers();
    render(<App />);
    userEvent.click(screen.getByRole('button', { name: /cadastrar nova senha/i }));

    userEvent.type(screen.getByLabelText(/Nome do Serviço/i), validForm.service);
    userEvent.type(screen.getByLabelText(/Login/i), validForm.login);
    userEvent.type(screen.getByLabelText(/^Senha/i), validForm.password);
    userEvent.type(screen.getByLabelText(/url/i), validForm.url);

    userEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));
    vi.advanceTimersByTime(1500);

    userEvent.click(screen.getByRole('button', { name: /cadastrar nova senha/i }));

    userEvent.type(screen.getByLabelText(/Nome do Serviço/i), anotherValidForm.service);
    userEvent.type(screen.getByLabelText(/Login/i), anotherValidForm.login);
    userEvent.type(screen.getByLabelText(/^Senha/i), anotherValidForm.password);
    userEvent.type(screen.getByLabelText(/url/i), anotherValidForm.url);

    userEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));
    vi.advanceTimersByTime(1500);
  });

  it('Cada serviço cadastrado deverá possuir um botão com o atributo data-testid="remove-btn".', () => {
    const removeButtons = screen.getAllByTestId(testId.removeButton);
    expect(removeButtons).toHaveLength(2);
  });

  it('Ao clicar no botão, o serviço correspondente deve ser removido.', () => {
    const removeButtons = screen.getAllByTestId(testId.removeButton);

    userEvent.click(removeButtons[0]);

    expect(screen.queryByText(validForm.login)).not.toBeInTheDocument();
    expect(screen.getByText(anotherValidForm.login)).toBeInTheDocument();
  });

  it('Se todos os serviços forem removidos, a mensagem "nenhuma senha cadastrada" deve ser renderizada.', () => {
    const removeButtons = screen.getAllByTestId(testId.removeButton);

    userEvent.click(removeButtons[1]);
    userEvent.click(removeButtons[0]);

    expect(screen.getByText(/nenhuma senha cadastrada/i)).toBeInTheDocument();
  });
});
