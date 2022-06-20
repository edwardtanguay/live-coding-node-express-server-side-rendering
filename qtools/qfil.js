import fs from 'fs';
import * as qstr from './qstr.js';
import * as qfil from './qfil.js';
import * as config from './config.js';
import path from 'path';
import { platform } from 'node:process'; // "win32" or "linux"

const __dirname = path.resolve(path.dirname(''));
const osSlash = platform === 'win32' ? '\\' : '/';

export const getSiteRelativePathAndFileNames = (folderPath) => {
    let result = [];
    let fileNamesInPath = fs.readdirSync(folderPath);
    fileNamesInPath.forEach((fileName) => {
        let filePath = folderPath + osSlash + fileName;
        if (!fs.statSync(filePath).isDirectory()) {
            let filePath = folderPath + osSlash + fileName;
            result.push(filePath);
        }
    });
    return result;
};

export const getRelativePathAndFileName = function (absolutePathAndFileName) {
    return qstr.chopLeft(absolutePathAndFileName, __dirname);
};

export const convertBackSlashesToForwardSlashes = function (pathAndFileName) {
    return qstr.replaceAll(pathAndFileName, '\\', '/');
};

export const getContentOfFile = (pathAndFileName) => {
    const fullPathAndFileName = config.getApplicationPath() + osSlash + pathAndFileName;
    return fs.readFileSync(fullPathAndFileName, 'utf8');
}

export const getFileAsLines = (pathAndFileName) => {
    const content = qfil.getContentOfFile(pathAndFileName);
    return qstr.convertStringBlockToLines(content);
}