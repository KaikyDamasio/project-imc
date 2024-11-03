import React, { useState } from 'react';
import './components/app.css';

function App() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');

  const calcularIMC = (e) => {
    e.preventDefault();

    // Normaliza a entrada de altura: substitui vírgula por ponto
    const normalizedAltura = altura.replace(',', '.');

    // Verifica se a altura está em centímetros ou metros
    let alturaEmMetros;
    if (normalizedAltura.length <= 3) {
      // Se a entrada tem 3 dígitos ou menos, consideramos como centímetros
      alturaEmMetros = parseFloat(normalizedAltura) / 100; // Converter cm para metros
    } else {
      // Se a entrada tem mais de 3 dígitos, consideramos como metros
      alturaEmMetros = parseFloat(normalizedAltura);
    }

    // Calcular o IMC
    const imcCalculado = (peso / (alturaEmMetros * alturaEmMetros)).toFixed(2);
    
    setImc(imcCalculado);
    definirClassificacao(imcCalculado);
  };

  const definirClassificacao = (imc) => {
    if (imc < 18.5) {
      setClassificacao('Abaixo do peso');
    } else if (imc >= 18.5 && imc < 24.9) {
      setClassificacao('Peso normal');
    } else if (imc >= 25 && imc < 29.9) {
      setClassificacao('Sobrepeso');
    } else if (imc >= 30 && imc < 34.9) {
      setClassificacao('Obesidade grau I');
    } else if (imc >= 35 && imc < 39.9) {
      setClassificacao('Obesidade grau II');
    } else {
      setClassificacao('Obesidade grau III');
    }
  };

  const handleAlturaChange = (e) => {
    const value = e.target.value;

    // Remover vírgulas para converter para ponto flutuante
    const partes = value.replace(',', '.').split('.');
    
    const parteInteira = partes[0];
    if (parteInteira.length > 4 || isNaN(parteInteira)) {
      return;
    }
    
    const parteDecimal = partes[1];
    if (parteDecimal && (parteDecimal.length > 2 || isNaN(parteDecimal))) {
      return;
    }

    setAltura(value);
  };

  const handlePesoChange = (e) => {
    const value = e.target.value;

    // Verificar se é um número e se possui até 3 dígitos
    if (!isNaN(value) && value.length <= 3) {
      setPeso(value);
    }
  };

  return (
    <div className="container">
      <h1>Calculadora de IMC</h1>
      <form onSubmit={calcularIMC}>
        <div>
          <label>
            Altura (ex: 1,87, 1.87 ou 187):
            <input
              type="text"
              value={altura}
              onChange={handleAlturaChange}
              required  
            />
          </label>
        </div>
        <div>
          <label>
            Peso (apenas números inteiros):
            <input
              type="text"
              value={peso}
              onChange={handlePesoChange}
              required
            />
          </label>
        </div>
        <button type="submit">Calcular IMC</button>
      </form>
      {imc && (
        <div className="resultado">
          <h2>Resultado</h2>
          <p>IMC: {imc}</p>
          <p>Classificação: {classificacao}</p>
        </div>
      )}
    </div>
  );
}

export default App;
