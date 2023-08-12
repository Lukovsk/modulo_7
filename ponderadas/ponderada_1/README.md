# Atividade 1: Criando o ambiente para a execução de uma aplicação containerizada (former: Criando uma conta em uma núvem comercial)

## Enunciado
Este autoestudo tem por objetivo verificar se o estudante consegue criar uma aplicação e um container para executá-la. Espera-se que os estudantes possam criar suas imagens e descrever o que foi necessário para realizar seu desenvolvimento. Espera-se ainda que os estudantes possam buscar as informações complementares para o desenvolvimento da aplicação.
Os estudantes devem criar uma aplicação em Python utilizam algum framework Web (sugesre-se o Flask ou o Fastapi), para apresentar uma página HTML com o currículo do estudante.
A aplicação deve ser containerizada e deve ser possível executá-la em um container Docker. O estudante deve descrever o que foi necessário para realizar o desenvolvimento da aplicação e containerização. O estudante deve ainda descrever como executar a aplicação em um container Docker.

O dockerfile deve conter as seguintes informações:

<ul>
    <li> A imagem base deve ser a imagem oficial do Python (a escolha do estudante) </li>
    <li> A imagem deve instalar o framework web escolhido </li>
    <li> A imagem deve copiar o código fonte da aplicação para o container </li>
    <li> A imagem deve expor a porta 80 </li>
    <li> A imagem deve executar o comando para iniciar a aplicação </li>
    <li> A imagem deve estar publicada no Dockerhub </li>
</ul>

## Conteúdo