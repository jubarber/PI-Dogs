import estilos from './Landing.module.css';
import React from 'react';
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <section className={estilos.full}>
      <div className={estilos.fullInner}>
        <div className={estilos.content}>
          <h1>Nombre de la app</h1>
          <Link to='/home' className={estilos.btn}>HOME</Link>
        </div>
      </div>
    </section>
  )
}