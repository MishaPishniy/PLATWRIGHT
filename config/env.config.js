const dotenv = require('dotenv')

function config() {
if (process.env.TEST_ENV === 'QA') 
{
    dotenv.config({path: './.env.qa'})
} else if (process.env.TEST_ENV === 'STAGE' ) 
{
     dotenv.config({path: './.env.stage'})
} else {
    throw new Error ('NO ENV')
}
}
module.exports.config = config