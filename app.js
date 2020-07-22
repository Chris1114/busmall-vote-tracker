'use strict';

var round = 0;
var randIndexes = [];
var timesClicked = [];
var timesShown = [];
var globalTimesClicked;
var globalTimesShown;
var chartDrawn = false;

function Image(number) {
    this.name = number;
    this.timesClicked = 0;
    this.timesShown = 0;
    this.src = `img/${this.name}.jpg`;
    Image.all.push(this);
}

Image.all = [];
Image.allNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
 
function createProductArray() { 
for (var i = 0; i < Image.allNames.length; i++) {
    new Image(Image.allNames[i]);
  };
}

function rando() {
    var min = 0;
    var max = Image.allNames.length - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}  

function makeRandIndexes() {
    var lastRound = [];

    var index1 = rando();
    
    var index2 = rando();
    while (index2 === index1) {
        index2 = rando();
    }
    var index3 = rando();
    while (index3 === index1 || index3 === index2) {
        index3 = rando();
    }
    randIndexes.push(index1, index2, index3);
    lastRound.push(index1, index2, index3);

    for (var i = 0; i < 24; i++) {
    index1 = rando();
    while (index1 === lastRound[0] || index1 === lastRound[1] || index1 === lastRound[2])
    index1 = rando();
    
    index2 = rando();
    while (index2 === index1 || index2 === lastRound[0] || index2 === lastRound[1] || index2 === lastRound[2]) {
        index2 = rando();
    }
    index3 = rando();
    while (index3 === index1 || index3 === index2 ||index3 === lastRound[0] || index3 === lastRound[1] || index3 === lastRound[2]) {
        index3 = rando();
    }
    randIndexes.push(index1, index2, index3);
    lastRound = [];
    lastRound.push(index1, index2, index3);
    }
 }

Image.imgLeftEl = document.getElementById('image-left');
Image.imgCenterEl = document.getElementById('image-center');
Image.imgRightEl = document.getElementById('image-right');
           
function displayImages() {
    Image.imgLeftEl.src = Image.all[randIndexes[(round * 3)]].src;
    Image.imgLeftEl.alt = Image.all[randIndexes[(round * 3)]].name;
    Image.all[randIndexes[(round * 3)]].timesShown++;
    globalTimesShown[randIndexes[(round * 3)]]++;

    Image.imgCenterEl.src = Image.all[randIndexes[(round * 3) + 1]].src;
    Image.imgCenterEl.alt = Image.all[randIndexes[(round * 3) + 1]].name;
    Image.all[randIndexes[(round * 3) + 1]].timesShown++;
    globalTimesShown[randIndexes[(round * 3) + 1]]++;

 
    Image.imgRightEl.src = Image.all[randIndexes[(round * 3) + 2]].src;
    Image.imgRightEl.alt = Image.all[randIndexes[(round * 3) + 2]].name;
    Image.all[randIndexes[(round * 3) + 2]].timesShown++;
    globalTimesShown[randIndexes[(round * 3) + 2]]++;

    document.getElementById('three-images').addEventListener('click', handleClick);
    }

    (function localStorageCheckUser() {
      if(localStorage.userData) {
      Image.all = JSON.parse(localStorage.userData)
      } else {
        makeRandIndexes();
      }
    })();

    (function localStorageCheckGlobal() {
      if(localStorage.globalTimesClicked) {
        globalTimesClicked = JSON.parse(localStorage.globalTimesClicked);
          } else {
            globalTimesClicked = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0];
          }
      if(localStorage.globalTimesShown) {
        globalTimesShown = JSON.parse(localStorage.globalTimesShown);
         } else {
          globalTimesShown = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0];

        }
    })();
    
