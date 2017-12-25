import fs from 'fs-extra';
import zipFolder from 'zip-folder';


const files = process.env.npm_config_files;
const zipto = process.env.npm_config_zipto;
const fileArray = files.split(',');

fileArray.forEach((item, i) => {
  if (i === 0) {
    fs.copy(`./dist/lambda/${item}.js`, `./temp/${item}.js`).then(() => console.log('success first file')); // eslint-disable-line
  } else {
    fs.copy(`./dist/${item}.js`, `./temp/${item}.js`)
      .then(() => {
        fs.copy('./prod/node_modules', './temp/node_modules').then(() => {
          zipFolder('./temp', `./${zipto}.zip`, (err) => {
            if (err) {
              console.log('oh no!', err); // eslint-disable-line
            } else {
              fs.remove('./temp', e => {
                if (e) {
                  return console.error(e); // eslint-disable-line
                }
                return console.log('success!'); // eslint-disable-line
              });
              console.log('Success'); // eslint-disable-line
            }
          });
        }).catch(err => console.error(err)); // eslint-disable-line
      })
    .catch(err => console.error(err)); // eslint-disable-line
  }
});
