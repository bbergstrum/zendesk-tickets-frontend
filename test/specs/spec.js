//load existing ticket viewer code

function setUpHTMLFixture() {
    const fixtureSRC = '../index.html'
    setFixtures(fixtureSRC);
  };

//test ticket builders
describe('build ticket error', function() {
    beforeEach(function(){
        setUpHTMLFixture();
    });

    it('returns a string of HTML to be appended to a table', function() { 
        expect(buildTicketError()).toBe(
            '<tr>' +
            '<td></td>' +
            '<td>Error: connection to backend client unavailable.</td>' +
            '</tr>'
        );
    });    
});

describe('build API error', function() {
    beforeEach(function(){
        setUpHTMLFixture();
    });

    it('returns a string of HTML to be appended to a table', function() { 
        expect(buildApiError('error')).toBe(
            '<tr>' +
            '<td></td>' +
            '<td>Error: ' + 'error' + '.</td>' +
            '</tr>'
        );
    });    
});

