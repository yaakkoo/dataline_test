var cp = require('child_process');

cp.exec('init.sh', (err, stdout, stderr) => {
  if (err)
    console.log(err)
    
});