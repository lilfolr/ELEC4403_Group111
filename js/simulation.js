var c=document.getElementById("simulationCanvas");
var ctx = c.getContext("2d");
var rom = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
$(function() {

    //Initialise
    initialise();

    //Click Events
    c.addEventListener("click", clicked);

    function initialise(){
      ctx.font="22px Arial";
      ctx.fillStyle="#000";
      ctx.clearRect(0, 0, c.width, c.height);
      //CPU
      ctx.rect(60, 50, 576, 320);
      //Clock
      ctx.fillText("Clock",650, 400);
      ctx.rect(650, 410, 60, 70);
      //Reset
      ctx.fillText("Reset",730, 400);
      ctx.rect(730, 410, 60, 70);
      //ROM
      ctx.rect(60, 410, 576, 30);
      ctx.fillText("ROM",60,400);
      ctx.font="18px Arial";
      for (var i = 0; i < 24; i++) {
        ctx.fillStyle="#FF0000";
        ctx.fillRect(60+(i*24), 410, 24, 30);
        ctx.rect(60+(i*24), 410, 24, 30);
        ctx.fillStyle="#000";
        ctx.fillText(i+"",60+(i*24), 460);
        
      }
      
      //7-seg
      ctx.font="150px Lucida Console";
      ctx.fillText("0",660, 160);
      ctx.rect(650, 50, 100, 120);
      ctx.stroke();
    }

    function clicked(event){
        var x = event.offsetX;
        var y = event.offsetY;
        //Figure out what was clicked:
        //ROM; Clock; Reset
        if (y>=410 && y<=480){
            //Clock
            if (x>=650 && x<=710)
                clock_clicked();
            else if(x>=730 && x<=790)
                reset_click();
            else if (y<=440)
            {
                if (x>=60 && x<=636)
                {
                    //ROM Clicked:
                    var rom_number = Math.floor((x-60)/24);
                    rom_clicked(rom_number);
                }
            }
        }
        ctx.stroke();
    }

    function reset_click(){
        console.log("Reset clicked");
        rom = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
        initialise();
    }

    function rom_clicked(r){
        console.log("ROM "+r+" clicked");
        rom[r] = 1-rom[r]
        if (rom[r]==0){
            ctx.fillStyle="#FF0000"; //Red
        }else{
            ctx.fillStyle="#17ff00"; //Green
        }
        ctx.fillRect(60+(r*24), 410, 24, 30);
        ctx.rect(60+(r*24), 410, 24, 30);
    }

    function clock_clicked(){
        console.log("Clock clicked");

    }
});
