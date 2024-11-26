"use client";
import React, { useState, useEffect } from "react";
import Lugar from "./components/Lugar";
import "./globals.css";
import filme from "./filme.json";
import BotaoCompra from "./components/botaoCompra";

export default function HomePage() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.body.classList.toggle("dark", prefersDark);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e: MediaQueryListEvent) => {
      document.body.classList.toggle("dark", e.matches);
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  const handleSelect = (isSelected) => {
    setTotal((prev) => (isSelected ? prev + filme.preco : prev - filme.preco));
  };
  const handleCompra = () => {
    if (total > 0) {
      alert("Compra realizada com sucesso!");
    } else {
      alert("Nenhum assento selecionado.");
    }
  };

  return (
    <main className="container">
      <h1 className="title">{filme.titulo}</h1>
      <h2 className="subtitulo">{filme.horario}</h2>
      <article>
        <section className="lugaresGrid">
          {filme.lugares.map((lugar) => (
            <Lugar
              key={lugar.id}
              reservado={lugar.reservado}
              onSelect={handleSelect}
            />
          ))}
        </section>
        <section className="info">
          <h5>sinopse do filme</h5>
          <p>{filme.sinopse}</p>
          <h5>data de lançamento</h5>
          <p>{filme.dataLancamento}</p>
          <h5>Direção</h5>
          <p>{filme.direcao}</p>
        </section>
      </article>
      <h6>tela</h6>
      <div className="tela"></div>
      <div className="legenda">
        <ul>
          <li>
            <span className="assento-livre"></span>livre
          </li>
          <li>
            <span className="assento-indisponivel"></span>indisponível
          </li>
          <li>
            <span className="assento-selecionado"></span>selecionado
          </li>
        </ul>
      </div>
      <BotaoCompra total={total} compraRealizada={handleCompra} />
        
    </main>
  );
}
