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
        <div style={{display: "flex", justifyContent: "space-around"}}>
            <div>
                <h3>POKEMON</h3>
                {data?.map((poke) => (
                <div key={poke._id} style={{display: "flex", justifyContent: "space", alignItems: "center", marginBottom: "10px"}}>
                <p>{poke.name}</p>
                </div>
                ))}  
            </div>
            <div>
                <h3>WINS</h3>
                {data?.map((poke) => (
                <div key={poke._id} style={{display: "flex", justifyContent: "space", alignItems: "center", marginBottom: "10px"}}>
                <p>{poke.wins}</p>
                </div>
                ))} 
            </div>
            <div>
                <h3>LOSES</h3>
                {data?.map((poke) => (
                <div key={poke._id} style={{display: "flex", justifyContent: "space", alignItems: "center", marginBottom: "10px"}}>
                <p>{poke.loses}</p> 
                </div>
                ))}
            </div>
        </div>
        </>
    )
}
