# Atividade 1: Criando o ambiente para a execução de uma aplicação containerizada (former: Criando uma conta em uma núvem comercial)

## Enunciado
Este autoestudo tem por objetivo verificar se o estudante consegue criar uma aplicação e um container para executá-la. Espera-se que os estudantes possam criar suas imagens e descrever o que foi necessário para realizar seu desenvolvimento. Espera-se ainda que os estudantes possam buscar as informações complementares para o desenvolvimento da aplicação.
Os estudantes devem criar uma aplicação em Python utilizam algum framework Web (sugere-se o Flask ou o Fastapi), para apresentar uma página HTML com o currículo do estudante.
A aplicação deve ser containerizada e deve ser possível executá-la em um container Docker. O estudante deve descrever o que foi necessário para realizar o desenvolvimento da aplicação e containerização. O estudante deve ainda descrever como executar a aplicação em um container Docker.

O dockerfile deve conter as seguintes informações:


- ✅A imagem base deve ser a imagem oficial do Python (a escolha do estudante) 
- ✅A imagem deve instalar o framework web escolhido
- ✅A imagem deve copiar o código fonte da aplicação para o container
- ✅A imagem deve expor a porta 80 
- ✅A imagem deve executar o comando para iniciar a aplicação
- ✅A imagem deve estar publicada no Dockerhub


## Conteúdo
### Estrutura de pastas
Inspirei-me em um [repositório oficial do docker](https://github.com/docker/awesome-compose/tree/master/flask) para criar a aplicação em flask aqui. Além disso, também utilizei o [tutorial de docker](https://www.freecodecamp.org/portuguese/news/um-guia-para-iniciantes-em-docker-como-criar-sua-primeira-aplicacao-com-o-docker/) recomendado pelo professor [Murilo](https://github.com/Murilo-ZC).

<pre> <code>
ponderada_1/
│
├── app/
│   │
│   ├── static/
│   |   |── images/
|   |
│   ├── templates/
│   │   |── index.html
|   |
│   ├── requirements.txt
│   └── app.py
│
├── venv/
│
└── Dockerfile
</code> </pre>
Onde:
- ```app/```: diretório que possui a aplicação em flask que serve um index.html com um currículo meu (desatualizado, mas posso atualizá-lo em outro momento).
- ```venv/```:  diretório da máquina virtual.
- ```Dockerfile```: arquivo que instrui como criar o docker.

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