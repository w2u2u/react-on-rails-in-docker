FROM ruby:2.4.2

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /usr/src/backend

WORKDIR /usr/src/backend

ADD Gemfile /usr/src/backend/Gemfile
ADD Gemfile.lock /usr/src/backend/Gemfile.lock

RUN bundle install

ADD . /usr/src/backend

COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["rails", "s", "-b", "0.0.0.0"]