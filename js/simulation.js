$(function() {
  var c=document.getElementById("simulationCanvas");
  var ctx = c.getContext("2d");
    //Initialise
    initialise();

    //Click Events


    function initialise(){
      ctx.font="25px Arial";
      ctx.clearRect(0, 0, c.width, c.height);
      //CPU
      ctx.rect(60, 50, 576, 320);
      //ROM
      ctx.rect(60, 410, 576, 30);
      ctx.fillText("ROM",60,400);
      for (var i = 0; i < 24; i++) {
        ctx.fillStyle="#FF0000";
        ctx.fillRect(60+(i*24), 410, 24, 30);
        ctx.rect(60+(i*24), 410, 24, 30);
      }
      //7-seg
      ctx.font="150px Lucida Console";
      ctx.fillText("0",650, 170);
      ctx.rect(650, 50, 100, 120);
      //Btn
      ctx.rect(650, 410, 60, 70);
      //Reset
      ctx.rect(730, 410, 60, 70);

      ctx.stroke();
    }
});
