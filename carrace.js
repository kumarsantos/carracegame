const score=document.querySelector('.score');
const startscreen=document.querySelector('.startscreen');
const gamearea=document.querySelector('.gamearea');

let keys={ArrowUp : false, ArrowDown : false,ArrowLeft : false, ArrowRight : false}
////////////////////////////////////////////////////
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
startscreen.addEventListener('click',Start);

////////////////////////////////////////////////////
let player={ speed:3,score:0};
/////////////////////////////////////////
function keyDown(e)
{
  e.preventDefault();
  keys[e.key] = true;
  // console.log(e.key);
  // console.log(keys);
}
////////////////////////////////////
function keyUp(e)
{
  e.preventDefault();
  keys[e.key] = false;
  // console.log(e.key);
  // console.log(keys);
}
///////////////////////////////////////////////////////////
function iscollide(a,b){
  aRect=a.getBoundingClientRect();
  bRect=b.getBoundingClientRect();
  return !((aRect.top>bRect.bottom) || (aRect.left>bRect.right)||(aRect.right<bRect.left)||(aRect.bottom<bRect.top))
}
////////////////////////////////////////////////////////////
function moveLines(){

  let lines=document.querySelectorAll('.lines');

  lines.forEach(function(val){
    if(val.y>=530){
      val.y-=630;
    }   
    val.y+=player.speed;
    val.style.top=val.y+"px";
  //   console.log(val);
  //   console.log(val.y);
  })
}

//////////////////////////////////////////////////
function endGame(){
   player.start=false;
   startscreen.classList.remove('hide');
   startscreen.innerHTML=`Game Over Your Total Score is: ${player.score+1}<br>press here to play again !!!`;
}

//////////////////////////////////////////////////
function moveEnemy(car){
  let enemy=document.querySelectorAll('.enemy');
  enemy.forEach(function(val){
///////////////////////////
    if(iscollide(car,val)){
      // console.log("boom hit");
      endGame();
    }
//////////////////////////
    if(val.y>=530)
    {
      val.y-=900;
      val.style.left=Math.floor(Math.random()*350) + "px";
    }
 /////////////////////////     
    val.y+=player.speed;
    
    if(player.score<=1500)
    val.y=val.y+(player.speed+1);//after 2000 increasing speed
    else if(player.score<=3000)
    val.y=val.y+(player.speed+2);//after 5000 increasin speed
    else if(player.score<=8000)
    val.y=val.y+(player.speed+3);

    val.style.top=val.y+"px";
  
  })
}

//////////////////////////////////////////////////////////////////////
function gamePlay(){

  // console.log("hey");
  let car=document.querySelector('.car');
  let road=gamearea.getBoundingClientRect();
  // console.log(road);
  car.style.top=player.y+"px";
  car.style.left=player.x+"px";
//////////////////////////
  if(player.start)
  {
    moveLines();
    moveEnemy(car);
    if(keys.ArrowUp && player.y>70){player.y-=player.speed}
    if(keys.ArrowDown && player.y<553){player.y+=player.  speed}
    if(keys.ArrowLeft && player.x>0){player.x-=player.speed}
    if(keys.ArrowRight && player.x<350){player.x+=player. speed}
    window.requestAnimationFrame(gamePlay);
    // console.log(player.score++);
    player.score++;
    score.innerText="Your Total Score is :"+player.score;
  }   
}
////////////////////////////////////////////////
function randomColor(){
  function d(){
    let hex=Math.floor(Math.random()*256).toString(16);
    return ("0"+String(hex)).substr(-2);
  }
  return "#"+d()+d()+d();
}

//////////////////////////////////////////////////////////////////////
function Start()
{
  // gamearea.classList.remove('hide');
  startscreen.classList.add('hide');
  score.classList.remove("hide");
  gamearea.innerHTML="";

  player.start=true;
  player.score=0;

  window.requestAnimationFrame(gamePlay);
  //////////////////////////////////////////////
  for(i=0;i<5;i++)
  {
  let roadline=document.createElement('div');
  roadline.setAttribute('class','lines');
  roadline.y=(i*130);
  roadline.style.top=(i*130)+"px";
  gamearea.appendChild(roadline);
  }
///////////////////////////////////////////////////
  let car=document.createElement('div');
  car.setAttribute('class','car');
// car.innerHTML="Hey this is your car";
  gamearea.appendChild(car);
//////////////////////////////////////
  player.x=car.offsetLeft;
  player.y=car.offsetTop
// console.log(player.x);
// console.log(player.y);
for(i=0;i<3;i++)
{
  let enemycar=document.createElement('div');
  enemycar.setAttribute('class','enemy');
  enemycar.y=((i+1)*350)-1;
  enemycar.style.top=enemycar.y+"px";
  enemycar.style.backgroundColor=randomColor();
  // enemycar.style.background="blue";
  enemycar.style.top=(i*130)+"px";
  enemycar.style.left=Math.floor(Math.random()*350) + "px";
  gamearea.appendChild(enemycar);
}
}


