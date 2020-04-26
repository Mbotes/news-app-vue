<template>
  <div class="about container" style="text-align:left;">
    <div class="m-3">
      <h1 id="news-app-vue">News Agent App in Vue</h1>
      <h2 id="description">Description</h2>
      <p>
        This website was built in
        <a href="https://vuejs.org/">Vue.js</a> which reads from the
        <a href="https://newsapi.org/">NewsApi.org</a> open source API.
      </p>
      <p>the key feature of the website is that users can search for keywords and by a date range and further filter the results by relevancy, date, popluarity and even by language.</p>
      <p>
        On load the website hits the
        <a href="https://newsapi.org/docs/endpoints/top-headlines">&quot;Top Headlines&quot;</a> endpoint which gets the latest news from South Africa, and on search it hits the
        <a href="https://newsapi.org/docs/endpoints/everything">&quot;Everything&quot;</a> one.
      </p>
      <p>One of the things I implemented on the site was infinite scrolling which check the total results of the endpoint and paginates as you hit the bottom of the window it will fetch the next batch of 20 posts.</p>
      <h2 id="installation">Installation</h2>
      <h3 id="project-setup">Project setup</h3>
      <pre><code>npm install</code></pre>
      <h3 id="compiles-and-hot-reloads-for-development">Compiles and hot-reloads for development</h3>
      <pre><code>npm run serve</code></pre>
      <h3 id="compiles-and-minifies-for-production">Compiles and minifies for production</h3>
      <pre><code>npm run build</code></pre>
      <h3 id="lints-and-fixes-files">Lints and fixes files</h3>
      <pre><code>npm run lint</code></pre>
      <h3 id="customize-configuration">Customize configuration</h3>
      <p>
        See
        <a href="https://cli.vuejs.org/config/">Configuration Reference</a>.
      </p>
      <h2 id="known-issues">Known Issues</h2>
      <ul>
        <li>
          (At time of writing) - for some reason the endpoints have stopped supplying the &quot;urlToImage&quot; and are just returning &quot;null&quot;, I think I may have hit a soft rate limit somewhere.
          <br />
        </li>
        <li>
          Due to the nature of the developer acocunt, the &quot;Everything&quot; endpoint has a limit of 100 posts returned.
          <br />
        </li>
        <li>
          On successful search, the sidebar remains open.
          <br />
        </li>
        <li>
          For some unknown, frustrating reason the newsApi on the Date filter will return a result set that includes one day ahead of what you give it, for example if you set your 'Till' date to 24th of april 2020 it will include results from 25th of april 2020. ¯_(ツ)_/¯
          <br />
        </li>
        <li>Mobi could use some tidying up with regards to buttons in the header.</li>
      </ul>

      <h3>Author</h3>
      <p>
        This website was made by <a href="https://mbotes.github.io/">Michael Botes</a>, you can view my github profile <a href="https://github.com/Mbotes">here</a>.
      </p>

    </div>
  </div>
</template>
