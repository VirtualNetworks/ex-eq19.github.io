DEBUG=JEKYLL_GITHUB_TOKEN=blank PAGES_API_URL=http://0.0.0.0
ALIAS=grammar

help:
	@echo "HomePage: https://github.com/rundocs/${ALIAS}\n"
	@echo "Usage:"
	@echo "    make [subcommand]\n"
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
	@echo "    checkout  Reset the theme minified css and script to last commit"
	@bash .github/workflows/builders/docker/artifact.sh

checkout:
	@git checkout _config.yml
	@git checkout docs/js/theme.min.js
	@git checkout docs/css/theme.min.css

install:
	@git config --global --add safe.directory '*'
	@install libv8-dev
	@install nodejs
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

build: dist
	@${DEBUG} bundle exec jekyll build --profile

server: dist
	@${DEBUG} bundle exec jekyll server --livereload
