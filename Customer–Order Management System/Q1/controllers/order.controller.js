import { supabase } from './../config/supabase';

export const createOrder = async(req,res) => {
    try{
        const { product_name, quantity, price, customerId } = req.body;

        if(!product_name || !quantity || !price || !customerId) {
            return res.status(400).json({msg:'Missing required fiels'})
        }

        const { data, error } = await supabase
        .from('orders')
        .insert([{
            product_name,
            quantity,
            price,
            customer_id: customerId 
        }])

        if(error){
            return res.status(400).json({msg: error.message })
        }

        return res.status(201).json({
            message: 'Order created sucessfully'. data
        })
    } catch(err){
        return res.status(500).json({msg: err.messgae })
    }
}

//get customer orders

export const getCustomerOrders = async(req,res) => {
    try{
        const { customerId } = req.params

        if(!customerId){
            return res.status(400).json({msg: 'Customer id is required'})
        }

        const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', customerId)

        if(error){
            return res.status(400).json({msg: error.message })
        }

        return res.status(200).json(data)
    } catch(err){
        return res.status(500).json({msg: error.message})
    }
}



