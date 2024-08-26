import axios from "axios";

const API_BASE_URL ="http://192.168.1.100:5000"

export const addItemsToDatabase = async (items) => {
    try {
     const response = await axios.post(`${API_BASE_URL}/addItems`,{
        items:items
     })
     return response.data
    } catch (error) {
        console.error('Error adding items to database:', error);
        throw error;
    }
}

export const getItemsFromDatabase = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getItems`)
        return response.data
    } catch (error) {
        console.error('Error Select items to database:', error);
        throw error;
    }
}

export const updateItemsFromDatabase = async(items) => {
    try {
        await axios.patch(`${API_BASE_URL}/patchItems`,{
            items:items
        })
    } catch (error) {
        console.error('Error update items to database:', error);
        throw error;
    }
}

export const removeItemsFromDatabase = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/deleteItems`,{
            data: { id: id }
        })
    } catch (error) {
        console.error('Error delete items to database:', error);
        throw error;
    }
}