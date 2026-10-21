import { env } from "cloudflare:workers";
import { handleContact } from "@/lib/contact-service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleContact(request, { db: env.DB });
}
