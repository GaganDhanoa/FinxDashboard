import axios from 'axios';

const API_BASE_URL = 'https://mockserver-779903975651.us-west1.run.app';

export const fetchAllVehicles = async () => {
  try {
    const data = await axiosWithExponentialBackoff(`${API_BASE_URL}/inventory/vehicles`);                
    return data;    
  } catch (error) {
    console.error('Error fetching vehicles:', error);    
    throw error;
  }
};

export const updateVehicle = async (id, data) => {
  try {
    const config = {method: 'put', data: data};   
    const response = await axiosWithExponentialBackoff(`${API_BASE_URL}/inventory/vehicle/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }
};

export const createVehicle = async (data) => {
  try {
    const config = {method: 'post', data: data};    
    const response = await axiosWithExponentialBackoff(`${API_BASE_URL}/inventory/vehicle`, config);
    return response.data;
  } catch (error) {
    console.error('Error creating vehicle:', error);
    throw error;
  }
}

export const deleteVehicle = async (id) => {
  try {
    const config = {method: 'delete'};    
    const response = await axiosWithExponentialBackoff(`${API_BASE_URL}/inventory/vehicle/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    throw error;
  }
}

export const fetchAllUsers = async () => {
  try {
    const data = await axiosWithExponentialBackoff(`${API_BASE_URL}/users/all`);                
    return data;    
  } catch (error) {
    console.error('Error fetching users:', error);    
    throw error;
  }
};

export const makeSale = async (data) => {
  try {
    const config = {method: 'post'};    
    const response = await axiosWithExponentialBackoff(`${API_BASE_URL}/sales/sale?user=${data.user}&vehicle=${data.vehicle}&selling_price=${data.selling_price}&date=${data.date}`, config);
    return response.data;
  } catch (error) {
    console.error('Error creating sale:', error);
    throw error;
  }
}

export const fetchSales = async () => {
  try {
    const data = await axiosWithExponentialBackoff(`${API_BASE_URL}/sales/all`);                
    return data;    
  } catch (error) {
    console.error('Error fetching sales:', error);    
    throw error;
  } 
}

export const deleteSale = async (id) => {
  try {
    const config = {method: 'delete'};    
    const response = await axiosWithExponentialBackoff(`${API_BASE_URL}/sales/sale/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting sale:', error);
    throw error;
  }
}

const axiosWithExponentialBackoff = async (url, config = {}, retries = 3, delay = 1000) => {
    try {
      const response = await axios(url,config);
      return response.data;
    } catch (error) {
      if (retries > 0) {
        const waitTime = delay * 1; // Double the delay for the next retry
        console.log(`Retrying in ${waitTime}ms... Attempts left: ${retries}`);
        await new Promise((resolve) => setTimeout(resolve, waitTime)); // Wait before retrying
        return axiosWithExponentialBackoff(url, config, retries - 1, waitTime);
      } else {
        throw new Error('Max retries reached. Error: ' + error.message + ". " + error.response.data);
      }
    }
  };

