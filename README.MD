# Gambiarra das braba pra pegar versão de um executável no nodejs.


## Stack
### Atualmente estou usando nodejs e electron.
<br/>

```js
const propertiesExecutableFile = require('./propertiesExecutableFile');

    let fileProp = await propertiesExecutableFile("./executable.exe");
    console.log(fileProp);
```
```json
> node index.js
 { "version": "1.0.0.0" }
```

<br/>

### _Disclaimer: Pra mim não funcionou usando wmic_