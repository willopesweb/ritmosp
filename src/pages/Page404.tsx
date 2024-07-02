import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {

  return (
    <main>
      <div className="l-page__content l-page__404" >
        <h1>Página não encontrada</h1>
        <Link to="/seminovos">Volta para home</Link>
      </div>
    </main>
  );
}

export default Page404;
