import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {

  return (
    <main>
      <div className="l-home__content l-home__404" >
        <h1>Página não encontrada</h1>
        <Link to="/">Volta para home</Link>
      </div>
    </main>
  );
}

export default Page404;
