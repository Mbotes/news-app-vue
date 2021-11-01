# News Agent App in Vue
## Description

This website was built in [Vue.js](https://vuejs.org/) which reads from the [NewsApi.org](https://newsapi.org/) open source API.

The key features of the website is that users can search for keywords and by a date range and further filter the results by relevancy, date, popularity and even by language.

On load the website hits the ["Top Headlines"](https://newsapi.org/docs/endpoints/top-headlines) endpoint which gets the latest news from South Africa, and on search it hits the ["Everything"](https://newsapi.org/docs/endpoints/everything) one.

One of the things I implemented on the site was infinite scrolling which check the total results of the endpoint and paginates as you hit the bottom of the window it will fetch the next batch of 20 posts.

The site is also a PWA so you can install this website as a dedicated app on your mobile device or browser.

## Installation

### Project setup (!!!Pls note you need to have python 2 installed for the sass loader)
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve

Output:
 DONE  Compiled successfully in 3706ms                                                                                                                                                        15:12:47

  App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.0.119:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.
```

### Compiles and minifies for production
```
npm run build
```

### Lint's and fixes files
```
npm run lint
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Build/Devops 
This project has been connected to [Cloud Build](https://cloud.google.com/cloud-build) which has a deployment trigger connected to the master branch on the repository, once this trigger has been hit it will deploy the project to a [App engine](https://cloud.google.com/appengine) instance.

## Known Issues

* Due to the nature of the developer account, the "Everything" endpoint has a limit of 100 posts returned.
* On successful search, the sidebar remains open.
* For some unknown, frustrating reason the newsApi on the Date filter will return a result set that includes one day ahead of what you give it, for example if you set your 'Till' date to 24th of April 2020 it will include results from 25th of April 2020. 🤷
* Mobile could use some tidying up with regards to buttons in the header. 

## Improvements
* Implement Vuex, its something I had intended to do and have the base store setup but just did not get around to it, currently a WIP.
* Improve the UI/UX, potentially replace the Component liubrary with ElementsUI.
