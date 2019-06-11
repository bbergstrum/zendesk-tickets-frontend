//  Tickets List Logic

function buildTicketList(selectedPageId) {
    const url = 'http://ec2-13-210-131-209.ap-southeast-2.compute.amazonaws.com/ticketsByPage/' + selectedPageId;
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
            $('#ticket-list').empty();
            if(jqXHR.status === 400){
                //handle error if Zendesk API unavailable
                $('#tickets-list').append(
                    buildApiError('Zendesk API Unavailable')
                );
            } else {
                //handle error if backend client is unavailable
                $('#tickets-list').append(
                    buildTicketError()
                );
            }
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

// Error Handling 
function buildTicketError() {
    return '<tr>' +
        '<td></td>' +
        '<td>Error: connection to backend client unavailable.</td>' +
        '</tr>';
};

function buildApiError(error) {
    return '<tr>' +
        '<td></td>' +
        '<td>Error: ' + error + '.</td>' +
        '</tr>';
};

//  Single Ticket Logic

function showTicket(clickedTicket) {
    //request selected ticket data from backend
    const showTicketUrl = 'http://ec2-13-210-131-209.ap-southeast-2.compute.amazonaws.com/ticket/';
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