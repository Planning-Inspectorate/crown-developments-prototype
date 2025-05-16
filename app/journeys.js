const {QUESTIONS} = require("./questions");

function getJourney(req) {
    let journey = myselfJourney(req); // default to start
    if (isMyself(req)) {
        return journey;
    } else {
        journey = agentJourney(req);
    }
    return journey;
}

function myselfJourney(req) {
    const journey = [
        QUESTIONS.WHO_ARE_YOU_SUBMITTING_FOR,
        QUESTIONS.AGE_18_OR_OVER
    ];
    if (isOver18(req)) {
        journey.push(QUESTIONS.FULL_NAME);
    }
    journey.push(
        QUESTIONS.EMAIL_ADDRESS,
        QUESTIONS.WRITTEN_REPRESENTATION,
        QUESTIONS.CHECK_ANSWERS,
        QUESTIONS.DECLARATION,
        QUESTIONS.CONFIRMATION
    );
    return journey;
}

function agentJourney(req) {
    const journey = [
        QUESTIONS.WHO_ARE_YOU_SUBMITTING_FOR,
        QUESTIONS.AGENT_OPTIONS,
        QUESTIONS.AGE_18_OR_OVER
    ];
    if (isOver18(req)) {
        journey.push(QUESTIONS.FULL_NAME);
    }
    if (forPerson(req)) {
        journey.push(
            QUESTIONS.AGENT_FOR_CLIENT
        );
        if (isAgentForClient(req)) {
            journey.push(QUESTIONS.AGENT_ORG_NAME);
        }
        journey.push(
            QUESTIONS.EMAIL_ADDRESS,
            QUESTIONS.REP_OVER_18
        );
        if (repIsOver18(req)) {
            journey.push(QUESTIONS.REP_FULL_NAME);
        }
    } else if (forOrganisation(req)) {
        journey.push(
            QUESTIONS.EMAIL_ADDRESS,
            QUESTIONS.ORG_NAME,
            QUESTIONS.JOB_TITLE
        );
    } else if (repOrganisation(req)) {
        journey.push(
            QUESTIONS.AGENT_FOR_CLIENT
        );
        if (isAgentForClient(req)) {
            journey.push(QUESTIONS.AGENT_ORG_NAME);
        }
        journey.push(
            QUESTIONS.EMAIL_ADDRESS,
            QUESTIONS.REP_ORG_NAME
        );
    }
    journey.push(
        QUESTIONS.WRITTEN_REPRESENTATION,
        QUESTIONS.CHECK_ANSWERS,
        QUESTIONS.DECLARATION,
        QUESTIONS.CONFIRMATION
    );
    return journey;
}

function isMyself(req) {
    return req.session.data[QUESTIONS.WHO_ARE_YOU_SUBMITTING_FOR] === 'Myself';
}

function isOver18(req) {
    return req.session.data[QUESTIONS.AGE_18_OR_OVER]?.toLowerCase() === 'yes';
}

function repIsOver18(req) {
    return req.session.data[QUESTIONS.REP_OVER_18]?.toLowerCase() === 'yes';
}

function isAgentForClient(req) {
    return req.session.data[QUESTIONS.AGENT_FOR_CLIENT]?.toLowerCase() === 'yes';
}

function forPerson(req) {
    return req.session.data[QUESTIONS.AGENT_OPTIONS] === 'person';
}

function forOrganisation(req) {
    return req.session.data[QUESTIONS.AGENT_OPTIONS] === 'orgyes';
}

function repOrganisation(req) {
    return req.session.data[QUESTIONS.AGENT_OPTIONS] === 'orgno';
}

module.exports = {
    getJourney
};
