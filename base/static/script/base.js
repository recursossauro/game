alert('1');
// Show photo
function showPhoto() {
  fields = document.querySelectorAll("input[type=file]");
  for (var i=0; i<fields.length; i++) {
    img = document.getElementById(fields[i].id+'_img');
    if (img) document.getElementById('id_photo').onchange = function () {
      var src = URL.createObjectURL(this.files[0]);
      document.getElementById('id_photo_img').src = src;
    }
  }
}
