import React from 'react';
import estilos from './Loading.module.css';

export function Loading () {
  return (
    <div className={estilos.loading}>
      <h1>Loading...</h1>
      <img src="http://cdn5.upsocl.com/wp-content/uploads/2013/05/original_360.png-2.gif" alt='Loading...' />
    </div>
  )
}