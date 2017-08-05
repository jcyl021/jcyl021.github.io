var fdb = new ForerunnerDB();
var db = fdb.db("statsheet");
var studentCollection = db.collection('students');

// var newStudent = {
//   name: "Koding",
//   age: 18
// };

studentCollection.load();
setTimeout(afterloaded, 1000)
//
function afterloaded() {
  var students = studentCollection.find();
  console.log(students);
  for (var i = 0; i < students.length; i++) {
    console.log(students[i]._id)
    $("#studenTable").append("<tr>" + "<td class='studentId'>" + students[i]._id + "</td>" + "<td class=studentname id='students[i]._id'>" + students[i].name + "</td>" + "<td>" + students[i].gender + "</td>" + "<td>" + "<button type='button' class='deletestudentbutton btn btn-danger'>" + "DELETE" + "</button>" + "</td>" + "<td>" + "<button type='button' class='editinfobutton btn btn-warning'>" + "EDIT" + "</button>" + "</td> </tr>")
  }
  $("body").on("click", ".deletestudentbutton", function() {
    var cf = confirm("ArE yUo SuRe?");
    if (cf == true) {
      studentCollection.remove({
        _id: $(this).parents("tr").find(".studentId").text()
      });
      // console.log(studentCollection.find())
      // console.log($(this).parents("tr").find(".studentId").text())
      $(this).parents("tr").remove();
      $(this).remove();
      studentCollection.save();
    } else {

    }
  })

  $("body").on("click", ".studentId", function() {
    var studentsId = $(this).text()
    var query = {
      _id: studentsId
    };
    var student = studentCollection.find(query)[0];
    console.log(student)
    $("#studentName").text(student.name);
    $("#studentID").text(student._id);
    $("#studentAge").text(student.age);
    $("#studentGender").text(student.gender);
    $("#studentsInfo").modal('show')
  })
}






// for(i=0;1<=10;i++){
//   var newStudent = {
//     name:randomName,
//     age:randomAge,
//   };
// }

function randomizegender() {
  var gendernumber = Math.floor((Math.random() * 3) + 1);
  if (gendernumber == 1) {
    var gndr = "male"
  } else if (gendernumber == 2) {
    var gndr = "female"
  } else if (gendernumber == 3) {
    var gndr = "LGBT"
  }
  return gndr
}


for (i = 0; i < 10; i++) {

  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var j = 0; j < 5; j++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  var randomName = text;
  text = ""

  var textA = "";
  var possible = "1234567890";

  for (var k = 0; k < 2; k++)
    textA += possible.charAt(Math.floor(Math.random() * possible.length));

  var randomAge = textA / 1;
  textA = ""

  var newStudent = {
    name: randomName,
    age: randomAge,
    gender: randomizegender()
  }

  studentCollection.insert(newStudent)
}
studentCollection.save();



$("#addstudentbutton").click(determineG)
$("#addstudentbutton").click(addStudent)

var GENDER = ""

function determineG() {
  if ($("#gender_Male").prop("checked")) {
    GENDER = "male"
  } else if ($("#gender_Female").prop("checked")) {
    GENDER = "female"
  } else if ($("#gender_LGBT").prop("checked")) {
    GENDER = "LGBT"
  } else {
    GENDER = " "
  }
}


function addStudent() {
  if ($("#newstudentname").val() != "" && $("#newstudentage").val() != "") {
    var addedStudent = {
      name: $("#newstudentname").val(),
      age: $("#newstudentage").val(),
      gender: GENDER
    };
    $("#newstudentname").val("");
    $("#newstudentage").val("");
    $("#gender_Female").prop("");
    $("#gender_Male").prop("");
    studentCollection.insert(addedStudent)
    var addedSTUDENT = studentCollection.find(addedStudent)[0];
    console.log(addedSTUDENT)
    $("#studenTable").append("<tr>" + "<td class='studentId'>" + addedSTUDENT._id + "</td>" + "<td class='studentname'>" + addedStudent.name + "</td>" + "<td class='studentgender'>" + addedStudent.gender + "</td>" + "<td>" + "<button type='button' class='btn btn-danger deletestudentbutton'>" + "DELETE" + "</button>" + "</td>" + "<td>" + "<button type='button' class='editinfobutton btn btn-warning'>" + "EDIT" + "</button>" + "</td></tr>")
  }
}


