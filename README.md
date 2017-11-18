# Gym Mate Backend :cactus:

## Development

You can launch the development server running:

```sh
npm run start-dev
```

### Linter

Lint the code is mandatory before commiting. Please, run the following command to make sure that your code follow standars:

```sh
npm run lint
```

### Documentation :newspaper:

This project uses JSDoc to document the code throughout the whole API. Once the server is up and running docs can be consulted in:

```sh
http://localhost:5000/documentation
```

Also, it can be consulted locally. You can build and serve it running:

```sh
npm run docsBuildAndServe
```

An local http server will be launched. It's convenient to know that a script is creating the readme consumed by the docs automatically when running this latest command. It will take current package.json version and local time.
