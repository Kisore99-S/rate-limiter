import { createClient } from "redis";

const connectRedis = async () => {
  const redisClient = createClient();

  // Log redis connection errors
  redisClient.on("error", (error) =>
    console.log(`Redis client error: ${error}`)
  );

  try {
    await redisClient.connect();
    console.log("Connected to Redis server");
  } catch (error) {
    console.error(`Error connecting to redis server - ${error}`);
  }
  return redisClient;
};

export default connectRedis;
