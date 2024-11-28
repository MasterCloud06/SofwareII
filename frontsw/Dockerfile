# Establece la imagen base
FROM node:14-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todos los archivos del proyecto al contenedor
COPY . .

# Construir la aplicación React
RUN npm run build

# Instalar 'serve' para servir la aplicación de React
RUN npm install -g serve

# Exponer el puerto en el que se servirá la aplicación
EXPOSE 3000

# Comando para servir la aplicación de React
CMD ["serve", "-s", "build", "-l", "3000"]
