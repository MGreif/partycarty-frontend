from node:18-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN mkdir /app/
RUN chown appuser:appgroup /app
workdir /app

copy . /app/

run rm -rf node_modules .next

run ls -la
run pwd

run npm i

run npm run build
USER appuser

cmd ["npm", "start"]
