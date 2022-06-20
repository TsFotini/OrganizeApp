document.addEventListener('DOMContentLoaded', async (event) => {
    //delete task
    document.querySelectorAll('.fa-minus-square')
        .forEach(e => e.addEventListener("click", async () => {

            var config = {
                method: 'post',
                url: 'http://localhost:3000/tasks/deleteone',
                data: {
                    taskid: e.id
                }
            };

            await axios(config)
                .then(function (response) {
                    window.location = "/tasks";
                })
                .catch(function (error) {
                    console.log(error);
                })
        }));

    //mark task as done
    document.querySelectorAll('.fa-paper-plane')
        .forEach(e => e.addEventListener("click", async () => {

            var config = {
                method: 'post',
                url: `http://localhost:3000/tasks/makedone`,
                data: {
                    taskid: e.id
                }
            };

            await axios(config)
                .then(function (response) {
                    window.location = "/tasks/done";
                })
                .catch(function (error) {
                    console.log(error);
                })
        }));
    //mark task as done
    document.querySelectorAll('.flip-box')
        .forEach(e => e.addEventListener("dblclick", async () => {
            var config = {
                method: 'get',
                url: `http://localhost:3000/tasks/edittask`,
                params: {
                    id: e.id
                }
            };
            await axios(config)
                .then(function (response) {
                    window.location = '/tasks/edittask?id=' + config.params.id
                })
                .catch(function (error) {
                    console.log(error);
                })
        }));

});