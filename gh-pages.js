var ghpages = require('gh-pages');

ghpages.publish('path-of-dir-to-commit', function(err) {
  if(err) {
   console.log(err);
} else {
 console.log("success");
}
})