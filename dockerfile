# Estágio 1: Configurando o ambiente de desenvolvimento Django
FROM python:3.9 AS django-backend

# Define o diretório de trabalho para o serviço backend
WORKDIR /service

# Copia os arquivos de dependências do Django
COPY service/requirements.txt .

# Instala as dependências do Django
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copia o código fonte do Django
COPY service/ .

# Define as variáveis de ambiente
ENV DJANGO_SETTINGS_MODULE=service.settings
ENV PYTHONUNBUFFERED=1

# Executa as migrações do Django
RUN python manage.py migrate

# Estágio 2: Configurando o ambiente de desenvolvimento Angular
FROM node:14 AS angular-frontend

# Define o diretório de trabalho para o aplicativo frontend
WORKDIR /app

# Copia os arquivos de dependências do Angular
COPY app/package.json app/package-lock.json .

# Instala as dependências do Angular
RUN npm install

# Copia o código fonte do Angular
COPY app/ .

# Compila o projeto Angular
RUN npm run build

# Estágio final: Combina os ambientes Django e Angular
FROM django-backend AS final

# Copia os arquivos compilados do Angular para o diretório estático do Django
COPY --from=angular-frontend /app/dist /service/static

# Expõe a porta 8000 para o servidor Django
EXPOSE 8000

# Comando para iniciar o servidor Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
