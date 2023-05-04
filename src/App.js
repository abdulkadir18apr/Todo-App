import Login from "./component/Login";
import "./styles.css";
import { TodoList } from "./TodoList";
import { BrowserRouter,Routes,Route,Link } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <h1 className="heading">TODO APP</h1>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/todo" element={<TodoList/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
