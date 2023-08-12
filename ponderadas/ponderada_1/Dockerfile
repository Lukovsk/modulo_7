# Pegando a imagem oficial do python 3.9
FROM python:3.9

# Cria o diretorio que vamos dockerizar
WORKDIR /code

COPY ./app/requirements.txt /code/requirements.txt

# instala os frameworks necessários no docker
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# copia o código do servidor para o docker
COPY ./app /code/app

# inicia o servidor na porta 80
CMD ["python", "app/app.py"]
