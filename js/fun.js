function lookup(term) {
  alert(['glossary entry for', term, 'not yet available'].join(' '));
}

$(document).ready(function() {
  $('.glossary-link').each(function() {
    var link = $(this);
    link.click(L(lookup, link.text()));
  });
});

