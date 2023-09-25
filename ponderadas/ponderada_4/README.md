# Atividade 4: Criação de uma aplicação protegida com CRUD

## Enunciado
Esta atividade tem por objetivo realizar a integração das demais atividades desenvolvidas. Ela será o frontend de visualização de dados do modelo disponibilizado. Esta interface deverá consumir os dados disponibilizados da atividade ponderada 3. O acesso a este dashboard deverá acontecer mediante ao login do usuário, conforme desenvolvido na atividade ponderada 2.

### Padrão de qualidade:
- ✅ Publicação das Imagens para os sistemas: o sistema foi publicada corretamente na cloud (API, Modelo, Backend e Frontend);
- ✅ Documentação do ambiente de de produção: documentar o ambiente de produção que foi implementado;
- ✅ Construção do Dashboard: o dashboard foi construído e consome os dados da API;
- ✅ Construção do Frontend: o frontend foi construído e consome os dados da API e faz o login do usuário;
- ✅ As instruções no arquivo README foram suficientes para executar a aplicação: as instruções no arquivo README foram suficientes para executar a aplicação APENAS SEGUINDO OS PASSOS CONTIDOS NO DOCUMENTO;

# Conteúdo

## Vídeo de demonstração


## Arquitetura da solução
A aplicação web deste repositório pode ser dividida em 3 partes:
- [Frontend](#frontend)
- [API do Modelo](#model-api)
- [Backend](#backend)
- [PostgreSQL](#postgresql)

### Frontend

#### Bibliotecas utilizadas
O Frontend desta aplicação está utilizando o framework [NextJS](https://nextjs.org). Aqui, existem outras bibliotecas auxiliares, como:
- [Cookies js](https://www.npmjs.com/package/js-cookie) 🍪
  - Utilizado para guardar os tokens de autenticação nos cookies do navegador
- [Sweet Alert](https://sweetalert2.github.io) ❗
  - Utilizado para os modais maravilhosos que aparecem ao longo da aplicação
- [Axios](https://axios-http.com/docs/intro) 🏃
  - Utilizado para requisições assíncronas com o servidor backend
- [Chart.js](https://www.chartjs.org)
  - Utilizado para os gráficos do dashboard

### Model Api

#### Bibliotecas utilizadas
Para guardar o modelo preditivo, utilizei, principalmente, a bilbioteca [PyCaret](https://pycaret.gitbook.io) em um servidor [FastAPI](https://fastapi.tiangolo.com).

### Backend
O Servidor desta aplicação foi criado utilizando o [FastAPI](https://fastapi.tiangolo.com). Aqui, existem muitas bibliotecas auxiliares, tais como:
- [Omar](https://collerek.github.io/ormar/)
  - Abstração do SQLAlchemy como ORM
- [Psycopg](https://www.psycopg.org/docs/)
  - Bibloteca para o uso do PostgreSQL
- [PyJWT](https://pyjwt.readthedocs.io/en/stable/)
  - Bibloteca para o autenticação de tokens

Inclusive, a estrutura de autenticação foi inspirada no próprio repositório do professor [Murilo](https://github.com/Murilo-ZC/M7-Inteli-Eng-Comp/tree/main/src/encontro03/adiciona_usuarios).

### PostgreSQL

## Estrutura de pastas
Inspirei-me 2 repositórios, um [repositório confiável que usa um docker compose com fastapi e postgre](https://testdriven.io/blog/fastapi-docker-traefik/) para criar a aplicação em fastapi aqui. Além disso, também utilizei o [tutorial do próprio nextjs](https://nextjs.org/docs/pages/building-your-application/deploying).

<pre> <code>
ponderada_4/
│
├── api/
|   ├── utils/
│   ├── main.py
│   ├── model_api.pkl
|   ├── requirements
|   └── dockerfile

├── backend/
|   ├── app/
│   ├── requirements.txt
│   ├── dockerfile
|   └── .env
│
├── frontend/
|   ├── components/
│   ├── pages/
│   ├── public/
│   ├── styles/
│   ├── Dockerfile
|   └── package.json
│
└── docker-compose.yml
</code> </pre>
Onde:
- ```api/```: diretório que possui a aplicação em fastapi que serve uma rota para a utilização do modelo preditivo
- ```backend/```: diretório que possui a aplicação em fastapi que serve um gerencia o banco de dados em postgres.
- ```frontend/```: diretório com a aplicação frontend em nextjs e o dockerfile necessário para a criação do seu docker.
- ```docker-compose.yml```: arquivo que instrui a criação dos três dockers.

### Como usar essa aplicação
Para rodar esta aplicação, basta copiar o seguinte código para um arquivo ```docker-compose.yml```:
<pre><code># docker-compose.yml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    expose:
      - 5432
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: lukovsk
      POSTGRES_PASSWORD: 3569

  model_api:
    image: lukovsk/ponderada_4-model_api
    build:
      context: ./api
    ports:
      - "8745:8745"
    

  backend:
    image: lukovsk/ponderada_4-backend
    build:
      context: ./backend
    command: bash -c 'uvicorn app.main:app --host 0.0.0.0'
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://lukovsk:3569@db:5432/postgres
    depends_on:
      - db
      - model_api

  frontend:
    image: lukovsk/ponderada_4-frontend
    build:
      context: ./frontend
    ports:
      - "3000:3000"


volumes:
  postgres_data:
</code>
</pre>

Depois, apenas rode esse docker compose com o comando:

<pre> <code>
docker compose up -d --build
</code> </pre>

Com isso, a aplicação já estará rodando com um backend que pode ser testado na rota [localhost:8000/user](localhost:8000/user) e, principalmente, a aplicação web, no endereço [localhost:3000](localhost:3000).

#### Imagens
Além disso, as imagens criadas aqui podem ser encontradas no dockerhub pelos links:
- [Frontend docker](https://hub.docker.com/r/lukovsk/ponderada_4-frontend)
- [API do modelo docker](https://hub.docker.com/r/lukovsk/ponderada_4-model_api)
- [Backend docker](https://hub.docker.com/r/lukovsk/ponderada_4-backend)
- [PostgreSQL](https://hub.docker.com/_/postgres)
