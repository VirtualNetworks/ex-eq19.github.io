#!/bin/bash

# Update packages database
# echo -e "$hr\nUPDATE PACKAGES\n$hr"
# pacman -Syu --noconfirm

# Installing git package
# echo -e "$hr\nINSTALL GIT\n$hr"
# pacman -S --noconfirm git

# Installing ruby libraries
# echo -e "$hr\nINSTALL RUBY\n$hr"
# pacman -S --noconfirm ruby${RUBY_VERSION} ruby-bundler

# Setting default ruby version
echo -e "$hr\nDEFAULT VERSION\n$hr"
ruby -v && bundle version

# This is a temporary workaround
# See https://github.com/actions/checkout/issues/766
git config --global --add safe.directory "*"
