FROM archlinux:base-devel

LABEL version="0.1.0"
LABEL maintainer="Jeffrey Tse <jeffreytse.mail@gmail.com>"
LABEL homepage="https://github.com/jeffreytse/jekyll-deploy-action"

COPY LICENSE.txt README.md /

COPY script /script
COPY providers /providers
COPY Gemfile Makefile theme.* /

RUN chmod +x /theme.sh
ENTRYPOINT ["/theme.sh"]
