const destinations = [Destinations, DataTypes];
const search = document.getElementById('search');

const city = document.querySelector('#search')

search.addEventListener('keyup', (e) => {
    const searchString = e.target.value;
    city.filter(city)
});