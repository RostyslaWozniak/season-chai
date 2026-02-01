CREATE TYPE "public"."user_roles" AS ENUM('ADMIN', 'CLIENT');--> statement-breakpoint
CREATE TABLE "user_oauth_accounts" (
	"user_id" uuid NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_oauth_accounts_provider_account_id_unique" UNIQUE("provider_account_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"photo" varchar(255),
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(255),
	"is_verified" boolean DEFAULT false NOT NULL,
	"roles" "user_roles"[] DEFAULT '{"CLIENT"}' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "user_oauth_accounts" ADD CONSTRAINT "user_oauth_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "provider_account_id" ON "user_oauth_accounts" USING btree ("provider_account_id");--> statement-breakpoint
CREATE INDEX "user_id_index" ON "users" USING btree ("id");--> statement-breakpoint
CREATE INDEX "user_email_index" ON "users" USING btree ("email");