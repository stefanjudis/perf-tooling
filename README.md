![image](https://raw.githubusercontent.com/stefanjudis/perf-tooling/master/perf-tooling.jpg)

## Perf Tooling

[![Join the chat at https://gitter.im/stefanjudis/perf-tooling](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stefanjudis/perf-tooling?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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

After that you can start the server with:

```
node app.js
```

It will be available at `localhost:3000`.
Be aware of the fact, that the fetching of Github stars may not work, because Github is limiting the number of requests that are allowed without any authorization.
