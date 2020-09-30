// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

// API URL
let urlAddress = 'api/Tutorials';

// Function to Display Data in Tabular Structure and collect from API
function loadDetails() {
    // Generate AJAX request for collecting All Tutorial Details
    $.ajax({
        type: "GET",
        url: urlAddress,
        cache: false,
        success: function (data) {
            // Capture the reference of Table Body present in Home Page
            const tableBody = $("#tutorial_data");

            $(tableBody).empty(); // Empty the content of Previous Table Body 

            if (data.length == 0) { // If there is no data present
                // Prepare a row for display no data
                const tr = $("<tr></tr>")
                    .append('<td colspan="5" align="center">There is No Tutorial Data</td>');
                // Add table row in table body
                tr.appendTo(tableBody);
            } else {
                // Iterate all JSON tutorial json present in data
                $.each(data, function (key, item) {
                    // prepare a row with table column with data 
                    const tr = $("<tr></tr>")
                        .append($("<td></td>").text(item.tutorialTitle))
                        .append($("<td></td>").text(item.description))
                        .append($("<td></td>").text(item.price))
                        .append($("<td></td>").append('<button class="btn btn-primary" data-toggle="modal" data-target="#update">Edit Details</button>')
                            .on("click", function () {
                                // Call fetch Tutorial For getting data for edit the details
                                fetchTutorial(item.tutorialID);
                            })
                        )
                        .append($("<td></td>").append('<button class="btn btn-danger">Delete</button>')
                            .on("click", function () {
                                // Call Delete Tutorial Function For Removing Tutorial Details
                                deleteTutorial(item.tutorialID);
                            })
                    );
                    // Add The table row at the end of table body
                    tr.appendTo(tableBody)
                });
            }
        }
    });
}

// Function used to collect information, call the API for INsertion
function addTutorial() {
    // Collect Form Details
    let title_value = $('#title').val();
    let price_value = parseInt($('#price').val());
    let description_value = $('#description').val();

    // Prepare JSON data for storing 
    let tutorial = {
        tutorialtitle: title_value,
        price: price_value,
        description: description_value
    };

    // Request the API for Insertion
    $.ajax({
        type: "POST",
        url: urlAddress,
        data: JSON.stringify(tutorial),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        // Display the appropriate message 
        $("#result").html("Tutorial Added in System");
        // Call to again Load the Data for displaying
        loadDetails();
    }).fail(function (xhr, status) {
        // Display the appropriate message 
        $("#result").html("There is Failure in Tutorial Insertion.");
    });
}

// Function to call API for Updation
function updateTutorial() {
    // Collect the Form Details
    let title_value = $('#title_edit').val();
    let price_value = parseInt($('#price_edit').val());
    let description_value = $('#description_edit').val();
    let tutorial_id = parseInt($("#tutorial_id").val());

    // Prpeare JSON Data
    let tutorial = {
        id: tutorial_id,
        tutorialid: tutorial_id,
        tutorialtitle: title_value,
        price: price_value,
        description: description_value
    };

    // Generate API request for Updating the Record
    $.ajax({
        type: "PUT",
        url: urlAddress + "/" + $('#tutorial_id').val(),
        data: JSON.stringify(tutorial),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        // Display the appropriate message 
        $("#resultUpdate").html("Tutorial Details are Updated");
        // Call to load details on page
        loadDetails();
    }).fail(function (xhr, status) {
        // Display the appropriate message 
        $("#resultUpdate").html("There is Failure in Tutorial Updation.");
    });
}

// Function to call API for Delete the Record
function deleteTutorial(id) {
    // Display a confirm message before generating request of delete
    let result = confirm("Are You Sure to Remove This Tutorial Details?");

    if (result) {
        // Generate Request of API for Delete the Tutorial Details
        $.ajax({
            type: "DELETE",
            url: urlAddress + "/" + id,
        }).done(function (response) {
            // Again Load the Table Data for Display
            loadDetails();
        });
    }
}

// Function to generate request based upon tutorial id
function fetchTutorial(id) {
    $.ajax({
        type: "GET",
        url: urlAddress + "/" + id,
        contentType: "application/json"
    }).done(function (detail) {
        // Update the Form data for edit tutorial details
        $('#tutorial_id').val(detail.tutorialID);
        $('#title_edit').val(detail.tutorialTitle);
        $('#description_edit').text(detail.description);
        $('#price_edit').val(detail.price);
    });
}