import axios from 'axios';
import { useState } from 'react';


const cpfMask = value => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export default function HomePage() {
  const [value, setValue] = useState('')
  const [result, setResult] = useState()

  const handleSubmit = async () => {
    const newValue = value.replaceAll('.', '')
    const newSetValue = newValue.replaceAll('-', '')
    axios.get(`http://api.diretrixconsultoria.com.br/Consultas/Pessoa/${newSetValue}`, {
      headers: {
        'Authorization': 'Basic cmFmYWVsOjEwMTAxMA=='
      },
    }).then(resp => setResult(resp.data))
  }

  return (
      <>
        <h1>Consulte um CPF:</h1>
        <form>
          <label>CPF </label>
          <input
            type='text'
            placeholder='Digite o cpf'
            value={cpfMask(value)}
            onChange={(e) => setValue(e.target.value)}
            />
          <button type='button' onClick={handleSubmit} disabled={result}>Consultar</button>
        </form>
        {
          result && (
            <>
              <h2>{result.nome}</h2>
              <h2>{result.cpf}</h2>
            </>
          )
        }
      </>
  );
}