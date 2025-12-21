import { useEffect } from "react";

function Fetch(){
    const fetch = useEffect();

    useEffect={
    .fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response)=>response.json)
            .then((data)=>data.slice(0,20))
    }
    return(
        <div>
            
        </div>
    )
}

export default Fetch;