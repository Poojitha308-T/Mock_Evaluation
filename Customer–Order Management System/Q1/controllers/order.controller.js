import { supabase } from '../config/supabase.js';

export const createOrder = async (req, res) => {
    try {
        const { product_name, quantity, price, customerId } = req.body;

        if (!product_name || !quantity || !price || !customerId) {
            return res.status(400).json({ msg: 'Missing required fiels' })
        }

        const { data, error } = await supabase
            .from('orders')
            .insert([{
                product_name,
                quantity,
                price,
                customer_id: customerId
            }])

        if (error) {
            return res.status(400).json({ msg: error.message })
        }

        return res.status(201).json({
            message: 'Order created sucessfully'.data
        })
    } catch (err) {
        return res.status(500).json({ msg: err.messgae })
    }
}

//get customer orders

export const getCustomerOrders = async (req, res) => {
    try {
        const { customerId } = req.params

        if (!customerId) {
            return res.status(400).json({ msg: 'Customer id is required' })
        }

        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('customer_id', customerId)

        if (error) {
            return res.status(400).json({ msg: error.message })
        }

        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).json({ msg: error.message })
    }
}


// update order

export const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params
        const { quantity, price, order_status } = req.body

        if(!orderId){
            return res.status(400).json({msg: ' Order id is required'})
        }

        const { data, error } = await supabase
        .from('orders')
        .update({ quantity, price, order_status })
        .eq('id', orderId)

        if(error) {
            return res.status(400).json({msg:error.message})
        }

        if(data.length === 0) {
            return res.status(404).json({msg:'Order not found'})
        }
        return res.status(200).json({
            msg: ' Order updated successfully ', data 
        })
    } catch(err){
        return res.status(500).json({msg: err.message})
    }
}

// delete order

export const deleteOrder = async(req,res) => {
    try{
        const { orderId } = req.params
        
        if(!orderId){
            return res.status(400).json({msg: 'Order Id is required'})
        }

        const {error} =await supabase.from('orders')
        .delete()
        .eq('id', orderId)

        if(error){
            return res.status(400).json({msg: error.message})
        }

        return res.status(200).json({msg: 'Order deleted succesfully'})
    } catch(err){
        return res.status(500).json({msg: err.message})
    }
}


