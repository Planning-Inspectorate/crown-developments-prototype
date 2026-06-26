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
