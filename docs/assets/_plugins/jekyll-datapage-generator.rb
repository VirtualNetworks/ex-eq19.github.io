# coding: utf-8
# Generate pages from individual records in yml files
# (c) 2014-2020 Adolfo Villafiorita
# Distributed under the conditions of the MIT License
# https://github.com/avillafiorita/jekyll-datapage_gen

module Jekyll

  module Sanitizer
    # strip characters and whitespace to create valid filenames, also lowercase
    def sanitize_filename(name)
      if(name.is_a? Integer)
        return name.to_s
      end
      return name.tr(
  "ÀÁÂÃÄÅàáâãäåĀāĂăĄąÇçĆćĈĉĊċČčÐðĎďĐđÈÉÊËèéêëĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħÌÍÎÏìíîïĨĩĪīĬĭĮįİıĴĵĶķĸĹĺĻļĽľĿŀŁłÑñŃńŅņŇňŉŊŋÑñÒÓÔÕÖØòóôõöøŌōŎŏŐőŔŕŖŗŘřŚśŜŝŞşŠšſŢţŤťŦŧÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųŴŵÝýÿŶŷŸŹźŻżŽž",
  "AAAAAAaaaaaaAaAaAaCcCcCcCcCcDdDdDdEEEEeeeeEeEeEeEeEeGgGgGgGgHhHhIIIIiiiiIiIiIiIiIiJjKkkLlLlLlLlLlNnNnNnNnnNnNnOOOOOOooooooOoOoOoRrRrRrSsSsSsSssTtTtTtUUUUuuuuUuUuUuUuUuUuWwYyyYyYZzZzZz"
).downcase.strip.gsub(' ', '-').gsub(/[^\w.-]/, '')
    end
  end

  # this class is used to tell Jekyll to generate a page
  class DataPage < Page
    include Sanitizer

    # - site and base are copied from other plugins: to be honest, I am not sure what they do
    # - `index_files` specifies if we want to generate named folders (true) or not (false)
    # - `dir` is the default output directory
    # - `prefix is the page_data_prefix`used to output the page data
    # - `data` is the data of the record for which we are generating a page
    # - `name` is the key in `data` which determines the output filename
    # - `name_expr` is an expression for generating the output filename
    # - `title` is the key in `data` which determines the page title
    # - `title_expr` is an expression for generating the page title
    # - `template` is the name of the template for generating the page
    # - `extension` is the extension for the generated file
	
    def initialize(site, base, page_num, index, index_files, dir, prefix, data, name, name_expr, title, title_expr, template, extension, debug)
      @site = site
      @base = base

      if debug
        puts "debug (datapage-gen) Record read:"
        puts ">> #{data}"

        puts "debug (datapage-gen) Configuration variables:"
        [:index_files, :dir, :prefix, :name, :name_expr, :title, :title_expr, :template, :extension].each do |variable|
          puts ">> #{variable}: #{eval(variable.to_s)}"
        end
      end

      # @dir is the directory where we want to output the page
      # @name is the name of the page to generate
      # @name_expr is an expression for generating the name of the page
      #
      # the value of these variables changes according to whether we
      # want to generate named folders or not
      if name_expr
        record = data
        raw_filename = eval(name_expr)
        if raw_filename == nil
          puts "error (datapage-gen). name_expr '#{name_expr}' generated an empty value in record #{data}"
          return
        end
        puts "debug (datapage-gen). using name_expr: '#{raw_filename}' (sanitized) will be used as the filename" if debug
      else
        raw_filename = data[name]
        if raw_filename == nil
          puts "error (datapage-gen). empty value for field '#{name}' in record #{data}"
          return
        end
        puts "debug (datapage-gen). using name field: '#{raw_filename}' (sanitized) will be used as the filename" if debug
      end

      if title_expr
        record = data
        raw_title = eval(title_expr)
        if raw_title == nil
          puts "error (datapage-gen). title_expr '#{title_expr}' generated an empty value in record #{data}"
          return
        end
        puts "debug (datapage-gen). using title_expr: '#{raw_title}' will be used the page title" if debug
      else
        raw_title = data[title]
        if raw_title == nil
          raw_title = raw_filename # for backwards compatibility
          puts "debug (datapage-gen). empty title field: falling back to filename for the page title" if debug
        end
          puts "debug (datapage-gen). will use '#{raw_title}' as the page title" if debug
      end

      filename = sanitize_filename(raw_filename).to_s

      @dir = dir + (index_files ? "/" + filename + "/" : "")
      @name = (index_files ? "index" : filename) + "." + extension.to_s

      self.process(@name)

      if @site.layouts[template].path.end_with? 'html'
        @path = @site.layouts[template].path.dup
      else
        @path = File.join(@site.layouts[template].path, @site.layouts[template].name)
      end

      base_path = @site.layouts[template].path
      base_path.slice! @site.layouts[template].name
      self.read_yaml(base_path, @site.layouts[template].name)

      self.data['title'] = raw_title

      # add all the information defined in _data for the current record to the
      # current page (so that we can access it with liquid tags)
      if prefix
        self.data[prefix] = data
      else
        if data.key?('name')
          data['_name'] = data['name']
        end
        self.data.merge!(data)
      end

    end
  end

  class JekyllDatapageGenerator < Generator
    require 'github_api'
    require 'graphql'
    require 'prime'
    require 'rack'
    safe true

    # GitHub API: Get Pinned Repositories
    # https://stackoverflow.com/a/60123976/4058484
    # https://gist.github.com/MichaelCurrin/6777b91e6374cdb5662b64b8249070ea

    def call(env)
      request = Rack::Request.new(env)
      if request.request_method == 'POST' && request.path == '/graphql'
        params         = request.params
        query          = params[:query]
        variables      = params[:variables]
        operation_name = params[:operationName]
        result         = AppSchema.execute(query, variables: variables, 
                         context: {}, operation_name: operation_name)
        [200, { 'Content-Type' => 'application/json' },[result.to_json]]
      end
    end

    # the function =generate= loops over the =_config.yml/syntax_gen=
    # specification, determining what sets of pages have to be generated,
    # reading the data for each set and invoking the =DataPage=
    # constructor for each record found in the data

    def generate(site)
      # syntax_gen-dirs is a global option which determines whether we want to
      # generate index pages (name/index.html) or HTML files (name.html) for
      # all sets
      index_files = true

      # data contains the specification of all the datasets for which we want
      # to generate individual pages (look at the README file for its documentation)
      # https://github.com/ruby/prime
      data = site.data['roots']
      if data
        page_num = 0
        data.each do |row|
          break if page_num > 1000
          name_expr        = "'index_' + page_num.to_s + '_' + prefix.to_s + '_' + title.to_s + '_' + index.to_s"
          spin             = row['spin'].split(";")
          pos              = row['pos'].split(";")
          prefix           = pos[2].to_i - 1
          suffix           = pos[1].to_i - 1
          title_expr       = "record['pos']"
          node             = row['node']
          type             = row['type']
          dir              = 'sitemap'
          template         = 'recipe'
          index_files_data = false
          debug            = false
          extension        = 'xml'
          name             = 'pos'
          
          if not site.layouts.key? template
            puts "error (datapage-gen). could not find template #{template}. Skipping dataset #{name}."
          else
            # records is the list of records for which we want to generate
            # individual pages
            records = nil

            type.split('.').each do |level|
              if records.nil?
                records = site.data[level]
              else
                records = records[level]
              end
            end
            if (records.kind_of?(Hash))
              records = records.values
            end

            # apply filtering conditions:
            # - filter requires the name of a boolean field
            # - filter_condition evals an expression use =record=
            # https://www.rubyguides.com/2019/04/ruby-select-method/

            node_last = 0
            node = "0;" + node if node.scan(";").size == 0
            node.split(";").each.with_index do |title, i|

              results = data
              results = records if records
              node_next = node_last + title.to_i

              filter = "index.prime?," * prefix 
			  filter += "#{node_last} < index && index <= #{node_next}"
			  filter += ",index.prime?" * suffix

              filter.split(',').each do |level|
                results = results.select.with_index(1) { |result, index| eval(level) }
              end

              # we now have the list of all results for which we want to generate individual pages
              # iterate and call the constructor
              node_last = node_next
              results.each.with_index(1) do |result, index|
                page_num += 1
                site.pages << DataPage.new(site, site.source, page_num, index, index_files_data, dir, prefix, result, name, name_expr, title, title_expr, template, extension, debug)
              end

            end

         end
        end
      end
    end
  end

  module DataPageLinkGenerator
    include Sanitizer

    # use it like this: {{input | datapage_url: dir}}
    # to generate a link to a data_page.
    #
    # the filter is smart enough to generate different link styles
    # according to the data_page-dirs directive ...
    #
    # ... however, the filter is not smart enough to support different
    # extensions for filenames.
    #
    # Thus, if you use the `extension` feature of this plugin, you
    # need to generate the links by hand
    def datapage_url(input, dir)
      extension = @context.registers[:site].config['syntax_gen-dirs'] ? '/' : '.html'
      "#{dir}/#{sanitize_filename(input)}#{extension}"
    end
  end

end

Liquid::Template.register_filter(Jekyll::DataPageLinkGenerator)
