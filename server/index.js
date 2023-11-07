const axios = require('axios');

export const fetchData = (value) => {
  axios.get(`http://api.diretrixconsultoria.com.br/Consultas/Pessoa/${value}`, {
      headers: {
        'Authorization': 'Basic cmFmYWVsOjEwMTAxMA=='
      },
    }).then(resp => resp.data)
}