const initialState = {
    films: [],
};

const popularFilmsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'films/setPopularFilms':
            return {
                ...state,
                films: action.payload,
            };
        default:
            return state;
    }
};

export default popularFilmsReducer;
