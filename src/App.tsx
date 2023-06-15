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
  const [checkbox, setCheckbox] = useState(false);
  const passwordValidation = (event: any, data: ServicesType) => {
    const passwordSaved = [...service, data];
    setService(passwordSaved);
    setRender(true);
  };
  const removeService = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const targetId = event.target as HTMLButtonElement;
    const { id } = targetId;
    if (id) {
      const passwordRemov = service.splice(Number(id), Number(id + 1));
      const newArray = service.filter((pass) => pass !== passwordRemov[0]);
      setService(newArray);
    }
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
      <label htmlFor="checkbox">
        Esconder senhas
        <input
          type="checkbox"
          id="checkbox"
          onChange={ () => setCheckbox(!checkbox) }
        />
      </label>
      <ul>
        { service.length > 0 ? service.map((pass, index) => (
          <li key={ index }>
            <a href={ pass.url }>{ pass.name }</a>
            <p>Login</p>
            <p>{ pass.login }</p>
            <p>Senha</p>
            <p>{ checkbox ? '******' : pass.password }</p>
            <button
              data-testid="remove-btn"
              onClick={ removeService }
              id={ index.toString() }
            >
              Excluir
            </button>
          </li>
        )) : <h3>Nenhuma senha cadastrada</h3> }
      </ul>
    </div>
  );
}

export default App;
