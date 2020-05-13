document.addEventListener("DOMContentLoaded", function() { initialize(); }, false);

var videoPlayer;
var wrapper;
var width;
var scroll_left=0;
var scale=30;
var arr=[];
function initialize(){
    videoPlayer=document.getElementById('v-mp4');
    wrapper=document.getElementById('wrapper');
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
    const totalDuration=videoPlayer.duration
    const effective=totalDuration-0.600
    const n=parseInt(effective/scale)
    console.log(n)
    for(i=0;i<n;i++){
        if(i==0){
            let timer=document.createElement('div')
            const time=`14:59:55`
            timer.innerHTML=time
            timer.className='time'
            timer.style.left=360+((0.6*150)/scale)+'px'
            wrapper.appendChild(timer)
        }
        else{
            let timer=document.createElement('div')
            timer.innerHTML=getTime(i)
            timer.className='time'
            timer.style.left=360+((0.6*150)/scale)+150*i+'px'
            wrapper.appendChild(timer)
        }
    }
}

function getTime(i){
    var dt = new Date("May 13, 2020 14:59:55");
    dt.setSeconds( dt.getSeconds() + scale*i );
    return `${dt.getHours()}:${ dt.getMinutes()<10 ? '0'+dt.getMinutes() : dt.getMinutes() }:${dt.getSeconds()<10 ? '0'+dt.getSeconds() : dt.getSeconds()}`
}