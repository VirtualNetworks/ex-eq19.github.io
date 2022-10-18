FROM archlinux:base-devel

LABEL version="0.6.0"
LABEL maintainer="Pact Foundation <pact-support@googlegroups.com>"
LABEL homepage="https://github.com/pact-foundation/pact-ruby-cli/blob/master/Dockerfile"

ENV NOKOGIRI_USE_SYSTEM_LIBRARIES=1
ENV BUNDLE_SILENCE_ROOT_WARNING=1

COPY LICENSE.txt README.md /

COPY script /script
COPY providers /providers
COPY Gemfile Makefile theme.* /

RUN chmod +x /theme.sh
ENTRYPOINT ["/theme.sh"]
