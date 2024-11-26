# 🎥 POC6 - Aplicação em NextJS 

# 📋  **Descrição Geral**
**O projeto é um sistema de reserva de assentos para cinemas que permite:**
 
- Selecionar e reservar assentos.
- Alternar automaticamente entre modo Light e Dark com base na preferência do sistema operacional, com opção manual.
- Exibir informações sobre o filme selecionado.
- Calcular o total da compra em tempo real.

# 📂  **Estrutura do Projeto**
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
├── components/
│   ├── Lugar.jsx
│   ├── Lugar.module.css
│   ├── BotaoCompra.jsx
│   ├── BotaoCompra.module.css
│   ├── DarkMode.jsx
├── styles/
│   ├── globals.css
├── data/
│   ├── filme.json

```
# 📖  **Descrição dos Arquivos**
## 1. **Estilos Globais (globals.css)**
**Define os temas Light e Dark, aplicando estilos dinâmicos com variáveis CSS. A alternância ocorre automaticamente ou manualmente por meio do componente DarkMode.**

Exemplo de código:
```
:root {
  --background-color: #fbfbfb;
  --text-color: #050f1f;
  --corselecionado: #229a00;
  --corindisponivel: #ff0000;
  --corlivre: #dcdcdc;
}

.dark {
  --background-color: #0c081e;
  --text-color: #fbfbfb;
  --corselecionado: #229a00;
  --corindisponivel: #4c4c4c;
  --corlivre: #f5f5f5;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

## **2. Componente de Assento (Lugar.jsx e Lugar.module.css)**
**O componente Lugar renderiza cada assento, permitindo sua seleção ou bloqueio, com base na disponibilidade. Ele utiliza classes CSS dinâmicas.**

Props:
- reservado (boolean): Indica se o assento já está reservado.
- onSelect (função): Callback para atualizar o estado de seleção no componente pai.
- 
Exemplo de código:
```
import React, { useState } from "react";
import styles from "./Lugar.module.css";

function Lugar({ reservado, onSelect }) {
  const [selecionado, setSelecionado] = useState(false);

  const reservarAssento = () => {
    if (!reservado) {
      const novoEstado = !selecionado;
      setSelecionado(novoEstado);
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

```

**CSS associado:**

```
.lugar {
  width: 25px;
  height: 25px;
  background-color: var(--corlivre);
  border: 1px solid #343434;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.selecionado {
  background-color: var(--corselecionado);
}

.reservado {
  background-color: var(--corindisponivel);
  cursor: not-allowed;
}
```

## **3. Botão de Compra (BotaoCompra.jsx e BotaoCompra.module.css)**
**Este componente exibe o botão de compra e o total acumulado.**

Props:
- total (número): Preço total dos assentos selecionados.
- compraRealizada (função): Callback que exibe um alerta ao realizar a compra.
  
Exemplo de código:
```
import React from "react";
import styles from "./BotaoCompra.module.css";

function BotaoCompra({ total, compraRealizada }) {
  return (
    <button className={styles.botao} onClick={compraRealizada}>
      Comprar
      <span className={styles.preco}>R$ {total.toFixed(2)}</span>
    </button>
  );
}

export default BotaoCompra;

```

**CSS associado:**

```
.botao {
  background-color: var(--corselecionado);
  color: var(--corlivre);
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
}

.botao:hover {
  background-color: #1e7a00;
}

```

## **4. Dark Mode (DarkMode.jsx e DarkMode.module.css)**
**O componente DarkMode permite alternar manualmente entre os modos Light e Dark.**

Exemplo de código:

```
import { useState, useEffect } from "react";
import { BsBrightnessHigh, BsFillMoonStarsFill } from "react-icons/bs";

export default function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div onClick={toggleTheme} style={{ cursor: "pointer" }}>
      {isDarkMode ? <BsBrightnessHigh /> : <BsFillMoonStarsFill />}
    </div>
  );
}

```

## **5. Página Principal (page.tsx)**
**A página principal utiliza os componentes criados para renderizar o filme, os assentos e o botão de compra.**

Exemplo de código:

```
"use client";
import React, { useState, useEffect } from "react";
import Lugar from "../components/Lugar";
import BotaoCompra from "../components/BotaoCompra";
import DarkMode from "../components/DarkMode";
import "./globals.css";
import filme from "../data/filme.json";

export default function HomePage() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.classList.toggle("dark", prefersDark);
  }, []);

  const handleSelect = (isSelected) => {
    setTotal((prev) => (isSelected ? prev + filme.preco : prev - filme.preco));
  };

  const handleCompra = () => {
    alert(total > 0 ? "Compra realizada com sucesso!" : "Nenhum assento selecionado.");
  };

  return (
    <main>
      <DarkMode />
      <h1>{filme.titulo}</h1>
      <section>
        {filme.lugares.map((lugar) => (
          <Lugar
            key={lugar.id}
            reservado={lugar.reservado}
            onSelect={handleSelect}
          />
        ))}
      </section>
      <BotaoCompra total={total} compraRealizada={handleCompra} />
    </main>
  );
}

```

## **6. Dados do Filme (filme.json)**
**O arquivo JSON contém as informações do filme e o estado inicial dos assentos.**

Exemplo:

```
{
  "titulo": "A Forja",
  "horario": "16:40",
  "preco": 25.0,
  "lugares": [
    { "id": 1, "reservado": false },
    { "id": 2, "reservado": true }
  ]
}
```

## 🚀  **Como Testar**
**1. Inicie o servidor:**

```
npm run dev
```
**2. Acesse http://localhost:3000.**

**3. Verifique:**
- Seleção de assentos.
- Alteração entre modos Light e Dark.
- Exibição do preço total e funcionalidade do botão de compra.


### :family: Integrantes do Projeto


| ![Yasmin Mendes](https://avatars.githubusercontent.com/u/178385852?v=4) <br> <sub> Yasmin Mendes </sub> | ![Bruna Zakaib](https://avatars.githubusercontent.com/u/130071892?v=4) <br> <sub> Bruna Zakaib </sub> | ![Isabela Realli](https://avatars.githubusercontent.com/u/180230011?v=4) <br> <sub> Isabela Realli </sub> | ![Beatriz Soares](https://avatars.githubusercontent.com/u/180229545?v=4) <br> <sub> Beatriz Soares </sub> |
| --- | --- | --- | --- |
| [Yasmin Mendes](https://github.com/YasminMSouza) | [Bruna Zakaib](https://github.com/brunazpessoa) | [Isabela Realli](https://github.com/IsabelaReali) | [Beatriz Soares](https://github.com/Beatriz-sol) |

Licença 📝
Esse projeto está autorizado pelo MIT


