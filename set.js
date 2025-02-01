const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0xBYW9NYlFIWkRNRXR6SjRLZVg0aHBIcWIxWWFOLzBqWXV1VWpyaTIxQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQnRVRUtNYldHQ01uOFBkQWw0blBKUitCR3NvTkJucWRwOGdIcEtlM2ttbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvQVBST09kMWNobGNkRTNONlFYZ0ZMd3N6L3gyK2N6U216VUxZd1J3VFZzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMblJ2dXdxWWxxa0lQZnVlV2c0UWVsbG5lVHNVK0I0RWdxWTdJWEh2TFZrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVFK0JqL0VCWUZ0bHBwc1JFN1Npd2RIUDZmOHgwVnlPR0t5blY5LzZzMlk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklSSytCNFNoSlpvSndSbk0rMkhwQjdvU3JwNUtTb250cXp1VVhFYnlEeE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkVrNStmSjJmbFhlS3JVVzgxVy81Qnlxby8rbFZsRnlyK2NHd1puNm1FRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ091dG1jSGV2ckFpeUUvZ3VKZDhUVFY2MnVKQjZScjF1bXhTR0JCMnVYaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik0rbmp2dlpwU1F2Nmt4cmhJaXNQQTZ2L3BSbUk4U2lBcGlMZUVVKzJNMlJqWFNXV1ZuVGY2N3UydXY5L0NXQmRvZ2tscmhHWFhKeXRPb2d2MERtMkRBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgxLCJhZHZTZWNyZXRLZXkiOiJ1ZWErK2hCdTdlaEpCVUZGNHRla2dpNU9EK2J5aGdMY3JCNmdNM1g3N1pvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI5c3dfWHB1VlI4bTRyNjNOVXowVmtnIiwicGhvbmVJZCI6IjFkNWEzNzNmLTM4NzEtNDU5MC1hZjAyLTNkNjBhZTc4NTNhNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzREFJUm9nUUgzNldtL0M1ZW9IbzFEcHBOeEE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM0xZMTdCcUthWjA4dE1xVGdpcXZMUEpUTXpVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjRURTYyS0FCIiwibWUiOnsiaWQiOiIyMzM1MzE1MTA1OTc6OEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTnJ3dTlBREVPYTUrTHdHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMFg2QVJHVkM1b2V2ZWtqZnFta2dKVUJsbDc4RHphbWR2MTNucEViY1FpWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQWNwSk1OU2ZTZXEzZWZOVG42ME1JZmUzQW1VYXh4NHpKNmdqdTdON0g0cFRLMi9LUW1pWCtqU1VvVzkrdGMwZkhRVUQ4VFhsMCt3cDhpcXN0bHcxQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6ImEzNGdxVVlHYzcvaWdoM3prZGZ1RnBDVWtHOU96U0p2YXNlb3Zyd1dtbk5SYzgxWFkxZjQ3QnRnc1VyVzhwWFNPYTRxTDZSRkRCbThWK3VhSFJNckNBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzNTMxNTEwNTk3OjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZEYrZ0VSbFF1YUhyM3BJMzZwcElDVkFaWmUvQTgycG5iOWQ1NlJHM0VJbSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczODQxNTM0OH0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Fredi Ezra",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 233531510597",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCKY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY|| 'yes', 
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


                  
