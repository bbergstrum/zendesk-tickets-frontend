//  Tickets List Logic

function buildTicketList(selectedPageId) {
    var url = 'http://localhost:3000/ticketsByPage/' + selectedPageId;
    // grab JSON from backend
    $.getJSON(url)
        .done(function (ticketList) {
            $('#tickets-list').empty();
            ticketList.forEach(ticket => {
                //iterate through data and build ticket list
                $('#tickets-list').append(
                    buildRow(ticket)
                );
            });
            // apply click listener to each ticket
            $('.table-row').click(function (event) {
                // update displays
                $('#ticket-table').hide();
                $('#pages').hide();
                // pass the clicked ticket into show ticket function
                showTicket(event.target);
            });
        })
        .fail(function (jqXHR, textStatus) {
            console.log('getJSON request failed: ' + textStatus);
            console.log(jqXHR);
            $('#tickets-list').append(
                buildTicketError()
            );
        });
};

function buildRow(ticket) {
    //apply ticket ID attribute to each row respectively
    return '<tr class="table-row" data-ticket-id=' + ticket.id + '>' +
        '<th scope="row">' + ticket.id + '</th>' +
        //fill table with ticket data
        '<td>' + ticket.subject + '</td>' +
        '<td>' + ticket.status + '</td>' +
        '<td>' + ticket.priority + '</td>' +
        '</tr>';
};

function buildTicketError() {
    return '<tr>' +
        '<td></td>' +
        '<td>Connection to ticket viewer backend unavailable.</td>' +
        '</tr>' +
        '<tr>' +
        '<td></td>' +
        '<td>Unable to fetch tickets...</td>' +
        '</tr>'
};

//  Single Ticket Logic

function showTicket(clickedTicket) {
    //request selected ticket data from backend
    const showTicketUrl = 'http://localhost:3000/ticket/';
    // grab ticketId from selected ticket element
    $.getJSON(showTicketUrl + $(clickedTicket).parent().attr('data-ticket-id'))
        .done(function (ticket) {
            $('#selected-ticket-id').text('Ticket ID: ' + ticket.id);
            $('#selected-ticket-subject').text(ticket.subject);
            $('#selected-ticket-desc').text(ticket.description);
            $('#selected-ticket-priority').text(ticket.priority);
            $('#selected-ticket').show();
        });
};

//  Event Listeners

$('.back').click(function () {
    //update displays
    $("#selected-ticket").hide();
    $("#ticket-table").show();
    $('#pages').show();
});

//  Pagination Logic 

$('#pagination').twbsPagination({
    totalPages: 4,
    visiblePages: 4,
    onPageClick: function (event, page) {
        buildTicketList(page);
    }
});