$(document).ready(function() {

    function checked() {
        const a = document.querySelector('#task-list');
        const b = document.querySelector('.check');
        a.setAttribute('id', 'task-list');
        a.setAttribute('disabled');
        alert(b.getAttribute(id));
    }

    function strike(a) {
        if (a.style.textDecoration === 'line-through') {
            a.style.textDecoration = 'none';
        } else {
            a.style.textDecoration = 'line-through';
        }
    }

    function line(a) {
        a.style.textDecoration = 'none';
    }

    function no(a) {
        if (a.style.display === 'none') {
            a.style.display = 'block';
            strike(a);

        } else {
            a.style.display = 'none';
            strike(a);
        }
    }
});