const regExpEnter = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;

let inputForm = document.querySelector('.input-form');
let outputForm = document.querySelector('.output-form');
let inputIp = document.querySelector('#ipAddress');
let inputMask = document.querySelector('#ipMask');
let ipError = document.querySelector('#error-label1');
let ipError2 = document.querySelector('#error-label2');
let button2 = document.querySelector('#button2');


inputForm.addEventListener ('submit', function(event) {
    event.preventDefault();
    let ipAddress = inputIp.value;
    let ipMask = inputMask.value;
    let error = 0;


    if (!regExpEnter.test(ipAddress)) {
        inputIp.classList.add('input-box__input--error');
        document.querySelector('#label1').classList.add('input-box__label--error')
        ipError.style.display = 'block';
        ipError.innerHTML = 'Некорректный адрес IP';
        error += 1;
    } else {
        ipError.style.display = 'none';
        inputIp.classList.remove('input-box__input--error');
        document.querySelector('#label1').classList.remove('input-box__label--error')
        error -= 1;
    }

    if (error < 0) {
        inputForm.style.display = 'none';
        outputForm.style.display = 'block';
    }

    let arrayIp = ipAddress.split('.');
    let intAddress1 = parseInt(arrayIp[0], 10);
    let intAddress2 = parseInt(arrayIp[1], 10);
    let intAddress3 = parseInt(arrayIp[2], 10);
    let intAddress4 = parseInt(arrayIp[3], 10);

    let strAddress1 = intAddress1.toString(2);
    let strAddress2 = intAddress2.toString(2);
    let strAddress3 = intAddress3.toString(2);
    let strAddress4 = intAddress4.toString(2);

    let binIp = (valid(strAddress1) + "." + valid(strAddress2) + "." + valid(strAddress3) + "." + valid(strAddress4));


    let arrayMask = ipMask.split('.');
    let intMask1 = parseInt(arrayMask[0], 10);
    let intMask2 = parseInt(arrayMask[1], 10);
    let intMask3 = parseInt(arrayMask[2], 10);
    let intMask4 = parseInt(arrayMask[3], 10);

    let strMask1 = intMask1.toString(2);
    let strMask2 = intMask2.toString(2);
    let strMask3 = intMask3.toString(2);
    let strMask4 = intMask4.toString(2);

    let binMask = (valid(strMask1) + "." + valid(strMask2) + "." + valid(strMask3) + "." + valid(strMask4));


    // network

    let Ip = valid(strAddress1) + valid(strAddress2) + valid(strAddress3) + valid(strAddress4);

    let arrayBinIp = Ip.split('');

    let Mask = valid(strMask1) + valid(strMask2) + valid(strMask3) + valid(strMask4);
    
    let arrayBinMask = Mask.split('');

    let arrayBinNetwork = new Array();

    for (i = 0; i < 32; i++) {
        arrayBinNetwork[i] = arrayBinIp[i] * arrayBinMask[i];
    }

    let arrayBinNetwork2 = new Array();

    arrayBinNetwork2 = createArray(arrayBinNetwork2, arrayBinNetwork);

    let arrayNetwork = dec(arrayBinNetwork2);

    let network = arrayNetwork[0];
    let binNetwork = arrayNetwork[1];

    // broadcast 


    let arrayBinBroadcast = new Array();

    arrayBinBroadcast = createArray(arrayBinBroadcast, arrayBinNetwork);

    let zero;

    arrayBinMask.reverse();

    for (zero = 0; zero < 32; zero++) {
        if (arrayBinMask[zero] == '1') {
            break;
        }
    }

    arrayBinMask.reverse();

    arrayBinBroadcast.reverse();

    for (i = 0; i < zero; i++) {
        arrayBinBroadcast[i] = 1;
    }

    arrayBinBroadcast.reverse();

    let arrayBinLastHost = new Array();

    arrayBinLastHost = createArray(arrayBinLastHost, arrayBinBroadcast);

    let arrayBroadcast = dec(arrayBinBroadcast);

    let broadcast = arrayBroadcast[0];
    let binBroadcast = arrayBroadcast[1];

    // firstHost


    let arrayBinFirstHost = new Array();

    arrayBinFirstHost = createArray(arrayBinFirstHost, arrayBinNetwork);

    arrayBinFirstHost[31] = 1;

    let arrayFirstHost = dec(arrayBinFirstHost);

    let firstHost = arrayFirstHost[0];
    let binFirstHost = arrayFirstHost[1];

    // lastHost 

    arrayBinLastHost[31] = 0;

    let arrayLastHost = dec(arrayBinLastHost);

    let lastHost = arrayLastHost[0];
    let binLastHost = arrayLastHost[1];



    addInHTML('.address', 'Ваш адрес: ', ipAddress);
    addInHTML('.address-bin', '', binIp);
    addInHTML('.netmask', 'Ваша маска: ', ipMask);
    addInHTML('.netmask-bin', '', binMask);
    addInHTML('.network', 'Network: ', network);
    addInHTML('.network-bin', '', binNetwork);
    addInHTML('.broadcast', 'Broadcast ip: ', broadcast);
    addInHTML('.broadcast-bin', '', binBroadcast);
    addInHTML('.first-host', 'Первый адрес: ', firstHost);
    addInHTML('.first-host-bin', '', binFirstHost);
    addInHTML('.last-host', 'Последний адрес: ', lastHost);
    addInHTML('.last-host-bin', '', binLastHost);

})

button2.addEventListener('click', function(){
    inputForm.style.display = 'block';
    outputForm.style.display = 'none';
})

function valid(variable) {
    arrayVariable = variable.split('');

    arrayLengthVariable = 8 - arrayVariable.length;

    for (i = 0; i < arrayLengthVariable; i++) {
        arrayVariable.unshift(0);
    }

    variable = arrayVariable.join('');

    return variable;
}

function addInHTML(clas, text,  variable) {
    document.querySelector(clas).textContent = text + variable;
}

function dec(array) {
    let strArray1 = array.join('');
    let arrayNumber1 = strArray1.split('', 8);
    let strArrayNumber1 = arrayNumber1.join('');
    let intArrayNumber1 = parseInt(strArrayNumber1, 2);
    for (i = 0; i < 8; i++) {
        array.shift();
    }

    let strArray2 = array.join('');
    let arrayNumber2 = strArray2.split('', 8);
    let strArrayNumber2 = arrayNumber2.join('');
    let intArrayNumber2 = parseInt(strArrayNumber2, 2);
    for (i = 0; i < 8; i++) {
        array.shift();
    }

    let strArray3 = array.join('');
    let arrayNumber3 = strArray3.split('', 8);
    let strArrayNumber3 = arrayNumber3.join('');
    let intArrayNumber3 = parseInt(strArrayNumber3, 2);
    for (i = 0; i < 8; i++) {
        array.shift();
    }

    let strArray4 = array.join('');
    let arrayNumber4 = strArray4.split('', 8);
    let strArrayNumber4 = arrayNumber4.join('');
    let intArrayNumber4 = parseInt(strArrayNumber4, 2);
    for (i = 0; i < 8; i++) {
        array.shift();
    }

    let binArrayNumber = strArrayNumber1 + "." + strArrayNumber2 + "." + strArrayNumber3 + "." + strArrayNumber4;

    let intArrayNumber = intArrayNumber1 + "." + intArrayNumber2 + "." + intArrayNumber3 + "." + intArrayNumber4;

    return [intArrayNumber, binArrayNumber];
}

function createArray(arrayNew, arrayExisting) {
    for(i = 0; i < 32; i++) {
        arrayNew[i] = arrayExisting[i];
    }
    return arrayNew;
}