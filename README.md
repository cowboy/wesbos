# WES BOS

So I was hanging out with my friend [Wes Bos](http://wesbos.com/) at [JSConf](http://2013.jsconf.us/) recently. And for some reason, every time I said his name, I added an extra random syllable to both his first and last names. Because it was really the funnest thing. Ever.

For example, "Weston Bosley." Or "Westwood Boswitch." Or "Wesbee Bosshog."

Well, naturally, I had to create a website to celebrate this.

<http://cowboy.github.io/wesbos/>

## Contributing

You'll need to have [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/) installed.

1. Clone this project's repo.
1. Ensure the `master` branch is checked out.
1. Run `npm install` to install Grunt, Grunt plugins, Bower components, etc.
1. Run `grunt` to start a live-reloading dev webserver on [localhost:8000](http://localhost:8000/).

When done:

1. Run `grunt prod` to publish everything to `dist` and start a webserver on [localhost:8000](http://localhost:8000/).

When REALLY done:

1. Run `grunt deploy` to publish everything in `dist` and then to the `gh-pages` branch, which will shortly thereafter be viewable at <http://cowboy.github.io/wesbos/>.

If you have suggestions for more [first and last name suffixes](https://github.com/cowboy/wesbos/blob/master/config/config.json), file a PR and I'll add them in. Just make sure they actually sound cool. Thanks!
