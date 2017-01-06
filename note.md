Init npm package
```
npm init
```

Install Dependencies
```
npm install express body-parser ejs mongojs --save

npm install --save mongoose node-restful
```

Install node server watching
```
    npm install -g nodemon
```

Run server (nodemon instead of node server.js)
```
node server.js
nodemon
nodemon ./server.js localhost 8080
nodemon ./server.coffee
nodemon --debug ./server.js 80
```

Create & Code on 
notebook/
    server.js
    routes/
        index.js
        notes.js
    views/
        index.html

Create & Connect to mongodb

Create & Code client with AngularJs v2

# Fix
Cannot read property 'listLazyRoutes' of undefined
on angular-cli v1.0.0-beta.22-1

Remove global angular-cli
```
sudo rm -rf /usr/local/lib/node_modules/angular-cli

npm uninstall -g angular-cli
npm cache clean
npm install -g angular-cli@latest
```

Remove local node_modules folder
```
sudo rm -rf node_modules dist tmp
npm install --save-dev angular-cli@latest
npm install
ng init
```

# Create Focus Directive
```
ng g directive focus
```
    

