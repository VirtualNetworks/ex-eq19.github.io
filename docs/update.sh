set sm_path=eQ19
git submodule update --init --recursive
git submodule foreach 'git submodule set-branch --branch aBranch -- ${sm_path}'
