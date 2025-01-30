import React from "react";

const Nav = ({ openList, openFormInsert, openFormUpdate }) => {
  return (
    <nav className="nav">
      <h1 className="nav__title">Gerenciamento de usuários</h1>
      <div className="bav__btns">
        <button className="nav__btn" onClick={openList}>Lista</button>
        <button className="nav__btn" onClick={openFormInsert}>Cadastrar</button>
        <button className="nav__btn" onClick={openFormUpdate}>Editar</button>
      </div>
    </nav>
  );
};

export default Nav;
