const fieldDefinitions = require('./field-definitions');

module.exports = function (router) {
  /**
   * GET /features/bo-redesign/v2/back-office/manage-application
   * Displays the manage application page and clears success banner flag
   */
  router.get('/features/bo-redesign/v2/back-office/manage-application', (req, res) => {
    // Capture the success message if it exists
    const successMessage = req.session.data.successMessage;
    const showBanner = req.session.data.showSuccessBanner;

    // Render the page
    res.render('features/bo-redesign/v2/back-office/manage-application', {
      showSuccessBanner: showBanner,
      successMessage: successMessage
    });

    // Clear the flag after rendering
    if (req.session.data.showSuccessBanner) {
      req.session.data.showSuccessBanner = false;
      req.session.data.successMessage = null;
    }
  });

  /**
   * GET /features/bo-redesign/v2/back-office/change
   * Displays the reusable edit form with field-specific data
   */
  router.get('/features/bo-redesign/v2/back-office/change', (req, res) => {
    const fieldId = req.query.fieldId;

    if (!fieldId) {
      return res.redirect('/features/bo-redesign/v2/back-office/manage-application');
    }

    const field = fieldDefinitions.getFieldById(fieldId);

    if (!field) {
      return res.redirect('/features/bo-redesign/v2/back-office/manage-application');
    }

    // Get current value from session or use empty string
    const currentValue = req.session.data[field.dataKey] || '';

    // Build template variables
    const templateData = {
      fieldId: fieldId,
      fieldName: field.fieldName,
      fieldLabel: field.label,
      fieldType: field.type,
      fieldHint: field.hint,
      fieldRows: field.rows,
      classes: field.classes || '',
      suffix: field.suffix || null,
      fieldOptions: field.options,
      currentValue: currentValue,
      inputType: field.inputType || 'text'
    };

    // Handle special cases for field types
    if (field.type === 'address-multi') {
      const addressLines = currentValue.split('\n').filter(line => line.trim());
      const addressFieldValues = {};

      templateData.addressFields = field.fields.map((fieldDef, index) => {
        addressFieldValues[fieldDef.name] = addressLines[index] || '';

        return {
          ...fieldDef,
          classes: fieldDef.classes || ''
        };
      });

      templateData.addressFieldValues = addressFieldValues;
    }

    if (field.type === 'coordinates') {
      const coords = currentValue ? currentValue.split('\n') : [];
      templateData.eastingValue = coords[0] ? coords[0].replace('Easting: ', '') : '';
      templateData.northingValue = coords[1] ? coords[1].replace('Northing: ', '') : '';
    }

    if (field.type === 'date' && currentValue) {
      // Parse date format - adjust based on your date format
      // Assuming format like "20 November 2025"
      const dateParts = parseDate(currentValue);
      templateData.dayValue = dateParts.day;
      templateData.monthValue = dateParts.month;
      templateData.yearValue = dateParts.year;
    }

    res.render('features/bo-redesign/v2/back-office/change', templateData);
  });

  /**
   * POST /features/bo-redesign/v2/back-office/change
   * Handles form submission and saves the updated field value
   */
  router.post('/features/bo-redesign/v2/back-office/change', (req, res) => {
    const fieldId = req.body.fieldId;
    const field = fieldDefinitions.getFieldById(fieldId);

    if (!field) {
      return res.redirect('/features/bo-redesign/v2/back-office/manage-application');
    }

    // Build the value based on field type
    let newValue = '';

    if (field.type === 'textarea' || field.type === 'text' || field.type === 'address' || field.type === 'radios') {
      newValue = req.body[field.fieldName] || '';
    }

    if (field.type === 'coordinates') {
      const easting = req.body.easting || '';
      const northing = req.body.northing || '';
      newValue = `Easting: ${easting}\nNorthing: ${northing}`;
    }

    if (field.type === 'date') {
      const day = req.body[`${field.fieldName}-day`] || '';
      const month = req.body[`${field.fieldName}-month`] || '';
      const year = req.body[`${field.fieldName}-year`] || '';

      if (day && month && year) {
        // Format as "20 November 2025"
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = monthNames[parseInt(month) - 1];
        newValue = `${day} ${monthName} ${year}`;
      }
    }

    // Save to session
    req.session.data[field.dataKey] = newValue;

    // Store success flag and message to display banner on manage page
    req.session.data.showSuccessBanner = true;
    req.session.data.successMessage = `Application updated`;

    // Redirect back to manage page
    res.redirect('/features/bo-redesign/v2/back-office/manage-application');
  });
};

/**
 * Helper function to parse date strings
 * Converts "20 November 2025" format to { day, month, year }
 */
function parseDate(dateString) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const parts = dateString.trim().split(/\s+/);

  if (parts.length === 3) {
    return {
      day: parts[0],
      month: (monthNames.indexOf(parts[1]) + 1).toString().padStart(2, '0'),
      year: parts[2]
    };
  }

  return { day: '', month: '', year: '' };
}
