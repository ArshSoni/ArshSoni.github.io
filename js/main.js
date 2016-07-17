function validateForm() {
  var fields = ['name', 'email', 'phone', 'message'];

  var i, fieldName, element,
  sheets = windows.document.styleSheets[0],
  length = fields.length;

  for (i = 0; i < length; i++) {
      fieldName = fields[i];
      element = document.getElementById(fieldName);
      if (element.value === "") {
        sheets.insertRule('::-webkit-input-placeholder { color: red; }', i);
        return false;
      }
  }
  alert('form sent - success');
  return true;
}
