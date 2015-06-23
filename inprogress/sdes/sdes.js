function encode(){
    var rawinput = $('textarea#userInputText').val();
    var rawkey = $('#key').val();

    bininput = toBinary(rawinput);
    p10KeyK1 = P10(rawkey);
    
    $('#inputBinary').html(bininput);
    
    /** Key Generation Function Calls **/
     $('#keysP10').html(p10KeyK1);
    
    var lsKeyK1 = P10LS_1(p10KeyK1);
    $('#keysK1P10LS').html(lsKeyK1);

    var k1 = P8(lsKeyK1);
    $('#keysP8K1').html(k1);

    
    var lsKeyK2 = P10LS_2(lsKeyK1);
    $('#keysK2P10LS').html(lsKeyK2);
    
    var k2 = P8(lsKeyK2);
    $('#keysP8K2').html(k2);

    IP = IPAll(bininput);
    $('#IP').html(IP);
}

/** Key Generation Functions **/

function toBinary(input){
    var output= "";
    var temp= "";
    var padded= "";
    
    for (var i=0; i < input.length; i++) {
        padded="";
        temp = input[i].charCodeAt(0).toString(2);
        for (var j=0; (temp.length + j) < 8; j++) {
               padded+="0";
        }
        output=output+padded+temp;
    }    
    return output;
}


function P10(tenBits){
    try {
        if (tenBits.length != 10) throw "not 10 bits";
        else{
            var p10Shifted = tenBits[2]+tenBits[4]+tenBits[1]+tenBits[6]+tenBits[3]+tenBits[9]+tenBits[0]+tenBits[8]+tenBits[7]+tenBits[6];
            return p10Shifted;
        }
    }
    catch(err){
        console.log(err);
    }
}

function P10LS_1 (tenBits){
    var ls = tenBits[1]+tenBits[2]+tenBits[3]+tenBits[4]+tenBits[0]+tenBits[6]+tenBits[7]+tenBits[8]+tenBits[9]+tenBits[5];
    return ls;
}


function P8(tenBits){
    var p8Shifted = tenBits[5]+tenBits[2]+tenBits[6]+tenBits[3]+tenBits[7]+tenBits[4]+tenBits[9]+tenBits[8];
    return p8Shifted;
}


function P10LS_2 (tenBits){
    //Two circular left shifts of ten bits
    var ls2 =  tenBits;
    //Two left shift of set of 5 bits
    var ls22 = ls2.slice(2,5)+ls2.slice(0,2)+ls2.slice(7,10)+ls2.slice(5,7);
    return ls22;
}
    
/** IP Functions **/
function IP8 (eightBits){
    var ip8 = eightBits[1]+eightBits[5]+eightBits[2]+eightBits[0]+eightBits[3]+eightBits[7]+eightBits[4]+eightBits[6];   
    return ip8;
}

function IP8_1 (eightBits){
    var ip8_1 = eightBits[3]+eightBits[0]+eightBits[2]+eightBits[4]+eightBits[6]+eightBits[1]+eightBits[7]+eightBits[5];
    return ip8_1;
}

function IPAll (binInput){
    var ip = "";
    var i = 0;
    
    for (i = 0; i < binInput.length; i = i+8) {
        ip = ip + IP8(binInput.slice(i,i+9));
        console.log(ip);
        console.log(binInput.slice(i,i+9));
    }
    return ip;
}

/** K Functions **/
