FROM node:18

WORKDIR /workspace

# Garante que a pasta backend existe
RUN mkdir -p ./backend

# Copia apenas package.json inicialmente
COPY backend/package*.json ./backend/

# Instala dependências
RUN cd backend && npm install
