import { env } from "cloudflare:workers";
import { handleInbox } from "@/lib/contact-service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return handleInbox(request, { db: env.DB, ownerEmail: env.INBOX_OWNER_EMAIL });
}
