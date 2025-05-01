import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getListTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  } catch (err) {
    console.error('Erro ao buscar tasks:', err);
    throw err;
  }
}

export const createTasks = async (title) => {
  try {
    const data = {
      title: title
    }
    const response = await axios.post(`${API_BASE_URL}/tasks`, data);
    return response.data;
  } catch (err) {
    console.error('Erro ao criar tasks:', err);
    throw err;
  }
}

export const deleteTasks = async (taskId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    return response.data;
  } catch (err) {
    console.error('Erro ao deletar tasks:', err);
    throw err;
  }
}