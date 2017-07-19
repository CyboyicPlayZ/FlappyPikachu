
var registerScore;
var score;
var firstPlace = 0;
var secondPlace = 0;
var thirdPlace = 0;




jQuery("#credits").on("click", function() {
jQuery("#credits").append(

"<p>" + message + "</p>"
);
});

jQuery("#scoresbtn").on("click", function() {
jQuery("#content").empty();
jQuery("#content").append(

"<ul>" +
"<li>" + "1st - Me" + "</li>" +
"<li>" + "2nd - Also me" + "</li>" +
"<li>" + "3rd - Me again (I am the Best)" + "</li>" +
"</ul>"
);
});

jQuery("#creditsbtn").on("click", function() {
jQuery("#content").empty();
jQuery("#content").append(

"<div>" + "Game created by the Russian beast Demyan!" + "</div>"
);
});

jQuery("#helpbtn").on("click", function() {
jQuery("#content").empty();

jQuery("#content").append(

  "<ul>"+
  "<li>" + "Press SPACE to flap your wings" + "</li>" +
  "<li>" + "Avoid the incoming pipes" + "</li>" + "</ul>"

  );
});

function registerScore(){
  if (score > firstPlace){
    firstPlace = score;
    jQuery (".gold") .empty();
    jQuery (".gold") .append(
      "<p>" + score + "</p>");
    }

  else if (score > secondPlace){
    secondPlace = score;
    jQuery (".silver") .empty();
    jQuery (".silver") .append(
    "<p>" + score + "</p>");
    }

  else if (score > thirdPlace){
    thirdPlace = score;
    jQuery (".bronze") .empty();
    jQuery (".bronze") .append(
      "<p>" + score + "</p>");
    }
}
