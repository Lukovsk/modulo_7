# Prova 1 - Módulo 7 - Docker

## Enunciado
O objetivo da questão prática é elaborar um conjunto de arquivos Dockerfile e um arquivo docker-compose para executar a aplicação em anexo. É importante destacar a necessidade de um Dockerfile para cada parte do sistema e um docker-compose para lançar todos os seus componentes.

## Conteúdo

## Estrutura de pastas
Mantive o formato de pastas como estava no [repositório original](https://github.com/Murilo-ZC/Avaliacoes-M7-Inteli), apenas adicionar os dockerfiles e o docker-compose.yml

<pre> <code>
prova_1/src/
│
├── backend/
|   ├── main.py
│   ├── requirements.txt
│   ├── dockerfile
|   └── usuarios.db
│
├── frontend/
│   ├── public/script.js
│   ├── server.js
│   ├── dockerfile
|   └── package.json
│
└── docker-compose.yml
</code> </pre>
Onde:
- ```backend/```: diretório que possui a aplicação em fastapi que serve um gerencia o banco de dados em sqlite.
- ```frontend/```: diretório com a aplicação frontend utilizando apenas o nodejs.
- ```docker-compose.yml```: arquivo que instrui a criação dos dois dockers.

### Como usar essa aplicação
Para rodar esta aplicação, basta copiar o seguinte código para um arquivo ```docker-compose.yml```:
<pre><code># docker-compose.yml
version: '3.8'

services:
  server:
    image: lukovsk/prova_1-server
    ports:
      - "8000:8000"
  frontend:
    image: lukovsk/prova_1-frontend
    ports:
      - "3000:3000"
    depends_on:
      - server
</code>
</pre>
Basicamente, esse ```docker-compose.yml``` é responsável por baixar as imagens já construídas (buildadas) do meu docker hub e construir os containers seguindo as instruções em cada dockerfile.
Na [próxima sessão](#dockerfiles), explico melhor cada dockerfile e o que eles fazem.

Depois, apenas rode esse docker-compose com o comando:

<pre> <code>
docker compose up -d --build
</code> </pre>

Com isso, a aplicação já estará rodando com um backend que pode ser testado na rota [localhost:8000](localhost:8000) e, principalmente, a aplicação web, no endereço [localhost:3000](localhost:3000).

#### Imagens
Além disso, as imagens criadas aqui podem ser encontradas no dockerhub pelos links:
- [Frontend docker](https://hub.docker.com/r/lukovsk/prova_1-frontend)
- [Backend docker](https://hub.docker.com/r/lukovsk/prova_1-server)


### dockerfiles
Primeiramente, vamos ao ```docker-compose.yml``` original:
<pre> <code> #docker-compose.yml
services:
  server:
    build:
      context: ./backend
    ports:
      - "8000:8000"
  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - server
</code> </pre>
Ele instrui que, dentro dos diretórios ```./backend``` e ```./frontend```, ele encontrará e buildará os dockerfiles encontrados. Além disso, ele também aproveita para ligar as portas do meu sistema com as do container.

#### backend
No ```./backend/dockerfile```, temos as seguintes instruções: 

<pre> <code>
# Pegando a imagem oficial do python 3.9
FROM python:3.9

# Cria o diretorio que vamos dockerizar
WORKDIR /code

# Copia o requirements para dentro do diretório que estamos trabalhando no container
COPY ./requirements.txt /code/requirements.txt

# instala os frameworks necessários no docker
RUN pip install -r /code/requirements.txt

# copia o resto dos arquivos do servidor para o docker
COPY . /code

# expõe a porta 8000 do computador
EXPOSE 8000

# inicia o servidor 
CMD ["python", "main.py"]
</code> </pre>
Esse dockerfile, basicamente, constrói a imagem do backend baseando-se numa imagem do node, mas instala as dependencias necessárias, expõe a porta 8000 e inicia o servidor em fastapi.

#### frontend
De forma semelhante, o ```./frontend/dockerfile```, 
<pre> <code>
# Pegando a imagem oficial do node 18
FROM node:18-alpine

# Cria o diretorio que vamos dockerizar
WORKDIR /front

# Copia os jsons com as dependencias de pacotes para dentro do container
COPY ./package*.json /front

# instala as dependencias necessários no docker
RUN npm i

# copia o código do front para o docker
COPY . /front/

# expõe a porta 3000
EXPOSE 3000

# inicia o servidor 
CMD ["node", "server.js"]
</code> </pre>
Também usa a imagem original do node 18, instala as dependencias necessárias, expõe a porta 3000 e inicia o servidor da aplicação, que acessa as rotas do servidor em fastapi.