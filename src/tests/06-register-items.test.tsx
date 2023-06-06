import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { anotherValidForm, validForm } from './utils';

(window as any).scrollTo = vi.fn();

const registerPassword = (
  { service, login, password, url }
  : { service: string, login: string, password: string, url: string },
) => {
  const registerButton = screen.getByRole('button', { name: /cadastrar nova senha/i });

  userEvent.click(registerButton);

  const serviceInput = screen.getByLabelText(/Nome do Serviço/i);
  const loginInput = screen.getByLabelText(/Login/i);
  const passwordInput = screen.getByLabelText(/^Senha/i);
  const urlInput = screen.getByLabelText(/url/i);

  userEvent.clear(serviceInput);
  userEvent.clear(loginInput);
  userEvent.clear(passwordInput);
  userEvent.clear(urlInput);

  userEvent.type(serviceInput, service);
  userEvent.type(loginInput, login);
  userEvent.type(passwordInput, password);
  userEvent.type(urlInput, url);

  const submitButton = screen.getByRole('button', { name: /Cadastrar/i });
  userEvent.click(submitButton);
  vi.advanceTimersByTime(1500);
};

describe('6 - Implemente a função do botão "cadastrar" do formulário', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  it('Caso não exista nenhum serviço cadastrado, a mensagem "nenhuma senha cadastrada" deverá ser renderizada.', () => {
    render(<App />);
    expect(screen.getByText(/nenhuma senha cadastrada/i)).toBeInTheDocument();
  });

  it('Ao clicar no botão, as informações enviadas pelo formulário deverão ser renderizadas na tela.', async () => {
    vi.useFakeTimers();
    render(<App />);

    registerPassword(validForm);
    // cadastrou ^

    expect(screen.getByText(validForm.service)).toBeInTheDocument();
    expect(screen.getByText(validForm.login)).toBeInTheDocument();
    expect(screen.getByText(validForm.password)).toBeInTheDocument();

    const link = screen.getByRole('link') as HTMLAnchorElement;
    expect(link).toHaveAttribute('href', validForm.url);
  });

  it('A aplicação deve renderizar todos os serviços cadastrados na ordem esperada.', async () => {
    vi.useFakeTimers();
    render(<App />);

    registerPassword(validForm);
    // cadastrou 1 ^

    registerPassword(anotherValidForm);
    // cadastrou 2 ^

    expect(screen.getByText(validForm.service)).toBeInTheDocument();
    expect(screen.getByText(validForm.login)).toBeInTheDocument();
    expect(screen.getByText(validForm.password)).toBeInTheDocument();

    expect(screen.getByText(anotherValidForm.service)).toBeInTheDocument();
    expect(screen.getByText(anotherValidForm.login)).toBeInTheDocument();
    expect(screen.getByText(anotherValidForm.password)).toBeInTheDocument();

    const links = screen.getAllByRole('link') as HTMLAnchorElement[];
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', validForm.url);
    expect(links[1]).toHaveAttribute('href', anotherValidForm.url);
  });

  it('Se algum serviço estiver cadastrado, a mensagem "nenhuma senha cadastrada" deverá desaparecer.', async () => {
    vi.useFakeTimers();
    render(<App />);
    registerPassword(validForm);
    // cadastrou ^

    expect(screen.queryByText(/nenhuma senha cadastrada/i)).not.toBeInTheDocument();
  });
});
