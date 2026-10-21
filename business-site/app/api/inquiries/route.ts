import { env } from "cloudflare:workers";
import { handleInbox, handleInquiryChange } from "@/lib/contact-service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return handleInbox(request, { db: env.DB, ownerEmail: env.INBOX_OWNER_EMAIL });
}

export async function PATCH(request: Request) {
  return handleInquiryChange(request, { db: env.DB, ownerEmail: env.INBOX_OWNER_EMAIL });
}

export async function DELETE(request: Request) {
  return handleInquiryChange(request, { db: env.DB, ownerEmail: env.INBOX_OWNER_EMAIL });
}
