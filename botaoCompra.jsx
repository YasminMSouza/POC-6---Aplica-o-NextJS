import React from "react";
import styles from "./botaoCompra.module.css";

function BotaoCompra({ total, compraRealizada }) {
  const handleClick = () => {
    alert("Compra realizada com sucesso!");
  };
  return (
    <button className={styles.botao} onClick={compraRealizada}>
      Comprar
      <span className={styles.preco}>R$ {total.toFixed(2)}</span>
    </button>
  );
}

export default BotaoCompra;
