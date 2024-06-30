import React, { FC } from 'react';
import Input from '../components/Input/Input';

interface CarFiltersProps {
  marca: string;
  setMarca: (value: string) => void;
  modelo: string;
  setModelo: (value: string) => void;
  anoModeloDe: string;
  setAnoModeloDe: (value: string) => void;
  anoModeloAte: string;
  setAnoModeloAte: (value: string) => void;
  combustivel: string;
  setCombustivel: (value: string) => void;
  kmAte: string;
  setKmAte: (value: string) => void;
  precoDe: string;
  setPrecoDe: (value: string) => void;
  precoAte: string;
  setPrecoAte: (value: string) => void;
  palavraChave: string;
  setPalavraChave: (value: string) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
}

const CarFilters: FC<CarFiltersProps> = ({
  marca, setMarca,
  modelo, setModelo,
  anoModeloDe, setAnoModeloDe,
  anoModeloAte, setAnoModeloAte,
  combustivel, setCombustivel,
  kmAte, setKmAte,
  precoDe, setPrecoDe,
  precoAte, setPrecoAte,
  palavraChave, setPalavraChave,
  sortOption, setSortOption
}) => {
  return (
    <div className="l-home__filters-content">
      <Input
        name="marca"
        label="Marca"
        type="text"
        value={marca}
        callback={(e) => setMarca(e.target.value)}
      />
      <Input
        name="modelo"
        label="Modelo"
        type="text"
        value={modelo}
        callback={(e) => setModelo(e.target.value)}
      />
      <Input
        name="anoModeloDe"
        label="Ano Modelo De"
        type="number"
        value={anoModeloDe}
        callback={(e) => setAnoModeloDe(e.target.value)}
      />
      <Input
        name="anoModeloAte"
        label="Ano Modelo Até"
        type="number"
        value={anoModeloAte}
        callback={(e) => setAnoModeloAte(e.target.value)}
      />
      <Input
        name="combustivel"
        label="Combustível"
        type="text"
        value={combustivel}
        callback={(e) => setCombustivel(e.target.value)}
      />
      <Input
        name="kmAte"
        label="KM Até"
        type="number"
        value={kmAte}
        callback={(e) => setKmAte(e.target.value)}
      />
      <Input
        name="precoDe"
        label="Preço De"
        type="number"
        value={precoDe}
        callback={(e) => setPrecoDe(e.target.value)}
      />
      <Input
        name="precoAte"
        label="Preço Até"
        type="number"
        value={precoAte}
        callback={(e) => setPrecoAte(e.target.value)}
      />
      <Input
        name="palavraChave"
        label="Palavra-chave"
        type="text"
        value={palavraChave}
        callback={(e) => setPalavraChave(e.target.value)}
      />
      <Input
        name="order"
        label="Ordenar por"
        type="select"
        options={[
          { label: "Maior Preço", value: "Maior Preço" },
          { label: "Menor Preço", value: "Menor Preço" },
          { label: "A - Z", value: "A - Z" },
          { label: "Z - A", value: "Z - A" },
        ]}
        value={sortOption}
        callback={(e) => setSortOption(e.target.value)}
      />
    </div>
  );
}

export default CarFilters;
