import { useState } from "react";

function Admin(){
    const [form, setForm] = useState({
        redNo:"",
        category:"",
        driver:"",
        status:""
    });
    const [fleets, setFleets] = useState([]);

    const handleChange = (e) =>{
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    }

    const handlesubmit=(e)=>{
        e.preventDefault();

        setFleets([...fleets, form]);

        setForm({
            redNo:"",
            category:"",
            driver:"",
            status:""
        });
    }


    return(
        <div>
            <div>
                <form onSubmit={handlesubmit}>
                    <input type="text" name="redNo" placeholder="Vehicle Registration Number" value={form.redNo} onChange={handleChange}/>
                    <br/><br/>
                    <select name="category" value={form.category} onChange={handleChange}>
                        <option value="All">Select category</option>
                        <option value="auto">Auto</option>
                        <option value="car">Car</option>
                        <option value="truck">Truck</option>
                        <option value="bus">Bus</option>
                    </select>

                    <br/> <br/>

                    <input type="text" name="driver" placeholder="Driver name" value={form.driver} onChange={handleChange}/>

                    <br/> <br/>

                    <select name="status" value={form.status} onChange={handleChange}>
                        <option value="availability">Availability</option>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>

                    <br/> <br/>

                    <button type="submit">Add Fleet</button>

                </form>
            </div>
            
            <div style={{flex:1, padding:"20px"}}>
                <h2>Fleet cards</h2>
                <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", textAlign:"center"}}>
                    {fleets.map((fleet, index)=>(
                    <div key={index} style={{border:"1px solid black", padding:"15px"}}>
                    <p>Reg.No: {fleet.redNo}</p>
                    <p>Category:{fleet.category}</p>
                    <p>Driver Name:{fleet.driver}</p>
                    <p>Availability Status:{fleet.status}</p>

                    </div>
                ))}
                </div>
            </div>
        
        </div>
    )

}
export default Admin;