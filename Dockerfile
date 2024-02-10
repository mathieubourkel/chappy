FROM node:20.10.0-alpine as base
ARG TZ
RUN apk add --no-cache --virtual .build-tz tzdata;\
    cp /usr/share/zoneinfo/Europe/Paris /etc/localtime && echo Europe/Paris > /etc/timezone;\
    apk del .build-tz;\
    echo /usr/share/zoneinfo/Europe/Paris | cut -d'/' -f-5 | xargs mkdir -p;\
    cp /etc/localtime /usr/share/zoneinfo/Europe/Paris
WORKDIR /app
COPY package.json ./

FROM base as build
RUN npm install --silent

FROM build as buildprod
ARG VITE_BACK_HOST
ARG VITE_PROTOCOL
ARG VITE_BACK_PORT
COPY . .
RUN npm run build

FROM base as development
LABEL version="development"
COPY --from=build /app/node_modules /app/node_modules
CMD ["npm", "run", "dev"]

FROM nginx:1.25.3-alpine as production
ARG TZ
COPY --from=base --chown=nginx:nginx /usr/share/zoneinfo/$TZ /usr/share/zoneinfo/$TZ
WORKDIR /app
LABEL maintainer="Laetitia Ashry, Jeremy Laigle, Mathieu Bourkel"
LABEL version="production"
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid &&\
    mkdir /etc/nginx/ssl /var/www/certbot &&\
    chown -R nginx:nginx /etc/nginx/ssl &&\
    chown -R nginx:nginx /var/www/certbot
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=buildprod --chown=nginx:nginx /app/dist /app/dist
USER nginx
CMD ["nginx", "-g", "daemon off;"]

