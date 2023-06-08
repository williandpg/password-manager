import './App.css';
import { useState } from 'react';
import Title from './components/Title';
import Form from './components/Form';

type Services = {
  name: string;
  login: string;
  password: string;
  url: string;
};

function App() {
  const [render, setRender] = useState(true);
  const [service, setService] = useState<Services[]>([]);
  return (
    <div>
      <Title />
      {render ? (
        <button onClick={ () => setRender(false) }>
          Cadastrar nova senha
        </button>
      ) : (
        <Form
          buttonClose={ (parametro: boolean) => {
            setRender(parametro);
            if (parametro === true) {
              setService([]);
            }
          } }
        />
      )}
      {service.length === 0 ? (
        <p>Nenhuma senha cadastrada</p>
      ) : (
        <ul>
          {service.map((services, index) => (
            <li key={ index }>
              <a href={ services.url } target="_blank" rel="noopener noreferrer">
                {services.name}
              </a>
              <p>
                Login:
                {' '}
                {services.login}
              </p>
              <p>
                Senha:
                {' '}
                {services.password}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
