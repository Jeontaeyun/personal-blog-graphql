import redis from "redis";

const redisClient = redis.createClient();
redisClient.on("error", function(error) {
    console.log(`Redis Error`);
});
