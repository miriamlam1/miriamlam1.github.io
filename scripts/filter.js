// bring up nav script
$(document).ready(function() {
    console.log( "ready!" );
});

//the array of topics to filter by
var sorting_array = ['everything','interface-design','branding','typography','other'];

//defaults to show everything
var clicked = 'everything';

function filtering_help(element, toDisplay){
    var elems= document.getElementsByClassName(element);
    for (var j=0;j<elems.length;j++){
        elems[j].style.display = toDisplay;
    }
    //underlining current selected topic
    if (clicked == 'everything'){
        document.getElementById(element).style.textDecoration = 'none';
        document.getElementById(clicked).style.textDecoration = 'underline';
    }
    else if(toDisplay != "none"){ //if its showing, underline it
        document.getElementById(element).style.textDecoration = 'underline';
    }
    else{
        document.getElementById(element).style.textDecoration = 'none';
    }
}

//underlines on hover
function hovercheck(topic){
    $('#'+topic).mouseenter(function (){
        document.getElementById(topic).style.textDecoration = 'underline';
    });
    $('#'+topic).mouseleave(function (){
        document.getElementById(topic).style.textDecoration = 'none';
    });
}

//filter
function filtering(clicked){
    var i;
    for (i=0; i<sorting_array.length; i++){
        if (clicked == 'everything'){
            filtering_help(sorting_array[i],'flex');
        }
        else if (clicked != sorting_array[i]){
            filtering_help(sorting_array[i],'none');
        }
        else if (clicked == sorting_array[i]){
            filtering_help(clicked, 'flex');
        }
    }
}

//checks which button clicked and runs filter
function filteronclick(topic){
    $('#'+topic).click(function (){
        clicked = topic;
        filtering(topic);
    });
    return topic;
}

//main stuff
filtering(clicked);
var i;
for(i=0;i<sorting_array.length;i++){
    clicked = filteronclick(sorting_array[i]);
    if (sorting_array[i]!=clicked){
        hovercheck(sorting_array[i]);
    }
}