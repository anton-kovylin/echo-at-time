const redisClient = require('./redis-client');
const { groupeArray } = require('./array');

class Worker {
  constructor(client) {
    this.redisClient = client;
    this.options = { interval: 2000 };
    this.jobs = {};
  };

  schedule(jobName, timestamp, message) { 
    return this.redisClient.zaddAsync([jobName, timestamp, message]);
  };

  cancel(jobName, message) { 
    return redisClient.zremAsync([jobName, message]);
  };

  register(jobName, handler, prefetch = 5) {
    const stopPoint = prefetch - 1;

    if (this.jobs[jobName]) return Promise.reject(new Error('Job already exist'));
  
    const interval = setInterval(async () => {
      try {
        const data = await this.redisClient.zrangeAsync([jobName, 0, stopPoint, 'WITHSCORES']);
        const groupedJobsData = groupeArray(data, 2);
        groupedJobsData.forEach(item => {
          const [message, timestamp] = item;

          console.log(`Message "${message}" should be shown: ${Number(timestamp) <= Date.now()} (${timestamp} vs ${Date.now()})`);

          if (Number(timestamp) <= Date.now()) {
            handler(message);
            this.redisClient.zremAsync([jobName, message]);
          }
        });
      } catch(err) {
        console.error(`Error getting for job ${jobName}`, err);
      }
    }, this.options.interval);
  
    this.jobs[jobName] = interval;
  }
}

const worker = new Worker(redisClient);

module.exports = {
  worker
};