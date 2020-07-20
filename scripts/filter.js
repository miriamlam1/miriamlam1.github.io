// bring up nav script

$(document).ready(function() {
    console.log( "ready!" );
});

var sorting_array = ['everything','interface-design','branding','typography','other'];
var clicked = 'everything';
filtering(clicked);

function filtering_help(element, toDisplay){
    var elems= document.getElementsByClassName(element);
    for (var j=0;j<elems.length;j++){
        elems[j].style.display = toDisplay;
    }
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

$('#everything').click(function (){
    clicked='everything';
    filtering(clicked);
});

$('#interface-design').click(function (){
    clicked='interface-design';
    filtering(clicked);
});

$('#branding').click(function (){
    clicked='branding';
    filtering(clicked);
});

$('#typography').click(function (){
    clicked='typography';
    filtering(clicked);
});

$('#other').click(function (){
    clicked='other';
    filtering(clicked);
});