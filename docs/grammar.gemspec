# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "grammar"
  spec.version       = "0.1.7"
  spec.license       = "MIT"

  spec.authors       = ["eQ19"]
  spec.email         = ["admin@eq19.com"]
  spec.homepage      = "https://github.com/eq19/grammar"
  spec.summary       = "A unique mapping system based on prime objects"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_sass|_includes|_layouts|_plugins|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", ">= 3.0"
# spec.add_runtime_dependency "github-pages", "~> 227"

  spec.add_development_dependency "netrc", "~> 0.11.0"
  spec.add_development_dependency "jemoji", "~> 0.12.0"
  spec.add_development_dependency "jekyll-feed", "~> 0.15.1"
  spec.add_development_dependency "jekyll-gist", "~> 1.5.0"
  spec.add_development_dependency "jekyll-avatar", "~> 0.7.0"
  spec.add_development_dependency "jekyll-tagging", "~> 1.1.0"
  spec.add_development_dependency "jekyll-sitemap", "~> 1.4.0"
  spec.add_development_dependency "jekyll-timeago", "~> 0.13.1"
  spec.add_development_dependency "jekyll-mentions", "~> 1.6.0"
  spec.add_development_dependency "jekyll-paginate", "~> 1.1.0"
  spec.add_development_dependency "jekyll-remote-theme", "~> 0.4.3"
  spec.add_development_dependency "jekyll-readme-index", "~> 0.3.0"
  spec.add_development_dependency "jekyll-coffeescript", "~> 1.1.1"
  spec.add_development_dependency "jekyll-relative-links", "~> 0.6.1"
  spec.add_development_dependency "jekyll-default-layout", "~> 0.1.4"
  spec.add_development_dependency "jekyll-redirect-from", "~> 0.16.0"
  spec.add_development_dependency "jekyll-github-metadata", "~> 2.15.0"
  spec.add_development_dependency "jekyll-titles-from-headings", "~> 0.5.3"
  spec.add_development_dependency "jekyll-optional-front-matter", "~> 0.3.2"
end
