import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {

  return (
    <div>
      <h1>Página não encontrada</h1>
      <Link to="/">Volta para home</Link>
    </div>
  );
}

export default Page404;
