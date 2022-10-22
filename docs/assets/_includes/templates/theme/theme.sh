#!/bin/bash
set -e
export hr=$(printf '=%.0s' {1..83})

# Get script directory
SCRIPT_DIR="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
WORKING_DIR=${PWD}

# Initial default value
PROVIDER=${INPUT_PROVIDER:=github}
TOKEN=${INPUT_TOKEN}
ACTOR=${INPUT_ACTOR}
REPOSITORY=${INPUT_REPOSITORY}
BRANCH=${INPUT_BRANCH}
BUNDLER_VER=${INPUT_BUNDLER_VER:=>=0}
JEKYLL_SRC=${INPUT_JEKYLL_SRC:=./}
JEKYLL_CFG=${INPUT_JEKYLL_CFG:=./_config.yml}
JEKYLL_BASEURL=${INPUT_JEKYLL_BASEURL:=}
PRE_BUILD_COMMANDS=${INPUT_PRE_BUILD_COMMANDS:=}

if [[ "${GITHUB_REPOSITORY_OWNER}" != "eq19" ]]; then
  # mkdir ${JEKYLL_SRC}/docs/docs
  # mv ${JEKYLL_SRC}/assets ${JEKYLL_SRC}/docs/docs/
  export JEKYLL_SRC=${JEKYLL_SRC}/docs
  sed -i -e "s/eq19/${GITHUB_REPOSITORY_OWNER}/g" ${JEKYLL_SRC}/${JEKYLL_CFG}
fi

# Set default bundle path and cache
BUNDLE_PATH=${WORKING_DIR}/vendor/bundle

if [[ -z "${TOKEN}" ]]; then
  echo -e "Please set the TOKEN environment variable."
  exit 1
fi

# Check parameters and assign default values
if [[ "${PROVIDER}" == "github" ]]; then
  : ${ACTOR:=${GITHUB_ACTOR}}
  : ${REPOSITORY:=${GITHUB_REPOSITORY}}
  : ${BRANCH:=gh-pages}

  # Check if repository is available
  if ! echo -e "${REPOSITORY}" | grep -Eq ".+/.+"; then
    echo -e "The repository ${REPOSITORY} doesn't match the pattern <author>/<repos>"
    exit 1
  fi
fi

# Initialize environment
echo -e "$hr\nINITIALIZING\n$hr"
export JEKYLL_GITHUB_TOKEN=${TOKEN}
export PAGES_REPO_NWO=$GITHUB_REPOSITORY
export GEM_HOME=/github/home/.gem/ruby/2.7.0
export PATH=$PATH:$GEM_HOME/bin:$HOME/.local/bin
export SSL_CERT_FILE=$(realpath .github/hook-scripts/cacert.pem)
${SCRIPT_DIR}/script/init_environment.sh

cd ${JEKYLL_SRC}

# Restore modification time (mtime) of git files
echo -e "\nRestore modification time of all git files\n"
${SCRIPT_DIR}/script/restore_mtime.sh

# Check and execute pre_build_commands commands
if [[ ${PRE_BUILD_COMMANDS} ]]; then
  echo -e "$hr\nENVIRONTMENT\n$hr"
  printenv | sort
  eval "${PRE_BUILD_COMMANDS}"
fi

echo -e "$hr\nCLEANUP BUNDLER\n$hr"
${SCRIPT_DIR}/script/cleanup_bundler.sh
gem install bundler -v "${BUNDLER_VER}"

CLEANUP_BUNDLER_CACHE_DONE=false

# Clean up bundler cache
cleanup_bundler_cache() {
  echo -e "\nCleaning up incompatible bundler cache\n"
  rm -rf ${BUNDLE_PATH}
  mkdir -p ${BUNDLE_PATH}
  CLEANUP_BUNDLER_CACHE_DONE=true
}

# If the vendor/bundle folder is cached in a differnt OS (e.g. Ubuntu),
# it would cause `jekyll build` failed, we should clean up the uncompatible
# cache firstly.
OS_NAME_FILE=${BUNDLE_PATH}/os-name
os_name=$(cat /etc/os-release | grep '^NAME=')
os_name=${os_name:6:-1}

if [[ "$os_name" != "$(cat $OS_NAME_FILE 2>/dev/null)" ]]; then
  cleanup_bundler_cache
  echo -e $os_name > $OS_NAME_FILE
fi

echo -e "$hr\nBUNDLE INSTALLATION\n$hr"
cd ${WORKING_DIR}
pwd
bundle config cache_all true
bundle config path $BUNDLE_PATH
bundle install

# Pre-handle Jekyll baseurl
if [[ -n "${JEKYLL_BASEURL-}" ]]; then
  JEKYLL_BASEURL="--baseurl ${JEKYLL_BASEURL}"
fi

build_jekyll() {
  echo -e "\nJEKYLL INSTALLATION\n"
  pwd 
  JEKYLL_ENV=production bundle exec jekyll build --trace --profile \
    ${JEKYLL_BASEURL} \
    -c ${JEKYLL_CFG} \
    -d ${WORKING_DIR}/build
}

build_jekyll || {
  $CLEANUP_BUNDLER_CACHE_DONE && exit -1
  echo -e "\nRebuild all gems and try to build again\n"
  cleanup_bundler_cache
  bundle install
  build_jekyll
}

cd ${WORKING_DIR}/build

# Check if deploy on the same repository branch
if [[ "${PROVIDER}" == "github" ]]; then
  source "${SCRIPT_DIR}/providers/github.sh"
else
  echo -e "${PROVIDER} is an unsupported provider."
  exit 1
fi

exit $?
