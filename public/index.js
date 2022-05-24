window.onload=()=>{
    // socket handler
    //server_ip_lan="192.168.39.166" //olga_house
    //server_ip_lan="192.168.1.12" //mami_house
    //server_ip_lan="192.168.43.122" //redmiphone
    server_ip_lan="10.1.211.85" //mami_house
    socket=io.connect(server_ip_lan+":8080",{reconnection: false})
    //internal vars
    id=1

    //gui
    min=document.getElementById('m')
    seg=document.getElementById('s')

    userid=document.getElementById('userid')
    restart_b=document.getElementById('restart-btn')
    main_b=document.getElementById('main-btn')
    main_thread=undefined
    playing_state=false

    //internal management and emit's
    main_b.addEventListener('click',(event)=>{
        id=parseInt(userid.value)
        if(playing_state){
            stop()
            window.main_b.style="background-color: var(--bg-color);"
            socket.emit('next',{
                user_id:id,
                seconds_left:getValues().total,
                penalization:0
            })
            restoreTime()
            playing_state=false
        }
        else{
            play()
            window.main_b.style="background-color: var(--bg-color);"
        }
    })

    userid.addEventListener('keydown',(event)=>{
        if (event.key === 'Enter') {
            id=parseInt(userid.value)
            userid.style="border-bottom: none;"
            socket.emit('loggedin',{
                user_id:id,
            })
        }
        else{
            userid.style="border-bottom: solid black;"
        }
    })

    restart_b.addEventListener('click',(event)=>{
        stop()
        restoreTime()
        window.main_b.style="background-color: var(--bg-color);"
    })

    //START TIMER IN 0 MIN 5 SEG
    MASTER_MIN=0
    MASTER_SEG=10
    // IS_ME=true
    restoreTime()
    
    //server listeners
    socket.on('NEXT_PLAYER',(data)=>{
        if (data.user_id==id){
            play(1)
        }
        // else{
        //     play(0)
        //     IS_ME=false
        // }
    })
}

function timerInterface(){
    changeTime()
}

function restoreTime(){
    setValues(
        window.MASTER_MIN,
        window.MASTER_SEG
        )
}

function changeTime(){
    s=getValues().s
    m=getValues().m
    console.log('min ',m,' seg ',s)
    if(s==0 && m==0){
        stop()
        restoreTime()
        socket.emit('next',{
            user_id:id,
            seconds_left:0,
            penalization:0
        })
        window.main_b.style="background-color: var(--bg-color);"
    }
    else {
        if(s==0){
            setValues(m-1,59)
        }else {
            if(s<=60 || s>0){
                setValues(undefined,s-1)
                if(s<=5){
                    window.main_b.style="background-color: var(--warning-color);"
                }
            }
        }
    }
}

function setValues(m,s){
    if(m!=undefined) window.min.innerHTML=m;
    if(s!=undefined) window.seg.innerHTML=s;
}

function getValues(){
    auxm=parseInt(window.min.innerHTML)
    auxs=parseInt(window.seg.innerHTML)
    return {
        m:auxm,
        s:auxs,
        total:auxs+(60*auxm)
    }
}

function stop(){
    clearInterval(window.main_thread)
}

function play(color){
    stop()
    window.main_thread=setInterval(timerInterface, 1000)
    window.playing_state=true
    if(color){
        window.main_b.style="background-color: var(--active-color);"
    }
    else{
        window.main_b.style="background-color: var(--bg-color);"
    }
}
