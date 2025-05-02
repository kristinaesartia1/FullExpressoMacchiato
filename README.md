# Super Express Template
This template is intented to use by me for fasten things up but feel free to use it and customize it however you want.
**It uses a little express wrapper that "near-to-automatically" serves swagger-ui and creates some dynamic endpoints for your api and db**.
You can check the dock in the `./back` folder README.

### Use
Both projects can be tested by going in their root folder (same level as their package.json) and using the command `npm run dev`.
For the build use `npm run build`.

For example
```
cd front
npm run build
```
Will produce the output file in the back/client folder, this. will be the final production UI.

```
cd back
npm run build
npm run prod
```

This will be creating the out files for the production server.

### Docker
For the container, you have the Dockerfile and also the compose instructions in the `./back` directory.
