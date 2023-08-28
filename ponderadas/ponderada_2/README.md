# Atividade 1: Criando o ambiente para a execução de uma aplicação containerizada (former: Criando uma conta em uma núvem comercial)

## Enunciado
Esta atividade tem por objetivo desenvolver um projeto web que possibilite os usuários registrarem dados em um banco de dados. O deploy do banco, da API do backend e do frontend deve acontecer utilizando uma aplicação com multiplos containers. A aplicação não precisa utilizar frameworks, pode ser realizada utilizando os primitivos presentes na linguagem de programação escolhida.

### Padrão de qualidade:
 - ✅ Construção do dockerfile: o arquivo contem todas as informações necessárias para a construção da imagem dos containers;
 - Publicação das Imagens no DockerHub: todas as imagens construídas para a aplicação estão publicadas no DockerHub;
 - ✅ Construção do docker-compose: o arquivo contem todas as informações necessárias para lançar os containers da aplicação;
 - A arquitetura da solução foi apresentada: a arquitetura utilizada foi apresentada e sua escolha foi justificada pelo estudante;
 - ✅ A aplicação foi executada em um conjunto de containers Docker;
 - As instruções no arquivo README foram suficientes para executar a aplicação: as instruções no arquivo README foram suficientes para executar a aplicação APENAS SEGUINDO OS PASSOS CONTIDOS NO DOCUMENTO;
 - ✅ A aplicação apresenta uma tela de login;
 - ✅ A aplicação apresenta uma tela com as notas enviadas pelo usuário;
 - ✅ A aplicação protege as rotas da tela de login para apresentar elas apenas para usuário logados no sistema;
 - ✅ A estrutura de pastas utilizada no projeto foi apresentada no arquivo README do projeto.

## Conteúdo
### Estrutura de pastas
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
Primeiro, clone a imagem deste repositório pelo terminal, ela também pode ser encontrada no [DockerHub](https://hub.docker.com/r/lukovsk/flask-cv):
<pre> <code>
docker pull lukovsk/flask-cv:latest
</code> </pre>

Depois, apenas execute a imagem em um docker na porta 80 com o seguinte comando:
<pre> <code>
docker run -p 80:80 flask-cv
</code> </pre>

Com isso, o servidor me flask já está rodando na porta 80, apenas acesse ```localhost:80/```.