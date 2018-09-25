//FUNCTION FOR FINAL PAGE BUTTONS 

// ===================================

//function for buttons pressed on the Leaderboard page

//'buttonPressed' should be the "data-attribute", or something similar, to that of the corresponding "scoring metric" in question

//'buttonPressedSQL' is for the parallel variable, as to 'buttonPressed', but is in the EXACT form as in database

function leaderboardDisplay(buttonPressedSQL, buttonPressed ) {

    connection.connect(function(err) {

        if(err) throw err;


        var sqlQuery = "SELECT captain_name, ship_name, scrap_amount, crew_hp, proficiency_points FROM game_Log ORDER BY " + buttonPressedSQL + " DESC LIMIT 5";
    

        connection.query(sqlQuery, function(err, results) {

            //constructing the table view of the leaderboard

            var htmlTable = "<table id='leaderboard'>"

            //table headers

            htmlTable += "<tr> <th> Rank </th> <th> Captain Name </th> <th> " + buttonPressed + " </th> </tr>";

            //variable to establish rank
    
            var placementNumber = 0;

            //For loop for going through

            for (var i = 0; i < results.length; i++) {

                placementNumber++;

                htmlTable += "<tr>"

                //entering rank into 1st column

                htmlTable += "<td>" + placementNumber + "</td>";

                //entering captain's name into 2nd column 

                htmlTable += "<td>" + results[i].captain_name + "</td>";

                //entering score amount into final column (might need to fix, as "buttonPressed" is a 'dynamic variable')

                htmlTable += "<td>" + results[i].buttonPressedSQL + "</td>";

                //close the table row after making row
                htmlTable += "</tr>"
            }

            // closing table
            htmlTable += "</table>";

            // Finally we send the user the HTML file we dynamically created.
            //if doesn't work properly, consider 'traditionally' inserting table into HTML
            res.send(htmlTable);
    
        });
    });

}

//function for buttons clicked in the scenerio

//should be "updating" the various stats, per user's "id"

function scenerioButton () {
}

// SELECT captain_name, ship_name, scrap_amount, crew_hp, proficiency_points FROM game_Log ORDER BY scrap_amount* DESC;

    // could make this a variable per the button being clicked
//


//fix export? (appears as "void");

module.exports = {
    leaderboardDisplay: leaderboardDisplay,
    scenerioButton: scenerioButton    
}