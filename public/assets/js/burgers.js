// on document ready
// https://stackoverflow.com/questions/3698200/window-onload-vs-document-ready
$(() => {
    $('#create-burger').on('click', (e) => {
        e.preventDefault();

        var newBurger = {
            name: $('#burger-name').val().trim(),
            devoured: 0
        };

        // send the POST request
        $.ajax('/api/burgers', {
            type: 'POST',
            data: newBurger
        }).then(() => {
            console.log('New burger created!');

            // reload the page to get the udpated list
            location.reload();
        });
    });
});