FROM nginx:1.23.4-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx-conf/failsafe.conf /etc/nginx/conf.d/
RUN rm /usr/share/nginx/html/*
RUN mkdir -p /usr/share/nginx/html/failsafe
RUN ln -sf /dev/stdout /var/log/nginx/failsafe.access.log \
	&& ln -sf /dev/stderr /var/log/nginx/failsafe.error.log
WORKDIR /usr/share/nginx/html/failsafe
COPY dist/logbook/ .
EXPOSE 80
