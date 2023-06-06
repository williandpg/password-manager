function Form() {
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
      <input type="button" value="Cancelar" />
    </form>
  );
}

export default Form;
