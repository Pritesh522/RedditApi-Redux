export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function togglePin(id, isPinned) {
    return {
        type: 'ITEM_PINNED',
        payload: {
            id,
            isPinned
        }
    };
}

export function itemsFetchData() {
    const localAppStr = localStorage.getItem('appState');
    const localApp = (localAppStr) ? JSON.parse(localAppStr) : [];
    const url = 'https://www.reddit.com/r/cats/top/.json?limit=20';

    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => {
                const data = items.data.children;
                // get the pinned items if any
                const pinnedItems = localApp.filter(x => x.data.pinned);
                // filter the pinned items from request to avoid the duplicate.
                const newItems = data.filter(x => {
                    return !pinnedItems.find(y => y.data.id === x.data.id);
                });

                // join pinned items and new requested items.
                dispatch(itemsFetchDataSuccess([...pinnedItems, ...newItems]));
            })
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}
