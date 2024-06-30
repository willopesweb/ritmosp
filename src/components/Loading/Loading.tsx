import React from 'react';
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="c-loading">
      <div className="c-loading__icon">
        <span></span>
      </div>
      <p className="c-loading__text">Carregando...</p>
    </div>
  );
};

export default Loading;
