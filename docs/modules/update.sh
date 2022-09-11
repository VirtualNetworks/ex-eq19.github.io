set sm_path=eQ19
git submodule deinit -f --all
git submodule update --init --recursive
git submodule foreach 'git submodule set-branch --default -- ${sm_path}'
git push --recurse-submodules=on-demand
