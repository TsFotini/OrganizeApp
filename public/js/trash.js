document.addEventListener('DOMContentLoaded', async (event) => {
    trashbox = document.getElementsByClassName('trashbox')[0];
    modal = document.getElementById('modal-assure');
    btnNo = document.getElementById('btn-no');
    btnYes = document.getElementById('btn-yes');

    trashbox.addEventListener('click', () => {
        modal.style.cssText = 'div'

    });




    btnNo.addEventListener('click', () => {
        modal.style.cssText = "visibility: hidden;"
    });




    btnYes.addEventListener('click', async () => {
        var config = {
            method: 'post',
            url: 'http://localhost:3000/tasks/deleteall',
            headers: {}
        };

        await axios(config)
            .then(function (response) {
                window.location = "/tasks"

            })
            .catch(function (error) {
                console.log(error);
            });
    });
});