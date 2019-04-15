function detailController(countryCode) {
    countriesStorage.loadCountryDetails(countryCode).then(country => {
        $.get('js/detail/details.htm').then(text => {
            const template = Handlebars.compile(text);
            
            
            const impr = userStorage.getImpressions(countryCode);
            country.impresssions = impr;
            
            const html = template(country);
            $('main').html(html);
            $('#add').on('click', () => {
                const text = $('#textarea').val();
                userStorage.addImpression(countryCode, text);
            });
        });
    });
}