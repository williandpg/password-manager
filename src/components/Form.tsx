type Props = {
  buttonClose: (parametro: boolean) => void;
};

function Form(props:Props) {
  const { buttonClose } = props;

  return (
    <form action="">
      <label htmlFor="name">Nome do serviço</label>
      <input type="text" id="name" />

      <label htmlFor="login">Login</label>
      <input type="text" id="login" />

      <label htmlFor="password">Senha</label>
      <input type="password" id="password" />

      <label htmlFor="url">URL</label>
      <input type="text" id="url" />

      <input type="button" value="Cadastrar" />
      <input onClick={ () => { buttonClose(true); } } type="button" value="Cancelar" />
    </form>
  );
}

export default Form;
