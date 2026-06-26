# Reusable Edit Form System

## Overview

This is a reusable, generic edit form system for the manage-application page. Instead of creating individual edit pages for each field, there is a single `change.html` page that dynamically renders the appropriate form component based on field type.

## Architecture

### Key Files

1. **field-definitions.js** - Central configuration file that defines all editable fields
2. **change.html** - Single reusable template for editing any field
3. **change-routes.js** - Route handlers for GET (display form) and POST (save)
4. **manage-application.html** - Main page that lists all fields with "Change" links
5. **manage-application-success.html** - Success page with auto-redirect

### How It Works

```
User clicks "Change" on a field
    ↓
Navigate to /change?fieldId=fieldName
    ↓
change-routes.js GET handler
    - Looks up field definition by ID
    - Gets current value from session
    - Renders change.html with field-specific data
    ↓
User fills in form and clicks "Save"
    ↓
change-routes.js POST handler
    - Validates and processes form data based on field type
    - Saves to req.session.data[fieldDataKey]
    - Redirects to success page
    ↓
Success page displays with 3-second auto-redirect back to manage page
```

## Adding a New Field

To add a new editable field, follow these steps:

### 1. Add field definition to `field-definitions.js`

```javascript
{
  id: 'uniqueFieldId',                    // Unique identifier
  key: 'Display Name',                    // Shown in the list
  fieldName: 'form-field-name',           // HTML form field name
  type: 'fieldType',                      // See types below
  label: 'Question label on edit page',   // Form label
  hint: 'Optional hint text',             // Optional help text
  dataKey: 'sessionDataKey'               // Where to store in session
  // Additional properties based on type (see examples below)
}
```

### 2. Add "Change" link to `manage-application.html`

Update the `rows` array in the template:

```nunjucks
{
  "key": "Field Name",
  "value": data.fieldDataKey or "Default value",
  "actions": [
    {
      "text": "Change",
      "href": "/features/bo-redesign/v2/back-office/change?fieldId=uniqueFieldId",
      "visuallyHidden": "Field Name"
    }
  ]
}
```

## Field Types

The system supports the following field types:

### 1. **textarea** - Multi-line text input
```javascript
{
  id: 'description',
  type: 'textarea',
  label: 'Description',
  hint: 'Help text',
  rows: 5  // Optional, defaults to 5
}
```

### 2. **text** - Single-line text input
```javascript
{
  id: 'siteArea',
  type: 'text',
  inputType: 'number',  // Optional: 'number', 'email', 'tel', etc.
  label: 'Site area'
}
```

### 3. **radios** - Radio button group
```javascript
{
  id: 'decisionOutcome',
  type: 'radios',
  label: 'Select one',
  options: [
    { value: 'value1', text: 'Display Text 1' },
    { value: 'value2', text: 'Display Text 2' }
  ]
}
```

### 4. **address** - Multi-line address textarea
```javascript
{
  id: 'siteAddress',
  type: 'address',
  label: 'What is the site address?'
}
```

### 5. **coordinates** - Two coordinate inputs (easting/northing)
```javascript
{
  id: 'siteCoordinates',
  type: 'coordinates',
  label: 'Site coordinates'
}
```

### 6. **date** - Three inputs for day/month/year
```javascript
{
  id: 'expectedDate',
  type: 'date',
  label: 'Select a date'
}
```

## Data Storage

All field values are stored in `req.session.data` using the `dataKey` specified in the field definition. The key you use determines where the data is accessible in templates as `data.keyName`.

### Example
```javascript
{
  dataKey: 'applicationDescription',
  // Accessible in templates as: data.applicationDescription
}
```

## Form Submission Process

### GET Request (Display Form)
1. Route extracts `fieldId` from query parameter
2. Looks up field definition
3. Retrieves current value from session
4. Renders `change.html` with all field-specific variables
5. Template uses conditional blocks to render appropriate form component

### POST Request (Save Data)
1. Route receives form data with `fieldId`
2. Looks up field definition
3. Processes data based on field type:
   - **textarea/text/radios/address**: Uses form value directly
   - **coordinates**: Combines easting + northing inputs
   - **date**: Combines day/month/year inputs into formatted string
4. Saves to session: `req.session.data[field.dataKey] = newValue`
5. Sets `req.session.data.lastUpdatedField` for success page
6. Redirects to success page

## Date Format

Dates are stored and displayed in the format: `"20 November 2025"`

The system converts between this format and the form's day/month/year inputs automatically.

## Session Persistence

All changes are stored in the session, which means:
- Data persists across page navigation
- Data is available in all templates as `data.keyName`
- Data is lost when the session ends
- For production, you would integrate with a database

## Customization

### Styling
The form uses GOV.UK Frontend components. Styling is handled by the GOV.UK CSS framework.

### Validation
Currently, validation is minimal. To add validation:
1. Add validation in the POST handler in `change-routes.js`
2. Store errors in a response object
3. Re-render the form with error messages

### Custom Components
If you need a completely custom component type:
1. Add a new condition block in `change.html`
2. Create appropriate form inputs
3. Add processing logic in the POST handler
4. Add field definition with the new type

## Testing

To test the form flow:
1. Navigate to `/features/bo-redesign/v2/back-office/manage-application`
2. Click "Change" on any field
3. Update the value
4. Click "Save changes"
5. Should see success page with 3-second auto-redirect
6. Verify updated value appears on manage page after redirect

## Extending for Multiple Records

Currently, this system is designed for editing fields within a single application. To extend for multiple applications:
1. Add application ID to the field ID structure: `applicationId-fieldId`
2. Pass applicationId as a query parameter alongside fieldId
3. Store values in nested session structure: `data[applicationId][fieldId]`
4. Update templates to use nested data access
