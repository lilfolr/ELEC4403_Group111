var c = document.getElementById("simulationCanvas");
var log = document.getElementById("log");
var ctx = c.getContext("2d");
var rom = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
var pc = 0;
var cr = 0;
var ar = 0;
var ac = 0;
$(function() {

    //Initialise
    reset_click();
    //Click Events
    c.addEventListener("click", clicked);

    function initialise(){
      ctx.font="22px Arial";
      ctx.fillStyle="#000";
      ctx.clearRect(0, 0, c.width, c.height);
      //CPU
      ctx.rect(60, 50, 576, 320);

      ctx.fillText("PC",130, 85);
      ctx.rect(100, 90, 100, 100);

      ctx.fillText("CR",130, 215);
      ctx.rect(100, 220, 100, 100);

      ctx.fillText("AR",430,85);
      ctx.rect(400, 90, 100, 100);

      ctx.fillText("Accu",430,215);
      ctx.rect(400, 220, 100, 100);

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
        x=i>9?"":"0";
        ctx.fillText(x+i+"",60+(i*24), 460);
      }
      //7-seg
      ctx.rect(650, 50, 100, 120);
    }

    function redraw(){
        ctx.fillStyle="#000";
        ctx.clearRect(100, 90, 100, 100);
        ctx.clearRect(100, 220, 100, 100);
        ctx.clearRect(400, 90, 100, 100);
        ctx.clearRect(400, 220, 100, 100);
        ctx.clearRect(650, 50, 100, 120);
        ctx.rect(100, 90, 100, 100);
        ctx.rect(100, 220, 100, 100);
        ctx.rect(400, 90, 100, 100);
        ctx.rect(400, 220, 100, 100);
        ctx.rect(650, 50, 100, 120);

        ctx.font="150px Lucida Console";
        ac_hex = ac;
        ar_hex = ar;
        if (ac>9){
            ac_hex = String.fromCharCode(65+ac-10);
        }
        if (ar>9){
            ar_hex = String.fromCharCode(65+ar-10);
        }
        //7seg
        ctx.fillText(ac_hex+"",655, 160);
        ctx.font="100px Lucida Console";
        //ACCU
        ctx.fillText(ac_hex+"",425,300);
        //CR
        ctx.fillText(cr+"",125,300);
        //AR
        ctx.fillText(ar_hex+"",425,170);
        //PC
        ctx.fillText(pc+"",125,170);
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
        console.log("Reset");
        rom = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
        pc = 0;
        cr = 0;
        ac = 0;
        ar = 0;
        initialise();
        redraw();
        printROM();
    }

    function rom_clicked(r){
        console.log("ROM "+r+" clicked");
        rom[r] = 1-rom[r];
        if (rom[r]===0){
            ctx.fillStyle="#FF0000"; //Red
        }else{
            ctx.fillStyle="#17ff00"; //Green
        }
        ctx.fillRect(60+(r*24), 410, 24, 30);
        ctx.rect(60+(r*24), 410, 24, 30);
        printROM();
    }

    function printROM(){
        txt="";

        for (var i=0; i<4; i++){
            rom_offset=i*6;
            code = rom[rom_offset]*2+rom[rom_offset+1];
            data = rom[rom_offset+5]*8+rom[rom_offset+4]*4+rom[rom_offset+3]*2+rom[rom_offset+2];
            switch (code) {
                case 0:
                    txt += "LOAD "+data;
                    break;
                case 1:
                    txt += "ADD "+data;
                    break;
                case 2:
                    txt += "LSL";
                    break;
                case 3:
                    txt += "JMP "+data;
                    break;
            }
            txt+="\n"
        }

        $("#log").val(txt);

    }

    function clock_clicked(){
        //01 = Load
        //02 = Add
        //03 = lsl
        //04 = jmp

        var rom_offset = pc*6;
        cr =  rom[rom_offset]*2+rom[rom_offset+1];
        ar = rom[rom_offset+5]*8+rom[rom_offset+4]*4+rom[rom_offset+3]*2+rom[rom_offset+2];
        cr = cr%4;
        ar = ar%16;
        console.log("Code "+cr+" Data "+ar);
        switch (cr) {
            case 0:
                ac = ar;
                break;
            case 1:
                ac = ac + ar;
                break;
            case 2:
                ac = ac << 1;
                break;
            case 3:
                pc = ar-1;
                break;
        }
        ar = ar%16;
        ac = ac%16;
        pc += 1;
        pc = pc%4;
        redraw();
    }
});
