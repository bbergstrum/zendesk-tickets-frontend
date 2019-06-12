# Zendesk Ticket Viewer - Frontend
Zendesk Ticket Viewer is a web based application which retrieves and presents support tickets from the Zendesk API. This project was for the Zendesk Internship Coding Challenge.

## Features
  - View support tickets in an easy to read table.
  - Select individual tickets to retieve further information.
  - Tickets are ordered and paginated in groups of 25 items per page.

## Technology

As a full-stack developer, I decided to split the solution into a front-end and back-end. The reason behind this decision was to seperate concerns and design an architecture to a professional standard.

* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [Bootstrap](https://getbootstrap.com/)
* [jQuery](https://jquery.com/)
* [twbs-pagination](https://github.com/josecebe/twbs-pagination)

### Installation

1. Check out the code by running at a terminal `git clone https://github.com/bbergstrum/zendesk-tickets-frontend`.
2. `cd` into the directory.
2. Navigate to `js/tickets.js`, on the first line I have defined a constant which points to the backend API of this. solution. When running locally, just change this to `'http://localhost:3000/'`.
3. Open `index.html` in Google Chrome.

### Deployment
The code is automatically deployed when pushed to the `master` branch of git, triggering a CodePipeline. Using a CodeDeploy step, the front-end code is copied into an S3 bucket.

**To avoid going through the installation steps, you can find the deployed front-end here:** [Zendesk Ticket Frontend](http://zendesk-ticket-frontend.s3-ap-southeast-2.amazonaws.com/index.html)


### License
MIT
