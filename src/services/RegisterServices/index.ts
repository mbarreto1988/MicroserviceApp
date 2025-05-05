import { BASE_URL, AUTH_TOKEN } from "../../config";
import { RegisterData } from "../../interfaces/Register";


const URL = BASE_URL;
const HEADERS = {
    Authorization: AUTH_TOKEN,
    "Content-Type": "application/json"
  };


export const registerUser = async (data: RegisterData): Promise<void> => {
    const response = await fetch(`${URL}/Registers`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrar');
    }
  };