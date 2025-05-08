# Etapa 1: build da imagem com arquivos estáticos
FROM nginx:alpine

# Remove a configuração padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos do frontend para o Nginx
COPY frontend/ /usr/share/nginx/html/

# Expondo a porta padrão do Nginx
EXPOSE 80

# Comando de inicialização
CMD ["nginx", "-g", "daemon off;"]
