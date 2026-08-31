const fs = require('fs');

// NCC
const nccBuf = fs.readFileSync('/var/www/gatwick/public/assets/partner_ncc.png');
const nccB64 = nccBuf.toString('base64');
const nccSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 746 256" width="746" height="256">
  <image width="746" height="256" href="data:image/png;base64,${nccB64}"/>
</svg>`;
fs.writeFileSync('/var/www/gatwick/public/assets/partner_ncc.svg', nccSvg);
fs.writeFileSync('/var/www/gatwick/assets/partner_ncc.svg', nccSvg);
if (fs.existsSync('/var/www/gatwick/dist/assets')) {
  fs.writeFileSync('/var/www/gatwick/dist/assets/partner_ncc.svg', nccSvg);
}

// PSB
const psbBuf = fs.readFileSync('/var/www/gatwick/public/assets/partner_psb.png');
const psbB64 = psbBuf.toString('base64');
const psbSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 926 477" width="926" height="477">
  <image width="926" height="477" href="data:image/png;base64,${psbB64}"/>
</svg>`;
fs.writeFileSync('/var/www/gatwick/public/assets/partner_psb.svg', psbSvg);
fs.writeFileSync('/var/www/gatwick/assets/partner_psb.svg', psbSvg);
if (fs.existsSync('/var/www/gatwick/dist/assets')) {
  fs.writeFileSync('/var/www/gatwick/dist/assets/partner_psb.svg', psbSvg);
}

console.log('Done embedding exact images into SVG files!');
