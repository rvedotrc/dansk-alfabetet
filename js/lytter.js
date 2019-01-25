var audio = document.getElementById('audio');
var letter = document.getElementById('letter');
var people = document.getElementById('people');
var gentag = document.getElementById('gentag');
var givop = document.getElementById('givop');
var person = 'else';

var alfabetet = 'abcdefghijklmnopqrstuvwxyzæøå';
var ikkeBogstavere = new RegExp("[^" + alfabetet + "]", 'g')
var letterMap = {
  'æ': 'ae',
  'ø': 'oe',
  'å': 'aa',
};

var rigtigtSvar;

var lavSvar = function() {
  var s = '';
  var l = Math.random() * Math.random() * 5;
  for (var i=0; i<l; ++i) {
    s += alfabetet.charAt(Math.random() * alfabetet.length);
  }
  return s;
};

var næsteSpørgsmål = function() {
  rigtigtSvar = lavSvar();
  udspilBogstaver(rigtigtSvar);

  givop.disabled = false;
  letter.value = '';
  letter.focus();
};

var udspilBogstav = function(c, cb) {
  var filename = letterMap[c.toLowerCase()] || c.toLowerCase();
  audio.src = 'audio/' + person + '/' + filename + '.mp3'
  audio.load();
  audio.play();

  audio.addEventListener('ended', function(e) {
    cb();
  }, {once: true});
};

var udspilBogstaver = function(bogstaver) {
  if (bogstaver == '') {
    throw 'ingen bogstaver';
  }

  gentag.disabled = true;

  udspilBogstav(bogstaver.charAt(0), function () {
    var sidste = bogstaver.substr(1);
    if (sidste == '') {
      gentag.disabled = false;
    } else {
      udspilBogstaver(sidste);
    }
  });
};

var activate = function(person) {
  var active = document.getElementsByClassName('active');
  for (var i = active.length - 1; i >= 0; i--) {
    active[i].classList = 'person';
  }
  var target = document.getElementById(person);
  target.classList.add('active');

  letter.focus();
};

activate(person);
gentag.disabled = true;
givop.disabled = true;
næsteSpørgsmål();

gentag.addEventListener('click', function() {
  udspilBogstaver(rigtigtSvar);
});

givop.addEventListener('click', function() {
  letter.value = rigtigtSvar;
  setTimeout(næsteSpørgsmål, 1000);
});

people.addEventListener('click', function(e) {
  if (e.target.id && e.target.id != 'people') {
    person = e.target.id;
    activate(person);
  }
});

var kunBogstavere = function(s) {
  return s.replace(ikkeBogstavere, '');
};

var tjekSvar = function() {
  if (kunBogstavere(letter.value.toLowerCase()) == rigtigtSvar) {
    letter.value = '';
    setTimeout(næsteSpørgsmål, 250);
  }
};
setInterval(tjekSvar, 100);

// vi: set sw=2 et :
