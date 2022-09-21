---
images:
  - https://user-images.githubusercontent.com/68011645/89026666-ad3a8680-d35b-11ea-9f4b-d3fe26ae12ed.png
  - https://user-images.githubusercontent.com/68011645/88376699-87980500-cdd0-11ea-8900-7bab8c811bc9.png
---

# Mapping System
 
The Chronological Order:
{% gist d2336e28e79702acf38edd182003d5e0 prime.md %}

## Rich Results Test

Google Rich Results [documents is here](https://developers.google.com/search/reference/overview), You can check the [Google Rich Results Test Tool](https://search.google.com/test/rich-results?url={{ page.url | absolute_url | xml_escape }}) or [Search this document](https://www.google.com/search?q={{ page.url | absolute_url | xml_escape }}) to see what it looks like (beta)

{% for image in page.images %}
### test image {{ forloop.index }}
![test image {{ forloop.index }}]({{ image }}){: .shadow-box }
{% endfor %}

## Jekyll - How to build a [REST API](https://gist.github.com/MichaelCurrin/f8d908596276bdbb2044f04c352cb7c7)
{% gist f8d908596276bdbb2044f04c352cb7c7 %}

## Jekyll Liquid Cheatsheet
{% gist a466eed62cee30ad45e2 %}

## Site Metadata

```
{%- comment -%}
{% for item in site | sort -%}
	{%- if site[item].first -%}
		{%- if site[item].first.first -%}
			{%- include tabs.liquid %}- {{ item }}: hash
		{%- else -%}
			{%- include tabs.liquid %}- {{ item }}: array
		{%- endif -%}
	{%- else -%}
		{%- include tabs.liquid %}- {{ item }}: {{ site[item] }}
	{%- endif -%}
{%- endfor %}
{%- endcomment -%}
```

- pages: hash
- html_pages: hash
- categories: hash
- collections: hash
- config: 
- data: hash
- documents: hash
- related_posts: 
- tags: {}
- time: 2022-09-20 12:59:30 +0700
- static_files: hash
- posts: hash
- source: ./
- destination: /home/runner/work/grammar/grammar/_site
- collections_dir: assets/collections
- cache_dir: .jekyll-cache
- plugins_dir: assets/_plugins
- layouts_dir: assets/_layouts
- data_dir: assets/_data
- includes_dir: assets/_includes
- safe: false
- include: array
- exclude: array
- keep_files: array
- encoding: utf-8
- markdown_ext: markdown,mkdown,mkdn,mkd,md
- strict_front_matter: false
- show_drafts: 
- limit_posts: 1000
- future: false
- unpublished: false
- whitelist: 
- plugins: array
- markdown: kramdown
- highlighter: rouge
- lsi: false
- excerpt_separator: <!--end_excerpt-->
- incremental: true
- detach: false
- port: 4000
- host: 127.0.0.1
- baseurl: /pages/eq19
- show_dir_listing: false
- permalink: date
- paginate_path: /page:num
- timezone: Asia/Jakarta
- quiet: false
- verbose: false
- defaults: hash
- liquid: hash
- kramdown: hash
- input_types: array
- form_engines: array
- debug: hash
- livereload: true
- tag_page_dir: tag
- tag_feed_layout: nil
- tag_page_layout: nil
- page_gen-dirs: true
- page_gen: hash
- sass: hash
- feed: hash
- google: hash
- webrick: hash
- case_labels: array
- flow_labels: array
- username: eq19
- basedir: _feeds
- name: ₠Quantum Project | A Unique Mapping System
- slogan: ₠Quantum Project | System Mapping and Definition
- disclaimer: The definite key to identify whether you use our concept is when there a kind of development item lies a unified assignment in hexagonal form by six (6) corresponding sets while each sets pick a combination of six (6) routes with a pairing of six (6) to six (6) of all channels.
- license: Apache License, Version 2.0
- serving: false
- description: 
- url: https://github.com
- tag_data: 
- github: hash


## Github Metadata

```
{%- comment -%}
{% assign github = site.github -%}
{%- for item in github | sort -%}
	{%- if github[item].first -%}
		{%- if github[item].first.first -%}
			{%- include tabs.liquid %}- {{ item }}: hash
		{%- else -%}
			{%- include tabs.liquid %}- {{ item }}: array
		{%- endif -%}
	{%- else -%}
		{%- include tabs.liquid %}- {{ item }}: {{ github[item] }}
	{%- endif -%}
{%- endfor %}
{%- endcomment -%}
```

- api_url: https://api.github.com
- archived: 
- baseurl: /pages/eq19
- build_revision: 09e16467e4e968c6cebd09b7f21892729e72f6d4
- clone_url: https://github.com/eq19/eq19.github.io.git
- contributors: hash
- disabled: 
- environment: production
- help_url: https://help.github.com
- hostname: github.com
- is_project_page: false
- is_user_page: true
- issues_url: 
- language: 
- latest_release: false
- license: 
- organization_members: 
- owner: hash
- owner_display_name: 
- owner_gravatar_url: https://github.com/eq19.png
- owner_name: eq19
- owner_url: https://github.com/eq19
- pages_env: production
- pages_hostname: github.io
- private: 
- project_tagline: 
- project_title: eq19.github.io
- public_repositories: hash
- releases: hash
- releases_url: https://github.com/eq19/eq19.github.io/releases
- repository_name: eq19.github.io
- repository_nwo: eq19/eq19.github.io
- repository_url: https://github.com/eq19/eq19.github.io
- show_downloads: 
- source: hash
- tar_url: https://github.com/eq19/eq19.github.io/tarball/master
- url: https://github.com/pages/eq19
- versions: {}
- wiki_url: 
- zip_url: https://github.com/eq19/eq19.github.io/zipball/master


## Source Metadata
```
{%- comment -%}
{% assign source = github.source -%}
{%- for item in source | sort -%}
	{%- if source[item].first -%}
		{%- if source[item].first.first -%}
			{%- include tabs.liquid %}- {{ item }}: hash
		{%- else -%}
			{%- include tabs.liquid %}- {{ item }}: array
		{%- endif -%}
	{%- else -%}
		{%- include tabs.liquid %}- {{ item }}: {{ source[item] }}
	{%- endif -%}
{%- endfor %}
{%- endcomment -%}
```

- branchmaster: 
- path/: 


## Recommendations AI

- [Google Cloud products](https://cloud.google.com/products/#ai-and-machine-learning)
- [React Google Tag Manager Module](https://www.eq19.com/gtm/)
- [How to Add JavaScript to GTM](https://www.optizent.com/blog/how-to-add-javascript-to-google-tag-manager/)
- [Remote Trigger in GitHub Actions](https://www.provartesting.com/documentation/devops/continuous-integration/github-actions/remote-trigger-in-github-actions/)
- [Recommendations AI data ingestion](https://cloud.google.com/blog/topics/developers-practitioners/recommendations-ai-data-ingestion)
- [Submit a template to the Community Template Gallery](https://developers.google.com/tag-platform/tag-manager/templates/gallery)
- [Create models, Retail Search, and the new Retail console](https://cloud.google.com/retail/docs/create-models)
- [How to get better retail recommendations with Recommendations AI](https://cloud.google.com/blog/topics/developers-practitioners/how-get-better-retail-recommendations-recommendations-ai)
- [User data ingestion process from Google Tag Manager for Recommendation AI](https://stackoverflow.com/questions/65775858/user-data-ingestion-process-from-google-tag-manager-for-recommendation-ai-google)
