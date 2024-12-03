-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `clientPwd` VARCHAR(191) NOT NULL,
    `clerkId` VARCHAR(191) NOT NULL,
    `emailStatus` BOOLEAN NOT NULL,
    `pfpLink` VARCHAR(191) NULL,

    UNIQUE INDEX `Client_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Driver` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `address` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `driverPwd` VARCHAR(191) NOT NULL,
    `clerkId` VARCHAR(191) NOT NULL,
    `emailStatus` BOOLEAN NOT NULL,
    `pfpLink` VARCHAR(191) NULL,

    UNIQUE INDEX `Driver_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `carBrand` VARCHAR(191) NOT NULL,
    `carModel` VARCHAR(191) NOT NULL,
    `carPicLink` VARCHAR(191) NOT NULL,
    `nbSeats` INTEGER NOT NULL,
    `driverId` INTEGER NOT NULL,

    UNIQUE INDEX `Car_driverId_key`(`driverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ride` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requestDate` DATETIME(3) NOT NULL,
    `status` ENUM('CanceledBeforeAcceptance', 'CanceledMidRide', 'Successful', 'Pending') NOT NULL,
    `payment` ENUM('CanceledBeforeAcceptance', 'CanceledMidRide', 'Successful', 'Pending') NOT NULL,
    `dateClosed` DATETIME(3) NULL,
    `adrOrigin` VARCHAR(191) NOT NULL,
    `adrDest` VARCHAR(191) NOT NULL,
    `originalPrice` INTEGER NOT NULL,
    `couponId` INTEGER NULL,
    `priceAfterCoupon` INTEGER NULL,
    `clientId` INTEGER NOT NULL,
    `driverId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dateReview` DATETIME(3) NOT NULL,
    `reviewFor` ENUM('Client', 'Driver') NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `nbStars` INTEGER NOT NULL,
    `clientId` INTEGER NULL,
    `driverId` INTEGER NULL,
    `rideId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Offer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `offerDate` DATETIME(3) NOT NULL,
    `currAddress` VARCHAR(191) NOT NULL,
    `kmDistance` DOUBLE NOT NULL,
    `timeDistance` VARCHAR(191) NOT NULL,
    `rideId` INTEGER NOT NULL,
    `driverId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coupon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `couponName` VARCHAR(191) NOT NULL,
    `percentage` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `nbUses` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ride` ADD CONSTRAINT `Ride_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ride` ADD CONSTRAINT `Ride_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ride` ADD CONSTRAINT `Ride_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `Coupon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_rideId_fkey` FOREIGN KEY (`rideId`) REFERENCES `Ride`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Offer` ADD CONSTRAINT `Offer_rideId_fkey` FOREIGN KEY (`rideId`) REFERENCES `Ride`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Offer` ADD CONSTRAINT `Offer_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
