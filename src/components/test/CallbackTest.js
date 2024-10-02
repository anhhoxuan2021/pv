import { useState, useCallback } from "react";
import ReactDOM from "react-dom/client";
import Todos from "./Todos";

const CAllbackTest = ()=>{
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState([]);
  
    const increment = () => {
      setCount((c) => c + 1);
    };
    //Now the Todos component will only re-render when the todos prop changes.
    const addTodo = useCallback(() => {
      setTodos((t) => [...t, "New Todo"]);
    }, [todos]);
    
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


export default CAllbackTest;