import React from 'react';
import "./About.scss";
import logo from "../../assets/img/logo.png";
interface AboutProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

const About = ({ active, setActive }: AboutProps) => {
  return (
    <section className={`c-about ${active ? "c-about--is-visible" : ""}`}>
      <div className="c-about__content">
        <header className="c-about__header">
          <img width="150" src={logo} alt="Ritmo SP" />
          <span className="c-about__close" onClick={() => setActive(false)}>X</span>
        </header>
        <div className="c-about__text">
          <p>Na RitmoSp, somos uma concessionária apaixonada por automóveis. Oferecemos uma ampla variedade de veículos novos e seminovos, além de serviços como acessórios, autopeças, revisão/oficina, funilaria e pintura, pneus, seguros e consórcio.</p>
          <p>Nossa missão é superar suas expectativas, proporcionando uma experiência excepcional desde a escolha até a compra do seu veículo. Trabalhamos com as melhores marcas e modelos, garantindo qualidade, confiabilidade e desempenho.</p>
          <p>Contamos com uma equipe especializada e pronta para ajudar em todas as etapas da sua compra. Valorizamos cada cliente de forma individual, oferecendo soluções personalizadas e um atendimento excepcional.
            Venha nos visitar e descubra por que somos a escolha preferida de tantos clientes. Na RitmoSp, você encontrará o veículo dos seus sonhos e uma experiência incrível.</p>
        </div>
      </div>
    </section>
  );
}

export default About;
