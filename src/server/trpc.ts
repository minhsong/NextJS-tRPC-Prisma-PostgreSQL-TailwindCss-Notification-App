import { initTRPC } from "@trpc/server";

const t = initTRPC.create(); // No context provided

export { t };
