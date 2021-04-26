

window.addEventListener('DOMContentLoaded', (event) => {
    
    const searchClient = algoliasearch('', '');

    const search = instantsearch({
    indexName: '',
    searchClient,
    });

    search.addWidgets([
    instantsearch.widgets.searchBox({
        container: '#searchbox',
    }),

    instantsearch.widgets.hits({
        container: '#hits',
    })
    ]);

    search.start();

});
