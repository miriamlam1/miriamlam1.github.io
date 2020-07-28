// ALERT: NOT VERY PERFORMANT
// this could all be done statically and not everytime site opens. keeping this just incase

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
        var hashtag = object[i].name.split("_")[0];
        var title =  object[i].name.split("_")[1];
        // images in main folder
        if (object[i].name.includes("cover") && object[i].type == "image"){
            html += imageHTML(object[i],"",hashtag,title);
            make_project_file(object[i],"", title);
        }

        // images in a directory
        else if(object[i].type == "directory"){
            var j;
            make_project_file(object[i], object[i].name, title);
            for(j=0;j<object[i].children.length;j++){
                // look for type cover first then first _cover_ in list
                if (object[i].children[j].type == "cover"){
                    
                    html += imageHTML(object[i].children[j], object[i].name, hashtag, title);
                    break; //dont display multiple of same folder
                }
            }
            //if no cover types found then default to first in list
            if (j==object[i].children.length){ 
                for(j=0;j<object[i].children.length;j++){
                    if (object[i].children[j].name.includes("cover")){
                        html += imageHTML(object[i].children[j], object[i].name, hashtag, title);
                        break;
                    }
                }
            }
        }
    }
    //console.log(html);
    return html;
}


function imageHTML(object, dir, type, title){
    var location = dir + "/"+ object.name;

    //caveat because i used interface and interface design interchangably
    if (type.includes("interface")){
        var aclass = "interface-design";
    } else {
        var aclass = type;
    }
    
    //html to inject for 1 project
    var html = '<div class="item '+ aclass +'"><img src="lhea_images/'+ location +'">';
    html += '<div class="overlay"><p><a href="/projects/'+ title +'.html">';
    html += title + '</a> <br> #'+ type +'</p></div></div>';
    return html;
}

function make_project_file(object, dir, title){
    var location = dir + "/"+ object.name;
    var html = `<!DOCTYPE html>
    <html lang="en">
    <!-- head -->
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Designs by Lhea">
        <meta name="author" content="Lhea Livings">
        <title>lhea.design</title>
        <link rel="stylesheet" href="../css/main.css">
        <link rel="icon" href="../images/tangerine.png">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    </head>
    <!-- body -->
    <body>
        <!-- social media -->
        <ul class="social-media">
            <li><a href="https://www.linkedin.com/in/lhealivings/">
                <img src="../images/icons8-linkedin-100.svg" alt="linkedin" class="linkedin">
            </a></li>
            <li><a href="https://www.behance.net/lhea_design">
                <img src="../images/icons8-behance-100.svg" alt="behance" class="behance">
            </a></li>
            <li><a href="https://www.instagram.com/lhea.design/">
                <img src="../images/icons8-instagram-100.svg" alt="instagram" class="instagram">
            </a></li>
            <li><a href="https://www.pinterest.com/lhea_design/">
                <img src="../images/icons8-pinterest-100.svg" alt="pinterest" class="pinterest">
            </a></li>
        </ul>
    
        <!-- nav -->
        <nav id="navbar">
            <img src="../images/ham.svg" alt="ham" id="menu-icon" class ="hide-desktop">
            <div class="cover hide-mobile"></div>
            <ul class="hide-mobile show-desktop" id="nav-list">
                <li class="underline"><a href="../index.html">Portfolio</a></li>
                <li><a href="../about.html">About</a></li>
                <li><a href="../contact.html">Contact Me!</a></li>
            </ul>
        </nav>
    
        <!-- header -->
        <header>
            <h1 id="toplogo" class="logo"><a href="../index.html">lhea.design
                <img src="../images/tangerine.png" alt="">
            </a></h1>
            <h2>Lhea Livings is a Graphic Designer living and working in St. George, Utah. <br>
            if you're somehow reading this and not lhea, please know this is a work in progress</h2>
        </header>
        <!-- main -->
    
        <div class="project">`;
        // no dir means main folder
            if (dir == ""){
                location = location.replace("_cover_","");
                console.log(location);
                html+= '<img src="../lhea_images/'+location+'" alt="'+title+'">';
            }
        // in a directory, display all children
            else{
                var i;
                for(i=0;i<object.children.length;i++){
                    if (object.children[i].type == "image" && !(object.children[i].name.includes("cover"))){
                        location = dir+'/'+object.children[i].name;
                        html+= '<img src="../lhea_images/'+location+'" alt="'+location+'">';
                    }
                }
            }
            // <img src="images/test.PNG" alt="img">
            html+= `<div class = "bottomtext">
                    <figcaption>`;
            html+='description'; //description
            html+= `</figcaption></div>
            <nav>
            <ul>
                <li class="previous">&lt; Previous</li>
                <li><a href="../index.html">Back to Portfolio</a></li>
                <li class="next">Next &gt;</li>
            </ul>
        </nav>

    </div>
<!-- footer -->
<hr>
<footer>
    <div class="section">
        <div>
            <h1><a href="../index.html">lhea.design</a></h1>
            <!-- social media -->
            <ul class="social-media">
                <li><a href="https://www.linkedin.com/in/lhealivings/">
                    <img src="../images/icons8-linkedin-100.svg" alt="linkedin" class="linkedin">
                </a></li>
                <li><a href="https://www.behance.net/lhea_design">
                    <img src="../images/icons8-behance-100.svg" alt="behance" class="behance">
                </a></li>
                <li><a href="https://www.instagram.com/lhea.design/">
                    <img src="../images/icons8-instagram-100.svg" alt="instagram" class="instagram">
                </a></li>
                <li><a href="https://www.pinterest.com/lhea_design/">
                    <img src="../images/icons8-pinterest-100.svg" alt="pinterest" class="pinterest">
                </a></li>
            </ul>
        </div>
        <div>
            <ul id="personal-info">
                <li><img src="../images/phone.png" alt=""><b>call</b> +1 435 669 7237</li>
                <li><img src="../images/mail.png" alt=""><b>email</b><a href="mailto:hello@lhea.design"> hello@lhea.design</a></li>
                <li><img src="../images/pin.png" alt=""><b>located</b> St.George, Utah, United States</li>
            </ul>
        </div>
        <div>
            <ul id="footer-nav" class="hide-mobile show-desktop">
                <li><a href="../index.html">Portfolio</a></li>
                <li><a href="../about.html">About</a></li>
                <li><a href="../contact.html">Contact Me!</a></li>
            </ul>
        </div>
    </div>
    <div class="copyright">&copy Lhea Livings 2020</div>
</footer>
<script src="../scripts/mobile.js"></script>
<script src="../scripts/projectpages.js"></script>
</body>
</html>`;
    //downloading it
    var blob = new Blob([html], {type: "text/plain;charset=utf-8"});
    //saveAs(blob, title+".html");
}
