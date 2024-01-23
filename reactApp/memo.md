## Command for init install

```bash
yarn upgrade html2pdf.js@latest
yarn add -D webpack-cli
yarn add terser-webpack-plugin --dev
yarn webpack-cli --config /opt/gim-dashboard/reactApp/webpack.config.js
yarn add webpack-config
yarn add clean-webpack-plugin --dev

corepack enable
yarn set version stable
yarn install
corepack prepare yarn@4.0.2 --activate
yarn config set nodeLinker node-modules
```

## build production app manully
```bash
sudo yarn build:prod
```

## Generate SSL Certificate and Key:
```bash
openssl req -nodes -new -x509 -keyout key.pem -out cert.pem -days 730
```