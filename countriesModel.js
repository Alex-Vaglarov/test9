var countriesStorage = (function() {

    let countries = null;

    function getCountriesList () {
        if (countries) {
            // return data as promise
            return Promise.resolve(countries);
        }

        return new Promise(function(resolve, reject) {
            $.get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                countries = res;
                resolve(res);
            })
            .catch(err => reject(err));
        });
    }

    function getByName(name) {
        if (countries)
            return countries.find(c => c.name === name); 
        return null;
    }

    function loadCountryDetails(countryCode) {
        return new Promise(function(resolve, reject) {
            $.get('https://restcountries.eu/rest/v2/alpha/' + countryCode)
            .then(res => resolve(res))
            .catch(err => reject(err));
        });
    }

    return { getCountriesList, getByName, loadCountryDetails };
})();
