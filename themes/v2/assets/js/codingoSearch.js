

window.addEventListener('DOMContentLoaded', (event) => {
    
    const searchClient = algoliasearch('', '');
    
    const search = instantsearch({
        indexName: 'dev_blog',
        searchClient,
        searchFunction(helper) {
            // Ensure we only trigger a search when there's a query
            
            const searchContainer = document.querySelector('#hits');
            const searchInput = document.querySelector('#searchbox .ais-SearchBox-input');

            if (helper.state.query) {
                helper.search();
                searchContainer.style.display = 'block';
                searchInput.classList.add('active');
            }else{
                searchContainer.style.display = 'none';
                searchInput.classList.remove('active');
            }
        }
    });

    search.addWidgets([

        instantsearch.widgets.configure({
            hitsPerPage: 3,
            attributesToSnippet: ['content:50'],
        }),

        instantsearch.widgets.refinementList({
            container: "#tags-list",
            attribute: "categories",
            limit: 5,
            showMore: true,
        }),

        instantsearch.widgets.queryRuleCustomData({
            container: '#searchbox',
            templates: {
              default: '',
            },
            transformItems(items) {
              const match = items.find(data => Boolean(data.redirect));
              if (match && match.redirect) {
                window.location.href = match.redirect;
              }
              return [];
            },
        }),

        instantsearch.widgets.searchBox({
            container: '#searchbox',
            placeholder: 'Search site',
            showLoadingIndicator: true,
            searchAsYouType: false,
            showReset: true,
            showSubmit: true,
        }),
        
        instantsearch.widgets.hits({
            container: '#hits',
            templates: {
                empty: '<div class="noResults">No results for <q>{{ query }}</q></div>',
                item(hit, bindEvent) {

                    console.log(hit)
                    let template = `
                        <a href="${hit.url}" ${bindEvent('conversion', hit, 'Search used')} >
                            <article>
                                <h3>${instantsearch.highlight({ attribute: 'title', hit })}</h3>
                                <p>${instantsearch.snippet({ attribute: 'content', hit })}</p>
                            </article>
                        </a>`;

                    if(hit.type === 'categories'){
                        template = `
                        <a class="searchHitCategory" href="${hit.url}" ${bindEvent('conversion', hit, 'Search categories used')} >
                            <article>
                                <div class="searchHitCategoryTitle">${instantsearch.highlight({ attribute: 'title', hit })}</h3>
                            </article>
                        </a>`;
                        
                    }
                    return template;
                }
            }
        })
    ]);

    search.start();

    
});
