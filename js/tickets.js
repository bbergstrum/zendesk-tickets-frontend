function populateList(selectedPageId){
    var url = 'http://localhost:3000/ticketsByPage/' + selectedPageId;
    // populate tickets list
    $.getJSON(url)
    .done(function(data){
        $('#ticket-list').empty();
        data.forEach(ticket => {
            //iterate through data and build ticket list
            $('#ticket-list').append(
                //append table with ticket id & subject
                '<tr><th scope="row">' + ticket.id + '</th>' +
                '<td>' + ticket.subject + '</td>' +
                '<td>' + ticket.status + '</td>' +
                '<td>' + ticket.priority + '</td>' 
            );
        });
    });   
};

//pagination 
$('#pagination').twbsPagination({
    totalPages: 4, 
    visiblePages: 4,
    onPageClick: function (event, page) {
        populateList(page);
    }
});