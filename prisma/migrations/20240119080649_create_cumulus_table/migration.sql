-- CreateTable
CREATE TABLE `Cumulus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location_name` VARCHAR(254) NOT NULL,
    `cumulus` INTEGER NOT NULL,
    `last_duration` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
