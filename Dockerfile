FROM node:20.10.0-alpine as base
ENV TZ Europe/Paris
RUN apk add --no-cache --virtual .build-tz tzdata;\
    cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone;\
    apk del .build-tz;\
    echo /usr/share/zoneinfo/$TZ | cut -d'/' -f-5 | xargs mkdir -p;\
    cp /etc/localtime /usr/share/zoneinfo/$TZ
WORKDIR /app
COPY package.json ./

FROM base as build
RUN npm install --silent

FROM build as buildprod
COPY . .
RUN npm run build

FROM base as development
LABEL version="development"
COPY --from=build /app/node_modules /app/node_modules
CMD ["npm", "run", "dev"]

FROM nginx:1.25.3-alpine as production
ENV TZ Europe/Paris
LABEL maintainer="Laetitia Ashry, Jeremy Laigle, Mathieu Bourkel"
LABEL version="production"
COPY --from=buildprod /app/dist /app/dist
COPY --from=base /usr/share/zoneinfo/$TZ /usr/share/zoneinfo/$TZ

CMD ["nginx", "-g", "daemon off;"]

