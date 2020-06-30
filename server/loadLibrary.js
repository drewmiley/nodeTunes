const fetch = require('node-fetch');

const loadLibrary = async (url) => {
    const libraryUrl = url && url !== 'undefined' ? url : 'http://localhost:3000';
    const response = await fetch(`${ libraryUrl }/iTunes%20Music%20Library.xml`);
    const text = await response.text();
    const startIndex = text.indexOf('<key>Tracks</key>') + '<key>Tracks</key>'.length;
    const endIndex = text.indexOf('<key>Playlists</key>');
    const xmlToJSON = text.substring(startIndex, endIndex)
        .replace(/\"/g, '\\"')
        .replace(/\r?\n|\r/g, '')
        .replace(/\t/g, '')
        .replace(/\<dict\>/g, '{')
        .replace(/\<\/dict\>/g, '}')
        .replace(/\<key\>[0-9]*\<\/key\>/, '')
        .replace(/\<key\>[0-9]*\<\/key\>/g, ',')
        .replace(/\<key\>/g, '\"')
        .replace(/\<\/key\>/g, '\"')
        .replace(/\<integer\>/g, ':')
        .replace(/\<\/integer\>/g, ',')
        .replace(/\<string\>/g, ':\"')
        .replace(/\<\/string\>/g, '\",')
        .replace(/\<date\>/g, ':\"')
        .replace(/\<\/date\>/g, '\",')
        .replace(/\,}/g, '}')
        .replace(/\"Compilation\"\<true\/\>/g, '')
        .replace(/\"Album Rating Computed\"\<true\/\>/g, '')
        .replace(/\"Rating Computed\"\<true\/\>/g, '');
    const json = '['.concat(xmlToJSON.substring(1, xmlToJSON.length - 1), ']');
    return JSON.parse(json);
};

module.exports = loadLibrary;
