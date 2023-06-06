import './App.css';
import { useState } from 'react';
import Title from './components/Title';
import Form from './components/Form';

function App() {
  const [render, setRender] = useState(true);

  return (
    <div>
      <Title />
      {render
        ? (
          <button
            onClick={ () => { setRender(false); } }
          >
            { ' ' }
            Cadastrar nova senha
            { ' ' }
          </button>)
        : (<Form buttonClose={ setRender } />)}
    </div>
  );
}

export default App;
