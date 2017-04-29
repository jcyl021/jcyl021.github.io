$("#button").on("click", hey)

function hey() {
  var name = $("#name").val();
  var age = $("#age").val();
  if (name!="" && age!="") {
    alert("HEllo, " + age + "-year-old" + " " + name);
  }
  $("#name").val("");
  $("#age").val("");
  age = ""
  name = ""
}

var likedFruits = [

];

$("body").on("click", "#button", makeList)

function makeList() {
  if ($("#checkboxOne").prop("checked")) {
    likedFruits.push($("#checkboxOne").val())
  }
  if ($("#checkboxTwo").prop("checked")) {
    likedFruits.push($("#checkboxTwo").val())
  }
  if ($("#checkboxThree").prop("checked")) {
    likedFruits.push($("#checkboxThree").val())
  }
  if ($("#checkboxFour").prop("checked")) {
    likedFruits.push($("#checkboxFour").val())
  };
  if (likedFruits!= ""){
    alert("You like " + likedFruits + ".");
  }
  $("#checkboxOne").prop("checked", false);
  $("#checkboxTwo").prop("checked", false);
  $("#checkboxThree").prop("checked", false);
  $("#checkboxFour").prop("checked", false);
  likedFruits=[ ""]
}
