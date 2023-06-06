import { render, screen } from '@testing-library/react';
import App from '../App';

describe('1 - Crie um título para a aplicação', () => {
  it('Aplicação renderiza uma tag h1 contendo o texto "Gerenciador de senhas".', () => {
    render(<App />);
    const title = screen.getByRole('heading', { level: 1 });

    expect(title).toHaveTextContent(/Gerenciador/i);
    expect(title).toHaveTextContent(/Senhas/i);
  });
});
