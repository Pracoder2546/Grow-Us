const canvas = document.getElementById("particles")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []
let mouse = {x:null,y:null}

window.addEventListener("mousemove", e=>{
mouse.x = e.x
mouse.y = e.y
})

class Particle{
constructor(){
this.x = Math.random()*canvas.width
this.y = Math.random()*canvas.height
this.size = Math.random()*2+1
this.speedX = Math.random()*1-0.5
this.speedY = Math.random()*1-0.5
}

update(){

this.x += this.speedX
this.y += this.speedY

let dx = mouse.x - this.x
let dy = mouse.y - this.y
let distance = Math.sqrt(dx*dx + dy*dy)

if(distance < 120){
this.x -= dx/25
this.y -= dy/25
}

if(this.x < 0) this.x = canvas.width
if(this.x > canvas.width) this.x = 0
if(this.y < 0) this.y = canvas.height
if(this.y > canvas.height) this.y = 0

}


draw(){
ctx.fillStyle="#a64dff"
ctx.beginPath()
ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
ctx.fill()
}
}

function init(){
for(let i=0;i<120;i++){
particles.push(new Particle())
}
}

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach(p=>{
p.update()
p.draw()
})

requestAnimationFrame(animate)
}

init()
animate()