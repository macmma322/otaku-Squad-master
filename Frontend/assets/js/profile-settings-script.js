var loadFile = function (event) {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};

function editField(fieldName) {
  const field = document.getElementById(fieldName);
  const editButton = document.querySelector(
    `button.edit-button[data-field="${fieldName}"]`
  );

  if (field.readOnly) {
    field.readOnly = false;
    editButton.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon>';
  } else {
    field.readOnly = true;
    editButton.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
  }
}
