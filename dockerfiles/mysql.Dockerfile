FROM mysql:8.0.33

ARG SCHEMA
COPY ${SCHEMA} /docker-entrypoint-initdb.d/

RUN echo "USE mysql;" > /docker-entrypoint-initdb.d/!timezones.sql &&  mysql_tzinfo_to_sql /usr/share/zoneinfo >> /docker-entrypoint-initdb.d/!timezones.sql

EXPOSE 3306