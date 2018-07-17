export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function items(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.items;
        case 'ITEM_PINNED':
            {
                const newState = [...state];
                const item = newState.find((x) => x.data.id === action.payload.id);

                item.data.pinned = action.payload.isPinned;

                return newState;
            }
        default:
            return state;
    }
}
