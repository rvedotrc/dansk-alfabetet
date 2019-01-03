
var audio = document.getElementById('audio');
var letter = document.getElementById('letter');
var people = document.getElementById('people');
var person = 'else';

var alfabetet = 'abcdefghijklmnopqrstuvwxyzæøå';
var letterMap = {
  'æ': 'ae',
  'ø': 'oe',
  'å': 'aa',
};

activate(person);

var isPlayable = function(c) {
  return (alfabetet.indexOf(c.toLowerCase()) >= 0);
};

var discardCharacter = function() {
  letter.value = letter.value.substr(1);
};

var playLetter = function(c) {
  var filename = letterMap[c.toLowerCase()] || c.toLowerCase();
  audio.src = 'audio/' + person + '/' + filename + '.mp3'
  audio.load();
  audio.play();

  audio.addEventListener('ended', function(e) {
    if (letter.value[0] === c) discardCharacter();
    nibble();
  }, {once: true});
};

var nibble = function() {
  if (!audio.paused) return;

  while (letter.value.length > 0) {
    var nextCharacter = letter.value[0];

    if (isPlayable(nextCharacter)) {
      playLetter(nextCharacter);
      break;
    } else {
      discardCharacter();
    }
  }
};

setInterval(nibble, 100);

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
