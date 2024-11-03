$(document).ready(function() {

    $(window).onload(function() {
        // Your jQuery code here
        if (jQuery) {
            // jQuery is loaded
            alert("Yeah! another way to load jQuery");
        } else {
            // jQuery is not loaded
            alert("Doesn't Work");
        }
    });

    function test() {
        for (var a = 0; a < 10; a++) {
            $("#task_id").text(a);
            alert(a);
        }
    }
    $("#task_list").on("click", function() {
        if ($(this).on("click")) {
            const b = $(this).length;
            $("#task_id").val(b);
            alert(b);
        }
    });

    const completed_button = document.querySelector("completed-button");
    const history = document.querySelector("[id='task_history']");
    const table = document.querySelector(".table");
    const clear_button = document.querySelector("btn_container");
    const header = document.querySelector("header");
    const message = document.getElementById("messages_");

    // Event listener for the clear completed tasks button
    completed_button.addEventListener("click", function() {
        // Toggle class for showing task history

        history.classList.toggle("task_history_none");
        clear_button.classList.toggle("task_history_none");
        table.classList.toggle("table");
        header.style.display = "block";

        // Open a new window
        window.open("http://127.0.0.1:5000/show_task_history", "parent");

        // Create message
        message.style.fontWeight = "bolder";
        message.style.color = "black";
        //message.style.backgroundColor = 'bisque';
        message.style.width = "300px";
        message.style.height = "200px";

        // AJAX call
        $.ajax({
            url: "http://127.0.0.1:5000/show_task_history",
            type: "GET",
            dataType: "text", // Corrected
            success: function(data) {
                // Update elements with data from the server
                $("#id").text(data);
                $("#task").text(data);
                $("#state").text(data);
                $("#status").text(data);
                $("#date").text(data);
            },
            error: function(xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        });
    });

    if ($("#task_history, #header").show() == true) {
        $("#row:nth-child(odd)").css({ "background-color": "lightskyblue" });
        $("#row:nth-child(even)").css({ "background-color": "whitesmoke" });
    }







    // This function is used to hide the task when the checkbox is checked
    $("*[id*=task-list]").draggable({
        axis: "y",
        scroll: true,
        snap: false,
        revert: false,
        snapMode: "both",
        containment: "parent",
        stack: ".task-div",
        cursor: "move",
        distance: 30,
        opacity: 0.3,
        iframeFix: true,
        start: function(event, ui) {
            ui = $(this);
            ui.position.top = Math.min(500, ui.position.top);
            $("#container").css({
                "height": ui.position.top + 100 + "px ",
                "background-color": "skyblue"
            });
        },
        stop: function(event, ui) {
            ui = $(this);
            ui.position.top = Math.max(1000, ui.position.top);
            $("#container").css({
                "height": ui.position.top + 500 + "px ",
                "background-color": "skyblue"
            });
        }
    });



    function hide_task() {
        $(".check, .task-div").each(function() {
            if ($(this).on("checked") && $(this).hasClass("strike_through")) {
                //$(this).parent().parent().parent().parent().remove();
                $(this).remove();
            }
        });
    }
    $("#clear-button.p-3").bind({
        click: function() {
            hide_task();
            alert("Tasks have been cleared");
        }
    });


    function removeitem() {
        const task = document.querySelectorAll('.check, .task-div');
        for (let i = 0; i < task.length; i++) {
            task[i].addEventListener('click', function() {
                if (this.checked) {
                    alert('Task has been checked');
                    this.parentElement.parentElement.parentElement.parentElement.remove();
                }
            });
        }
    }



    const clear = document.querySelectorAll('#clear-button.p-3, .task-div');

    clear.addEventListener('click', function() {
        if (this.click) {
            //alert('Task has been cleared');
            this.remove();

        }
    });


    const content = document.querySelectorAll(".check");

    for (let i = 0; i < content.length; i++) {
        content[i].addEventListener("click", function(event) {
            //alert('Task has been clicked');
            //this.classList.toggle('checked');

            //contents.forEach(function(content) {
            //content.style.display = "line-through";
            //content.classList.toggle('strike_through');
            //});

            const contents = document.querySelectorAll(".task-div");

            for (z = i; z < contents.length; z++) {
                //if (contents[i].querySelector(`#task_id[value='${taskId}']`).value == taskId) {
                //contents[i].classList.toggle('strike_through');
                //}
                if (this.checked) {
                    content[i].checked = true;
                    contents[i].classList.add("strike_through");
                } else {
                    content[i].checked = false;
                    contents[i].classList.remove("strike_through");
                }
            }
        });

    }










});












//var sender;
//var recvok = false;
//$("#task-list").sortable({
//connectWith: '.task-div',
//start: function() {
//sender = $(this);
//recvok = false;
//},
//over: function() {
//recvok = ($(this).not(sender).length != 0);
//},
//stop: function() {
//if (!recvok)
//$(this).sortable('cancel');
//}
//}).disableSelection(); //







//$("body").on("click", ".check-task", function() {
//var taskId = $(this).val();
//var taskValue = $(`#text-dark[value='${taskId}']`).text();
//var taskStatus = $(this).is(":checked") ? "Yes" : "No";

//$.ajax({
//url: "/complete_task",
//type: "POST",
//data: {
//task_id: taskId,
//task_todo: taskValue,
//task_status: taskStatus
//},
//success: function(response) {
//if (response.status === "success") {
//$(`#text-value${taskId}`).removeClass("text-dark").addClass("text-success");
//$(`#check-task-status_no[value='${taskId}']`).hide();
//$(`#check-task-status_yes[value='${taskId}']`).show();
//}
//else {
//console.error <
//
//
//const content = document.querySelector('.container-xl');  
//const container = document.querySelectorAll('.task-div');
//const id = container.querySelectorAll('.text-value');
//const checkboxes = container.querySelectorAll('#check'+`${id}`);
//const checkboxes = container.querySelectorAll('.check');
//var checkboxes = this.querySelectorAll('#check'+`${id[i].value}`);
//var counts = 1;

//container.addEventListener('click', function(event) {
//alert(container.tagName);
//if (event.currentTarget === this) {
//alert(checkboxes.value);
//}

//if (event.target.tagName == 'DIV' && event.target.id == 'check'+`${checkboxes.value}`)
//{
// alert(checkboxes.value);
//}
//});

//container.addEventListener('click', function() {
//this
//if (this.click) {
//alert(checkboxes.length);
//for (var count = 0; count < checkboxes.length; count++) {
//counts = checkboxes.length;

//for (var counts; counts <= checkboxes.length; counts++) {
//alert(checkboxes.length);
//if (checkboxes[checkboxes.length - counts].checked === true) {
//this.style.textDecoration = "line-through";
//}
//else {
//this.style.textDecoration = "none";
//}
//}
//}
//}
//}); 

//function checked(a) {
//if (a.checked) {
//strike(a);
//}
//else {
//strike(a);
//}
//}

//function strike(a) {
//if (a.style.textDecoration === "line-through") {
//a.style.textDecoration = "none";
//}
//else {
//a.style.textDecoration = "line-through";
//}
//}

//function line(a) {
//a.style.textDecoration = "none";
//}

//function no(a) {
//if (a.style.display === "none") {
//a.style.display = "block";
//strike(a);
//}
//else {
//a.style.display = "none";
//strike(a);
//}
//} 


//function strike_through(a)
//{

//a.style.textDecoration = "line-through";
//$(a).addClass("strike_through");
//$("p.text-value").addClass("strike_through");
//}


//}
//a.addEventListener('change', function(e){
//  alert(a.value);
//if (a.checked) {
//  a.disabled = true;
//  a.setAttribute('disabled', 'disabled');
//} else {
//  a.disabled = false;
//  a.removeAttribute('disabled');
//  b.style.textDecoration = "none";
//}


//if (window.jQuery) {
//alert('Yeah - yay - baby');
//}
//$('*[id*=task-list]:visible, *[id*=check-task-status_no]:visible').on('mousedown', function() {

//if ($(this).text().length > 0) {
//$('#check-task-status_no', this).css('display', 'block');
//$('#check-task-status_no', this).css('z-index', 99);
//$('#text-dark', this).addClass('strike_through');
//$('#check{{id}}', this).prop('checked', true);
//$('#check{{id}}', this).attr('disabled', true);

//}
//});

//$('#check-task-status_no',this).css('display', 'none');



//$('#check{{id}}, #task-list, #check{{id}}').on('click, mousedown', function() {
//if ($(this).on('click, mousedown')) {

//$('#task-list').select(this).addClass('strikethrough');//

//$(this).prop('checked', true);
//$(this).addClass('strike_through');

//}

//});






//$('#check-task-status_no, #task-list, #check{{id}}').on('click', function() {
//if ($(this).on('click')) {
//$(this).addClass('text').removeClass('strike_through');
//alert($('#text-dark').text());
//$(this).attr('disabled', false);
//$(this).prop('checked', false);

//$('#task-list').mousedown(unstrike());

//}
//});



//$('#text-dark, #check{{id}}, #task-list').click(function() {
//$('#text-dark', this).removeClass('strike_through').addClass('text');
//alert($('#text-dark').text());
//$(this).attr('disabled', false);
//$(this).prop('checked', false);
//if (this).prop('checked', false)) {
//$('#check-task-status_no', this).css('display', 'none');
//}
//});

//function unstrike() {
//if ($(this).mousedown) {


//}
//};



//function showbtn(a) {

//if ($(this).click) {

//$(a).prop('checked', false);
//$(a).css('display', 'none');
//$(a).removeClass('strike_through');
//}
//};







//function showno(d) {
//if ($(d)) {
//$(d).show();
//}
//};


//function hideyes(a) {

//$(a).css('display', 'none');

//};




//function hidebtn() {
//if ($(this).click) {
//$(this).hide();
//$(this).css('display', 'block');
//$(this).removeClass('strikethrough');

//}
//};


//function showbtnno(a) {
//if ($(this).css('display') == 'none') {


//$(a).css('display', 'block');
//$(a).prop('checked', true);

//}
//};



//$("#check{{id}}, #task-list").on("click, mousedown", function(event) {
//if ($(this).on('click, mousedown')) {

//const check = 'checked';
//$(this).prop('value', check);
//alert($(this).val());


//$('#check{{id}}, #task-list').triggers('click, mousedown');

//}
//});





//$('#checks{{id}}').on('mousedown', function(){
// if($(this).on('mousedown'))
//{

//  $('#task-list').each(function() {
//     $(this).removeClass('strikethrough');
//   }); 
//}

//});



//$("#checks{{id}}, #task-list").on('click, mousedown', function(event){
//if($(this).on('click, mousedown'))
//{
// const id = $(this).val();
// alert(id);
//const check = 'not checked';
// $(this).prop('value', check);
// alert($(this).val());

//$(this).prop("checked", false).removeClass('strikethrough');
//  $('#checks{{id}}').each(function() {
//$(this).css('display', 'none');

//}); 

//$('#check{{id}}').each(function() {
//$(this).css('display', 'block');
//$(this).prop('checked', true);
//});  

// $('#checks{{id}}').triggers('mousedown');
//}
//});



//function check() {
//const check = 'checked';
//$(this).prop('value', check);
//alert($(this).val());
//$(this).prop("checked", true);
//$(this).css('display', 'none');
//$('#task-list').each(function() {
//$(this).addClass('strikethrough');
//});
//$('#checks{{id}}').each(function() {
//$(this).css('display', 'block');
//$(this).prop('checked', true);
//});
//};



//function uncheck() {
//const check = 'not checked';
//$(this).prop('value', check);
//alert($(this).val());

//$(this).prop("checked", false);
//$(this).css('display', 'none');
//$('#task-list').each(function() {
//$(this).removeClass('strikethrough');
//});
//$('#check{{id}}').each(function() {
//$(this).css('display', 'block');
//$(this).prop('checked', false);
//});
//};



//$('#btn-save').on("mousedown", function() {
//if ($('#task_todo').val() != "") {
//$('#task_todo').each(function() {
//const value_todo = $(this).val();
//$('#text-dark').prop('value', value_todo);
//alert($('#text-dark').val());
//$('#text-dark, #hidden_div').hide();
//});
//}
//});


//
//$("#clear-button").on("click", function() {
//$("#task-list").empty();
//});