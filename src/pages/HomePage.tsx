import React, { useState, useEffect } from 'react';
import { useCars } from '../context/CarsContext';
import Car from '../components/Car/Car';
import Loading from '../components/Loading/Loading';
import { Input, InputInterface, OptionsInterface } from '../components/Input/Input';


interface Filter extends InputInterface {
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const Home = () => {
  const { cars, brands, loading, error } = useCars();
  const [modelsOptions, setModelsOptions] = useState<OptionsInterface[]>([]);

  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anoModeloDe, setAnoModeloDe] = useState('');
  const [anoModeloAte, setAnoModeloAte] = useState('');
  const [combustivel, setCombustivel] = useState('');
  const [kmAte, setKmAte] = useState('');
  const [precoDe, setPrecoDe] = useState('');
  const [precoAte, setPrecoAte] = useState('');
  const [palavraChave, setPalavraChave] = useState('');

  const [sortOption, setSortOption] = useState('');

  const brandOptions: OptionsInterface[] = brands.map(({ brand }) => ({
    label: brand,
    value: brand.toLowerCase()
  }));

  const defaultModelOption: OptionsInterface = {
    label: "Selecione a marca",
    value: ""
  };

  useEffect(() => {
    let filteredBrand = brands.filter((el) => el.brand === marca.toUpperCase());
    setModelo("");

    if (filteredBrand.length > 0) {
      setModelsOptions(
        [{ label: "Selecione", value: "" }, ...filteredBrand[0].models.map((model) => ({
          label: model,
          value: model.toLowerCase()
        }))]
      )
    } else {
      setModelsOptions(
        [defaultModelOption]
      );
    }
  }, [marca]);

  const filters: Filter[] = [
    {
      name: "Marca",
      label: "Marca",
      value: marca,
      setValue: setMarca,
      type: "select",
      options: [{ label: "Selecione", value: "" }, ...brandOptions]
    },
    {
      name: "Modelo",
      label: "Modelo",
      value: modelo,
      setValue: setModelo,
      type: "select",
      options: modelsOptions
    },
    {
      name: "anoModeloDe",
      label: "Ano",
      placeholder: "De",
      value: anoModeloDe,
      setValue: setAnoModeloDe,
      type: "number",
    },
    {
      name: "anoModeloAte",
      label: "",
      placeholder: "Até",
      value: anoModeloAte,
      setValue: setAnoModeloAte,
      type: "number",
    },
    {
      name: "kmAte",
      label: "Km máxima",
      placeholder: "Até",
      value: kmAte,
      setValue: setKmAte,
      type: "number",
    },
    {
      name: "precoDe",
      label: "Valor mínimo",
      placeholder: "R$ 0",
      value: precoDe,
      setValue: setPrecoDe,
      type: "text",
    },
    {
      name: "precoAte",
      label: "Valor máximo",
      placeholder: "R$ 0",
      value: precoAte,
      setValue: setPrecoAte,
      type: "number",
    },
    {
      name: "Combustivel",
      label: "Combustível",
      value: combustivel,
      setValue: setCombustivel,
      type: "select",
      options: [
        { label: "Selecione", value: "" },
        { label: "Flex", value: "Flex" },
        { label: "Gasolina", value: "Gasolina" },
        { label: "Álcool", value: "Álcool" },
        { label: "Diesel", value: "Diesel" },
      ]
    },
    {
      name: "palavraChave",
      label: "Palavra-Chave",
      value: palavraChave,
      setValue: setPalavraChave,
      type: "text",
    }

  ]

  if (error) {
    return <main>
      <div className="l-page__content">
        <p className="l-page__error">{error}</p>
      </div>
    </main>;
  }

  if (loading) {
    return <main>
      <div className="l-page__content">
        <Loading />
      </div>
    </main>;
  }

  const filteredCars = cars.filter(car =>
    (marca === '' || car.Marca.toLowerCase().includes(marca.toLowerCase())) &&
    (modelo === '' || car.Modelo.toLowerCase().includes(modelo.toLowerCase())) &&
    (anoModeloDe === '' || car.AnoModelo >= parseInt(anoModeloDe)) &&
    (anoModeloAte === '' || car.AnoModelo <= parseInt(anoModeloAte)) &&
    (combustivel === '' || car.Combustivel.toLowerCase().includes(combustivel.toLowerCase())) &&
    (kmAte === '' || car.Km <= parseInt(kmAte)) &&
    (precoDe === '' || car.Preco >= parseFloat(precoDe)) &&
    (precoAte === '' || car.Preco <= parseFloat(precoAte)) &&
    (palavraChave === '' ||
      `${car.Marca} ${car.Modelo} ${car.Versao} ${car.Opcionais} ${car.Caracteristicas}`
        .toLowerCase().includes(palavraChave.toLowerCase()))
  );

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortOption) {
      case 'Maior Preço':
        return b.Preco - a.Preco;
      case 'Menor Preço':
        return a.Preco - b.Preco;
      case 'A - Z':
        return a.Modelo.localeCompare(b.Modelo);
      case 'Z - A':
        return b.Modelo.localeCompare(a.Modelo);
      default:
        return 0;
    }
  });

  return (
    <main>
      <div className="l-home__header">
        <h2 className="l-home__title">Seminovos</h2>
      </div>

      <div className="l-home__content">
        <div className="l-home__filters">
          {
            filters.map(filter => (
              <Input
                key={filter.name}
                name={filter.name}
                label={filter.label}
                placeholder={filter.placeholder}
                type={filter.type}
                value={filter.value}
                options={filter.options}
                callback={filter.setValue}
              />
            ))
          }
        </div>

        <div className="l-home__results">
          <div className="l-home__results-header">
            <ul className="l-home__breadcrumbs">
              <li><a href="https://www.ritmosp.com.br/">Home</a></li>
              <li><span>Seminovos</span></li>
            </ul>
            <Input name="order" label="Ordenar por" type='select' options={[
              { label: "Maior Preço", value: "Maior Preço" },
              { label: "Menor Preço", value: "Menor Preço" },
              { label: "A - Z", value: "A - Z" },
              { label: "Z - A", value: "Z - A" },
            ]} value={sortOption} callback={setSortOption} />
          </div>

          {
            sortedCars.length > 0 ? (
              <ul className="l-home__cars">
                {sortedCars.map((car) => (
                  <Car key={car.Id} car={car} />
                ))}
              </ul>
            ) : (
              <div>Nenhum carro encontrado.</div>
            )
          }
        </div>
      </div>
    </main>
  );
}

export default Home;
