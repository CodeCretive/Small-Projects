let timer = document.querySelector('.timer');
let timeH = document.getElementById('timerValueH');
let timeM = document.getElementById('timerValueM');
let timeS = document.getElementById('timerValueS');
let startBtn = document.querySelector('.start');

// Track focused input for keypad interaction
let currentInput = null;
document.querySelectorAll('.timerValue').forEach(input => {
  input.addEventListener('focus', () => {
   document.querySelectorAll('.timerValue').forEach(i => i.classList.remove('active'))
   input.classList.add('active')
   currentInput = input;
  });
});

// Keypad input handling
const keyButtons = document.querySelectorAll('.keyPad .input');
keyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.innerText;

    if (val === 'C' && currentInput) {
      currentInput.value = '';
    } else if (currentInput) {
      if (currentInput.value.length < 2) {
        currentInput.value += val;
      }
    }
  });
});

startBtn.addEventListener('click', () => {
  if (
    timeS.value.length > 2 ||
    timeM.value.length > 2 ||
    (timeS.value == 0 && timeH.value == 0 && timeM.value == 0) || timeM.value>60 || timeS.value>60
  ) {
    alert('Invalid input');
    return;
  }

  let hourCount = parseInt(timeH.value) || 0;
  let minuteCount = parseInt(timeM.value) || 0;
  let secondsCount = parseInt(timeS.value) || 0;
  
  timer.innerHTML = `
    <p id="hour">${hourCount.toString().padStart(2, '0')}</p>:
    <p id="minute">${minuteCount.toString().padStart(2, '0')}</p>:
    <p id="seconds">${secondsCount.toString().padStart(2, '0')}</p>
    <button id="resetBtn">Reset</button>
  `;
  timer.style.display = 'flex';
  timer.style.justifyContent = 'center';
  timer.style.flexDirection = 'row';

  document.getElementById('resetBtn').addEventListener('click', () =>{
   clearInterval(countdown)
   location.reload()
   alert('time got reset')
  })
  let totalSeconds = hourCount * 3600 + minuteCount * 60 + secondsCount;

  let countdown = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(countdown);
      alert("Time's up!");
      return;
    }

    totalSeconds--;

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    document.getElementById('hour').innerText = hrs.toString().padStart(2, '0');
    document.getElementById('minute').innerText = mins.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = secs.toString().padStart(2, '0');
  }, 1000);
});