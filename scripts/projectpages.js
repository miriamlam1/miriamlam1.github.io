// forward and next page

url_list = ['AirCare.html',            'eSports.html',      'RuleTheRift.html',
    'AnimalCrossing.html',     'GamerPlanet.html',  'Subscription.html',
    'BlastFromThePast3.html',  'GamingCon.html',    'TrailblazerGaming.html',
    'deconstructed.html',      'Inflate.html',      'UEL.html',
    'DrugsForDummies.html',    'ModularType.html',  'UWENflyer.html',
    'English3010.html',        'RioOlympics.html',  'Zine.html'];


var current_url = window.location.href.split("/");
current_url = current_url[current_url.length-1].toString();
console.log("curr url " + current_url);

var i = url_list.indexOf(current_url);
console.log("i "+i);

$('.previous').click(function (){
    if (i-1 <= 0){
        location.href = url_list[url_list.length-1];
    }
    else{
        location.href = url_list[i-1];
    }
});

$('.next').click(function (){
    if (i+1 >= url_list.length-1){
        location.href = url_list[0];
    }
    else{
        location.href = url_list[i+1];
    }
});