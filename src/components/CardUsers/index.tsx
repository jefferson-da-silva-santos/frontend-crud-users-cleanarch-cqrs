import React, { useState } from "react";

const CardUsers = ({ users }) => {
  const changeIcon = (e) => {
    const i = e.target;
    i.classList.remove("bi-copy");
    i.classList.add("bi-check-circle-fill");
    setTimeout(() => {
      i.classList.remove("bi-check-circle-fill");
      i.classList.add("bi-copy");
    }, 2000);
  };
  function copiarTexto(texto, e) {
    navigator.clipboard
      .writeText(texto)
      .then(() => changeIcon(e))
      .catch((err) => console.error("Erro ao copiar:", err));
  }
  return (
    <div className="card-users">
      <h2 className="card-users__title">Lista de Usuários</h2>
      <div className="group-users">
        {users.map((user) => (
          <div className="user">
            <img className="user__img" src="/public/user.png" alt="" />{" "}
            <div className="user__info">
              <p className="user__info__name">
                <span>Nome:</span> {user.name}
              </p>
              <p className="user__info__email">
                <span>Email:</span> {user.email}
              </p>
            </div>
            <a
              onClick={(e) => {
                e.preventDefault();
                copiarTexto(user.id, e);
              }}
              className="btn-copy"
            >
              {" "}
              <i className="icone-copiar bi bi-copy"></i>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardUsers;
