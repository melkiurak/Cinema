export const setFilms= (films) => {
    return {
        type: 'films/setFilms',
        payload: films,
    }
}
export const setPopularFilms = (films) => {
    return {
        type: 'films/setPopularFilms',
        payload: films,
    };
};
export const setFilterAction= (filter) => {
    return {
        type: 'cinema/genres',
        payload: filter,
    }
}

