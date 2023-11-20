const token = 'test_1ae419fd241ad02d6c3909cab91595';
const campeonatoId = 14; // serie b

axios({
  method: 'get',
  url: `https://api.api-futebol.com.br/v1/campeonatos/${campeonatoId}/tabela`,
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(response => {
    const dadosTimes = response.data.map((time, index) => ({
      posicao: index + 1,
      nome: time.time.nome_popular,
      pontos: time.pontos,
      escudo: time.time.escudo,
    }));

    const tabelaBody = document.getElementById('dados-tabela');
    dadosTimes.forEach(time => {
      const row = tabelaBody.insertRow();
      const posicaoCell = row.insertCell(0);
      const escudoNomeCell = row.insertCell(1);
      const pontosCell = row.insertCell(2);

      posicaoCell.className = 'centralizado';
      pontosCell.className = 'centralizado';

      posicaoCell.textContent = time.posicao;

      const flexContainer = document.createElement('div');
      flexContainer.className = 'flex-container';

      const escudoImg = document.createElement('img');
      escudoImg.src = time.escudo;
      escudoImg.alt = `${time.nome} Logo`;
      escudoImg.className = 'escudo';
      flexContainer.appendChild(escudoImg);

      const nomeTime = document.createElement('div');
      nomeTime.textContent = time.nome;
      nomeTime.className = 'centralizado';
      flexContainer.appendChild(nomeTime);

      escudoNomeCell.appendChild(flexContainer);

       pontosCell.textContent = time.pontos;
    });
  })
  .catch(error => {
    console.error(error);
  });