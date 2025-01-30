import { useEffect, useState } from "react";
import Container from "./components/Container";
import Nav from "./components/Nav";
import CardUsers from "./components/CardUsers";
import FormInsert from "./components/FormInsert";
import FormEdit from "./components/FormEdit";

const stages = [
  { id: 1, name: "list" },
  { id: 2, name: "insert" },
  { id: 3, name: "edit" },
];
const url = "http://localhost:5295/api/users";

function App() {
  const [stage, setStage] = useState(stages[0].name);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Função para buscar os usuários da API
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data);
    }
    fetchData();
  }, [users]);

  // Função para abrir os formulários e lista
  const openList = () => setStage(stages[0].name);
  const openFormInsert = () => setStage(stages[1].name);
  const openFormUpdate = () => setStage(stages[2].name);

  const [message, setMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [colorMessage, setColorMessage] = useState("red");

  // Função de alterar mesagem para o usuário
  const changeMessage = (text, color) => {
    setMessage(text);
    setMessageVisible(true);
    setColorMessage(color);
    setTimeout(() => {
      setMessage("");
      setMessageVisible(false);
    }, 3000);
  };

  // Função para inserir novo usuário
  const handleSubmitInsert = async (e) => {
    e.preventDefault();
    const newUser = { name, email };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        changeMessage("Erro ao adicionar usuário", "red");
        throw new Error("Erro ao adicionar usuário");
      }

      const addedUser = await response.json();
      setUsers((prevUsers) => [...prevUsers, addedUser]);

      // Limpar os campos após inserção bem-sucedida
      setName("");
      setEmail("");
      changeMessage("Novo usuário cadastrado!", "rgb(54, 139, 46)");
      setStage("list"); // Voltar para a listagem após inserção
    } catch (error) {
      changeMessage("Erro ao adicionar usuário", "rgb(238, 101, 101)");
      console.error("Erro:", error);
    }
  };

  return (
    <Container
      className={"container"}
      openFormInsert={openFormInsert}
      openFormUpdate={openFormUpdate}
    >
      <div
        style={{
          ...(!messageVisible
            ? { visibility: "hidden" }
            : { visibility: "visible" }), // Outro estilo inline
          backgroundColor: colorMessage, // Mais um exemplo
        }}
        className="message"
      >
        <p className="message__txt">{message}</p>
      </div>
      <Nav
        openList={openList}
        openFormInsert={openFormInsert}
        openFormUpdate={openFormUpdate}
      />
      {stage === "list" && <CardUsers users={users} />}
      {stage === "insert" && (
        <FormInsert
          handleSubmitInsert={handleSubmitInsert}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
        />
      )}
      {stage === "edit" && (
        <FormEdit changeMessage={changeMessage} users={users} setStage={setStage} setUsers={setUsers} />
      )}
    </Container>
  );
}

export default App;
