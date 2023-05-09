const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const os = require('node:os');
const fs = require('node:fs');


const scriptVBS = `
file = WScript.Arguments(0)

Set fs = CreateObject("Scripting.FileSystemObject")
Set objStdOut = WScript.StdOut

FileVersion=fs.GetFileVersion(file)

json = "{" & vbNewLine &_
"    ""version"": """ & FileVersion & """" & vbNewLine &_
"}"

objStdOut.Write json`

/***
 * @function propertiesExecutableFile
 * @param {string} filePath
 * @returns {{version: string}}
 * */
module.exports = async function propertiesExecutableFile(filePath) {
    // const log = new logger();
    const log = { error: console.error }; //only interface
    try {
        const { stdout, stderr } = await exec(`cscript //B ${createScript()} "${filePath}"`);

        if (stderr)
            log.error(`FALHOU AO LER O ARQUIVO ${filePath}: ${stderr}`);
        else
            return JSON.parse(stdout);
    } catch (error) {
        log.error(`FALHOU AO LER O ARQUIVO ${filePath}: ${error}`);
    }
}

function createScript() {
    const tempDir = os.tmpdir();
    const filePath = `${tempDir}\\FileSystem.vbs`;

    if (fs.existsSync(filePath))
        fs.rmSync(filePath);

    fs.writeFileSync(filePath, scriptVBS);

    return filePath;
}