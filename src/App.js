import React from 'react';
import './App.css';
import useCounter from './useCounter';  // importing my custom Hook 

function App() {

  const [text, setText] = React.useState("") // To hold inputed words
  const [timeRemaining, setTimeRemaining] = React.useState(5)
  const [isTimeRunning, setIsTimeRunning] = React.useState(false)
  const inputRef = React.useRef() // useRef To store the textArea input

  // names must be 'count' and 'incrementCount' because we are returning an object with this names in the customEffect file.
  // if we we're returning an array then the names here can be anything because array uses indexes to mark its values.
  const {count, incrementCount} = useCounter() // destructing my custom hook
  
  // const ['anyNameFor Count', 'anyNameForFunction']  -- if i'm returning an array in custom Hook  
  function handleForm(event) {
      setText(event.target.value)
  }

  function wordCount(str) {
//    let str = "your long string with many words.";
    if (str === "") {
      console.log(0)
      return 0
    } else {
      let Count = str.match(/(\w+)/g).length;
      console.log(Count)
      return Count
    }
  }

  function startGame() {
    setIsTimeRunning(true)
    setTimeRemaining(5)
    setText("")            
  }

  React.useEffect(() => {
    console.log("effect ran")
    if (timeRemaining != 0 && isTimeRunning) {  // so the effect stop running when timeRemaining equal -
      inputRef.current.focus() /* To switch focus to the textArea when game starts // Doing this inside here because the textArea
                                  would already be active when this code is running */ 
      setTimeout(() => {
        setTimeRemaining(prevState => prevState - 1)
      },1000)
    } else if(timeRemaining === 0) { //set isTimeRunning back to false when timeRemaining equals zero
      setIsTimeRunning(false)
    }
  
},[timeRemaining, isTimeRunning])

// console.log(isTimeRunning)
return (
      <div className='App'>
          <p>{count}</p>
          <button onClick={incrementCount}>add</button>
          {/* console.log(text) */}
          <h1>Speed Typing Game</h1>
          <textarea disabled={!isTimeRunning} ref={inputRef} value={text} onChange={handleForm}/>
          <h4>Amount of time remaining: {timeRemaining}</h4>
          <button disabled={isTimeRunning} onClick={startGame}>Start Game</button>
          <h1>Word Count: {timeRemaining === 0 && wordCount(text)}</h1>
      </div>
  );
}

export default App;

