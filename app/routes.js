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

