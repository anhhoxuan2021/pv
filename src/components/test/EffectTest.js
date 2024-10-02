import {useState, useEffect} from 'react';
import ReactDom from 'react-dom/client';
//Only run the effect on the initial render
// const Timer=()=>  {
//     const [count, setCount] = useState(0);
  
//     useEffect(() => {
//       setTimeout(() => {
//         setCount((count) => count + 1);
//       }, 100);
//     }, []); // <- add empty brackets here
  
//     return <h1>I've rendered {count} times!</h1>;
//   }
//export default Timer;

//Here is an example of a useEffect Hook that is dependent on a variable. If the count variable updates, the effect will run again
// const Counter=()=> {
//     const [count, setCount] = useState(0);
//     const [calculation, setCalculation] = useState(0);
  
//     useEffect(() => {
//       setCalculation(() => count * 2);
//     }, [count]); // <- add the count variable here
  
//     return (
//       <>
//         <p>Count: {count}</p>
//         <button onClick={() => setCount((c) => c + 1)}>+</button>
//         <p>Calculation: {calculation}</p>
//       </>
//     );

// }

// export default Counter

//Clean up the timer at the end of the useEffect Hook


const Timer=()=> {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
    setCount((count) => count + 1);
  }, 1000);

  return () => clearTimeout(timer)
  }, []);

  return <h1>I've rendered {count} times!</h1>;
}

export default Timer;
