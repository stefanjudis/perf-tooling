![image](https://raw.githubusercontent.com/stefanjudis/perf-tooling/master/perf-tooling.jpg)

## Perf Tooling

[![Dependency Status](https://david-dm.org/stefanjudis/perf-tooling.svg)](https://david-dm.org/stefanjudis/perf-tooling)

Welcome to Perf Tooling.

Perf Tooling is a shared resource to keep track of new and existent performance tools.

## Contribution

### Adding new tools

You want to add a tool? Great!

Either create an issue and we'll add it to [perf-tooling.today](http://perf-tooling.today).

Or propose a pull request and add a tool by adding a `JSON` file at `data/articles`, `data/slides`, `data/tools` or `data/videos`. The JSON files in these folders will be automatically rendered using a template based in `templates/index.tpl`

*- By proposing a pull request you will be added to the footer contributors list automatically -*

We would like this project to become a shared resource maintained by the community, so if you have any ideas on how to improve it or make it better, please let us know and file an issue. :)


## Kicking off the server to test your changes

Perf Tooling is an [express](http://expressjs.com/) application. If you want to see it in action simply clone the repository and run `npm install`.

After that you can start the server and kick of the development environment with:

```
npm start
```
This will start the express application at `localhost:3000`.

In case you want to develop new things at `localhost:4000` will be a proxy injecting [browsersync.io](http://browsersync.io) which means that the page will automagically refresh whenever you change something. Using `npm start` all watchers will be set up listening for the following:

- `js/**/*.js` -> generating new built JS + restart express server + browser reload
- `less/**/*.less` -> generating new built CSS + restart express server + browser reload
- `templates/**/*.tpl` -> restart express server + browser reload
- `app.js` -> restart express server + browser reload

Be aware of the fact, that the fetching of Github stars may not work, because Github is limiting the number of requests that are allowed without any authorization.

