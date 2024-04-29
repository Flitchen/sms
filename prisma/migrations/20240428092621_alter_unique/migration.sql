-- CreateTable
CREATE TABLE `course` (
    `c_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(60) NOT NULL,

    PRIMARY KEY (`c_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam` (
    `e_id` INTEGER NOT NULL AUTO_INCREMENT,
    `c_id` INTEGER NOT NULL,
    `s_id` INTEGER NOT NULL,
    `marks` INTEGER NOT NULL,

    INDEX `c_id_idx`(`c_id`),
    INDEX `s_id_idx`(`s_id`),
    PRIMARY KEY (`e_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `programme` (
    `p_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`p_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
    `s_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fname` VARCHAR(250) NOT NULL,
    `mname` VARCHAR(250) NULL,
    `lname` VARCHAR(250) NOT NULL,
    `gender` VARCHAR(10) NOT NULL,
    `year_started` INTEGER NOT NULL,
    `phone_number` VARCHAR(45) NOT NULL,
    `p_id` INTEGER NOT NULL,
    `password` VARCHAR(250) NOT NULL,

    UNIQUE INDEX `student_phone_number_key`(`phone_number`),
    INDEX `p_id_idx`(`p_id`),
    PRIMARY KEY (`s_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fname` VARCHAR(245) NOT NULL,
    `mname` VARCHAR(245) NULL,
    `lname` VARCHAR(245) NOT NULL,
    `phone` VARCHAR(45) NOT NULL,
    `password` VARCHAR(250) NOT NULL,

    UNIQUE INDEX `admin_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `exam` ADD CONSTRAINT `c_id` FOREIGN KEY (`c_id`) REFERENCES `course`(`c_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam` ADD CONSTRAINT `s_id` FOREIGN KEY (`s_id`) REFERENCES `student`(`s_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `p_id` FOREIGN KEY (`p_id`) REFERENCES `programme`(`p_id`) ON DELETE NO ACTION ON UPDATE CASCADE;
