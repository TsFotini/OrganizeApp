document.addEventListener('DOMContentLoaded', async (event) => {
    //Get the list of tasks
    var alltasks = document.getElementById("alltasks").innerHTML;
    const listOfTasks = JSON.parse(alltasks);

    //Count those that are done and those that are deleted without being done
    var xArray = ["Done", "Not Done"];
    done = 0
    notdone = 0
    for (var i in listOfTasks) {
        if (listOfTasks[i].completion == true)
            done = done + 1
        else if (listOfTasks[i].completion == false && listOfTasks[i].isvalid == false)
            notdone = notdone + 1
    }
    var yArray = [done, notdone];
    var layout = {
        title: "Completion of all tasks",
        paper_bgcolor: "rgba(0,0,0,0)",
        font: {
            size: 18,
            color: '#FFFFFF'
        },
        colorway: ['#26a69a', '#e91e63']
    };

    var data = [{ labels: xArray, values: yArray, type: "pie" }];
    var graphDiv = document.getElementById("myPlot")
    Plotly.newPlot(graphDiv, data, layout);

    //Count tasks for current month
    var today = new Date();
    var mm = today.getMonth();
    var yy = today.getFullYear();
    console.log(new Date(listOfTasks[0].createdAt).getMonth())
    done_mm = 0
    notdone_mm = 0
    for (var i in listOfTasks) {
        if (new Date(listOfTasks[i].createdAt).getMonth() == mm && new Date(listOfTasks[i].createdAt).getFullYear() == yy) {
            if (listOfTasks[i].completion == true)
                done_mm = done_mm + 1
            else if (listOfTasks[i].completion == false && listOfTasks[i].isvalid == false)
                notdone_mm = notdone_mm + 1
        }
    }
    var yArray = [done_mm, notdone_mm];
    var layout = {
        title: "Completion of all tasks per month",
        paper_bgcolor: "rgba(0,0,0,0)",
        font: {
            size: 18,
            color: '#FFFFFF'
        },
        colorway: ['#26a69a', '#e91e63']
    };

    var data = [{ labels: xArray, values: yArray, hole: .4, type: "pie" }];
    var graphDiv = document.getElementById("myDonught")
    Plotly.newPlot(graphDiv, data, layout);






})
