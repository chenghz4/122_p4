/**
 * This example is following frontend and backend separation.
 *
 * Before this .js is loaded, the html skeleton is created.
 *
 * This .js performs three steps:
 *      1. Get parameter from request URL so it know which id to look for
 *      2. Use jQuery to talk to backend API to get the json data.
 *      3. Populate the data to correct html elements.
 */


/**
 * Retrieve parameter from request URL, matching by parameter name
 * @param target String
 * @returns {*}
 */
function getParameterByName(target) {
    // Get request URL
    let url = window.location.href;
    // Encode target parameter name to url encoding
    target = target.replace(/[\[\]]/g, "\\$&");

    // Ues regular expression to find matched parameter value
    let regex = new RegExp("[?&]" + target + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';

    // Return the decoded parameter value
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * Handles the data returned by the API, read the jsonObject and populate data into html elements
 * @param resultData jsonObject
 */

function handleResult(resultData) {

    console.log("handleResult: populating star info from resultData");

    // populate the star info h3
    // find the empty h3 body by id "star_info"
    let starInfoElement = jQuery("#star_info");

    // append two html <p> created to the h3 body, which will refresh the page
    starInfoElement.append("<p>Movie Name: " + resultData[0]["movie_title"] + "</p>");

    console.log("handleResult: populating movie table from resultData");

    // Populate the star table
    // Find the empty table body by id "movie_table_body"
    let movieTableBodyElement = jQuery("#movie_table_body");

    // Concatenate the html tags with resultData jsonObject to create table rows
    for (let i = 0; i <  resultData.length; i++) {
        let rowHTML = "";
        rowHTML += "<tr>";
        let n=resultData[i]["s.id"].split(",").length;
        rowHTML += "<th>" + (i+1) + "</th>";
        rowHTML += "<th>" + resultData[i]["movie_title"] + "</th>";
        rowHTML += "<th>" + resultData[i]["movie_year"] + "</th>";
        rowHTML += "<th>" + resultData[i]["movie_director"] + "</th>";
        rowHTML += "<th>" + resultData[i]["rating"] + "</th>";
        rowHTML +=
            "<th>" + resultData[i]["list_g"] +     "</th>";

        rowHTML +="<th>";
        for (let j = 0; j < n-1; j++) {


                rowHTML +=

                    // Add a link to single-star.html with id passed with GET url parameter
                    '<a href="single-star.html?id=' + resultData[i]["s.id"].split(",")[j] + '">'
                    + resultData[i]["list_s"].split(",")[j] + ", "     // display star_name for the link text
                '</a>';

        }
        rowHTML +=

            // Add a link to single-star.html with id passed with GET url parameter
            '<a href="single-star.html?id=' + resultData[i]["s.id"].split(",")[n-1] + '">'
            + resultData[i]["list_s"].split(",")[n-1] + ""     // display star_name for the link text
        '</a>';


        rowHTML +="</th>";

        rowHTML +=
            "<th>" +
            // Add a link to single-star.html with id passed with GET url parameter
            '<a href="cart.html?id=' + resultData[i]['movie_id'] + '">'
            +"Add to cart" +     // display star_name for the link text
            '</a>' +
            "</th>";

        rowHTML += "</tr>";

        // Append the row created to the table body, which will refresh the page
        movieTableBodyElement.append(rowHTML);
    }

    let space="";
    space +="<tr>";
    space +="<th>";
    space +="</th>";
    space +="</tr>";
    movieTableBodyElement.append(space);
    let goback = "";


    goback +="<tr>";
    goback +="<th>";
    goback +="</th>";
    goback +="<th>";
    goback +="</th>";
    goback +="<th>";
    goback +="</th>";
    goback +="<th>";
    goback +="</th>";
    goback +="<th>";
    goback +="</th>";
    goback +="<th>";
    goback +="</th>";
    goback +=
        "<th style='color: crimson'>" +
        // Add a link to single-star.html with id passed with GET url parameter
        '<a href= "javascript:history.go(-1);">'
        + "Go Back" +     // display star_name for the link text
        '</a>' +
        "</th>";
    goback += "</tr>";
    goback +="<tr>";
    goback +="<th>";
    goback +="</th>";
    goback +="<th>";
    goback +="</th>";
    goback +="<th>";
    goback +="</th>";
    goback +="<th>";
    goback +="</th>";
    goback +="<th>";
    goback +="</th>";
    goback +="<th>";
    goback +="</th>";
    goback +=
        "<th style='color: crimson'>" +
        // Add a link to single-star.html with id passed with GET url parameter
        '<a href= "Main.html">'
        + "Go Back to search page" +     // display star_name for the link text
        '</a>' +
        "</th>";
    goback += "</tr>";

    // Append the row created to the table body, which will refresh the page
    movieTableBodyElement.append(goback);




    // Append the row created to the table body, which will refresh the page

}

/**
 * Once this .js is loaded, following scripts will be executed by the browser\
 */

// Get id from URL
let starId = getParameterByName('id');

// Makes the HTTP GET request and registers on success callback function handleResult
jQuery.ajax({
    dataType: "json",  // Setting return data type
    method: "GET",// Setting request method
    url: "api/single-movie?id=" + starId, // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleResult(resultData) // Setting callback function to handle data returned successfully by the SingleStarServlet
});