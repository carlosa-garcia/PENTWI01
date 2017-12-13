function newAction () {
    if ( !$('#myInput').val() ) {
        $('#myInput').focus();
    } else {
        var closeBtn = '<span class="close" onclick="closeBtn(this)">x</span>';
        var item = $('#myInput').val();
        $('#todo-list').append("<li>" + item + closeBtn + "</li>");
        $('#myInput').val('').focus();
        makeClickable();
    };
    updateStatusBar();
};

function makeClickable () {
    $('.todo-body li').last().click(
        function () {
            $( this ).toggleClass('clicked');
            updateStatusBar();
        }
    );
};

function closeBtn (el) {
    var item = el.parentElement;
    item.remove();
    updateStatusBar();
};

function clearForm (el) {
    if (el == 'checked') {
        var items = '#todo-list li.clicked';
    } else if (el == 'all') {
        var items = '#todo-list li';
    };

    $(items).remove();
    updateStatusBar();
};

function updateStatusBar () {
    var pending = $('#todo-list li').not('.clicked').length;
    var done = $('#todo-list li.clicked').length;

    if (pending === 0 && done == 0) {
        $('#ntd').show();
        $('#items-pending, #items-done').hide();
    } else {
        $('#pending').text(pending);
        $('#done').text(done);
        $('#ntd').hide();
        $('#items-pending, #items-done').show();
    };
};
