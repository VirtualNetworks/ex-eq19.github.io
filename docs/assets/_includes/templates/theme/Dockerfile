FROM combos/ruby_node:3_16
LABEL version="0.8.0"

ENV NOKOGIRI_USE_SYSTEM_LIBRARIES=1
ENV BUNDLE_SILENCE_ROOT_WARNING=1
ENV RUBYOPT=W0

COPY LICENSE.txt README.md /
COPY providers /providers
COPY script /script
COPY Gemfile theme.* /

RUN chmod +x /theme.sh
ENTRYPOINT ["/theme.sh"]
