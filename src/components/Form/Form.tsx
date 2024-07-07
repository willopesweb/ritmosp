import React, { useState } from 'react';
import "./Form.scss";
import { Input } from '../Input/Input';
import Notification from '../Notification/Notification';
import { useCars } from '../../context/CarsContext';
import axios from 'axios';

const Form = () => {
  const { email } = useCars();
  const [name, setName] = useState("");
  const [fiscalCode, setFiscalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [contactFrom, setContactForm] = useState("Whatsapp");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('https://ritmosp.com.br/processForm.php', {
        name,
        fiscalCode,
        phone,
        userEmail,
        question,
        contactFrom
      });

      // Verificar a resposta do servidor
      if (response.status === 200) {
        setSuccess(true);
        setError(null);
      } else {
        setError('Ocorreu um erro ao enviar o formulário');
        setSuccess(false);
      }
    } catch (error) {
      setError('Ocorreu um erro ao enviar o formulário');
      setSuccess(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" value={email as string} />
      <Input
        name="name"
        value={name}
        callback={setName}
        type="text"
        label="Nome"
        required={true}
        placeholder="Nome Completo"
      />
      <Input
        name="fiscalCode"
        value={fiscalCode}
        callback={setFiscalCode}
        type="text"
        label="CPF/CNPJ"
        mask="cpf"
        maxLength={14}
        required={true}
        placeholder="CPF/CNPJ"
      />
      <Input
        name="phone"
        value={phone}
        callback={setPhone}
        type="text"
        mask="phone"
        maxLength={15}
        required={true}
        label="Telefone"
        placeholder="Telefone"
      />
      <Input
        name="userEmail"
        value={userEmail}
        callback={setUserEmail}
        type="email"
        label="E-mail"
        required={true}
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
            value: "Whatsapp"
          },
          {
            label: "Telefone",
            value: "Telefone"
          },
          {
            label: "E-mail",
            value: "E-mail"
          }
        ]}
      />
      <input type='submit' className="c-button" />

      {error && <Notification type="error" message={error} float={true} />}
      {success && <Notification type="success" message="Formulário enviado com sucesso!" float={true} />}
    </form>
  )
}

export default Form;
