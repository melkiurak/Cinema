
const movies =
  { id: 1, title: 'Начало', year: 2010, rating: 8.8 };

test('Now the in cinema', () => {
    expect(movies.rating).toBeGreaterThan(7.1)
})