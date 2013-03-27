function lookup(term) {
  console.log("looking up term: " + term);
  alert('glossary lookup not yet available');
}

$(document).ready(function() {
  $('.glossary-link').click(lookup);
});

