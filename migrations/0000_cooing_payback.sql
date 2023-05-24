CREATE TABLE `blog` (
	`slug` varchar(500) PRIMARY KEY NOT NULL,
	`title` varchar(450) NOT NULL,
	`content` varchar(2000) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `blog_to_category` (
	`blog_slug` varchar(500),
	`category_slug` varchar(100)
);
--> statement-breakpoint
CREATE TABLE `category` (
	`slug` varchar(100) PRIMARY KEY NOT NULL,
	`title` varchar(50) NOT NULL,
	`parent_slug` varchar(100),
	`user_id` varchar(36) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(36) PRIMARY KEY NOT NULL,
	`full_name` varchar(50) NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(255) NOT NULL,
	`is_email_verified` boolean NOT NULL DEFAULT false,
	`role` enum('admin','user') NOT NULL DEFAULT 'user',
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
ALTER TABLE `blog` ADD CONSTRAINT `blog_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `blog_to_category` ADD CONSTRAINT `blog_to_category_blog_slug_blog_slug_fk` FOREIGN KEY (`blog_slug`) REFERENCES `blog`(`slug`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `blog_to_category` ADD CONSTRAINT `blog_to_category_category_slug_category_slug_fk` FOREIGN KEY (`category_slug`) REFERENCES `category`(`slug`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `category` ADD CONSTRAINT `category_parent_slug_category_slug_fk` FOREIGN KEY (`parent_slug`) REFERENCES `category`(`slug`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `category` ADD CONSTRAINT `category_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX `email_unique_index` ON `user` (`email`);