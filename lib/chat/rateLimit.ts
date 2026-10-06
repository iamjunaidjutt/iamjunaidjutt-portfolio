import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const readLimit = (name: string, fallback: number): number => {
	const value = Number(process.env[name]);
	return Number.isInteger(value) && value > 0 ? value : fallback;
};

const minuteLimit = readLimit("CHAT_RATE_LIMIT_PER_MINUTE", 20);
const dayLimit = readLimit("CHAT_RATE_LIMIT_PER_DAY", 200);
const minuteWindowMs = 60 * 1000;
const dayWindowMs = 24 * 60 * 60 * 1000;

type MemoryEntry = {
	minuteStartedAt: number;
	minuteCount: number;
	dayStartedAt: number;
	dayCount: number;
};

const memoryLimits = new Map<string, MemoryEntry>();

const hasUpstashConfig =
	Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
	Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

const minuteLimiter = hasUpstashConfig
	? new Ratelimit({
			redis: Redis.fromEnv(),
			limiter: Ratelimit.slidingWindow(minuteLimit, "1 m"),
			prefix: "chat:minute",
		})
	: null;

const dayLimiter = hasUpstashConfig
	? new Ratelimit({
			redis: Redis.fromEnv(),
			limiter: Ratelimit.fixedWindow(dayLimit, "1 d"),
			prefix: "chat:day",
		})
	: null;

const checkMemoryLimit = (ip: string): boolean => {
	const now = Date.now();
	const entry = memoryLimits.get(ip) ?? {
		minuteStartedAt: now,
		minuteCount: 0,
		dayStartedAt: now,
		dayCount: 0,
	};

	if (now - entry.minuteStartedAt >= minuteWindowMs) {
		entry.minuteStartedAt = now;
		entry.minuteCount = 0;
	}

	if (now - entry.dayStartedAt >= dayWindowMs) {
		entry.dayStartedAt = now;
		entry.dayCount = 0;
	}

	if (entry.minuteCount >= minuteLimit || entry.dayCount >= dayLimit) {
		memoryLimits.set(ip, entry);
		return false;
	}

	entry.minuteCount += 1;
	entry.dayCount += 1;
	memoryLimits.set(ip, entry);
	return true;
};

export async function checkRateLimit(ip: string): Promise<boolean> {
	if (!minuteLimiter || !dayLimiter) {
		return checkMemoryLimit(ip);
	}

	const [minuteResult, dayResult] = await Promise.all([
		minuteLimiter.limit(ip),
		dayLimiter.limit(ip),
	]);

	return minuteResult.success && dayResult.success;
}