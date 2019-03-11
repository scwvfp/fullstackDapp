const routes = require('next-routes')();
routes
.add("/compaigns/new","/compaigns/new")
.add("/compaigns/:address","/compaigns/show")
.add("/compaigns/:address/requests/new","/compaigns/requests/new")
.add("/compaigns/:address/requests","/compaigns/requests/index")

module.exports = routes;
