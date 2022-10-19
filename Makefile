ALIAS=grammar
DEBUG=JEKYLL_GITHUB_TOKEN=${TOKEN}

help:
	@echo "HomePage: https://github.com/eq19/${ALIAS}"
	@echo "Usage:"
	@echo "    make [subcommand]"
	@echo "Subcommands:"
	@echo "    install   Install the theme dependencies"
	@echo "    format    Format all files"
	@echo "    report    Make a report from Google lighthouse"
	@echo "    clean     Clean the workspace"
	@echo "    dist      Build the theme css and script"
	@echo "    status    Display status before push"
	@echo "    theme     Make theme as gem and install"
	@echo "    build     Build the test site"
	@echo "    server    Make a livereload jekyll server to development"
	@echo "    checkout  Reset the minified css and script to last commit"

checkout:
	@git checkout _config.yml
	@git checkout /js/theme.min.js
	@git checkout /css/theme.min.css

install:
	@gem install jekyll bundler
	@npm install
	@bundle install

format:
	@npm run format

report:
	@npm run report

clean:
	@bundle exec jekyll clean

dist: format clean
	@npm run build

status: format clean checkout
	@git status

theme: dist
	@gem uninstall ${ALIAS}
	@gem build *.gemspec
	@gem install *.gem && rm -f *.gem

server: dist
	@${DEBUG} bundle exec jekyll server --livereload

build:
	@bash .github/workflows/builders/docker/artifact.sh

