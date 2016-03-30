window.onload=function(){
    waterfall("mai","box");
    var dataInt = {"data":[{"src":"1441.jpg"},{"src":"1442.jpg"},{"src":"1443.jpg"},{"src":"1444.jpg"}]};
    window.onscroll = function(){
    	if(checkScrollSlide){
          for(var i=0;i<dataInt.data.length;i++){
          	var parent = document.getElementById("mai");
          	var box = document.createElement("div");
          	box.className="box";
          	parent.appendChild(box);
          	var pic =document.createElement("div");
          	pic.className=("pic");
          	box.appendChild(pic);
            var Img = document.createElement("img");
            Img.src="images/"+dataInt.data[i].src;
            Img.style.overflow="hidden";
            pic.appendChild(Img);
          } 
    	}
    	waterfall("mai","box");
    }
}

function waterfall(parent,box){
    var oParent = document.getElementById(parent);
    var oBoxs = getByclass(oParent,box);
    var oBoxw = oBoxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth/oBoxw);
    oParent.style.cssText = "width:"+oBoxw*cols+"px;margin:0 auto;";
    var hArr = [];
    for(var i=0;i<oBoxs.length;i++){
    	if(i<cols){
    		hArr.push(oBoxs[i].offsetHeight);

    	}else{
			var minH = Math.min.apply(null,hArr);
			var indenx = getMinhIndex(hArr,minH);
           oBoxs[i].style.position="absolute";
           oBoxs[i].style.top = minH+"px";     
           oBoxs[i].style.left=oBoxs[indenx].offsetLeft+"px";
           //console.log(minH);
           hArr[indenx] += oBoxs[i].offsetHeight;
		}
    }
   
   console.log(hArr);
}
function getByclass(parent1,clsName){
	var boxArr = [];
	var oElement = parent1.getElementsByTagName("*");
	for(var i=0;i<oElement.length;i++){
		if(oElement[i].className==clsName){
			boxArr.push(oElement[i]);
		}
	}
	return boxArr;
}

function getMinhIndex(arr,val){
	for(var i in arr){
      if(arr[i]==val){
      	return i;
      }
	}
}

function checkScrollSlide(){
	var oParent = document.getElementById("mai");
	var oBoxs = getByclass(oParent,"box");
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length].offsetHeight/2);	
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	//console.log(height);
    return(lastBoxh<scrollTop+height)?true : false;
}