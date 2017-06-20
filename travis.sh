#!/usr/bin/env bash
set -e # halt script on error

echo 'Testing travis...'

# bundle exec jekyll serve --config _config.yml,_config-dev.yml --watch

bundle exec jekyll build
bundle exec htmlproofer ./_site --only-4xx
