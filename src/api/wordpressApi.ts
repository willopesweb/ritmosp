import axios from "axios";
import { LojaInterface } from "../types";

const BASE_URL = "https://www.ritmosp.com.br/wp-json/wp/v2/loja";

interface WordpressPostIntercace {
  acf: {
    titulo: string | null;
    cnpj: string | null;
    telefone: string | null;
    email: string | null;
    horarios: string | null;
    endereco: string | null;
  }
}

export const fetchLojas = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return getDataFromWordpress(response.data as WordpressPostIntercace[]);
  } catch (error) {
    console.error('Erro ao buscar os lojas:', error);
    throw error;
  }
}

const getDataFromWordpress = (data: WordpressPostIntercace[]) => {
  const lojas: LojaInterface[] = data.map(({ acf }) => {
    return {
      name: acf.titulo as string,
      cnpj: acf.cnpj ? acf.cnpj : "",
      phone: acf.telefone ? acf.telefone : "",
      email: acf.email ? acf.email : "ritmosp@ritmosp.com.br",
      open: acf.horarios ? acf.horarios.split(",") : [""],
      address: acf.endereco ? acf.endereco : ""
    }
  });

  lojas.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  })

  return lojas;
}