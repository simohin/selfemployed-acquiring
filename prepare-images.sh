docker buildx build --platform linux/amd64 -f Dockerfile.backend -t simohin/selfemployed-acquiring-backend . && docker push simohin/selfemployed-acquiring-backend
docker buildx build --platform linux/amd64 -f Dockerfile.frontend -t simohin/selfemployed-acquiring-frontend . && docker push simohin/selfemployed-acquiring-frontend
