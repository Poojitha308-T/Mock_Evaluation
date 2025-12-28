import { useState } from "react";

function Admin(){
    const [form, setForm] = useState({
        redNo:"",
        category:"",
        driver:"",
        status:""
    });
    const [fleets, setFleets] = useState([]);

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
                <form>
                    <input type="text" placeholder="Vehicle Registration Number" value={form.redNo} onChange={(e)=>setForm(e.target.value)}/>
                    <br/><br/>
                    <select name="category" value={form.category} onChange={(e)=>setForm(e.target.value)}>
                        <option value="All">Select category</option>
                        <option value="auto">Auto</option>
                        <option value="car">Car</option>
                        <option value="truck">Truck</option>
                        <option value="bus">Bus</option>
                    </select>

                    <br/> <br/>

                    <input type="text" placeholder="Driver name" value={form.driver} onChange={(e)=>setForm(e.target.value)}/>

                    <br/> <br/>

                    <select name="status" value={form.status} onChange={(e)=>setForm(e.target.value)}>
                        <option value="availability">Availability</option>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>

                    <br/> <br/>

                    <button onClick={handlesubmit}>Add Fleet</button>

                </form>
            </div>
        
        </div>
    )

}
export default Admin;