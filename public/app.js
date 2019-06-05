
// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    var newsDiv =$("<div>");
    var title =$("<a>");
    var noteButton = $("<button>");
    var saveButton = $("<button>");
    var content = $("<div>");
    var newsImage=$("<img>");
    var link =$("<a>");
    var containerDiv=$("<div>");

    containerDiv.addClass("newsTitle card-header");
    containerDiv.append(title);
    title.addClass("articleTitle");
    title.text(i+1+". "+data[i].title);
    title.attr("data-id",data[i]._id);
    containerDiv.append("<br>");

    $("#articles").append(containerDiv);
    $(containerDiv).append(newsImage);
    newsImage.addClass("articleNewsImage");
    newsImage.attr("src",data[i].pic);
    newsImage.addClass("col-md-4");
    containerDiv.append("<br>");
    
    containerDiv.append(link);
    link.text(data[i].link);
    link.attr("href",data[i].link);
    link.attr("data-id",data[i]._id);
    containerDiv.append("<br>");
    containerDiv.append(noteButton);
    noteButton.addClass("btn btn-warning noteButton");
    noteButton.attr("data-id",data[i]._id);
    noteButton.text("Add Note");
    containerDiv.append(" ");
    containerDiv.append(saveButton);
    saveButton.addClass("saveButton btn btn-primary");
    saveButton.text("Save Article");
    saveButton.attr("data-id",data[i]._id);
  }
});

// Grab the articles as a json
$.getJSON("/savedarticles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    var newsDiv =$("<div>");
    var title =$("<a>");
    var noteButton = $("<button>");
    var deleteButton = $("<button>");
    var content = $("<div>");
    var newsImage=$("<img>");
    var link =$("<a>");
    var containerDiv=$("<div>");

  

    containerDiv.addClass("newsTitle card-header");
    containerDiv.append(title);
    title.addClass("articleTitle");
    title.text(i+1+". "+data[i].title);
    title.attr("data-id",data[i]._id);
    containerDiv.append("<br>");

    $("#savedArticles").append(containerDiv);
    $(containerDiv).append(newsImage);
    newsImage.addClass("articleNewsImage");
    newsImage.attr("src",data[i].pic);
    newsImage.addClass("col-md-4");
    containerDiv.append("<br>");
    
    containerDiv.append(link);
    link.text(data[i].link);
    link.attr("href",data[i].link);
    link.attr("data-id",data[i]._id);
    containerDiv.append("<br>");
    containerDiv.append(noteButton);
    noteButton.addClass("btn btn-warning noteButton");
    noteButton.attr("data-id",data[i]._id);
    noteButton.text("Add Note");
    containerDiv.append(" ");
    containerDiv.append(deleteButton);
    deleteButton.addClass("deleteButton btn btn-danger");
    deleteButton.text("Delete Article");
    deleteButton.attr("data-id",data[i]._id);
  }
});



// Whenever someone clicks a note button
$(document).on("click", ".noteButton", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2 id='articleNoteTitle'>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button class='btn btn-success' data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the save button
$(document).on("click", ".saveButton", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log(thisId);
  
  // Run a POST request to change the saved article, making saved property equals true
  $.ajax({
    method: "POST",
    url: "/save/" + thisId,
    data: {
      //saved: true
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
    });
    
});

$(document).on("click", ".deleteButton", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log(thisId);
  
  // Run a POST request to change the saved article, making saved property equals true
  $.ajax({
    method: "POST",
    url: "/delete/" + thisId,
    data: {
      //saved: false
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      location.reload();
      console.log(data);
    });
    
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});



// Manually done the toggle button in navbar when windows get smaller since it was acting weird on click

var count=0;

$(document).on('click','.navbar-toggler',function(e) {
      //console.log(count % 2 ===0);
       console.log(e.originalEvent.path[1].nextElementSibling.classList[1]==="show");
      // if(e.originalEvent.path[1].nextElementSibling.classList==="collapsing")
      // {
      //   $(navbarNav).addClass('show');
      // }
      if(e.originalEvent.path[1].nextElementSibling.classList[1]!=="show")
      {
      $(navbarText).addClass('show');
      count++;
      }else if(e.originalEvent.path[1].nextElementSibling.classList[1]==="show"){
        $(navbarText).removeClass('show');
        count++;
      }
});