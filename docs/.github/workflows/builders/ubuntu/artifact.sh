#!/bin/bash

echo -e "WHOAMI\n$hr"
whoami
echo $HOME
id

echo -e "$hr\nPROJECT CONFIG\n$hr"
gcloud config list --all

echo -e "\n$hr\nSYSTEM INFO\n$hr"
gcloud info
python --version

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
mv docs/assets assets
ls -al

echo -e "\n$hr\nSOURCE REPOSITORY\n$hr"
pwd
ls -al docs

echo -e "\n$hr\nASSETS REPOSITORY\n$hr"
pwd
tree assets

[[ ! -x "$(command -v docker)" ]] && exit 0
echo -e "\n$hr\nDOCKER VERSION\n$hr"
docker version

echo -e "\n$hr\nDOCKER INFO\n$hr"
docker info

echo -e "$hr\nIMAGE BUILDERS\n$hr"
docker images --all | sort

echo -e "\n$hr\nCURRENTLY RUNNING\n$hr"
docker ps
