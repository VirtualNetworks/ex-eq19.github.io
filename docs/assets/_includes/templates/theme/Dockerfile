FROM archlinux:base-devel

LABEL version="0.6.0"
LABEL maintainer="Pact Foundation <pact-support@googlegroups.com>"
LABEL homepage="https://github.com/pact-foundation/pact-ruby-cli/blob/master/Dockerfile"

ENV NOKOGIRI_USE_SYSTEM_LIBRARIES=1
ENV BUNDLE_SILENCE_ROOT_WARNING=1
ENV RUBYOPT=W0

COPY LICENSE.txt README.md /
COPY providers /providers
COPY script /script
COPY Gemfile theme.* /

RUN chmod +x /theme.sh
ENTRYPOINT ["/theme.sh"]
