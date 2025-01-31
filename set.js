const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID ||

 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUw0ZFF0Z1FMUFQ5UFZaOVAyUjFuWnJ1QVA4TUk0L0V1SC9mdXgvT3oybz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0FVUUhHQjFrNE5hZGtXblVpUmZjRERkc2NhRGp5YU1aU0RaRzBjOUhVZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBSEhwWStGaVdOS0Urei8ycUdwNWhEQmFMVnRxaDRqTzY2cjJEMnFkYzJRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1enJ4NzVhNGs2Sm5KNXRwRCs1UmhCblUzVUpqbTE1Yk12QmtzczMvOVFrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktIaFhUZm5uSkZUOHVkVGtzeVl2YlhGUGY5bTl3cmVGR25tVXR4ajhwR2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik8xd1NUK3RPc1RzaDczTUNmZDB1ekFLSjZWVHZjeGZyYkpQWWdQemJRaWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0crcVZERjgvMmVHbFNiT1Q4dTNibnJBOXh4aWZJTWxFUjk2bjNWOXlXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieGkzNWljMWdZTkNaY2l5cTB4cStMdC9kcTB0NGRkVDBZUTE3ekJtbTFsUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5obVZ6akh6d2I4TXFxZVllRkdJNVdLb01BdmdMVnVuODFoZ2RMazlOemgvNWNnaHk3SEF4LzVFbG1wRmwycnNOZjhrMDRrZzdOOS9vbVN2b296UGd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEwLCJhZHZTZWNyZXRLZXkiOiJNNnh4QzZKQlNtT3Rrc0ErQlZ5R0NqOE0rZ3IveWVtWWFlbXVnbjN4akVJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJLWVRVa1FSdFRGaW52QmV3OUl5aWxRIiwicGhvbmVJZCI6ImU4MzQ0NzE2LWQ2MjEtNDBmZS1iYTUzLTUzOGU1YzEwMmNhMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0YlVsSlZEQTBZZEdHMkN0UEtUUmJZcjJJYTg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRmh0ZjNiYlhnbkRYakdQcmVxRDVEdHIzQ0R3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IktWSjYxV1Y0IiwibWUiOnsiaWQiOiIyMzM1MzE1MTA1OTc6NkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmp3dTlBREVPeW84N3dHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMFg2QVJHVkM1b2V2ZWtqZnFta2dKVUJsbDc4RHphbWR2MTNucEViY1FpWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUjByMGlVNFIrRU4zSnAzaEZkVWcrSVRrTmd4YWV5TVkxZG11U09LcHRGd3dnLzFITnNzbFk5QmJ6ckFYcGJqSmtLNWZSelVESldBWmZJTTVLRklMRFE9PSIsImRldmljZVNpZ25hdHVyZSI6InR4UTRLZHl5K2EyMW4xWGFSY3BTck5kUTk2bWtYZ0lTOEJ4aGs4S3REVDg3ODZKTndPaEVBYUZ1MTRIdCtuUjBvcGpvdzlzSS9VWWdMbFNaYUl2cWl3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzNTMxNTEwNTk3OjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZEYrZ0VSbFF1YUhyM3BJMzZwcElDVkFaWmUvQTgycG5iOWQ1NlJHM0VJbSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczODMzMTI1N30=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Bismark",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 233531510597",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'LUCKY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY|| 'yes', 
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
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


                  
