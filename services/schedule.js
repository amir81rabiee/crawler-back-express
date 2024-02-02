const schedule = require('node-schedule');
const scheduleJob = (cb)=>{
const job = schedule.scheduleJob('5 * * * * *', cb)
}
  module.exports = scheduleJob