import React, { useState } from "react";
import styles from "./Lugar.module.css";

function Lugar({ reservado, onSelect }) {
  const [selecionado, setSelecionado] = useState(false);

  const reservarAssento = () => {
    if (!reservado) {
      const novoEstado = !selecionado;
      setSelecionado(!selecionado);
      onSelect(novoEstado);
    }
  };

  return (
    <div
      className={`${styles.lugar} ${
        reservado ? styles.reservado : selecionado ? styles.selecionado : ""
      }`}
      onClick={reservarAssento}
    />
  );
}

export default Lugar;
