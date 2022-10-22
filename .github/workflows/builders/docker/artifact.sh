#!/bin/bash

# os version
echo -e "\nOS VERSION\n$hr"
cat /etc/os-release
hostnamectl
uname -r

# installed packages
echo -e "$hr\nPACKAGESS\n$hr"
pacman -Q

# installed bash
echo -e "$hr\nBASH DETAIL\n$hr"
pacman -Qii bash

# file system
echo -e "\n$hr\nFILE SYSTEM\n$hr"
df -h

# identity
echo -e "\n$hrWHOAMI\n$hr"
sudo chown -R $(id -u):$(id -g) $PWD
whoami
pwd
id

# ls /
echo -e "\n$hr\nALL REPOSITORY\n$hr"
echo "/"
ls -al /

# root
echo -e "$hr\nROOT PROFILES\n$hr"
echo "/root"
[[ "$(whoami)" == "root" ]] && ls -alL /root || sudo bash -c 'ls -alL /root'

# root ssh
echo -e "$hr\nSSH FILES\n$hr"
echo "/root/.ssh"
[[ "$(whoami)" == "root" ]] && ls -alL /root/.ssh || sudo bash -c 'ls -alL /root/.ssh'

# home
echo -e "\n$hr\nHOME PROFILES\n$hr"
echo $HOME
ls -al $HOME

# local bin
echo -e "$hr\nBIN FILES\n$hr"
echo $HOME/.local/bin
ls -al $HOME/.local/bin

# bundel
echo -e "\n$hr\nBUNDLE PATH\n$hr"
echo ${BUNDLE_PATH}
ls -al ${BUNDLE_PATH}

# workspace
echo -e "\n$hr\nCURRENT REPOSITORY\n$hr"
pwd
ls -al .

# asset files
echo -e "\n$hr\nASSET FILES\n$hr"
echo ${JEKYLL_SRC}/docs/assets
ls -al ${JEKYLL_SRC}/docs/assets

# makefile
echo -e "\n$hr\nMAKEFILE\n$hr"
echo ${JEKYLL_SRC}/Makefile
cat ${JEKYLL_SRC}/Makefile

# config file
echo -e "\n$hr\nCONFIG FILE\n$hr"
echo ${JEKYLL_SRC}/${JEKYLL_CFG}
cat ${JEKYLL_SRC}/${JEKYLL_CFG}

# pinned repos
# https://dev.to/thomasaudo/get-started-with-github-grapql-api--1g8b
echo -e "\n$hr\nPINNED  REPOSITORIES\n$hr"
AUTH="Authorization: bearer $JEKYLL_GITHUB_TOKEN"
curl -L -X POST "https://api.github.com/graphql" -H "$AUTH" \
--data-raw '{"query":"{\n  user(login: \"${GITHUB_REPOSITORY_OWNER}\") {\n pinnedItems(first: 6, types: REPOSITORY) {\n nodes {\n ... on Repository {\n name\n }\n }\n }\n }\n}"'

echo -e "\n"
