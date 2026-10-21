CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`request_key` text NOT NULL,
	`payload_hash` text NOT NULL,
	`name` text NOT NULL,
	`business` text NOT NULL,
	`question` text NOT NULL,
	`contact_type` text NOT NULL,
	`contact_value` text NOT NULL,
	`created_at` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`submitted_by` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `inquiries_request_key_unique` ON `inquiries` (`request_key`);--> statement-breakpoint
CREATE INDEX `inquiries_created_at_idx` ON `inquiries` (`created_at`);--> statement-breakpoint
CREATE INDEX `inquiries_contact_created_idx` ON `inquiries` (`contact_value`,`created_at`);