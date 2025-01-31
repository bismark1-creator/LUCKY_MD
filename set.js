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

 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUd0eGZDYkF0Rm1kaE0wcW5BM1BqRlpCTElvd2Y4TGRKZEM1czJLd2hFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQnpQZWNCNFpTeTU2UmZlbllKRHk3SXZoRlBsUXg3Y2thdkhLZUVaangwST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhSkR0bXh1MWR4TTNqUnpvczlDU0ZGYXQ0WmNwR0oxZlFTQmllQklaQVdnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvQmI5dElsNG5YN3BZY0ZZTHFtOW9OL2tveEVhell3VlliT3hvVWE3UWlRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBNWw1bG9LWWt6NURpcWJ4cHdQc0tsallUdjQzUlJicFNGTjVPcVRRMmM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9GQ29UanlTOGN2QXMxNi81MCs2dUZSa2Zuakp0a3Z2SUZma0tVQW1IRFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia01DazVrZGJCZ0JidUlCMlVydVZpaFFmaENoVDJudk9CQWVlV0NDZXUwQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicEp5U0lVVEE4bU5adC95cUhOcXB2UmFPclBFaS8zclJsUURoZk4vbFBHaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxWVzZGWm5YK3dlZGc5dk04dCt6OER6VzVSc25DVWVJMmJMRGs2N0NiMm1qdnlKdytJUG8xemkyU2xmMmsxMzlaZ3hmc21FUUFhM05pUkVGZjk2RGlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI0LCJhZHZTZWNyZXRLZXkiOiJRV0RjcHRUVkZaTFNNaVg2eVRod3hsWUZlWEJQcCtEajFndkdmNjhGMXlvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJKczlhQkh2QVMyeWVDTm5mUVZoZmpnIiwicGhvbmVJZCI6ImYwOTNiMmQ2LWVmMDEtNDZlYi1hYjJkLWE1MGY1Y2Y2ZDEwNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxcVlmR3NrSmxkVGt4VVJ4ZW1BZm84VXVRZjQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibkpUMTdOTVpWU2JGMUpmUXVYM2JGdklFUitJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlBTR01FWVIyIiwibWUiOnsiaWQiOiIyMzM1MzE1MTA1OTc6NEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmJ3dTlBREVMYjU3N3dHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMFg2QVJHVkM1b2V2ZWtqZnFta2dKVUJsbDc4RHphbWR2MTNucEViY1FpWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRzNEb3JVWWU2U3lEOTdXMUlkdXYwZGpGZzE4dThZS1NPNXJMNjc4NjZyS0lZOW9xN2daWkV6RURoempFbU95QldUU3pRcjFLOEpvMFZZbWVuZ0NhQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6IkczYm03SmZ3MzV6RElhU3ZzK1lZZ21CY2FuWHRFYS9kb24yUmEwYjNrbXNaYmdySmF1ejRxSElVQk9uUUNCaVlwL0IxcFRCazlkdnpGaWc0NkJkRmpnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzNTMxNTEwNTk3OjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZEYrZ0VSbFF1YUhyM3BJMzZwcElDVkFaWmUvQTgycG5iOWQ1NlJHM0VJbSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczODI3NjAzNiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFEUDcifQ==',
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
    CHATBOT : process.env.PM_CHATBOT || 'no',
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


                  
