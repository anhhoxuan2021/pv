import { useState } from "react";
import ReactDOM from "react-dom/client";
import Todos from "./Todos";

const NotCallbackTest = () => {
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState(["todo 1", "todo 2"]);
  
    const increment = () => {
      setCount((c) => c + 1);
    };
    const addTodo = () => {
      setTodos((t) => [...t, "New Todo"]);
    };
  //    You will notice that the Todos component re-renders even when the todos do not change.
    return (
      <>
        <Todos todos={todos} addTodo={addTodo} />
        <hr />
        <div>
          Count: {count}
          <button onClick={increment}>+</button>
        </div>
      </>
    );
  };

export default NotCallbackTest;