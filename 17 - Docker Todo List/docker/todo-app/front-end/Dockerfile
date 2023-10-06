FROM node:16-alpine
WORKDIR /app/front-end
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm" ]
CMD ["start"]
ADD node_modules.tar.gz .
