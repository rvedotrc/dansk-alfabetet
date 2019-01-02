
var audio = document.getElementById('audio');
var letter = document.getElementById('letter');
var people = document.getElementById('people');
var person = 'else';

var letterMap = {
  'æ': 'ae',
  'ø': 'oe',
  'å': 'aa',
};

activate(person);

letter.onkeypress = function(e) {
  e = e || window.event;
  var c = (typeof e.which == "number") ? e.which : e.keyCode;
  if (c) {
    // A = 65
    // Z = 90
    // Æ = 198
    // Ø = 216
    // Å = 197
    if((c >= 65 && c <= 90) || c == 197 || c == 198 || c == 216) {
      c += 32;
    }
    // a = 97
    // z = 122
    // æ = 230
    // ø = 248
    // å = 229
    if((c >= 97 && c <= 122) || c == 229 || c == 230 || c == 248) {
      c = String.fromCharCode(c);
      c = letterMap[c] || c;
      audio.src = 'audio/' + person + '/' + c + '.mp3'
      audio.load();
      audio.play();
    }
  }
};

audio.onended = function() {
  letter.value = '';
}

people.onclick = function(e) {
  if(e.target.id && e.target.id != 'people') {
    person = e.target.id;
    activate(person);
  }
}

function activate(person) {
  var active = document.getElementsByClassName('active');
  for (var i = active.length - 1; i >= 0; i--) {
    active[i].classList = 'person';
  }
  var target = document.getElementById(person);
  target.classList.add('active');

  letter.focus();
}
