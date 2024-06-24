export interface AdsetRequest {
  Email: string;
  Senha: string;
  CNPJ: string;
  Portal: "SiteProprio"
}

export interface CarInterface {
  Id: number;
  Loja: string;
  LojaId: number;
  Tipo: string;
  Marca: string;
  Modelo: string;
  Versao: string;
  Km: number;
  AnoFabricacao: number;
  AnoModelo: number;
  Cor: string;
  Combustivel: string;
  Transmissao: string;
  Placa: string;
  Chassi: string;
  Opcionais: string;
  Caracteristicas: string;
  PrecoDe: number | null;
  Preco: number;
  Portas: number;
  Condicao: string;
  Status: string;
  Estoque: string;
  Publicado: boolean;
  Blindado: boolean;
  HashDados: string;
  HashImagem: string;
  Fotos: string[];
  Observacao: string | null;
  DataHoraAPI: string;
  SuperOferta: boolean;
  Video: string | null;
  Carroceria: string;
  SpinCar: boolean;
  DiasEstoque: number;
}

export interface LojaInterface {
  name: string;
  cnpj: string;
  phone: string;
  open: string[];
  address: string;
}


