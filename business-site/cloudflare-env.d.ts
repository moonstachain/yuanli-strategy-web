declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    INBOX_OWNER_EMAIL?: string;
    BUCKET?: R2Bucket;
  }
}
