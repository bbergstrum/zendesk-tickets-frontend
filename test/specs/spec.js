//load existing ticket viewer code

function setUpHTMLFixture() {
    const fixtureSRC = '../index.html'
    setFixtures(fixtureSRC);
};

//test ticket builders
describe('build ticket error', function () {
    it('returns a string of HTML to be appended to a table', function () {
        // Act
        const actual = buildTicketError();
        // Assert
        expect(actual).toBe(
            '<tr>' +
            '<td></td>' +
            '<td>Error: connection to backend client unavailable.</td>' +
            '</tr>'
        );
    });
});

describe('build API error', function () {
    it('returns a string of HTML to be appended to a table', function () {
        // Act
        const actual = buildApiError('error');
        // Assert
        expect(actual).toBe(
            '<tr>' +
            '<td></td>' +
            '<td>Error: error.</td>' +
            '</tr>'
        );
    });
});

describe('build row', function () {
    it('returns a string of HTML to be appended inside of a table', function () {
        // Arrange
        const mockTicket = {
            'id': 1,
            'subject': 'Test subject',
            'status': 'Test status',
            'priority': 'Low'
        };

        // Act
        const actual = buildRow(mockTicket);

        // Assert
        expect(actual).toBe(
            '<tr class="table-row" data-ticket-id=' + mockTicket.id + '>' +
            '<th scope="row">' + mockTicket.id + '</th>' +
            '<td>' + mockTicket.subject + '</td>' +
            '<td>' + mockTicket.status + '</td>' +
            '<td>' + mockTicket.priority + '</td>' +
            '</tr>'
        );
    });
});

describe('build ticket list', function () {
    it('requests JSON to a specified URL', function () {
        // Arrange
        spyOn($, 'getJSON').and.callThrough();
        // Act
        buildTicketList(1);
        // Assert
        expect($.getJSON).toHaveBeenCalled();
    });
});

describe('show single ticket', function () {
    it('requests JSON to a specified URL', function () {
        // Arrange
        spyOn($, 'getJSON').and.callThrough();
        // Act
        showTicket(document.createElement("td"));
        // Assert
        expect($.getJSON).toHaveBeenCalled();
    });
});