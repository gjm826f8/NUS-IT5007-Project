import React, {useState} from 'react'

function Test() {
    const [date, setDate] = useState(new Date().toString())
  return (
    <div>
        <div>
            {date}
        </div>
      <button onClick={()=>{setDate(new Date().toString())}}>Click me</button>
    </div>
  )
}

export default Test
