# hello-welt

[![ci](https://github.com/julie-ng/hello-welt/actions/workflows/ci.yaml/badge.svg)](https://github.com/julie-ng/hello-welt/actions/workflows/ci.yaml) 
[![docker](https://github.com/julie-ng/hello-welt/actions/workflows/docker.yaml/badge.svg)](https://github.com/julie-ng/hello-welt/actions/workflows/docker.yaml)
[![Known Vulnerabilities](https://snyk.io/test/github/julie-ng/hello-welt/badge.svg)](https://snyk.io/test/github/julie-ng/hello-welt)

- Simple Hello World [Fastify app](https://www.fastify.io/) for demos. 
- Source for [julieio/hello](https://hub.docker.com/repository/docker/julieio/hello) Docker Image.

<img src="./preview.png" alt="Hello Welt Preview" width="500">

_Earth icon by iconmonstr.com_

# Configuration

The following variables can be configured

| Environment Variable | Default |
|:--|:--|
| `VERSION` | Version from `package.json` |
| `HELLO_GREETING` | Hello |
| `HELLO_NAME` | Welt |
| `HELLO_COLOR` | `#ff5757` |
| `EARTH_COLOR` | `#57ffd1` |
| `PORT` | 3000 |
| `HOST` | `localhost` in development and `0.0.0.0` in production |

# Demo 

This image can be used to demo the following for learning about **container orchestration**.

> [!NOTE]  
> These demo routes use `z-pages` covention based on Google's internal practices to indicate that these endpoints are not part of the app's expected functionality.

### Best Practices

| Best Practice | Route | Description |
|:--|:--|:--|
| Health Check | `/healthz` | Health check page with info for debugging. Returns 200. |
| Graceful Shutdown | N/A | See [`app/server.js`](./app/server.js), which responds to `SIGINT` and `SIGTERM` to shutdown database, etc. |


### Problems

| Problem | Route | Description |
|:--|:--|:--|
| Error 500 | `/failz` | Returns 500 response and logs error to stdout. App continunes to run. |
| Crash | `/crashz` | Simulate a crash. App needs to be restarted. |
| Memory Leak | `/slowz` | Simulate a memory leak. App continues to function. |


# Development

You can use this Docker image directly in demos or use it as a simple [Node.js app](#nodejs-app)

## Docker Image

Pull the [julieio/hello](https://hub.docker.com/repository/docker/julieio/hello) public image from Docker Hub and then run it:

```bash
docker pull julieio/hello:latest
docker run -p 3000:3000 julieio/hello:latest
```

Optionally - pass configuration via environment variables:

```bash
docker run -p 3000:3000 -e HELLO_NAME=Julie julieio/hello:latest
```

or build from scratch

```bash
docker build . -t hello-welt
docker run -p 3000:3000 hello-welt
```

## Node.js App

After cloning this repo, install dependencies 

```bash
git clone https://github.com/julie-ng/hello-welt
npm install
```

Start the app

```bash
npm start
```

and then open [http://localhost:3000](http://localhost:3000) in your browser.

### Local Development

For local development, we will use [pino-pretty](https://github.com/pinojs/pino-pretty) to format logs with color

```bash
npm install -g pino-pretty
```

We also also use [nodemon](https://nodemon.io/) to automatically restart the app when code changes. Use the `dev` command to put everything together

```bash
npm run dev
```

which is a shortcut for

```bash
NODE_ENV=development nodemon -w app app/server.js | pino-pretty
```

# References

- [Heroku Blog: Let It Crash: Best Practices for Handling Node.js Errors on Shutdown](https://blog.heroku.com/best-practices-nodejs-errors) by Julián Duque
- [Snyk Blog: 10 best practices to containerize Node.js web applications with Docker](https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/) by 
Liran Tal and Yoni Goldberg