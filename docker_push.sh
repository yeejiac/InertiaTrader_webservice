docker login
docker build -t webservice .
docker tag webservice yeejiac/webservice
docker push yeejiac/webservice