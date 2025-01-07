git pull https://github.com/Aashish856/Adb_test

export ADBREW_CODEBASE_PATH="{path_to_repository}/adb_test/src"

docker-compose build

docker-compose up -d

Check that you are able to access http://localhost:3000 and http://localhost:8000/todos