$("body").on("click", ".editinfobutton", updateData)

function updateData() {
  var updateID = $(this).parents("tr").find(".studentId").text();
  console.log(updateID);
  var Uquery = {
    _id: updateID
  };
  var operatedStudent = studentCollection.find(Uquery)[0];
  $("#changedname").val(operatedStudent.name);
  $("#changedage").val(operatedStudent.age);
  $("#savechanges").attr("data-id", updateID);
  $("#editInfo").modal("show")
}


$("#savechanges").on("click", updateSave)

function updateSave() {
  var destination = $(this).attr("data-id");
  console.log(destination);
  var updatedStudent = {
    name: $("#changedname").val(),
    age: $("#changedage").val()
  };
  studentCollection.updateById(destination, updatedStudent);
  studentCollection.save();
  $("#editInfo").modal("hide");
  console.log($($(this).attr("data-id")))
//   var searchid = $(this).parents("div").find("Tbody").find("#"+$(this).attr("data-id"))val();
//   console.log(searchid)
//   $("#"+searchid).val($("#changedname").val())
}



$("#SearchButton").click(function() {
  var searchRequirement = $("#ageRestriction").val();
  if ($("#searchnarrower1").prop("checked")) {
    var genderRequirement = ["male"]
  } else if ($("#searchnarrower2").prop("checked")) {
    var genderRequirement = ["female"]
  } else if ($("#searchnarrower3").prop("checked")) {
    var genderRequirement = ["LGBT"]
  } else {
    var genderRequirement = [""]
  };
  console.log(searchRequirement)
  console.log(genderRequirement)
  var matchingResults = studentCollection.find({
    age: {
      $gt: searchRequirement
    },
    gender: {
      $in: genderRequirement
    }
  });
  console.log(matchingResults)
  $("#ageRestriction").val("");
  $("#studenTable").find("tr").remove();
  for (var i = 0; i < matchingResults.length; i++) {
    $("#studenTable").append("<tr>" + "<td class='studentId'>" + matchingResults[i]._id + "</td>" + "<td class=studentname>" + matchingResults[i].name + "</td>" + "<td>" + matchingResults[i].gender + "</td>" + "<td>" + "<button type='button' class='deletestudentbutton btn btn-danger'>" + "DELETE" + "</button>" + "</td>" + "<td>" + "<button type='button' class='editinfobutton btn btn-warning'>" + "EDIT" + "</button>" + "</td> </tr>")
  };
})

$("#ResetButton").click(function() {
  $("#studenTable").find("tr").remove();
  var reset = studentCollection.find()
  for (var i = 0; i < reset.length; i++) {
    $("#studenTable").append("<tr>" + "<td class='studentId'>" + reset[i]._id + "</td>" + "<td class=studentname>" + reset[i].name + "</td>" + "<td>" + reset[i].gender + "</td>" + "<td>" + "<button type='button' class='deletestudentbutton btn btn-danger'>" + "DELETE" + "</button>" + "</td>" + "<td>" + "<button type='button' class='editinfobutton btn btn-warning'>" + "EDIT" + "</button>" + "</td> </tr>")
  };
})



// $($(this).attr("data-id")).parents("tr").find(.studentname).text(updatedStudent.name)




// DB.collection("students").updateById("1", newData);
// var addedstudentname = $(this).text()
// var queryA = {
//   name: addedstudentname
// };
// var addedstudent = studentCollection.find(queryA)[0];
