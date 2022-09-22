#!/bin/bash

# os version
echo -e "\n$hrOS VERSION\n$hr"
cat /etc/os-release
hostnamectl
uname -r

# environtment archlinux:base-devel
echo -e "$hr\nENVIRONTMENT\n$hr"
export PAGES_REPO_NWO=$GITHUB_REPOSITORY
export JEKYLL_GITHUB_TOKEN=$JEKYLL_GITHUB_TOKEN
export SSL_CERT_FILE=$(realpath .github/hook-scripts/cacert.pem)
printenv | sort

# installed packages
echo -e "$hr\nPACKAGESS\n$hr"
pacman -Q

# installed bash
echo -e "$hr\nBASH DETAIL\n$hr"
pacman -Qii bash

# identity
echo -e "\n$hrWHOAMI\n$hr"
sudo chown -R $(id -u):$(id -g) $PWD
whoami
pwd
id

echo -e "\n$hr\nHOME PROFILES\n$hr"
ls -al $HOME

echo -e "$hr\nROOT PROFILES\n$hr"
[[ "$(whoami)" == "root" ]] && ls -alL /root || sudo bash -c 'ls -alL /root'

echo -e "$hr\nSSH FILES\n$hr"
echo $(whoami) /root/.ssh
[[ "$(whoami)" == "root" ]] && ls -alL /root/.ssh || sudo bash -c 'ls -alL /root/.ssh'

echo -e "$hr\nBIN FILES\n$hr"
echo $HOME/.local/bin
ls -al $HOME/.local/bin

echo -e "\n$hr\nFILE SYSTEM\n$hr"
df -h

echo -e "\n$hr\nALL REPOSITORY\n$hr"
pwd
ls -al /

echo -e "\n$hr\nCURRENT REPOSITORY\n$hr"
pwd
ls -al .
