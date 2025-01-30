import React from "react";

const FormInsert = ({ handleSubmitInsert, name, setName, email, setEmail }) => {
  return (
    <form className="form-insert" onSubmit={handleSubmitInsert}>
      <h2 className="form-insert__title">Cadastrar Usuário</h2>
      
      <label className="label-1">
        <span>Nome</span>
        <input 
          type="text" 
          name="name" 
          placeholder="Nome do usuário" 
          id="name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      
      <label>
        <span>E-mail</span>
        <input 
          type="email" 
          name="email" 
          placeholder="E-Mail do usuário" 
          id="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      
      <input type="submit" value="Inserir Usuário" />
    </form>
  );
};

export default FormInsert;
