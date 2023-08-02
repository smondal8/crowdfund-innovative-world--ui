FROM nginx:1.23.4-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx-conf/crowdfund.conf /etc/nginx/conf.d/
RUN rm /usr/share/nginx/html/*
RUN mkdir -p /usr/share/nginx/html/crowdfund
RUN ln -sf /dev/stdout /var/log/nginx/crowdfund.access.log \
	&& ln -sf /dev/stderr /var/log/nginx/crowdfund.error.log
WORKDIR /usr/share/nginx/html/crowdfund
COPY dist/crowdfund/ .
EXPOSE 80
