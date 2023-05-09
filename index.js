async function main() {
    const propertiesExecutableFile = require('./propertiesExecutableFile');

    const filePath = "";

    let fileProp = await propertiesExecutableFile(filePath);

    console.log(fileProp);
}

main();