function handleClick(e) {
    if (e.target.id != 'image-left' && e.target.id != 'image-center' && e.target.id != 'image-right') {
        alert('Please click on the image')
        handleClick();
    }
    for (var i = 0; i < Image.allNames.length; i++){
    if (e.target.alt === Image.allNames[i]){ 
        Image.all[i].timesClicked++;
        globalTimesClicked[i]++;
        localStorage.setItem('userData', JSON.stringify(Image.all));
        localStorage.setItem('globalTimesClicked', JSON.stringify(globalTimesClicked));
        localStorage.setItem('globalTimesShown', JSON.stringify(globalTimesShown));
      }
    }
    round++;
    if (round < 25) {
        displayImages();
    } else {
      document.getElementById('btn-next').classList.add('clickable');
      document.getElementById('btn-global').classList.add('clickable');
      document.getElementById('btn-clr-user').classList.add('clickable');
      clickData(); 
      document.getElementById('three-images').removeEventListener('click', handleClick);   
      drawUserTimesClicked();
      drawUserTimesShown();
      document.getElementById('btn-next').addEventListener('click', nextRound);
      document.getElementById('btn-global').addEventListener('click', displayGlobal);
      document.getElementById('btn-clr-user').addEventListener('click', clearUserData);
    }
}

function nextRound() {
  location.reload();
 }
 
 function clearUserData() {
   localStorage.removeItem('userData');
   Image.all = [];
   location.reload();
 }

 function clearGlobalData() {
  localStorage.clear();
  Image.all = [];
  location.reload();
}

makeRandIndexes();
createProductArray();
displayImages();

function clickData() {
    for(var i = 0; i < Image.all.length; i++) {
      timesClicked.push(Image.all[i].timesClicked);
      timesShown.push(Image.all[i].timesShown);
      globalTimesClicked.push(Image.all[i].timesClicked);
      // globalTimesShown.push(Image.all[i].timesShown);
}
   }

function displayGlobal() {
  window.scroll({
    top: 900,
    left: 0,
    behavior: 'smooth'
  });  
  drawGlobalTimesClicked();
  drawGlobalTimesShown();
}

//the rest is chart.js 
var userTimesClicked = {
    labels: Image.allNames,
    datasets: [{
        label: 'Clicks Received',
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        data: timesClicked,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
}]
  };

  function drawUserTimesClicked() {
    var ctx = document.getElementById('user-times-clicked').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'bar',
      data: userTimesClicked,
      options: {
        responsive: false,
        animation: {
          duration: 1800,
          easing: 'easeOutBounce'
        }
      },
          });
    chartDrawn = true;
  }

  var userTimesShown = {
    labels: Image.allNames,
    datasets: [{
        label: 'Times shown',
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        data: timesShown,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
}]
  };

  function drawUserTimesShown() {
    var ctx = document.getElementById('user-times-shown').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'bar',
      data: userTimesShown,
      options: {
        responsive: false,
        animation: {
          duration: 1800,
          easing: 'easeOutBounce'
        }
      },
          });
    chartDrawn = true;
  }

  document.getElementById('btn-clr-user').addEventListener('click', clearUserData);
  document.getElementById('btn-clr-global').addEventListener('click', clearGlobalData);

  //global charts
  var globalTimesClickedChart = {
    labels: Image.allNames,
    datasets: [{
        label: 'Global Clicks Received',
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        data: globalTimesClicked,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
}]
  };

  function drawGlobalTimesClicked() {
    var ctx = document.getElementById('global-times-clicked').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'bar',
      data: globalTimesClickedChart,
      options: {
        responsive: false,
        animation: {
          duration: 1800,
          easing: 'easeOutBounce'
        }
      },
          });
    chartDrawn = true;
  }

  var globalTimesShownChart = {
    labels: Image.allNames,
    datasets: [{
        label: 'Global times shown',
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        data: globalTimesShown,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
}]
  };

  function drawGlobalTimesShown() {
    var ctx = document.getElementById('global-times-shown').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'bar',
      data: globalTimesShownChart,
      options: {
        responsive: false,
        animation: {
          duration: 1800,
          easing: 'easeOutBounce'
        }
      },
          });
    chartDrawn = true;
  }

