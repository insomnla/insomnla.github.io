const regExpEnter = /^[0-9.]{0,16}$/;

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
    if (!regExpEnter.test(ipMask)) {
        inputMask.classList.add('input-box__input--error');
        document.querySelector('#label2').classList.add('input-box__label--error')
        ipError2.style.display = 'block';
        ipError2.innerHTML = 'Некорректный адрес Маски';
        error += 1;
    } else {
        ipError2.style.display = 'none';
        inputMask.classList.remove('input-box__input--error');
        document.querySelector('#label2').classList.remove('input-box__label--error')
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

    let sumIp = (intAddress1 * (Math.pow(2, 24))) + (intAddress2 * (Math.pow(2, 16))) + (intAddress3 * (Math.pow(2, 8))) + intAddress4;

    let binSumIp = (sumIp).toString(2);

    let arrayMask = ipMask.split('.');
    let intMask1 = parseInt(arrayMask[0], 10);
    let intMask2 = parseInt(arrayMask[1], 10);
    let intMask3 = parseInt(arrayMask[2], 10);
    let intMask4 = parseInt(arrayMask[3], 10);

    let sumMask = (intMask1 * (Math.pow(2, 24))) + (intMask2 * (Math.pow(2, 16))) + (intMask3 * (Math.pow(2, 8))) + intMask4;

    let binSumMask = (sumMask).toString(2);

    let binArrayIp = binSumIp.split('');
    let binArrayMask = binSumMask.split('');
    let allSum = new Array();

    for (i = 0; i < 32; i++) {
        allSum[i] = binArrayIp[i] * binArrayMask[i];
    }

    // network 

    let arrayNetworkSum = new Array();

    for (i = 0; i < 32; i++) {
        arrayNetworkSum[i] = allSum[i]
    }

    let networkBin = arrayNetworkSum.join('');
    let intNetwork1 = networkBin.split('', 8);
    for (i = 0; i < 8; i++) {
        arrayNetworkSum.shift(i); 
    }
    let networkBin1 = arrayNetworkSum.join('');
    let intNetwork2 = networkBin1.split('', 8);
    for (i = 0; i < 8; i++) {
        arrayNetworkSum.shift(i); 
    }
    let networkBin2 = arrayNetworkSum.join('');
    let intNetwork3 = networkBin2.split('', 8);
    for (i = 0; i < 8; i++) {
        arrayNetworkSum.shift(i); 
    }
    let networkBin3 = arrayNetworkSum.join('');
    let intNetwork4 = networkBin3.split('', 8);
    
    let strNetwork1 = intNetwork1.join('');
    let strNetwork2 = intNetwork2.join('');
    let strNetwork3 = intNetwork3.join('');
    let strNetwork4 = intNetwork4.join('');

    let network1 = parseInt(strNetwork1, 2);
    let network2 = parseInt(strNetwork2, 2);
    let network3 = parseInt(strNetwork3, 2);
    let network4 = parseInt(strNetwork4, 2);

    let network = network1 + "." + network2 + "." + network3 + "." + network4;

    // broadcast

    let arrayBroadcastSum = new Array();

    for (i = 0; i < 32; i++) {
        arrayBroadcastSum[i] = allSum[i]
    }

    let reverseSumMask = new Array();
    let countZero;

    for (i = 0; i < 32; i++) {
        reverseSumMask[i] = binArrayMask[i];
    }

    reverseSumMask.reverse();

    for (countZero = 0; countZero < 32; countZero++) {
        if (reverseSumMask[countZero] == 1) {
            break;
        }
    }

    arrayBroadcastSum.reverse();

    for (i = 0; i < countZero; i++) {
        arrayBroadcastSum[i] = 1;
    }

    arrayBroadcastSum.reverse();

    let arrayLastHostSum = new Array();

    for (i = 0; i < 32; i++) {
        arrayLastHostSum[i] = arrayBroadcastSum[i];
    }

    let binBroadcastIp = arrayBroadcastSum.join("");

    let strBroadcastIp = arrayBroadcastSum.join('');
    let intBroadcastIp1 = strBroadcastIp.split('', 8);
    for (i = 0; i < 8; i++) {
        arrayBroadcastSum.shift(i); 
    }
    let strBroadcastIp1 = arrayBroadcastSum.join('');
    let intBroadcastIp2 = strBroadcastIp1.split('', 8);
    for (i = 0; i < 8; i++) {
        arrayBroadcastSum.shift(i); 
    }
    let strBroadcastIp2 = arrayBroadcastSum.join('');
    let intBroadcastIp3 = strBroadcastIp2.split('', 8);
    for (i = 0; i < 8; i++) {
        arrayBroadcastSum.shift(i); 
    }
    let strBroadcastIp3 = arrayBroadcastSum.join('');
    let intBroadcastIp4 = strBroadcastIp3.split('', 8);

    let strBinBroadcastIp1 = intBroadcastIp1.join('');
    let strBinBroadcastIp2 = intBroadcastIp2.join('');
    let strBinBroadcastIp3 = intBroadcastIp3.join('');
    let strBinBroadcastIp4 = intBroadcastIp4.join('');

    let broadcastIp1 = parseInt(strBinBroadcastIp1, 2);
    let broadcastIp2 = parseInt(strBinBroadcastIp2, 2);
    let broadcastIp3 = parseInt(strBinBroadcastIp3, 2);
    let broadcastIp4 = parseInt(strBinBroadcastIp4, 2);

    let broadcastIp = broadcastIp1 + "." + broadcastIp2 + "." + broadcastIp3 + "." + broadcastIp4;

    // firstHost

    let arrayFirstHostSum = new Array();

    for (i = 0; i < 32; i++) {
        arrayFirstHostSum[i] = allSum[i];
    }

    arrayFirstHostSum.reverse();
    arrayFirstHostSum[0] = 1;
    arrayFirstHostSum.reverse();
    let binFirstHost = arrayFirstHostSum.join("");

    let strFirstHost = arrayFirstHostSum.join('');
    let intFirstHost1 = strFirstHost.split('', 8);
    for (i = 0; i < 8; i++) {
        arrayFirstHostSum.shift(i); 
    }
    let strFirstHost1 = arrayFirstHostSum.join('');
    let intFirstHost2 = strFirstHost1.split('', 8);
    for (i = 0; i < 8; i++) {
        arrayFirstHostSum.shift(i); 
    }
    let strFirstHost2 = arrayFirstHostSum.join('');
    let intFirstHost3 = strFirstHost2.split('', 8);
    for (i = 0; i < 8; i++) {
        arrayFirstHostSum.shift(i); 
    }
    let strFirstHost3 = arrayFirstHostSum.join('');
    let intFirstHost4 = strFirstHost3.split('', 8);

    let strBinFirstHost1 = intFirstHost1.join('');
    let strBinFirstHost2 = intFirstHost2.join('');
    let strBinFirstHost3 = intFirstHost3.join('');
    let strBinFirstHost4 = intFirstHost4.join('');

    let firstHost1 = parseInt(strBinFirstHost1, 2);
    let firstHost2 = parseInt(strBinFirstHost2, 2);
    let firstHost3 = parseInt(strBinFirstHost3, 2);
    let firstHost4 = parseInt(strBinFirstHost4, 2);

    let firstHost = firstHost1 + "." + firstHost2 + "." + firstHost3 + "." + firstHost4;

    // lastHost
    arrayLastHostSum[31] = 0;

    let binLastHost = arrayLastHostSum.join('');

    let strLastHost = arrayLastHostSum.join('');
    let intLastHost1 = strLastHost.split('', 8);
    for (i = 0; i < 8; i++) {
        arrayLastHostSum.shift(i); 
    }
    let strLastHost1 = arrayLastHostSum.join('');
    let intLastHost2 = strLastHost1.split('', 8);
    for (i = 0; i < 8; i++) {
        arrayLastHostSum.shift(i); 
    }
    let strLastHost2 = arrayLastHostSum.join('');
    let intLastHost3 = strLastHost2.split('', 8);
    for (i = 0; i < 8; i++) {
        arrayLastHostSum.shift(i); 
    }
    let strLastHost3 = arrayLastHostSum.join('');
    let intLastHost4 = strLastHost3.split('', 8);

    let strBinLastHost1 = intLastHost1.join('');
    let strBinLastHost2 = intLastHost2.join('');
    let strBinLastHost3 = intLastHost3.join('');
    let strBinLastHost4 = intLastHost4.join('');

    let lastHost1 = parseInt(strBinLastHost1, 2);
    let lastHost2 = parseInt(strBinLastHost2, 2);
    let lastHost3 = parseInt(strBinLastHost3, 2);
    let lastHost4 = parseInt(strBinLastHost4, 2);

    let lastHost = lastHost1 + "." + lastHost2 + "." + lastHost3 + "." + lastHost4;


    document.querySelector('.address').textContent = "Ваш адрес: " + ipAddress;
    document.querySelector('.address-bin').textContent = "Ваш адрес в бинарном виде: " + binSumIp;
    document.querySelector('.netmask').textContent = "Ваша маска: " + ipMask;
    document.querySelector('.netmask-bin').textContent = "Ваша маска в бинарном виде: " + binSumMask;
    document.querySelector('.network').textContent = "Ваша рабочая область: " + network;
    document.querySelector('.network-bin').textContent = "Ваша рабочая область в бинарном виде: " + networkBin;
    document.querySelector('.broadcast').textContent = "Ваш широковещательный адрес: " + broadcastIp;
    document.querySelector('.broadcast-bin').textContent = "Ваш широковещательный адрес в бинарном виде: " + binBroadcastIp;
    document.querySelector('.first-host').textContent = "Ваш первый host: " + firstHost;
    document.querySelector('.first-host-bin').textContent = "Ваш первый host в бинарном виде: " + binFirstHost;
    document.querySelector('.last-host').textContent = "Ваш последный host: " + lastHost;
    document.querySelector('.last-host-bin').textContent = "Ваш последный host в бинарном виде: " + binLastHost;

})

button2.addEventListener('click', function(){
    inputForm.style.display = 'block';
    outputForm.style.display = 'none';
})