import { BASE_URL, AUTH_TOKEN } from "../../config";
import { LoginRequest } from "../../interfaces/Login";


const URL = `${BASE_URL}/Auth/login`;
const HEADERS = {
  Authorization: AUTH_TOKEN,
  "Content-Type": "application/json"
};


export const LoginService = async (loginRequest: LoginRequest): Promise<string | null> => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(loginRequest)
    });

    if (response.ok) {
      return null;
    } else if (response.status === 400) {
      const errorText = await response.text();
      return errorText;
    } else {
      return "Error inesperado. Intentalo más tarde.";
    }
  } catch (error) {
    console.error("Error:", error);
    return "No se pudo conectar al servidor.";
  }
};
