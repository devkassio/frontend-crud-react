import { useState, useEffect, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputAgeRef = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");

    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post("/usuarios", {
      name: inputNameRef.current.value,
      email: inputEmailRef.current.value,
      age: Number(inputAgeRef.current.value),
    });

    getUsers();
    
    inputNameRef.current.value = "";
    inputEmailRef.current.value = "";
    inputAgeRef.current.value = "";
  }

  async function deleteUser(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input type="text" name="name" placeholder="Nome" ref={inputNameRef} />
        <input type="text" name="email" placeholder="Email" ref={inputEmailRef} />
        <input type="number" name="idade" placeholder="Idade" ref={inputAgeRef} />
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>
      {users.map((user) => (
        <div className="card" key={user.id}>
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
          </div>
          <button onClick={() => deleteUser(user.id)} type="button">
            <img src={Trash} alt="Excluir" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
