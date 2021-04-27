

window.addEventListener('DOMContentLoaded', (event) => {
    
    const searchClient = algoliasearch('', '');

    const search = instantsearch({
        indexName: 'dev_blog',
        searchClient,
    });

    search.addWidgets([

        instantsearch.widgets.configure({
            hitsPerPage: 3
        }),

        instantsearch.widgets.searchBox({
            container: '#searchbox',
            showLoadingIndicator: true,
            searchAsYouType: true
        }),
        
        instantsearch.widgets.hits({
            container: '#hits',
            templates: {
                empty: 'No results for <q>{{ query }}</q>',
                item(hit, bindEvent) {
                    console.log(hit)
                  return `
                    <a href="${hit.url}" ${bindEvent('conversion', hit, 'Product Added')} >
                      <article>
                        <h3>${hit.title}
                        ${instantsearch.highlight({ attribute: 'name', hit })}</h3>
            
                        
                            
                        </button>
                      </article>
                    `;
                }
            }
        })
    ]);

    search.start();

});
