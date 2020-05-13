document.addEventListener("DOMContentLoaded", function() { initialize() }, false);

var videoPlayer;
var wrapper;
var progressBar;
var width;
var scroll_left=0;
var scale=5;
var arr=[];

function initialize(){
    videoPlayer=document.getElementById('v-mp4');
    wrapper=document.getElementById('wrapper');
    progressBar=document.getElementById('progress')
    videoPlayer.onloadedmetadata = function() {
        setProgressBarWidth();
    };

    videoPlayer.ontimeupdate=(e)=>{
        var currentTime = videoPlayer.currentTime;
        calculateMargin(currentTime);
    };
    videoProgressHandler()
}

function setProgressBarWidth(){
    //Each division width is 150px
    //scale in seconds
    console.log(videoPlayer.duration)
    width = ( videoPlayer.duration / scale ) * 150;
    let progressBar= document.getElementById('progress')
    progressBar.style.width=width+'px'
    console.log(width)
    addTimers()
}

function toggle(){
    let btn= document.getElementById("play-pause-button");
    if(videoPlayer.paused){
        btn.innerHTML=`<i class="fas fa-pause"></i>`
        videoPlayer.play()
    }
    else{
        btn.innerHTML=`<i class="fas fa-play">`
        videoPlayer.pause()
    }
}

function calculateMargin(currentTime){
    const value=(currentTime*150)/scale
    scroll_left=value
    wrapper.scrollLeft=scroll_left
}


function videoProgressHandler(){
    wrapper.addEventListener('mousedown',()=>{
        if(!videoPlayer.paused){
            toggle()
        }
        arr.length=0
        document.onmousemove=function(e){
            moveProgressBarAndVideo(e.pageX)
        }
        document.onmouseup=function(e){
            console.log(e)
            document.onmousemove=null
            if(videoPlayer.paused){
                toggle()
            }
        }
    },true)
    progress.addEventListener('wheel',(e)=>{
        if(e.deltaY>0){
            scale=scale+5
            setProgressBarWidth()
        }
        else{
            scale=scale-5
            if(scale>=5){
                setProgressBarWidth()
            }
        }
    },false)
}

function moveProgressBarAndVideo(distFromLeft){
    arr.push(distFromLeft)
    if(arr.length==1){
        console.log(arr)
    }
    else{
        const movedDist=arr[0]-arr[1]
        if(scroll_left+movedDist<0){
            scroll_left=0
        }
        else{
            scroll_left=scroll_left+movedDist
        }
        wrapper.scrollLeft=scroll_left
        setCurrentTime()
        arr.shift()   
    }
}

function setCurrentTime(){
    videoPlayer.currentTime=(scale*scroll_left)/150
}

function addTimers(){
    removeElementsByClass('time');
    removeElementsByClass('line');
    const totalDuration=videoPlayer.duration
    const effective=totalDuration-0.600
    const n=parseInt(effective/scale)
    console.log(n)
    for(i=0;i<n;i++){
        let timer=document.createElement('div')
        timer.innerHTML=getTime(i)
        timer.className='time'
        const dist=360+((0.6*150)/scale)+150*i
        timer.style.left=dist+'px'
        wrapper.appendChild(timer)
        addLine(dist)
    }
}

function getTime(i){
    var dt = new Date("May 13, 2020 14:59:55");
    dt.setSeconds( dt.getSeconds() + scale*i );
    return `${dt.getHours()}:${ dt.getMinutes()<10 ? '0'+dt.getMinutes() : dt.getMinutes() }:${dt.getSeconds()<10 ? '0'+dt.getSeconds() : dt.getSeconds()}`
}

function addLine(dist){
    let line=document.createElement('div')
    line.className='line'
    line.style.left=dist+'px'
    wrapper.appendChild(line)
}

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}``