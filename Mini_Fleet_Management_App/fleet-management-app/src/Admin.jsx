import { useState } from "react";

function Admin(){
    const [form, setForm] = useState({
        redNo:"",
        category:"",
        driver:"",
        status:""
    });
    const [fleets, setFleets] = useState([]);
    return(
        <div>
            <div>
                <form>
                    <input type="text" placeholder="Vehicle Registration Number" value={form.redNo} onChange={(e)=>setForm(e.target.value)}/>
                    <br/><br/>
                    <select name="category" value={form.category} onChange={}>
                        <option value="All">Select category</option>
                        <option value="auto">Auto</option>
                        <option value="car">Car</option>
                        <option value="truck">Truck</option>
                        <option value="bus">Bus</option>
                    </select>

                    <br/> <br/>

                    <input type="text" placeholder="Driver name" value={form.driver} onChange={}/>

                    <br/> <br/>

                    <select name="status" value={form.status}>
                        <option value="availability">Availability</option>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>

                    <br/> <br/>

                    <button>Add Fleet</button>

                </form>
            </div>
        
        </div>
    )

}
export default Admin;