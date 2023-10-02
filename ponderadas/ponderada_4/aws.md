# Documentação AWS

## Subindo os EC2's
No fim deste tutorial, temos 3 EC2's rodando e um RDS.
![Todas as instâncias ec2](./media/ec2s.png)

### API com o modelo preditivo
Subí o EC2 com a API do modelo colocando seu nome de ```ponderada_4-api```
![EC2 da API](./media/ec2-api.png)

#### Grupo de segurança
Para configurar os grupos de segurança, apenas coloquei que ele aceitaria, como regra de entrada, TCP na porta 8745 de qualquer origem. O correto seria subir apenas o do backend e permitir apenas a origem do backend, mas para fins de teste, coloquei para qualquer.
![Grupo de segurança da api](./media/security-group-api.png)

#### Configurando o EC2
Depois disso, entrei na instância utilizando ssh e utilizei os seguintes comandos para rodar o backend:
<pre><code>ssh -i "jupyter.pem" ubuntu@ec2-3-89-219-59.compute-1.amazonaws.com

sudo apt update
sudo apt upgrade
sudo apt install python3-pip
git clone https://github.com/Lukovsk/modulo_7.git
cd modulo_7/ponderadas/ponderada_4/api
sudo pip3 install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8745</code></pre>
E pronto! Nossa api está rodando na porta 8745, podemos verificar na rota [http://3.89.219.59:8745/docs#/](http://3.89.219.59:8745/docs#/), onde a instância está deployada.
![Rota /docs da api funcionando](./media/api-working.png)

### Backend 
Subí o EC2 com o backend da aplicação colocando seu nome de ```ponderada_4-backend```
![EC2 do backend](./media/ec2-backend.png)

#### RDS com postgres do backend
Como uso o postgres para armazenar os dados, vamos criar um rds com o postgres.
Para isso, criei ele com as seguintes configurações:
<pre><code>DB_NAME: postgres
DB_USER: lukovsk
DB_PASSWORD: 12345678
DB_HOST: ponderada4-banco.cr0tf1tanemb.us-east-1.rds.amazonaws.com</code></pre>
Dessa forma, o link para acessá-lo é ```postgresql://lukovsk:12345678@ponderada4-banco.cr0tf1tanemb.us-east-1.rds.amazonaws.com:5432/postgres```
![Banco criado e seu endpoint](./media/banco.png)

#### Grupo de segurança
Para configurar os grupos de segurança, apenas coloquei que ele aceitaria, como regra de entrada, TCP na porta 8000 de qualquer origem. O correto seria subir apenas o do frontend e permitir apenas a origem do frontend, mas para fins de teste, coloquei para qualquer.
![Grupo de segurança da backend](./media/security-group-backend.png)

#### Configurando o EC2
Depois disso, entrei na instância utilizando ssh e utilize os seguintes comandos para rodar o backend:
<pre><code>ssh -i "jupyter.pem" ubuntu@ec2-3-82-142-183.compute-1.amazonaws.com

sudo apt update
sudo apt upgrade
sudo apt install python3-pip
git clone https://github.com/Lukovsk/modulo_7.git
cd modulo_7/ponderadas/ponderada_4/backend
sudo pip3 install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000</code></pre>
E pronto! Nosso backend está rodando na porta 8000, podemos verificar na rota [http://44.211.209.231:8000/docs](http://44.211.209.231:8000/docs) onde a instância está deployada.
![Rota /docs do backend funcionando](./media/backend-working.png)

### Frontend
Subí o EC2 do frontend por último colocando seu nome de ```ponderada_4-frontend```
![EC2 do frontend](./media/ec2-front.png)

#### Grupo de segurança
Para configurar os grupos de segurança, apenas coloquei que ele aceitaria qualquer TCP na porta 3000.

#### Configurando o EC2
Depois disso, entrei na instância utilizando ssh e utilizei os seguintes comandos para manter o frontend rodando:
<pre><code>ssh -i "jupyter.pem" ubuntu@ec2-18-234-143-32.compute-1.amazonaws.com

sudo apt update
sudo apt upgrade
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
git clone https://github.com/Lukovsk/modulo_7.git
cd modulo_7/ponderadas/ponderada_4/frontend
npm run dev</code></pre> 
E pronto! O servidor frontend está servindo na url [http://52.87.156.70:3000/dash](http://52.87.156.70:3000/dash)
![Frontend funcionando](./media/front-working.png)

