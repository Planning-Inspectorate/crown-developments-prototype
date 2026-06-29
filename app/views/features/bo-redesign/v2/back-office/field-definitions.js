/**
 * Field definitions for the manage application page
 * Maps each editable field to its type, component, and configuration
 */

module.exports = {
  fields: [
    {
      id: 'applicationDescription',
      key: 'Development description',
      fieldName: 'application-description',
      type: 'textarea',
      label: 'What is the description of the development?',
      hint: 'This will be published on the website.',
      rows: 5,
      dataKey: 'applicationDescription'
    },
    {
      id: 'applicationType',
      key: 'Application type',
      fieldName: 'application-type',
      type: 'radios',
      label: 'What type of application is it?',
      dataKey: 'applicationType',
      options: [
        { value: 'planning-permission', text: 'Planning permission' },
        { value: 'outline-some', text: 'Outline planning permission with some matters reserved' },
        { value: 'outline-all', text: 'Outline planning permission with all matters reserved' },
        { value: 'reserved-matters', text: 'Approval of reserved matters following outline approval' },
        { value: 'lbc', text: 'Planning permission and listed building consent (LBC) for alterations, extension or demolition of a listed building' }
      ]
    },
    {
      id: 'siteAddress',
      key: 'Site address',
      fieldName: 'site-address',
      type: 'address-multi',
      label: 'What is the site address?',
      dataKey: 'siteAddress',
      fields: [
        { name: 'address-line-1', label: 'Address line 1', classes: 'govuk-!-width-full' },
        { name: 'address-line-2', label: 'Address line 2', classes: 'govuk-!-width-two-full' },
        { name: 'town-city', label: 'Town or city', classes: 'govuk-!-width-two-thirds' },
        { name: 'county', label: 'County', classes: 'govuk-!-width-two-thirds' },
        { name: 'postcode', label: 'Postcode', classes: 'govuk-input--width-10' }
      ]
    },
    {
      id: 'siteCoordinates',
      key: 'Site coordinates',
      fieldName: 'site-coordinates',
      type: 'coordinates',
      label: 'What are the coordinates of the site?',
      dataKey: 'siteCoordinates',
      fields: [
        { name: 'easting', label: 'Easting' },
        { name: 'northing', label: 'Northing' }
      ]
    },
    {
      id: 'siteArea',
      key: 'Site area (ha)',
      fieldName: 'site-area',
      type: 'text',
      inputType: 'number',
      label: 'What is the site area in hectares?',
      dataKey: 'siteArea',
      classes: 'govuk-input--width-5',
      suffix: {
        text: 'ha'
      }

    },
    {
      id: 'expectedSubmissionDate',
      key: 'Expected submission date',
      fieldName: 'expected-submission-date',
      type: 'date',
      label: 'What is the expected submission date?',
      dataKey: 'expectedSubmissionDate'
    },
    {
      id: 'decisionOutcome',
      key: 'Decision outcome',
      fieldName: 'decision-outcome',
      type: 'radios',
      label: 'What was the decision outcome?',
      dataKey: 'decisionOutcome',
      options: [
        { value: 'approved', text: 'Approved' },
        { value: 'conditions', text: 'Approved with conditions' },
        { value: 'refused', text: 'Refused' },
        { value: 'withdrawn', text: 'Withdrawn' }
      ]
    },
    {
      id: 'decisionDate',
      key: 'Decision date',
      fieldName: 'decision-date',
      type: 'date',
      label: 'What is the decision date?',
      dataKey: 'decisionDate'
    },
    {
      id: 'category',
      key: 'Category',
      fieldName: 'category',
      type: 'radios',
      label: 'What is the application category?',
      dataKey: 'category',
      options: [
        { value: 'major-development-buildings-over-1000-square-metres', text: 'Major Development Buildings over 1000 square metres' },
        { value: 'major-development-development-of-a-site-above-1-hectare', text: 'Major Development Development of a site above 1 hectare' },
        { value: 'major-development-dwellings-numbering-10-or-more', text: 'Major Development Dwellings numbering 10 or more' },
        { value: 'major-development-dwellings-of-05-hectare-or-more', text: 'Major Development Dwellings of 0.5 hectare or more' },
        { value: 'major-development-minerals', text: 'Major Development Minerals' },
        { value: 'major-development-waste', text: 'Major Development Waste' },
        { value: 'major-development-other', text: 'Major Development Other' },
        { value: 'non-major-development-buildings-less-than-1000-square-metres', text: 'Non-Major Development Buildings less than 1000 square metres' },
        { value: 'non-major-development-development-of-a-site-less-than-1-hectare', text: 'Non-Major Development Development of a site less than 1 hectare' },
        { value: 'non-major-development-dwellings-numbering-between-1-and-9', text: 'Non-Major Development Dwellings numbering between 1 and 9' },
        { value: 'non-major-development-dwellings-of-less-than-05-hectare', text: 'Non-Major Development Dwellings of less than 0.5 hectare' },
        { value: 'non-major-development-change-of-use', text: 'Non-Major Development Change of use' },
        { value: 'non-major-development-relevant-demolition', text: 'Non-Major Development Relevant demolition' },
        { value: 'non-major-development-other', text: 'Non-Major Development Other' },
        { value: 'non-major-development-listed-building-consent-to-alter-extend', text: 'Non-Major Development Listed building consent to alter/extend' },
        { value: 'non-major-development-listed-building-consent-to-demolish', text: 'Non-Major Development Listed building consent to demolish' }
      ],
    },
    {
      id: 'procedure',
      key: 'procedure',
      fieldName: 'procedure',
      type: 'radios',
      label: 'What is the application procedure?',
      hint: "If you change the procedure after it's been set, any details you've added will be lost.",
      dataKey: 'procedure',
      options: [
        {
          value: 'written-reps', text: 'Written representations'
        },
        {
          value: 'hearing', text: 'Hearing'
        },
        {
          value: 'inquiry', text: 'Inquiry'
        },
      ]
    },
    {
      id: 'status',
      key: 'status',
      fieldName: 'status',
      type: 'radios',
      label: 'What is the application status?',
      dataKey: 'status',
      options: [
        { value: 'new', text: 'New' },
        { value: 'accepted', text: 'Accepted' },
        { value: 'invalid', text: 'Invalid' },
        { value: 'consultation-period-open', text: 'Consultation period open' },
        { value: 'hearing-inquiry-date-set', text: 'Hearing/Inquiry date set' },
        { value: 'application-on-hold-awaiting-further-information', text: 'Application on hold awaiting further information' },
        { value: 'report-awaited', text: 'Report awaited' },
        { value: 'report-sent-to-decision-branch', text: 'Report sent to Decision Branch' },
        { value: 'decision-awaited', text: 'Decision awaited' },
        { value: 'decided', text: 'Decided' },
        { value: 'withdrawn', text: 'Withdrawn' },
        { value: 'declined-to-determine', text: 'Declined to determine' },
        { value: 'closed-invalid', text: 'Closed - invalid' },
        { value: 'closed-opened-in-error', text: 'Closed - opened in error' },
      ]
    },
    {
      id: 'stage',
      key: 'stage',
      fieldName: 'stage',
      type: 'radios',
      label: 'What is the application stage?',
      dataKey: 'stage',
      options: [
        { value: 'accepted', text: 'Accepted' },
        { value: 'consultation', text: 'Consultation' },
        { value: 'procedure-choice', text: 'Procedure choice' },
        { value: 'final-decision', text: 'Final decision' },
      ]
    },
    {
      id: 'lpaReference',
      key: 'lpaReference',
      fieldName: 'lpaReference',
      type: 'text',
      label: 'What is the LPA reference for this application?',
      hint: 'Enter the local planning authority reference',
      dataKey: 'lpaReference',
    },
    {
      id: 'distressing',
      key: 'distressing',
      fieldName: 'distressing',
      type: 'radios',
      label: 'Does this application involve potentially distressing content?',
      hint: "If you select 'Yes', this will trigger a warning on the front office",
      dataKey: 'distressing',
      options: [
        { value: 'yes', text: 'Yes' },
        { value: 'no', text: 'No' }
      ]
    },
    {
      id: 'nationallyImportant',
      key: 'nationallyImportant',
      fieldName: 'nationallyImportant',
      type: 'radios',
      label: 'Is this application nationally important?',
      dataKey: 'nationallyImportant',
      options: [
        { value: 'yes', text: 'Yes' },
        { value: 'no', text: 'No' }
      ]
    },
    {
      id: 'nationallyImportantConfirmation',
      key: 'nationallyImportantConfirmation',
      fieldName: 'nationallyImportantConfirmation',
      type: 'date',
      label: 'What date was national importance confirmed?',
      dataKey: 'nationallyImportantConfirmation'
    },
    {
      id: 'greenBelt',
      key: 'greenBelt',
      fieldName: 'greenBelt',
      type: 'radios',
      label: 'Is the proposed development in green belt land?',
      dataKey: 'greenBelt', options: [
        { value: 'yes', text: 'Yes' },
        { value: 'no', text: 'No' }
      ]
    },
    {
      id: 'visible',
      key: 'visible',
      fieldName: 'visible',
      type: 'radios',
      label: 'Is the site visible from public land?',
      dataKey: 'visible', options: [
        { value: 'yes', text: 'Yes' },
        { value: 'no', text: 'No' }
      ]
    },
    {
      id: 'health',
      key: 'health',
      fieldName: 'health',
      type: 'text',
      label: 'What are the health and safety issues for the site?',
    },
    {
      id: 'cil',
      key: 'cil',
      fieldName: 'cil',
      type: 'radios',
      label: 'Is the application liable for the Community Infrastructure Levy (CIL)?',
      dataKey: 'cil', options: [
        { value: 'yes', text: 'Yes' },
        { value: 'no', text: 'No' }
      ]
    },
    {
      id: 'bng',
      key: 'bng',
      fieldName: 'bng',
      type: 'radios',
      label: 'Is the application exempt from biodiversity net gain (BNG)?',
      dataKey: 'bng', options: [
        { value: 'yes', text: 'Yes' },
        { value: 'no', text: 'No' }
      ]
    },
    {
      id: 'costsApplication',
      key: 'costsApplication',
      fieldName: 'costsApplication',
      type: 'radios',
      label: 'Are there any costs applications?',
      dataKey: 'costsApplication', options: [
        { value: 'yes', text: 'Yes' },
        { value: 'no', text: 'No' }
      ]
    }
  ],

  /**
   * Get a field definition by ID
   */
  getFieldById(fieldId) {
    return this.fields.find(f => f.id === fieldId);
  },

  /**
   * Get all field definitions
   */
  getAllFields() {
    return this.fields;
  }
};
