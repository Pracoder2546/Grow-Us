const canvas = document.getElementById("particles")
if(canvas){
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []

class Particle{
constructor(){
this.x = Math.random()*canvas.width
this.y = Math.random()*canvas.height
this.size = Math.random()*2
this.speedX = Math.random()*0.5-0.25
this.speedY = Math.random()*0.5-0.25
}
update(){
this.x += this.speedX
this.y += this.speedY
}
draw(){
ctx.fillStyle="#30363d"
ctx.beginPath()
ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
ctx.fill()
}
}

for(let i=0;i<80;i++) particles.push(new Particle())

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height)
particles.forEach(p=>{p.update();p.draw()})
requestAnimationFrame(animate)
}

animate()
}

window.userRole = data.role;

// ENABLE BUTTON
document.getElementById("exploreBtn").disabled = false;

window.explore = function(){

  console.log("ROLE:", window.userRole);

  if(window.userRole === "investor"){
    window.location.href = "investor.html";
  }
  else if(window.userRole === "startup"){
    window.location.href = "startup.html";
  }
  else{
    alert("Please complete your profile first ⚠️");
  }

};
