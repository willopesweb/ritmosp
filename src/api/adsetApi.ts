import axios from "axios";
import { AdsetRequest } from "../types";

const API_USER = import.meta.env.VITE_ADSET_API_USER;
const API_PASSWORD = import.meta.env.VITE_ADSET_API_PASSWORD;
const BASE_URL = '/integrador/api/estoqueveiculos';

function isValidCnpj(cnpj: string): boolean {
  // Verificar se o formato está correto (XX.XXX.XXX/XXXX-XX)
  const cnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  if (!cnpjPattern.test(cnpj)) {
    return false;
  }

  // Remover caracteres de formatação
  const cleanCnpj = cnpj.replace(/[.\-\/]/g, '');

  // Verificar se todos os caracteres são iguais (caso de CNPJ inválido)
  if (/^(\d)\1+$/.test(cleanCnpj)) {
    return false;
  }

  // Validar dígitos verificadores
  const validateDigits = (cnpj: string): boolean => {
    const weightsFirstDigit = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weightsSecondDigit = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const calculateVerifier = (cnpj: string, weights: number[]): number => {
      let sum = 0;
      for (let i = 0; i < weights.length; i++) {
        sum += parseInt(cnpj.charAt(i)) * weights[i];
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstVerifier = calculateVerifier(cnpj, weightsFirstDigit);
    const secondVerifier = calculateVerifier(cnpj, weightsSecondDigit);

    return firstVerifier === parseInt(cnpj.charAt(12)) && secondVerifier === parseInt(cnpj.charAt(13));
  };

  return validateDigits(cleanCnpj);
}

export function createAdsetApiRequest(cnpj: string): AdsetRequest {
  if (!cnpj || !isValidCnpj(cnpj)) throw new Error("CNPJ inválido");

  return {
    "Email": API_USER,
    "Senha": API_PASSWORD,
    "CNPJ": cnpj,
    "Portal": "SiteProprio"
  };
}

export const fetchCars = async (request: AdsetRequest) => {
  try {
    const stringRequest = `"${JSON.stringify(request).replace(/"/g, "'")}"`;
    const response = await axios.post(BASE_URL, stringRequest, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os carros:', error);
  }
}