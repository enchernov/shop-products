FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf


RUN mkdir -p /var/log/app_engine

RUN mkdir -p /usr/share/nginx/client/_ah && \
    echo "healthy" > /usr/share/nginx/client/_ah/health

# Finally, all static assets.
ADD client/ /usr/share/nginx/client/
RUN chmod -R a+r /usr/share/nginx/client
RUN -f docker-compose.yml up --build
