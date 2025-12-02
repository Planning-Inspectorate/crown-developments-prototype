//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')

const {applyAzureHostingFix} = require('./azure-hosting-fix');
applyAzureHostingFix();

const {getJourney} = require("./journeys");
const router = govukPrototypeKit.requests.setupRouter();

const SKIP_ANSWERS = false;

router.post('/continue-answer', function (req, res) {
  if (req.body.continue === 'yes') {
    res.redirect('/features/application-updates/back-office/6-yes');
  } else if (req.body.continue === 'no') {
    res.redirect('/features/application-updates/back-office/5-no');
  } else {
    res.redirect('/features/application-updates/back-office/4-publish-now');
  }
});

router.post('/who-are-you-submitting-a-representation-for', function (request, response) {
  // save answer to session
  request.session.data['submittedForId'] = request.body.submittedForId;

  if (request.body.submittedForId === 'myself') {
    return response.redirect('/current-service/front-office/have-your-say/04-what-is-your-name');
  }

  if (request.body.submittedForId === 'on-behalf-of') {
    return response.redirect('/current-service/front-office/have-your-say/03-who-are-you-representing');
  }

  // fallback: go back to the form
  return response.redirect('back');
});

router.use(function (req, res, next) {
    if (req.url.endsWith('start')) {
        req.session.data = {}; // clear session on each start
    }
    if (req.method === 'POST') {
        console.log('POST', req.url);
        const question = req.url.replace('/', '');
        if (!req.body[question] && !SKIP_ANSWERS) {
            console.log('no value chosen for', question);
            res.redirect(question);
            return;
        }
        const journey = getJourney(req);
        const index = journey.indexOf(question);
        const next = journey[index + 1];
        res.redirect(next);
        return;
     }
    next();
});