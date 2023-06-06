import { useEffect, useState } from "react"

export default function Leaderboard () {
    const [data, setData] = useState(null)

    async function getAllFighters () {
        const data = await fetch(`http://localhost:8000/fighters`)
        const res = await data.json()
        setData(res.data)
        console.log("getAllFighters", res)
    }
useEffect(()=>{
    getAllFighters ()
}, [])

    return (
        <>
            {data?.map((poke) => (
            <div key={poke._id}>
            <p>POKEMON: {poke.name}</p>
            <p>WINS: {poke.wins}</p>
            <p>LOSES: {poke.loses}</p> 
            </div>
            )
        )}
        </>
    )
}
