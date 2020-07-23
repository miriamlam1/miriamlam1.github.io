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
        if (object[i].name.includes("cover") && object[i].type == "image"){
            var hashtag = object[i].name.split("_")[0];
            html += imageHTML(object[i].name,"",hashtag);
        }
        else if(object[i].type == "directory"){
            var j;
            for(j=0;j<object[i].children.length;j++){
                // look for type cover first then first _cover_ in list
                if (object[i].children[j].type == "cover"){
                    var hashtag = object[i].name.split("_")[0];
                    html += imageHTML(object[i].children[j].name, object[i].name, hashtag);
                    break; //dont display multiple of same folder
                }
            }
            //if no cover types found then default to first in list
            if (j==object[i].children.length){ 
                for(j=0;j<object[i].children.length;j++){
                    if (object[i].children[j].name.includes("cover")){
                        var hashtag = object[i].name.split("_")[0];
                        html += imageHTML(object[i].children[j].name, object[i].name, hashtag);
                        break;
                    }
                }
            }
        }
    }
    //console.log(html);
    return html;
}

function imageHTML(object, dir, type){
    var location = dir + "/"+ object;
    var project_link = object.split(".")[0];
    var design_name = object.split(".")[0];

    //caveat because i used interface and interface design interchangably
    if (type.includes("interface")){
        var aclass = "interface-design";
    } else {
        var aclass = type;
    }

    var html = '<div class="item '+ aclass +'"><img src="lhea_images/'+ location +'">';
    html += '<div class="overlay"><p><a href="'+ project_link +'.html">';
    html += design_name + '</a> <br> #'+ type +'</p></div></div>';
    return html;
}