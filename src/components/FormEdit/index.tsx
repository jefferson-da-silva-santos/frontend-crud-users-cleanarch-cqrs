import React, { useState } from "react";
const url = "http://localhost:5295/api/users";

const FormEdit = ({ changeMessage, users, setUsers, setStage }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // 🟢 Buscar usuário
  const handleSearchUser = () => {
    if (!id) {
      changeMessage("Insira um id antes de buscar!", "rgb(110, 102, 25)");
      return;
    }
    const user = users.find((user) => {
      return user.id === id;
    });
    setName(user.name);
    setEmail(user.email);
  };

  // 🟢 Editar usuário
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (!id) {
      changeMessage("Busque um usuário antes de editar!", "rgb(110, 102, 25)");
      return;
    }

    const updatedUser = { id, name, email };

    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar usuário");
      }

      const editedUser = await response.json();

      // Atualiza o usuário no estado local
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === Number(id) ? editedUser : user))
      );

      changeMessage("Usuário atualizado com sucesso!", "rgb(54, 139, 46)");

      // Limpar os campos após edição bem-sucedida
      setId("");
      setName("");
      setEmail("");
      setStage("list"); // Voltar para a listagem
    } catch (error) {
      console.error("Erro:", error);
      changeMessage("Erro ao editar usuário", "rgb(255, 83, 83)");
    }
  };

  // 🟢 Deletar usuário
  const handleDeleteUser = async () => {
    if (!id) {
      changeMessage("Busque um usuário antes de deletar!", "rgb(110, 102, 25)");
      return;
    }

    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar este usuário?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir usuário");
      }

      // Remove usuário da lista local
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== Number(id))
      );

      changeMessage("Usuário deletado com sucesso!", "rgb(54, 139, 46)");

      // Limpar os campos
      setId("");
      setName("");
      setEmail("");
      setStage("list"); // Voltar para a listagem
    } catch (error) {
      console.error("Erro:", error);
      changeMessage("Erro ao excluir usuário", "rgb(238, 101, 101)");
    }
  };

  return (
    <form
      className="form-insert"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2 className="form-insert__title">Editar Usuário</h2>
      <div className="busca-group">
        <label className="label-1">
          <span>Id</span>
          <input
            type="text"
            value={id}
            name="id"
            onChange={(e) => setId(e.target.value)}
            placeholder="Id do usuário da busca"
            id="id"
          />
        </label>
        <button className="btn__buscar" onClick={(e) => {
          e.preventDefault();
          handleSearchUser()
        }}>
          Buscar
        </button>
      </div>
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
      <div className="buttons-form">
        <input
          onClick={(e) => {
            e.preventDefault();
            handleSubmitUpdate(e);
          }}
          type="submit"
          value="Editar Usuário"
        />
        <input
          onClick={(e) => {
            e.preventDefault();
            handleDeleteUser();
          }}
          type="submit"
          id="del-btn"
          value="Deletar Usuário"
        />{" "}
      </div>
    </form>
  );
};

export default FormEdit;
