import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCars } from '../context/CarsContext';
import { CarInterface } from '../types';
import Loading from '../components/Loading/Loading';
import Icon from '../components/Icon';
import Button from '../components/Button/Button';
import { formatParamURL } from '../utils';
import Image from '../components/Image/Image';
import { Input } from '../components/Input/Input';


const CarPage = () => {
  const { id } = useParams<{ id: string }>();
  const { cars, loading, error } = useCars();
  const [featuredPhoto, setFeaturedPhoto] = useState("");
  const car = cars ? cars.find((car: CarInterface) => formatParamURL(`${car.Modelo}${car.Versao}`) === id) : null;

  const [name, setName] = useState("");
  const [fiscalCode, setFiscalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [contactFrom, setContactForm] = useState("");

  function handleSubmit() {

  }

  if (loading) {
    return <main>
      <div className="l-page__content">
        <Loading />
      </div>
    </main>;
  }


  if (error || !car) {
    return <main>
      <div className="l-page__content">
        {error ? error : "Carro não encontrado."}
      </div>
    </main>;
  }

  return (
    <main className="l-car">
      <section className="l-car__content">
        <header className="l-car__header">
          <h1>{car.Modelo} {car.Versao} </h1>
        </header>
        <div className="l-car__info">
          <div className="l-car__photos">
            <Image
              containerClass="l-car__main-photo"
              src={featuredPhoto === "" && car.Fotos.length > 0 ? car.Fotos[0] : featuredPhoto}
              alt={`${car.Modelo} ${car.Versao}`}
            />
            <div className="l-car__photos-list">
              <ul>
                {car.Fotos.length > 0 && car.Fotos.map(photo => (
                  <li key={photo} onClick={() => setFeaturedPhoto(photo)}>
                    <Image
                      height="100"
                      width="100"
                      loading="lazy"
                      src={photo} />
                  </li>
                ))}
              </ul>
            </div>
            <ul className="l-car__details">
              <li>
                <Icon icon="calendar" size="30" />
                <div>
                  <span>Ano/Modelo</span>
                  <p>{car.AnoFabricacao}/{car.AnoModelo}</p>
                </div>
              </li>
              <li>
                <Icon icon="star" size="30" />
                <div>
                  <span>Cor</span>
                  <p>{car.Cor}</p>
                </div>
              </li>
              <li>
                <Icon icon="tachometer" size="30" />
                <div>
                  <span>Quilometragem</span>
                  <p>{car.Km && car.Km.toLocaleString('pt-BR')} KM</p>
                </div>
              </li>
              <li>
                <Icon icon="cog" size="30" />
                <div>
                  <span>Combustível</span>
                  <p>{car.Combustivel}</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="l-car__main">
            <div className="l-car__price">
              <div className="l-car__address">
                <Icon icon="location" size="30" />
                <p>{car.Loja}</p>
              </div>
              <span className="only">Por apenas</span>
              <b>{car.Preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b>

              <Button link={true} href="#" target="_blank" label="Fale com um consultor">
                <Icon icon="whatsapp" size="40" />
              </Button>
            </div>
            <section className="l-car__form">
              <h2 className="l-car__form-title">Solicitar proposta</h2>
              <form action="" onSubmit={() => handleSubmit()}>
                <Input
                  name="name"
                  value={name}
                  callback={setName}
                  type="text"
                  label="Nome"
                  placeholder="Nome Completo"
                />
                <Input
                  name="fiscalCode"
                  value={fiscalCode}
                  callback={setFiscalCode}
                  type="text"
                  label="CPF/CNPJ"
                  placeholder="CPF/CNPJ"
                />
                <Input
                  name="phone"
                  value={phone}
                  callback={setPhone}
                  type="text"
                  label="Telefone"
                  placeholder="Telefone"
                />
                <Input
                  name="email"
                  value={email}
                  callback={setEmail}
                  type="email"
                  label="E-mail"
                  placeholder="E-mail"
                />
                <Input
                  name="question"
                  value={question}
                  callback={setQuestion}
                  type="textarea"
                  label="Alguma dúvida ou sugestão?"
                  placeholder="Escreva aqui."
                />
                <Input
                  name="contactFrom"
                  value={contactFrom}
                  callback={setContactForm}
                  type="select"
                  label="Preferência de contato"
                  options={[
                    {
                      label: "Whatsapp",
                      value: "whatsapp"
                    },
                    {
                      label: "Telefone",
                      value: "telefone"
                    },
                    {
                      label: "E-mail",
                      value: "E-mail"
                    }
                  ]}
                />
                <input type='submit' className="c-button" />
              </form>
            </section>

          </div>
        </div>
      </section>
      <article className="l-car__optionals">
        <div className="l-car__optionals-content">
          <h2 className="l-car__optionals-title">
            Opcionais
          </h2>
          <ul className="l-car__optionals-list">{car.Opcionais.split(", ").map(optional => (
            <li key={optional}>{optional}</li>
          ))}</ul>
        </div>
      </article>
    </main>
  );
}

export default CarPage;
