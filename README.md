# Game Button

## Backend

Para rodar o backend, é necessário instalar as dependencias:

`yarn install` ou `npm i`

Criar um arquivo `.env` com base no `.env.example`

Se necessário, pode ser alterada a porta padrão que a api irá executar

Por ultimo, executar:

`yarn dev` ou `npm run dev`.

## Frontend React

Para rodar o frontend em react, é necessário instalar as dependencias: 

`yarn install` ou `npm i`

Criar um arquivo `.env` com base no `.env.example`

Se necessário, pode ser alterado o endpoint que a api está sendo executada

Por ultimo, executar:

`yarn dev` ou `npm run dev`.

## Funcionamento

O jogo irá solicitar inicialmente o nome do jogador;

Após inserir o nome, o jogo irá perguntar se deseja criar uma nova sala ou entrar em uma existente;

Ao entrar na sala, o jogador pode aguardar outros jogadores ou iniciar a partida;

O objetivo do jogo, é clicar no botão o mais rápido possível. O jogo irá somar o tempo que foi levado para clicar no botão a cada rodada. O jogador que somar 30 segundos primeiro, será eliminado.

Após um jogador ser eliminado, os contadores irão zerar e iniciar novamente com os jogadores restantes.

Isso irá se repetir até que reste apenas 1 jogador.

O botão do jogo tem um tempo variável para habilitar, entre 0 e 2 segundos, isso para testar o reflexo de cada jogador.

## Stack backend

O backend foi desenvolvido utilizando Express + Socket.IO

Esta stack foi escolhida pois o Socket.IO (WebSocket) permite uma comunicação continua entre todos os jogadores conectados, tornando a experiencia do jogo mais agradável.

O banco de dados foi desenvolvido para salvar apenas em memória do servidor, mas pode ser facilmente trocado por algum banco de dados relacional.