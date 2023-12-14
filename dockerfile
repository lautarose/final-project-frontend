# Usa una imagen de Node.js como base
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al directorio de trabajo en el contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Construye la aplicación React para producción
RUN npm run build

# Configura el entorno de producción
ENV NODE_ENV=production

# Expone el puerto 3000 (o el puerto que uses en tu aplicación React)
EXPOSE 3000

# Comando para ejecutar la aplicación cuando el contenedor se inicie
CMD ["npm", "start"]
