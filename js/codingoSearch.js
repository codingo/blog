(() => {
  // <stdin>
  window.addEventListener("DOMContentLoaded", (event) => {
    const searchClient = algoliasearch("OBYNAPJHA8", "270b7adc91a10fff762de99c1dc3ddc7");
    const search = instantsearch({
      indexName: "BLOG",
      searchClient,
      routing: true,
      stalledSearchDelay: 200,
      searchFunction(helper) {
        const hitsContainer = document.querySelector("#hits");
        const searchInput = document.querySelector("#searchbox .ais-SearchBox-input");
        if (helper.state.query) {
          helper.search();
          if (hitsContainer) {
            hitsContainer.style.display = "block";
          }
          searchInput.classList.add("active");
        } else {
          if (hitsContainer) {
            hitsContainer.style.display = "none";
          }
          searchInput.classList.remove("active");
        }
      }
    });
    search.addWidgets([
      instantsearch.widgets.configure({
        hitsPerPage: 10,
        attributesToSnippet: ["content:50", "description:20"]
      }),
      instantsearch.widgets.queryRuleCustomData({
        container: "#searchbox",
        templates: {
          default: ""
        },
        transformItems(items) {
          const match = items.find((data) => Boolean(data.redirect));
          if (match && match.redirect) {
            window.location.href = match.redirect;
          }
          return [];
        }
      }),
      instantsearch.widgets.searchBox({
        container: "#searchbox",
        placeholder: "Search site",
        showLoadingIndicator: true,
        autofocus: true,
        searchAsYouType: true
      })
    ]);
    if (document.getElementById("tagslist")) {
      search.addWidgets([
        instantsearch.widgets.refinementList({
          container: "#tagslist",
          attribute: "kind",
          item: `
                    <a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
                        <span>{{label}} ({{count}})</span>
                    </a>
                    `
        })
      ]);
    }
    ;
    if (document.getElementById("hits")) {
      search.addWidgets([
        instantsearch.widgets.hits({
          container: "#hits",
          templates: {
            empty: '<div class="noResults">No results for <q>{{ query }}</q></div>',
            item(hit, bindEvent) {
              let template = "";
              console.log(hit.kind);
              if (hit.kind == "youtube") {
                var desired = hit.description.replace(/[^\w\s]/gi, "");
                console.log(hit);
                template = `
                                <a class="post-summary youtube-result" href="${hit.url}" ${bindEvent("conversion", hit, "Search used")} >
                                    <article>
                                        <img class="youtube-thumbnail" src="${hit.thumbnails.medium.url}" />
                                        <div class="youtube-text">
                                            <h3>${instantsearch.highlight({attribute: "title", hit})}</h3>
                                            <p>${instantsearch.snippet({attribute: "description", hit})}</p>
                                        </div>
                                    </article>
                                </a>`;
              } else if (hit.kind == "page") {
                template = `
                                <a class="post-summary" href="${hit.url}" ${bindEvent("conversion", hit, "Search used")} >
                                    <article>
                                        <h3>${instantsearch.highlight({attribute: "title", hit})}</h3>
                                        <p>${instantsearch.snippet({attribute: "content", hit})}</p>
                                    </article>
                                </a>`;
                if (hit.type === "categories") {
                  template = `
                                <a class="searchHitCategory" href="${hit.url}" ${bindEvent("conversion", hit, "Search categories used")} >
                                    <article>
                                        <div class="searchHitCategoryTitle">${instantsearch.highlight({attribute: "title", hit})}</h3>
                                    </article>
                                </a>`;
                }
              }
              return template;
            }
          }
        })
      ]);
    }
    search.start();
    search.on("render", () => {
      document.querySelector("#searchbox .ais-SearchBox-input").focus();
    });
  });
})();
