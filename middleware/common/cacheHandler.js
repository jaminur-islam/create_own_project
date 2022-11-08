const createHttpError = require("http-errors");
const redis = require("redis");
const keys = require("../../config/keys");
const redisUrl = keys.redisUrl;
const client = redis.createClient(redisUrl);
const { db } = require("../../prismaClient/prismaClient");
const { prismaRedisCacheHandler } = require("redis-prisma-middleware");
client.connect();
console.log("test");

/* const prismaRedisCacheHandler = (validation = 0, client) => {
  const queryMethods = [
    "findUnique",
    "findFirst",
    "findMany",
    "count",
    "aggregate",
    "groupBy",
    "findRaw",
    "aggregateRaw",
  ];

  const mutationMethods = [
    "create",
    "createMany",
    "update",
    "updateMany",
    "upsert",
    "delete",
    "deleteMany",
    "executeRawUnsafe",
  ];

  return async function redisCacheHandler(params, next) {
    let action = params.action;
    if (queryMethods.includes(action)) {
      let cached = await client.get(JSON.stringify(params));
      if (cached) {
        console.log("data form redis");
        return cached;
      } else {
        const result = await next(params);
        client.set(JSON.stringify(params), JSON.stringify(result));
        validation > 0 && client.expire(JSON.stringify(params), validation);
        return result;
      }
    } else if (mutationMethods.includes(action)) {
      const cacheKey = await client.keys(`*"model":"${params.model}"*`);
      console.log(cacheKey);
      if (cacheKey.length > 0) {
        await client.del(...cacheKey);
        const data = next(params);
        return data;
      } else {
        const data = next(params);
        return data;
      }
    }
  };
}; */

async function cacheHandler(req, res, next) {
  await db.$use(prismaRedisCacheHandler(0, client));
  next();
}

module.exports = { cacheHandler };
