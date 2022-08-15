// my custom Hook

import {useState} from 'react'

function useCounter() {
    const [count,setCount] = useState(1)

    function incrementCount() {
        return (
            setCount(prevCount => prevCount + 1)
        )
    }

    return {count, incrementCount}
    // retur [count, incrementCount]  //returning array
}

export default useCounter