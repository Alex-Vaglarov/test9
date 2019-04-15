function router(event) {
    if (event) {
        event.preventDefault();
    }
    const page = location.hash.split("=")[1];

    //if not logged
    if (sessionStorage.getItem('user') == null) {
        alert('not logged');
        loginController();
        return;
    }
    
    if (page && page.includes('detail')) {
        const countryCode = page.split('_')[1];
        detailController(countryCode);
        return;
    }

    switch (page) {
        case 'home' : homeController(); break;
        case 'login' : loginController();break;

        default: loginController();
    }
}

$(window).on('hashchange', router);
router();

