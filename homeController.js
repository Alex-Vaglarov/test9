function homeController() {
    const ENTER_KEY = 13;

    $.get('js/home/home.htm').then(function refresh(text) {
        const template = Handlebars.compile(text);
        $('main').html(template(userStorage.getLoggedUser()));

        $('th').on('click', function() {
            let order  = $(this).attr('order');
            if (order === 'asc') {
                $(this).attr('order', 'desc');
                order = 'desc';
            } else {
                $(this).attr('order', 'asc');
                order = 'asc';
            }

            const sortOptions = {key: $(this).attr('key'), order};
            userStorage.sortCountries(sortOptions);
            refresh(text);
            sessionStorage.setItem('sortInfo', JSON.stringify(sortOptions));
        });

        countriesStorage.getCountriesList().then(countries => {
            countries.forEach(country => {
                $('#suggestions').append(
                    $(`<option value="${country.name}">${country.name}</option>`));
                });
        });

        $('input').on('keypress', function(event) {
            if (event.keyCode === ENTER_KEY) {
                const country = userStorage.addCountry($(this).val());
                $('#countriesContainer').append(
                    $(`<tr>
                        <td><a href="#page=detail_${country.alpha3Code}">
                        <img width="100" src="${country.flag}"/></a></td>
                        <td><h1>${country.name}</h1></td>
                        <td> <p>${country.region}</p></td>
                        <td><p>Capital : ${country.capital}</p></td>
                    </tr>`));                
            }
        });

        if (sessionStorage.getItem('sortInfo')) {
            const sortInfo = JSON.parse(sessionStorage.getItem('sortInfo'));
            $('th[key=' + sortInfo.key + ']').attr('order', sortInfo.order);
            $('th[key=' + sortInfo.key + ']').css('color', 'red');
        }
    });

}