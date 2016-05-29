var workClockInit, breakClockInit, init,
  setSes = 0,
  setBreak = 0,
  pomo = false;

function setBackGround(green, red) {
  document.getElementById(green).style.border = '4px solid rgb(0,255,0)';
  document.getElementById(red).style.border = '4px solid red';
  document.getElementById(green).style['box-shadow'] = '0px 0px 20px white';
  document.getElementById(red).style['box-shadow'] = '0 0 0 white';
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date()),
    seconds = Math.floor((t / 1000) % 60),
    minutes = Math.floor((t / 1000 / 60) % 60),
    hours = Math.floor((t / (1000 * 60 * 60)) % 24),
    days = Math.floor(t / (1000 * 60 * 60 * 24))
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);

  function updateClock() {
    var t = getTimeRemaining(endtime);
    clock.innerHTML = ('0' + t.hours).slice(-2) + ':' + ('0' + t.minutes).slice(-2) + ':' + ('0' + t.seconds).slice(-2);
    if (t.total <= 0 && workClockInit) {
      var breakTime = new Date().getTime() + (setBreak * 60 * 1000),
        breakInterval = new Date(breakTime);
      setBackGround('break', 'session');
      workClockInit = false;
      breakClockInit = true;
      initializeClock('breakClock', breakInterval);
      clearInterval(timeinterval);
    } else if (t.total <= 0 && breakClockInit) {
      var newSesTime = new Date().getTime() + (setBreak * 60 * 1000),
        newSesInterval = new Date(newSesTime);
      workClockInit = true;
      breakClockInit = false;
      initializeClock('clock', newSesInterval);
      clearInterval(timeinterval);
    } else if (t.total <= 0 && pomo) {
      pomo = false;
      setSes = 0;
      brkSes = 0;
      clearInterval(timeinterval);
      $('#brkDisplay').val(setSes);
      $('#sesDisplay').val(setBreak);
      $('#pomo').show();
      $('.timeSet').show();
      $('.timeDisplay').hide();
      $('#reset').hide();
      $('#start').show();
      $('#session').css('box-shadow', '0 0 0 white');
      $('#break').css('border', '4px solid rgb(0, 100,255)');
      $('#session').css('border', '4px solid rgb(0, 100,255)');
      alert('ALARM!');
    } else if (!init) {
      clock.innerHTML = '00:00:00';
      clearInterval(timeinterval);
    }
  }
  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}
$(document).ready(function() {
  $('.timeDisplay').hide();
  $('#reset').hide();
  $('#start').click(function() {
    if (setSes === 0 || setBreak === 0) {
      alert('You must set "Session" & "Break" to a value other than 0')
    } else {
      var sesTime = new Date().getTime() + (setSes * 60 * 1000),
        sesInterval = new Date(sesTime);
      setBackGround('session', 'break');
      init = true;
      pomo=false;
      workClockInit = true;
      initializeClock('clock', sesInterval);
      $('#pomo').hide();
      $('.timeSet').hide();
      $('.timeDisplay').show();
      $('#reset').show();
      $(this).hide();
    }
  })
  $('#reset').click(function() {
    init = false;
    setSes=0;
    setBreak=0;
    pomo=false;
    $('#brkDisplay').val(setSes);
    $('#sesDisplay').val(setBreak);
    $('#break').css('border', '4px solid rgb(0, 100,255)');
    $('#session').css('border', '4px solid rgb(0, 100,255)');
    $('#break').css('box-shadow', '0 0 0 white');
    $('#session').css('box-shadow', '0 0 0 white');
    $('#pomo').show();
    $('.timeSet').show();
    $('.timeDisplay').hide();
    $(this).hide();
    $('#start').show();
  });
  $('#pomo').click(function() {
    setSes = 25;
    pomo = true;
    var pomoTime = new Date().getTime() + (setSes * 60 * 1000),
      pomoInterval = new Date(pomoTime);
    setBackGround('session', 'break');
    init = true;
    workClockInit=false;
    breakClockInit=false;
    initializeClock('clock', pomoInterval);
    $(this).hide();
    $('#start').hide();
    $('.timeSet').hide();
    $('.timeDisplay').show();
    $('#reset').show();
  });
  $('#sesPlus').click(function() {
    $('#sesDisplay').val(setSes + 1);
    setSes++;
  })
  $('#sesMinus').click(function() {
    $('#sesDisplay').val(setSes - 1);
    setSes--;
  })
  $('#brkPlus').click(function() {
    $('#brkDisplay').val(setBreak + 1);
    setBreak++;
  })
  $('#brkMinus').click(function() {
    $('#brkDisplay').val(setBreak - 1);
    setBreak--;
  })
});