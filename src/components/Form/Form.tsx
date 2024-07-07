import React, { useState } from 'react';
import "./Form.scss";
import { Input } from '../Input/Input';
import Notification from '../Notification/Notification';
import { useCars } from '../../context/CarsContext';
import axios from 'axios';

const Form = ({ vehicle }: { vehicle: string }) => {
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

    const formData = new FormData();
    formData.append('name', name);
    formData.append('vehicle', vehicle);
    formData.append('fiscalCode', fiscalCode);
    formData.append('phone', phone);
    formData.append('userEmail', userEmail);
    formData.append('question', question);
    formData.append('contactFrom', contactFrom);
    formData.append('email', email as string);

    try {
      const response = await axios.post('https://ritmosp.com.br/seminovos/processForm.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200 && response.data.status === "success") {
        setSuccess(true);
        setError(null);
      } else {
        console.log(response);
        setError(response.data.message ? response.data.message : 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.');
        setSuccess(false);
      }
    } catch (error) {
      setError('Ocorreu um erro ao enviar o formulário');
      setSuccess(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="name"
        value={name}
        callback={setName}
        type="text"
        label="Nome"
        required={false}
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
        required={false}
        placeholder="CPF/CNPJ"
      />
      <Input
        name="phone"
        value={phone}
        callback={setPhone}
        type="text"
        mask="phone"
        maxLength={15}
        required={false}
        label="Telefone"
        placeholder="Telefone"
      />
      <Input
        name="userEmail"
        value={userEmail}
        callback={setUserEmail}
        type="email"
        label="E-mail"
        required={false}
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
      {success && <Notification type="success" message="Mensagem enviada com sucesso!" float={true} />}
    </form>
  )
}

export default Form;
