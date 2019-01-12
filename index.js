document.addEventListener("DOMContentLoaded", function(e) {

  // Get the modal
  const modal = document.getElementById("id01");

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
function dropdownMenu() {
    var x = document.getElementById("dropdownClick");
    if (x.className === "topnav") {
        x.className += " responsive";
    }
    else {
        x.className = "topnav";
    } 
}
console.log("HELLO");

$('.topnav li a').click(function() {
  console.log("$('#dropdownClick').hasClass('responsive')",$('#dropdownClick').hasClass('responsive'))
  if ($('#dropdownClick').hasClass('responsive')) {
      $('#dropdownClick').removeClass(' responsive');
  } else {
      $('#dropdownClick').addClass(' responsive');
  }
  });
