var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    var html = editHTML(myObj.children);
    document.getElementById("demo").innerHTML = html;
  }
};
xmlhttp.open("GET", "lhea_images/lhea.json", true);
xmlhttp.send();

// func

function editHTML(object){
    var html = "";
    var i;
    for(i=0;i<object.length;i++){
        if (object[i].type == "image"){
            html += imageHTML(object[i].name,"");
        }
        else if(object[i].type == "directory"){
            if (object[i].children[0].type == "image"){
                console.log(object[i]);
                html += imageHTML(object[i].children[0].name, object[i].name);
            }
        }
    }
    console.log(html);
    return html;
}

function imageHTML(object, dir){
    var type = object.split("_")[0];
    var location = dir + "/"+ object;
    var project_link = object.split(".")[0];
    var design_name = object.split(".")[0];

    var html = '<div class="item '+ type +'"><img src="lhea_images/'+ location +'">';
    html += '<div class="overlay"><p><a href="'+ project_link +'.html">';
    html += design_name + '</a> <br> #'+ type +'</p></div></div>';
    return html;
}