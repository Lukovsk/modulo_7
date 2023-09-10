# Atividade 3: Deploy de modelo de Machine Learning na Nuvem

## Enunciado
Construção e deploy de um modelo de predição ou classificação criados pelos alunos. Este modelo deve ser deployado em uma nuvem comercial e uma API de acesso a ele deve ser desenvolvida.

### Padrão de qualidade:
 -  ✅ Construção do dockerfile: o arquivo contem todas as informações necessárias para a construção da imagem dos containers para produção;
 -  ✅ Publicação das Imagens para a API: a API foi publicada corretamente na cloud;
 -  ✅ Documentação do ambiente de desenvolvimento: documentar o ambiente de desenvolvimento (não precisa estar dockerizado), seus requisitos e como executar o projeto. Exportar os notebooks temporários que foram utilizados em seu desenvolvimento;
 -  ✅ Documentação da API e seu funcionamento;
 -  ✅ Descrever qual modelo de Machine Learning foi escolhido e justificar sua escolha: essa justificativa pode vir da comparação entre diversos modelos que foram previamente aplicados;
 -  ✅ As instruções no arquivo README foram suficientes para executar a aplicação: as instruções no arquivo README foram suficientes para executar a aplicação APENAS SEGUINDO OS PASSOS CONTIDOS NO DOCUMENTO;
 -  ✅ Treinamento do modelo;
 -  ✅ Pré-processamento dos dados;

# Conteúdo

## Vídeo de demonstração


## Estrutura de pastas
<pre><code>ponderada_3/backend/
│
├── utils/
├── main.py
├── model_api.pkl
├── requirements.txt
└── dockerfile</code> </pre>
Onde:
```utils/```: diretório com os dados utilizados e os notebooks com a análise de dados e a modelagem necessária

```main.py```: código da api que carrega o modelo

```model_api.pkl```: arquivo pikle com o modelo randomforest

```requirements.txt```: arquivo de texto com as bibliotecas necessárias

```dockerfile```: arquivo com as instruções necessárias para a construção da imagem 

## Como usar essa aplicação
Para rodar esta aplicação, é necessário, primeiro, realizar o pull na imagem publicada no docker hub:

<pre> <code> docker pull lukovsk/ponderada3 </code> </pre>

Em seguida, basta rodar o container com o backend:

<pre> <code> docker run -d -p 8000:8000 lukovsk/ponderada3 </code> </pre>

Com isso, o backend já estará rodando na porta ```8000```, basta fazer um post na rota [http://localhost:8000/predict](http://localhost:8000/predict) com um json na seguinte estrutura:
<pre><code>{
    "Age": 0.5384,
    "annual_income": 0.3877
}</code> </pre>

## Ambiente de desenvolvimento
Os notebooks estão devidamente documentados em células de markdown.

## API
A API foi gerada pelo próprio AutoIML Pycaret, ela se constitui de uma rota post ```/predict```, a qual envia-se um json contendo a informação de um cliente com genero, idade e renda anual e se obtém, como resposta, a predição do modelo gravado para a pontuação desse cliente.

## Escolha do Modelo
A escolha do modelo (Ada Boost) foi feita através do AutoIML pycaret para testar o mesmo conjunto de dados em diferentes modelos preditivos pré-prontos, assim, após esses testes, o modelo escolhido foi o Ada Boost, um modelo de regressão que teve a maior pontuação entre os outros.