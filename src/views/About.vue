<template>
  <div class="about container" style="text-align:left;">
    <div class="m-3">
      <h1 id="news-agent-app-in-vue">News Agent App in Vue</h1>
      <h2 id="description">Description</h2>
      <p>
        This website was built in
        <a href="https://vuejs.org/">Vue.js</a> which reads from the
        <a href="https://newsapi.org/">NewsApi.org</a> open source API.
      </p>
      <p>The key features of the website is that users can search for keywords and by a date range and further filter the results by relevancy, date, popularity and even by language.</p>
      <p>
        On load the website hits the
        <a href="https://newsapi.org/docs/endpoints/top-headlines">&quot;Top Headlines&quot;</a> endpoint which gets the latest news from South Africa, and on search it hits the
        <a href="https://newsapi.org/docs/endpoints/everything">&quot;Everything&quot;</a> one.
      </p>
      <p>One of the things I implemented on the site was infinite scrolling which check the total results of the endpoint and paginates as you hit the bottom of the window it will fetch the next batch of 20 posts.</p>
      <p>The site is also a PWA so you can install this website as a dedicated app on your mobile device or browser.</p>
      <h2 id="installation">Installation</h2>
      <h3 id="project-setup">Project setup</h3>
      <pre><code>npm <span class="hljs-keyword">install</span>
</code></pre>
      <h3 id="compiles-and-hot-reloads-for-development">Compiles and hot-reloads for development</h3>
      <pre><code>npm <span class="hljs-keyword">run</span> serve

<span class="hljs-keyword">Output</span>:
 DONE  Compiled successfully in <span class="hljs-number">3706</span>ms                                                                                                                                                        <span
  class="hljs-number"
>15</span>:<span class="hljs-number">12</span>:<span class="hljs-number">47</span>

  App running at:
  - <span class="hljs-keyword">Local</span>:   http:<span class="hljs-comment">//localhost:8080/</span>
  - Network: http:<span class="hljs-comment">//192.168.0.119:8080/</span>

  Note that the development build is <span class="hljs-keyword">not</span> optimized.
  To <span class="hljs-keyword">create</span> a production build, <span class="hljs-keyword">run</span> npm <span class="hljs-keyword">run</span> build.
</code></pre>
      <h3 id="compiles-and-minifies-for-production">Compiles and minifies for production</h3>
      <pre><code>npm <span class="hljs-keyword">run</span><span class="bash"> build</span>
</code></pre>
      <h3 id="lint-s-and-fixes-files">Lint&#39;s and fixes files</h3>
      <pre><code>npm <span class="hljs-keyword">run</span><span class="bash"> lint</span>
</code></pre>
      <h3 id="customize-configuration">Customize configuration</h3>
      <p>
        See
        <a href="https://cli.vuejs.org/config/">Configuration Reference</a>.
      </p>
      <h3 id="build-devops">Build/Devops</h3>
      <p>
        This project has been connected to
        <a href="https://cloud.google.com/cloud-build">Cloud Build</a> which has a deployment trigger connected to the master branch on the repository, once this trigger has been hit it will deploy the project to a
        <a href="https://cloud.google.com/appengine">App engine</a> instance.
      </p>
      <h2 id="known-issues">Known Issues</h2>
      <ul>
        <li>Due to the nature of the developer account, the &quot;Everything&quot; endpoint has a limit of 100 posts returned.</li>
        <li>On successful search, the sidebar remains open.</li>
        <li>For some unknown, frustrating reason the newsApi on the Date filter will return a result set that includes one day ahead of what you give it, for example if you set your &#39;Till&#39; date to 24th of April 2020 it will include results from 25th of April 2020. 🤷</li>
        <li>Mobile could use some tidying up with regards to buttons in the header.</li>
      </ul>
      <h2 id="improvements">Improvements</h2>
      <ul>
        <li>Implement Vuex, its something I had intended to do and have the base store setup but just did not get around to it, currently a WIP.</li>
        <li>Improve the UI/UX, potentially replace the Component liubrary with ElementsUI.</li>
      </ul>
    </div>
  </div>
</template>
