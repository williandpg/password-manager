import './App.css';
import { useState } from 'react';
import Title from './components/Title';
import Form, { ServicesType } from './components/Form';

// type Services = {
//   name: string;
//   login: string;
//   password: string;
//   url: string;
// };

function App() {
  const [render, setRender] = useState(true);
  const [service, setService] = useState<ServicesType[]>([]);
  const passwordValidation = (event: any, data: ServicesType) => {
    const passwordSaved = [...service, data];
    setService(passwordSaved);
    setRender(true);
  };
  return (
    <div>
      <Title />
      {render ? (
        <button onClick={ () => setRender(false) }>
          Cadastrar nova senha
        </button>
      ) : (
        <Form
          passwordValidation={ passwordValidation }
          buttonClose={ () => setRender(true) }
        />
      )}
      <ul>
        { service.length > 0 ? service.map((services, key) => (
          <li key={ key }>
            <a href={ services.url }>{ services.name }</a>
            <p>Login</p>
            <p>{ services.login }</p>
            <p>Senha</p>
            <p>{ services.password }</p>
          </li>
        )) : <h3>Nenhuma senha cadastrada</h3> }
      </ul>
    </div>
  );
}

export default App;
