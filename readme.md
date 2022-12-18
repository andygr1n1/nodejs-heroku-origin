curl -X POST -H "Content-Type: application/json" -d '{"name":"Andrew"}' localhost:4444/articles

npx husky add .husky/pre-commit "yarn run prettier && yarn run lint && git add -A ."
