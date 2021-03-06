function newAction () {
    if ( !$('#myInput').val() ) {
        $('#myInput').focus();
    } else {
        var closeBtn = '<span class="close" onclick="closeBtn(this)">x</span>';
        var item = $('#myInput').val();
        $('#todo-list').append("<li>" + item + closeBtn + "</li>");
        $('#myInput').val('').focus();
        makeClickable();
        $('#clearAll').prop('disabled', false)
    }
    updateStatusBar();
}

function makeClickable () {
    $('.todo-body li').last().click(
        function () {
            $( this ).toggleClass('clicked');
            updateStatusBar();
        }
    );
}

function closeBtn (el) {
    var item = el.parentElement;
    item.remove();
    updateStatusBar();
}

function updateForm (el) {
    var items
    var update

    if (el == 'checked') {
        items = '#todo-list li.clicked';
        update =  $(items).remove();
    } else if (el == 'all') {
        items = '#todo-list li';
        update =  $(items).remove();
        $('#clearAll').prop('disabled', true)
    } else if (el == 'mark-all') {
        items = '#todo-list li';
        update = $(items).toggleClass('clicked');
    }

    update;
    updateStatusBar();
}

function updateStatusBar () {
    var pending = $('#todo-list li').not('.clicked').length;
    var done = $('#todo-list li.clicked').length;

    if (pending === 0 && done === 0) {
        $('#ntd').show();
        $('#items-pending, #items-done').hide();
        $('#clearAll').prop('disabled', true)
    } else {
        $('#pending').text(pending);
        $('#done').text(done);
        $('#ntd').hide();
        $('#items-pending, #items-done').show();
    }
    if ($('#todo-list li.clicked').length === 0) {
        $('#clearComplete').prop('disabled', true)
    } else {
        $('#clearComplete').prop('disabled', false)
    }
}

function getPublicIP () {
    $.getJSON('http://ipinfo.io/json', function (data) {
        $('#geo').append('<li>IP: ' + data.ip + '</li>')
        $('#geo').append('<li>City: ' + data.city + '</li>')
    })
}
