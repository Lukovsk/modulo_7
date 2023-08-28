# Atividade 1: Criando o ambiente para a execução de uma aplicação containerizada (former: Criando uma conta em uma núvem comercial)

## Enunciado
Esta atividade tem por objetivo desenvolver um projeto web que possibilite os usuários registrarem dados em um banco de dados. O deploy do banco, da API do backend e do frontend deve acontecer utilizando uma aplicação com multiplos containers. A aplicação não precisa utilizar frameworks, pode ser realizada utilizando os primitivos presentes na linguagem de programação escolhida.

### Padrão de qualidade:
 - ✅ Construção do dockerfile: o arquivo contem todas as informações necessárias para a construção da imagem dos containers;
 - ✅ Publicação das Imagens no DockerHub: todas as imagens construídas para a aplicação estão publicadas no DockerHub;
 - ✅ Construção do docker-compose: o arquivo contem todas as informações necessárias para lançar os containers da aplicação;
 - ✅ A arquitetura da solução foi apresentada: a arquitetura utilizada foi apresentada e sua escolha foi justificada pelo estudante;
 - ✅ A aplicação foi executada em um conjunto de containers Docker;
 - ✅ As instruções no arquivo README foram suficientes para executar a aplicação: as instruções no arquivo README foram suficientes para executar a aplicação APENAS SEGUINDO OS PASSOS CONTIDOS NO DOCUMENTO;
 - ✅ A aplicação apresenta uma tela de login;
 - ✅ A aplicação apresenta uma tela com as notas enviadas pelo usuário;
 - ✅ A aplicação protege as rotas da tela de login para apresentar elas apenas para usuário logados no sistema;
 - ✅ A estrutura de pastas utilizada no projeto foi apresentada no arquivo README do projeto.

# Conteúdo

## Vídeo de demonstração


## Arquitetura da solução
A aplicação web deste repositório pode ser dividida em 3 partes:
- [Frontend](#frontend)
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
ponderada_1/
│
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

  api:
    image: lukovsk/ponderada_2-api
    command: bash -c 'uvicorn app.main:app --host 0.0.0.0'
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://lukovsk:3569@db:5432/postgres
    depends_on:
      - db

  frontend:
    image: lukovsk/ponderada_2-frontend
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
- [Frontend docker](https://hub.docker.com/r/lukovsk/ponderada_2-frontend)
- [Backend docker](https://hub.docker.com/r/lukovsk/ponderada_2-api)
- [PostgreSQL](https://hub.docker.com/_/postgres)