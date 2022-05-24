const express=require('express')
const socket=require('socket.io')

let app=express()
app.set('port', 8080)
let server=app.listen(8080,()=>{
	console.log('listening on port ',app.get('port'));
})
//files
app.use(express.static('public'))
//socket(s) setup

let activeCounter=0 //active users
let ioserver=socket(server)

ioserver.on('connection',(socket)=>{
	activeCounter=Object.keys(ioserver.sockets.sockets).length
	console.log('active sockets',activeCounter)
	
	console.log('started socket',socket.id)

	socket.on('next',(data)=>{
		console.log(`userid ${data.user_id} just finished in ${data.seconds_left} seconds`)
		new_id=selectPlayer(data.user_id)
		console.log('next user id: ',new_id)
		ioserver.sockets.emit('NEXT_PLAYER',{
			user_id:new_id,
			bonus:0
		})
	})
})


function selectPlayer(id){
	console.log('amount of sockets:',activeCounter)
	let next=(id+1)%(activeCounter) //there is already an unexistent socket alive everytime ? maybe I had some page alive in the background
	//IMPORTANT DISCLAIMER: the first player MUST have an userid=0, the second one userid=1, and so on
	//otherwise the modulus operation will not let the player order roll. 
	ioserver.sockets.emit('next',{
		next_id:next,
		bonus:0
	})
	return next
}