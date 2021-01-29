-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 29, 2021 at 06:59 AM
-- Server version: 8.0.21
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lara_angular`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_profiles`
--

DROP TABLE IF EXISTS `admin_profiles`;
CREATE TABLE IF NOT EXISTS `admin_profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `country_id` int NOT NULL,
  `postal_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `about_me` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '/images/profile_pic/1610195962_profile.jpg',
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_profiles`
--

INSERT INTO `admin_profiles` (`id`, `user_id`, `user_name`, `first_name`, `last_name`, `address`, `city_id`, `country_id`, `postal_code`, `about_me`, `profile_pic`, `status`, `updated_at`) VALUES
(1, 1, 'admin', 'Admin', 'Demo', 'Lorum Epsum Upsum Kupsum Mipsum Jipsum Kipsum Mipsum1', 1, 1, '38000', 'Lorum Epsum Upsum Kupsum Mipsum Jipsum Kipsum Mipsum Lorum Epsum Upsum Kupsum Mipsum Jipsum Kipsum Mipsum Lorum Epsum Upsum Kupsum Mipsum Jipsum Kipsum Mipsum Lorum Epsum Upsum Kupsum Mipsum Jipsum Kipsum Mipsum', '/images/profile_pic/1610090310_profile.jpg', 1, '2020-12-16 07:05:51');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
CREATE TABLE IF NOT EXISTS `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_id` int NOT NULL,
  `state_id` int DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `country_id`, `state_id`, `is_active`, `updated_at`) VALUES
(14, 'Lahore', 4, NULL, 0, '2021-01-13 04:56:10'),
(13, 'Poughkeepsie', 9, 8, 1, '0000-00-00 00:00:00'),
(11, 'Southbury', 9, 9, 1, '0000-00-00 00:00:00'),
(10, 'Rochester', 9, 8, 1, '0000-00-00 00:00:00'),
(12, 'Boulder', 9, 10, 1, '0000-00-00 00:00:00'),
(9, 'Buffalo', 9, 8, 1, '2021-01-10 16:44:28'),
(16, 'karachi', 4, 15, 1, '2021-01-12 06:27:02'),
(17, 'faisalabad', 4, 12, 1, '0000-00-00 00:00:00'),
(18, 'faisalabad', 4, 12, 1, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `client_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_person_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email2` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `user_id`, `client_name`, `contact_person_name`, `company_name`, `email`, `email2`, `phone`, `country_code`, `is_active`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Test Client', 'Test CPN', 'Test CBRE', 'test@gmail.com', 'test@gmail.com', '03039336334', '92', '0', '2021-01-16 05:28:55', '2021-01-16 05:43:39'),
(2, NULL, 'Test Client', 'Test CPN', 'Test CBRE', 'test@gmail.com', NULL, '03039336334', '92', '1', '2021-01-16 05:33:14', '2021-01-16 05:33:25');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
CREATE TABLE IF NOT EXISTS `countries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code_3` char(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `country_flag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wrench_time` float DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `IDX_COUNTRIES_NAME` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `language_id`, `currency_id`, `code`, `code_3`, `is_active`, `country_flag`, `wrench_time`, `created_at`, `updated_at`) VALUES
(4, 'Pakistan', '1', '5', 'PK', NULL, 1, NULL, 133, '2021-01-03 12:00:52', '2021-01-03 12:00:52'),
(7, 'India', '8', '7', 'IN', NULL, 1, '', 1500, '2021-01-07 13:35:03', '2021-01-07 13:35:03'),
(9, 'United States of America', '1', '1', 'US', NULL, 1, 'null', 1700, '2021-01-10 11:44:35', '2021-01-10 11:44:35'),
(14, 'Bangladesh', '7', '8', 'BD', NULL, 1, 'null', 1650, '2021-01-10 17:40:40', '2021-01-10 17:40:40'),
(30, 'Pakistan', '1', '5', 'PK', NULL, 0, 'null', 133, '2021-01-14 08:03:15', '2021-01-14 08:03:15');

-- --------------------------------------------------------

--
-- Table structure for table `countries_details`
--

DROP TABLE IF EXISTS `countries_details`;
CREATE TABLE IF NOT EXISTS `countries_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code_3` char(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `country_flag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wrench_time` float DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `IDX_COUNTRIES_NAME` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=261 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `countries_details`
--

INSERT INTO `countries_details` (`id`, `name`, `language_code`, `currency_code`, `code`, `code_3`, `status`, `country_flag`, `wrench_time`, `created_at`, `updated_at`) VALUES
(1, 'Afghanistan', 'ps', 'AFN', 'AF', 'AFG', 1, 'C:\\fakepath\\logo13.png', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(2, 'Albania', 'sq', 'ALL', 'AL', 'ALB', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(3, 'Algeria', 'ar', 'DZD', 'DZ', 'DZA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(4, 'American Samoa', 'en', 'USD', 'AS', 'ASM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(5, 'Andorra', 'es', 'EUR', 'AD', 'AND', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(6, 'Angola', 'pt', 'AOA', 'AO', 'AGO', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(7, 'Anguilla', 'en', 'XCD', 'AI', 'AIA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(8, 'Antarctica', 'en', 'XCD', 'AQ', 'ATA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(9, 'Antigua and Barbuda', 'en', 'XCD', 'AG', 'ATG', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(11, 'Armenia', 'hy', 'AMD', 'AM', 'ARM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(12, 'Aruba', 'nl', 'AWG', 'AW', 'ABW', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(13, 'Australia', 'en', 'AUD', 'AU', 'AUS', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(14, 'Austria', 'de', 'EUR', 'AT', 'AUT', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(15, 'Azerbaijan', 'az', 'AZN', 'AZ', 'AZE', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(16, 'Bahamas', 'az', 'BSD', 'BS', 'BHS', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(17, 'Bahrain', 'ar', 'BHD', 'BH', 'BHR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(18, 'Bangladesh', 'bn', 'BDT', 'BD', 'BGD', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(19, 'Barbados', 'en', 'BBD', 'BB', 'BRB', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(20, 'Belarus', 'be', 'BYR', 'BY', 'BLR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(21, 'Belgium', 'fr', 'EUR', 'BE', 'BEL', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(22, 'Belize', 'fr', 'BZD', 'BZ', 'BLZ', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(23, 'Benin', 'fr', 'XOF', 'BJ', 'BEN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(24, 'Bermuda', 'fr', 'BMD', 'BM', 'BMU', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(25, 'Bhutan', 'dz', 'BTN', 'BT', 'BTN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(26, 'Bolivia', 'es', 'BOB', 'BO', 'BOL', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(27, 'Bosnia and Herzegowina', 'bs', NULL, 'BA', 'BIH', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(28, 'Botswana', 'en', 'BWP', 'BW', 'BWA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(29, 'Bouvet Island', 'en', 'NOK', 'BV', 'BVT', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(30, 'Brazil', 'pt', 'BRL', 'BR', 'BRA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(31, 'British Indian Ocean Territory', 'pt', 'USD', 'IO', 'IOT', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(32, 'Brunei Darussalam', 'pt', NULL, 'BN', 'BRN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(33, 'Bulgaria', 'bg', 'BGN', 'BG', 'BGR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(34, 'Burkina Faso', 'bg', 'XOF', 'BF', 'BFA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(35, 'Burundi', 'bg', 'BIF', 'BI', 'BDI', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(36, 'Cambodia', 'km', 'KHR', 'KH', 'KHM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(37, 'Cameroon', 'km', 'XAF', 'CM', 'CMR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(38, 'Canada', 'en', 'CAD', 'CA', 'CAN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(39, 'Cape Verde', 'en', 'CVE', 'CV', 'CPV', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(40, 'Cayman Islands', 'en', 'KYD', 'KY', 'CYM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(41, 'Central African Republic', 'en', 'XAF', 'CF', 'CAF', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(42, 'Chad', 'en', 'XAF', 'TD', 'TCD', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(43, 'Chile', 'es', 'CLP', 'CL', 'CHL', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(44, 'China', 'zh', 'CNY', 'CN', 'CHN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(45, 'Christmas Island', 'zh', 'AUD', 'CX', 'CXR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(46, 'Cocos (Keeling) Islands', 'zh', 'AUD', 'CC', 'CCK', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(47, 'Colombia', 'es', 'COP', 'CO', 'COL', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(48, 'Comoros', 'es', 'KMF', 'KM', 'COM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(49, 'Congo', 'es', 'XAF', 'CG', 'COG', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(50, 'Cook Islands', 'es', 'NZD', 'CK', 'COK', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(51, 'Costa Rica', 'es', 'CRC', 'CR', 'CRI', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(52, 'Cote D\'Ivoire', 'es', NULL, 'CI', 'CIV', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(53, 'Croatia', 'hr', 'HRK', 'HR', 'HRV', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(54, 'Cuba', 'es', 'CUP', 'CU', 'CUB', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(55, 'Cyprus', 'tr', 'EUR', 'CY', 'CYP', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(56, 'Czech Republic', 'cs', 'CZK', 'CZ', 'CZE', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(57, 'Denmark', 'da', 'DKK', 'DK', 'DNK', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(58, 'Djibouti', 'aa', 'DJF', 'DJ', 'DJI', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(59, 'Dominica', 'aa', 'XCD', 'DM', 'DMA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(60, 'Dominican Republic', 'es', 'DOP', 'DO', 'DOM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(61, 'East Timor', 'es', 'USD', 'TP', 'TMP', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(62, 'Ecuador', 'es', 'ECS', 'EC', 'ECU', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(63, 'Egypt', 'ar', 'EGP', 'EG', 'EGY', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(64, 'El Salvador', 'es', 'SVC', 'SV', 'SLV', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(65, 'Equatorial Guinea', 'es', 'XAF', 'GQ', 'GNQ', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(66, 'Eritrea', 'aa', 'ERN', 'ER', 'ERI', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(67, 'Estonia', 'et', 'EUR', 'EE', 'EST', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(68, 'Ethiopia', 'aa', 'ETB', 'ET', 'ETH', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(69, 'Falkland Islands (Malvinas)', 'aa', 'FKP', 'FK', 'FLK', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(70, 'Faroe Islands', 'fo', 'DKK', 'FO', 'FRO', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(71, 'Fiji', 'fo', 'FJD', 'FJ', 'FJI', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(72, 'Finland', 'fi', 'EUR', 'FI', 'FIN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(73, 'France', 'fr', 'EUR', 'FR', 'FRA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(74, 'France, Metropolitan', 'fr', NULL, 'FX', 'FXX', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(75, 'French Guiana', 'fr', 'EUR', 'GF', 'GUF', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(76, 'French Polynesia', 'fr', 'XPF', 'PF', 'PYF', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(77, 'French Southern Territories', 'fr', 'EUR', 'TF', 'ATF', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(78, 'Gabon', 'fr', 'XAF', 'GA', 'GAB', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(79, 'Gambia', 'fr', 'GMD', 'GM', 'GMB', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(80, 'Georgia', 'ka', 'GEL', 'GE', 'GEO', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(81, 'Germany', 'de', 'EUR', 'DE', 'DEU', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(82, 'Ghana', 'de', 'GHS', 'GH', 'GHA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(83, 'Gibraltar', 'de', 'GIP', 'GI', 'GIB', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(84, 'Greece', 'el', 'EUR', 'GR', 'GRC', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(85, 'Greenland', 'kl', 'DKK', 'GL', 'GRL', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(86, 'Grenada', 'kl', 'XCD', 'GD', 'GRD', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(87, 'Guadeloupe', 'kl', 'EUR', 'GP', 'GLP', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(88, 'Guam', 'kl', 'USD', 'GU', 'GUM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(89, 'Guatemala', 'es', 'QTQ', 'GT', 'GTM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(90, 'Guinea', 'es', 'GNF', 'GN', 'GIN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(91, 'Guinea-bissau', 'es', NULL, 'GW', 'GNB', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(92, 'Guyana', 'es', 'GYD', 'GY', 'GUY', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(93, 'Haiti', 'ht', 'HTG', 'HT', 'HTI', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(94, 'Heard and Mc Donald Islands', 'ht', 'AUD', 'HM', 'HMD', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(95, 'Honduras', 'es', 'HNL', 'HN', 'HND', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(96, 'Hong Kong', 'zh', 'HKD', 'HK', 'HKG', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(97, 'Hungary', 'hu', 'HUF', 'HU', 'HUN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(98, 'Iceland', 'is', 'ISK', 'IS', 'ISL', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(99, 'India', 'hi', 'INR', 'IN', 'IND', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(100, 'Indonesia', 'id', 'IDR', 'ID', 'IDN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(101, 'Iran (Islamic Republic of)', 'fa', 'IRR', 'IR', 'IRN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(102, 'Iraq', 'ar', 'IQD', 'IQ', 'IRQ', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(103, 'Ireland', 'en', 'EUR', 'IE', 'IRL', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(104, 'Israel', 'he', 'ILS', 'IL', 'ISR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(105, 'Italy', 'it', 'EUR', 'IT', 'ITA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(106, 'Jamaica', 'it', 'JMD', 'JM', 'JAM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(107, 'Japan', 'ja', 'JPY', 'JP', 'JPN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(108, 'Jordan', 'ar', 'JOD', 'JO', 'JOR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(109, 'Kazakhstan', 'kk', 'KZT', 'KZ', 'KAZ', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(110, 'Kenya', 'en', 'KES', 'KE', 'KEN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(111, 'Kiribati', 'en', 'AUD', 'KI', 'KIR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(112, 'Korea, Democratic People\'s Republic of', 'en', 'KPW', 'KP', 'PRK', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(113, 'Korea, Republic of', 'ko', 'KRW', 'KR', 'KOR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(114, 'Kuwait', 'ar', 'KWD', 'KW', 'KWT', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(115, 'Kyrgyzstan', 'ky', 'KGS', 'KG', 'KGZ', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(116, 'Lao People\'s Democratic Republic', 'lo', NULL, 'LA', 'LAO', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(117, 'Latvia', 'lv', 'LVL', 'LV', 'LVA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(118, 'Lebanon', 'ar', 'LBP', 'LB', 'LBN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(119, 'Lesotho', 'ar', 'LSL', 'LS', 'LSO', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(120, 'Liberia', 'ar', 'LRD', 'LR', 'LBR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(121, 'Libyan Arab Jamahiriya', 'ar', 'LYD', 'LY', 'LBY', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(122, 'Liechtenstein', 'ar', 'CHF', 'LI', 'LIE', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(123, 'Lithuania', 'lt', 'LTL', 'LT', 'LTU', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(124, 'Luxembourg', 'de', 'EUR', 'LU', 'LUX', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(125, 'Macau', 'de', 'MOP', 'MO', 'MAC', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(126, 'Macedonia, The Former Yugoslav Republic of', 'mk', 'MKD', 'MK', 'MKD', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(127, 'Madagascar', 'mg', 'MGF', 'MG', 'MDG', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(128, 'Malawi', 'mg', 'MWK', 'MW', 'MWI', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(129, 'Malaysia', 'ms', 'MYR', 'MY', 'MYS', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(130, 'Maldives', 'dv', 'MVR', 'MV', 'MDV', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(131, 'Mali', 'dv', 'XOF', 'ML', 'MLI', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(132, 'Malta', 'mt', 'EUR', 'MT', 'MLT', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(133, 'Marshall Islands', 'mt', 'USD', 'MH', 'MHL', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(134, 'Martinique', 'mt', 'EUR', 'MQ', 'MTQ', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(135, 'Mauritania', 'mt', 'MRO', 'MR', 'MRT', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(136, 'Mauritius', 'mt', 'MUR', 'MU', 'MUS', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(137, 'Mayotte', 'mt', 'EUR', 'YT', 'MYT', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(138, 'Mexico', 'es', 'MXN', 'MX', 'MEX', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(139, 'Micronesia, Federated States of', 'es', 'USD', 'FM', 'FSM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(140, 'Moldova, Republic of', 'es', NULL, 'MD', 'MDA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(141, 'Monaco', 'es', 'EUR', 'MC', 'MCO', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(142, 'Mongolia', 'mn', 'MNT', 'MN', 'MNG', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(143, 'Montserrat', 'mn', 'XCD', 'MS', 'MSR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(144, 'Morocco', 'ar', 'MAD', 'MA', 'MAR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(145, 'Mozambique', 'ar', 'MZN', 'MZ', 'MOZ', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(146, 'Myanmar', 'my', 'MMR', 'MM', 'MMR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(147, 'Namibia', 'my', 'NAD', 'NA', 'NAM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(148, 'Nauru', 'my', 'AUD', 'NR', 'NRU', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(149, 'Nepal', 'ne', 'NPR', 'NP', 'NPL', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(150, 'Netherlands', 'nl', 'EUR', 'NL', 'NLD', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(151, 'Netherlands Antilles', 'nl', 'ANG', 'AN', 'ANT', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(152, 'New Caledonia', 'nl', 'XPF', 'NC', 'NCL', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(153, 'New Zealand', 'en', 'NZD', 'NZ', 'NZL', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(154, 'Nicaragua', 'es', 'NIO', 'NI', 'NIC', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(155, 'Niger', 'es', 'XOF', 'NE', 'NER', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(156, 'Nigeria', 'en', 'NGN', 'NG', 'NGA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(157, 'Niue', 'en', 'NZD', 'NU', 'NIU', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(158, 'Norfolk Island', 'en', 'AUD', 'NF', 'NFK', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(159, 'Northern Mariana Islands', 'en', 'USD', 'MP', 'MNP', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(160, 'Norway', 'no', 'NOK', 'NO', 'NOR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(161, 'Oman', 'ar', 'OMR', 'OM', 'OMN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(162, 'Pakistan', 'ur', 'PKR', 'PK', 'PAK', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(163, 'Palau', 'ur', 'USD', 'PW', 'PLW', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(164, 'Panama', 'es', 'PAB', 'PA', 'PAN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(165, 'Papua New Guinea', 'es', 'PGK', 'PG', 'PNG', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(166, 'Paraguay', 'es', 'PYG', 'PY', 'PRY', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(167, 'Peru', 'es', 'PEN', 'PE', 'PER', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(168, 'Philippines', 'en', 'PHP', 'PH', 'PHL', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(169, 'Pitcairn', 'en', 'NZD', 'PN', 'PCN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(170, 'Poland', 'pl', 'PLN', 'PL', 'POL', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(171, 'Portugal', 'pt', 'EUR', 'PT', 'PRT', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(172, 'Puerto Rico', 'es', 'USD', 'PR', 'PRI', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(173, 'Qatar', 'ar', 'QAR', 'QA', 'QAT', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(174, 'Reunion', 'ar', 'EUR', 'RE', 'REU', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(175, 'Romania', 'ro', 'RON', 'RO', 'ROM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(176, 'Russian Federation', 'ru', 'RUB', 'RU', 'RUS', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(177, 'Rwanda', 'rw', 'RWF', 'RW', 'RWA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(178, 'Saint Kitts and Nevis', 'rw', 'XCD', 'KN', 'KNA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(179, 'Saint Lucia', 'rw', 'XCD', 'LC', 'LCA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(180, 'Saint Vincent and the Grenadines', 'rw', 'XCD', 'VC', 'VCT', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(181, 'Samoa', 'rw', 'WST', 'WS', 'WSM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(182, 'San Marino', 'rw', 'EUR', 'SM', 'SMR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(183, 'Sao Tome and Principe', 'rw', 'STD', 'ST', 'STP', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(184, 'Saudi Arabia', 'ar', 'SAR', 'SA', 'SAU', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(185, 'Senegal', 'fr', 'XOF', 'SN', 'SEN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(186, 'Seychelles', 'fr', 'SCR', 'SC', 'SYC', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(187, 'Sierra Leone', 'fr', 'SLL', 'SL', 'SLE', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(188, 'Singapore', 'en', 'SGD', 'SG', 'SGP', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(189, 'Slovakia (Slovak Republic)', 'sk', 'EUR', 'SK', 'SVK', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(190, 'Slovenia', 'sl', 'EUR', 'SI', 'SVN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(191, 'Solomon Islands', 'sl', 'SBD', 'SB', 'SLB', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(192, 'Somalia', 'so', 'SOS', 'SO', 'SOM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(193, 'South Africa', 'en', 'ZAR', 'ZA', 'ZAF', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(194, 'South Georgia and the South Sandwich Islands', 'en', 'GBP', 'GS', 'SGS', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(195, 'Spain', 'es', 'EUR', 'ES', 'ESP', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(196, 'Sri Lanka', 'ta', 'LKR', 'LK', 'LKA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(197, 'St. Helena', 'ta', 'SHP', 'SH', 'SHN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(198, 'St. Pierre and Miquelon', 'ta', 'EUR', 'PM', 'SPM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(199, 'Sudan', 'ar', 'SDG', 'SD', 'SDN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(200, 'Suriname', 'ar', 'SRD', 'SR', 'SUR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(201, 'Svalbard and Jan Mayen Islands', 'ar', 'NOK', 'SJ', 'SJM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(202, 'Swaziland', 'ar', 'SZL', 'SZ', 'SWZ', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(203, 'Sweden', 'sv', 'SEK', 'SE', 'SWE', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(204, 'Switzerland', 'de', 'CHF', 'CH', 'CHE', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(205, 'Syrian Arab Republic', 'ar', 'SYP', 'SY', 'SYR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(206, 'Taiwan', 'zh', NULL, 'TW', 'TWN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(207, 'Tajikistan', 'tg', 'TJS', 'TJ', 'TJK', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(208, 'Tanzania, United Republic of', 'sw', 'TZS', 'TZ', 'TZA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(209, 'Thailand', 'th', 'THB', 'TH', 'THA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(210, 'Togo', 'th', 'XOF', 'TG', 'TGO', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(211, 'Tokelau', 'th', 'NZD', 'TK', 'TKL', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(212, 'Tonga', 'th', 'TOP', 'TO', 'TON', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(213, 'Trinidad and Tobago', 'th', 'TTD', 'TT', 'TTO', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(214, 'Tunisia', 'ar', 'TND', 'TN', 'TUN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(215, 'Turkey', 'tr', 'TRY', 'TR', 'TUR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(216, 'Turkmenistan', 'tk', 'TMT', 'TM', 'TKM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(217, 'Turks and Caicos Islands', 'tk', 'USD', 'TC', 'TCA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(218, 'Tuvalu', 'tk', 'AUD', 'TV', 'TUV', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(219, 'Uganda', 'lg', 'UGX', 'UG', 'UGA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(220, 'Ukraine', 'ru', 'UAH', 'UA', 'UKR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(221, 'United Arab Emirates', 'ar', 'AED', 'AE', 'ARE', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(222, 'United Kingdom', 'en', 'GBP', 'GB', 'GBR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(223, 'United States', 'en', 'USD', 'US', 'USA', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(224, 'United States Minor Outlying Islands', 'en', 'USD', 'UM', 'UMI', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(225, 'Uruguay', 'es', 'UYU', 'UY', 'URY', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(226, 'Uzbekistan', 'uz', 'UZS', 'UZ', 'UZB', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(227, 'Vanuatu', 'uz', 'VUV', 'VU', 'VUT', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(228, 'Vatican City State (Holy See)', 'uz', 'EUR', 'VA', 'VAT', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(229, 'Venezuela', 'es', 'VEF', 'VE', 'VEN', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(230, 'Viet Nam', 'vi', 'VND', 'VN', 'VNM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(231, 'Virgin Islands (British)', 'vi', 'USD', 'VG', 'VGB', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(232, 'Virgin Islands (U.S.)', 'vi', 'USD', 'VI', 'VIR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(233, 'Wallis and Futuna Islands', 'vi', 'XPF', 'WF', 'WLF', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(234, 'Western Sahara', 'vi', 'MAD', 'EH', 'ESH', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(235, 'Yemen', 'ar', 'YER', 'YE', 'YEM', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(236, 'Yugoslavia', 'ar', NULL, 'YU', 'YUG', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(237, 'Zaire', 'ar', NULL, 'ZR', 'ZAR', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(238, 'Zambia', 'en', 'ZMW', 'ZM', 'ZMB', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(239, 'Zimbabwe', 'en', 'ZWD', 'ZW', 'ZWE', 0, '0', NULL, '2020-06-25 18:51:08', '2020-06-25 18:51:08'),
(240, 'Test', 'az', NULL, 'AZ', NULL, 0, '/api/images/country_flag/1607773058_country.PNG', NULL, '2020-12-12 03:37:38', '2020-12-12 03:37:38'),
(241, 'Test2', 'en', NULL, 'AS', NULL, 0, '/api/images/country_flag/1607774896_country.PNG', NULL, '2020-12-12 04:08:16', '2020-12-12 04:08:16'),
(242, 'Rehan Mega Group Custom', 'en', NULL, 'AC', NULL, 0, '/api/images/country_flag/1607774938_country.PNG', NULL, '2020-12-12 04:08:58', '2020-12-12 04:08:58'),
(243, 'REHAN TAX', 'en', NULL, 'AQ', NULL, 0, '/images/country_flag/1607930358_country.PNG', NULL, '2020-12-12 04:26:42', '2020-12-12 04:26:42'),
(244, 'REHAN TAXxx', 'en', NULL, 'AQ', NULL, 0, '/images/country_flag/1607928994_country.PNG', NULL, '2020-12-12 04:27:32', '2020-12-12 04:27:32'),
(245, 'dsdsd', 'en', NULL, 'AQ', NULL, 0, '/images/country_flag/1607928738_country.PNG', NULL, '2020-12-12 04:27:55', '2020-12-12 04:27:55'),
(254, 'TESTING', 'en', NULL, 'FG', NULL, 0, '/api/images/country_flag/1608187910_country.png', NULL, '2020-12-16 22:51:50', '2020-12-16 22:51:50'),
(255, 'DFGDSFDSFDSF', 'en', NULL, 'DG', NULL, 0, '/api/images/country_flag/1608188107_country.png', NULL, '2020-12-16 22:55:07', '2020-12-16 22:55:07'),
(257, 'DFGDSFDSFDSFc', 'en', NULL, 'DG', NULL, 0, '/images/country_flag/1608188184_country.png', NULL, '2020-12-16 22:56:24', '2020-12-16 22:56:24'),
(259, 'XYZ', 'en', NULL, 'XZ', NULL, 0, '/images/country_flag/1608550744_country.png', NULL, '2020-12-21 03:39:04', '2020-12-21 03:39:04'),
(260, 'Bauranae', 'en', NULL, 'SF', NULL, 0, '/images/country_flag/1608794562_country.png', NULL, '2020-12-21 22:50:59', '2020-12-21 22:50:59');

-- --------------------------------------------------------

--
-- Table structure for table `currencies`
--

DROP TABLE IF EXISTS `currencies`;
CREATE TABLE IF NOT EXISTS `currencies` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` char(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `symbol` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `symbol_position` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'left,right',
  `decimal_point` int DEFAULT '0',
  `value` double(13,8) NOT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  `is_active` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `currencies`
--

INSERT INTO `currencies` (`id`, `title`, `code`, `symbol`, `symbol_position`, `decimal_point`, `value`, `is_default`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'US Dollar', 'USD', 'USD', 'l', 2, 1.00000000, 0, 1, '2021-01-07 09:48:23', '2021-01-10 06:28:38'),
(12, 'Euro', 'EUR', 'EUR', 'r', 2, 0.82000000, 0, 1, '2021-01-10 06:36:20', '2021-01-10 09:43:30'),
(13, 'Polish Zloty', 'PLN', 'PLN', 'l', 2, 0.24000000, 0, 1, '2021-01-10 10:06:06', '2021-01-10 10:06:06'),
(15, 'Brazilian Real', 'BRL', 'BRL', 'l', 2, 0.18000000, 0, 1, '2021-01-10 10:09:02', '2021-01-10 10:09:02'),
(18, 'Angolan kwanza', 'AOA', 'AOA', 'l', 2, 653.75000000, 0, 0, '2021-01-10 12:52:04', '2021-01-13 11:37:24');

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
CREATE TABLE IF NOT EXISTS `languages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL,
  `short_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `name`, `is_active`, `updated_at`, `short_code`, `image`) VALUES
(1, 'English', 1, '2021-01-08 05:15:40', 'en', '/images/language_flag/1610082940_country.png'),
(10, 'Urdu', 1, '2021-01-08 05:14:24', 'ur', '/images/language_flag/1610082864_country.jpg'),
(15, 'Arabic', 1, '2021-01-18 06:49:05', 'ar', '/images/language_flag/1610952545_country.png');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(26, '2014_10_12_000000_create_users_table', 1),
(27, '2014_10_12_100000_create_password_resets_table', 1),
(28, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(29, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(30, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(31, '2016_06_01_000004_create_oauth_clients_table', 1),
(32, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(33, '2019_08_19_000000_create_failed_jobs_table', 1),
(34, '2020_12_18_130310_product_category', 2),
(35, '2020_12_19_072415_employee_detail', 3),
(36, '2020_12_21_060443_unit', 4),
(37, '2020_12_21_063935_material_category', 5),
(38, '2020_12_21_113939_material', 6);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

DROP TABLE IF EXISTS `oauth_access_tokens`;
CREATE TABLE IF NOT EXISTS `oauth_access_tokens` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `client_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('26176295a2d2e853c1baedb8263b9590c1dd1ca74c404387e82d16395050d90ec0660ba25578db84', 1, 5, 'Laravel Password Grant Client', '[]', 0, '2021-01-19 14:36:23', '2021-01-19 14:36:23', '2022-01-19 06:36:23');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

DROP TABLE IF EXISTS `oauth_auth_codes`;
CREATE TABLE IF NOT EXISTS `oauth_auth_codes` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `client_id` bigint UNSIGNED NOT NULL,
  `scopes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_auth_codes_user_id_index` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

DROP TABLE IF EXISTS `oauth_clients`;
CREATE TABLE IF NOT EXISTS `oauth_clients` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'f2zgqKmaPuRbs6ATBj3E4vhEq5iV07r8oFmtYnZG', NULL, 'http://localhost', 1, 0, 0, '2020-12-07 15:49:01', '2020-12-07 15:49:01'),
(2, NULL, 'Laravel Password Grant Client', 'cWpRt7rIFjfbOSwIsSTu0F9njsfZmYjAb4nT1NU9', 'users', 'http://localhost', 0, 1, 0, '2020-12-07 15:49:01', '2020-12-07 15:49:01'),
(3, NULL, 'Laravel Personal Access Client', 'S9TUxrKlebuBUr394g7WGitcUq0swe4TyCNmyaWt', NULL, 'http://localhost', 1, 0, 0, '2020-12-07 15:49:08', '2020-12-07 15:49:08'),
(4, NULL, 'Laravel Password Grant Client', 'rdTJ1P81AZUzPDXWnCFH4mokPMbwfjeRyvH6P9eH', 'users', 'http://localhost', 0, 1, 0, '2020-12-07 15:49:08', '2020-12-07 15:49:08'),
(5, NULL, 'Laravel Personal Access Client', '1NGSVPDayGEt8dLcDhJrz4yjZpTARAZ8ouhT4A3B', NULL, 'http://localhost', 1, 0, 0, '2020-12-24 22:38:26', '2020-12-24 22:38:26'),
(6, NULL, 'Laravel Password Grant Client', 'AQiYcqmh6vaZf5qwseMWhuolR5TfBLAL0idKx6gs', 'users', 'http://localhost', 0, 1, 0, '2020-12-24 22:38:26', '2020-12-24 22:38:26');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

DROP TABLE IF EXISTS `oauth_personal_access_clients`;
CREATE TABLE IF NOT EXISTS `oauth_personal_access_clients` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2020-12-07 15:49:01', '2020-12-07 15:49:01'),
(2, 3, '2020-12-07 15:49:08', '2020-12-07 15:49:08'),
(3, 5, '2020-12-24 22:38:26', '2020-12-24 22:38:26');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

DROP TABLE IF EXISTS `oauth_refresh_tokens`;
CREATE TABLE IF NOT EXISTS `oauth_refresh_tokens` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2147483647 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `updated_at`) VALUES
(1, 'View Countries', '2021-01-20 20:59:29'),
(2, 'Create Countries', '2021-01-20 20:59:29'),
(3, 'Update Countries', '2021-01-20 20:59:29'),
(4, 'Delete Countries', '2021-01-20 20:59:29'),
(5, 'View States', '2021-01-20 20:59:29'),
(6, 'Create States', '2021-01-20 20:59:29'),
(7, 'Update States', '2021-01-20 20:59:29'),
(8, 'Delete States', NULL),
(9, 'View Cities', '2021-01-20 20:59:29'),
(10, 'Create Cities', '2021-01-20 20:59:29'),
(11, 'Update Cities', '2021-01-20 20:59:29'),
(12, 'Delete Cities', '2021-01-20 20:59:29'),
(13, 'View Zones', '2021-01-20 20:59:29'),
(14, 'Create Zones', '2021-01-20 20:59:29'),
(15, 'Update Zones', '2021-01-20 20:59:29'),
(16, 'Delete Zones', '2021-01-20 20:59:29'),
(17, 'View Map Zone', '2021-01-20 20:59:29'),
(18, 'View Languages', '2021-01-20 20:59:29'),
(19, 'Create Languages', '2021-01-20 20:59:29'),
(20, 'Update Languages', '2021-01-20 20:59:29'),
(21, 'Delete Languages', '2021-01-20 20:59:29'),
(22, 'View Currencies', '2021-01-20 20:59:29'),
(23, 'Create Currencies', '2021-01-20 20:59:29'),
(24, 'Update Currencies', '2021-01-20 20:59:29'),
(25, 'Delete Currencies', '2021-01-20 20:59:29'),
(26, 'View Locations', '2021-01-20 20:59:29'),
(27, 'Create Locations', '2021-01-20 20:59:29'),
(28, 'Update Locations', '2021-01-20 20:59:29'),
(29, 'Delete Locations', '2021-01-20 20:59:29'),
(30, 'View Users', '2021-01-20 20:59:29'),
(31, 'Create Users', '2021-01-20 20:59:29'),
(32, 'Update Users', '2021-01-20 20:59:29'),
(33, 'Delete Users', '2021-01-20 20:59:29'),
(34, 'View Location Map', NULL),
(35, 'View Roles', '2021-01-20 20:59:29'),
(36, 'Create Roles', '2021-01-20 20:59:29'),
(37, 'Update Roles', '2021-01-20 20:59:29'),
(38, 'Delete Roles', '2021-01-20 20:59:29'),
(39, 'Update Permissions', NULL),
(40, 'View Clients', '2021-01-20 20:59:29'),
(41, 'Create Clients', '2021-01-20 20:59:29'),
(42, 'Update Clients', '2021-01-20 20:59:29'),
(43, 'Delete Clients', '2021-01-20 20:59:29'),
(44, 'View Agency', '2021-01-20 20:59:29'),
(45, 'Create Agency', '2021-01-20 20:59:29'),
(46, 'Update Agency', '2021-01-20 20:59:29'),
(47, 'Delete Agency', '2021-01-20 20:59:29'),
(48, 'View Work Force Category', '2021-01-20 20:59:29'),
(49, 'Create Work Force Category', '2021-01-20 20:59:29'),
(50, 'Update Work Force Category', '2021-01-20 20:59:29'),
(51, 'Delete Work Force Category', '2021-01-20 20:59:29'),
(52, 'View Discipline', '2021-01-20 20:59:29'),
(53, 'Create Discipline', '2021-01-20 20:59:29'),
(54, 'Update Discipline', '2021-01-20 20:59:29'),
(55, 'Delete Discipline', '2021-01-20 20:59:29'),
(56, 'View Task', '2021-01-20 20:59:29'),
(57, 'Create Task', '2021-01-20 20:59:29'),
(58, 'Update Task', '2021-01-20 20:59:29'),
(59, 'Delete Task', '2021-01-20 20:59:29'),
(60, 'View Qoutation', '2021-01-20 20:59:29'),
(61, 'Create Qoutation', '2021-01-20 20:59:29'),
(62, 'Update Qoutation', '2021-01-20 20:59:29'),
(63, 'Delete Qoutation', '2021-01-20 20:59:29'),
(64, 'View Material', '2021-01-20 20:59:29'),
(65, 'Create Material', '2021-01-20 20:59:29'),
(66, 'Update Material', '2021-01-20 20:59:29'),
(67, 'Delete Material', '2021-01-20 20:59:29'),
(68, 'View Material Category', '2021-01-20 20:59:29'),
(69, 'Create Material Category', '2021-01-20 20:59:29'),
(70, 'Update Material Category', '2021-01-20 20:59:29'),
(71, 'Delete Material Category', '2021-01-20 20:59:29'),
(72, 'View Material Vendor', '2021-01-20 20:59:29'),
(73, 'Create Material Vendor', '2021-01-20 20:59:29'),
(74, 'Update Material Vendor', '2021-01-20 20:59:29'),
(75, 'Delete Material Vendor', '2021-01-20 20:59:29'),
(76, 'View Material Manufacturer', '2021-01-20 20:59:29'),
(77, 'Create Material Manufacturer', '2021-01-20 20:59:29'),
(78, 'Update Material Manufacturer', '2021-01-20 20:59:29'),
(79, 'Delete Material Manufacturer', '2021-01-20 20:59:29'),
(80, 'View Material Distributor', '2021-01-20 20:59:29'),
(81, 'Create Material Distributor', '2021-01-20 20:59:29'),
(82, 'Update Material Distributor', '2021-01-20 20:59:29'),
(83, 'Delete Material Distributor', '2021-01-20 20:59:29'),
(84, 'View Unit', '2021-01-20 20:59:29'),
(85, 'Create Unit', '2021-01-20 20:59:29'),
(86, 'Update Unit', '2021-01-20 20:59:29'),
(87, 'Delete Unit', '2021-01-20 20:59:29'),
(88, 'View Task Category', '2021-01-20 20:59:29'),
(89, 'Create Task Category', '2021-01-20 20:59:29'),
(90, 'Update Task Category', '2021-01-20 20:59:29'),
(91, 'Delete Task Category', '2021-01-20 20:59:29'),
(92, 'View Work Force', '2021-01-20 20:59:29'),
(93, 'Create Work Force', '2021-01-20 20:59:29'),
(94, 'Update Work Force', '2021-01-20 20:59:29'),
(95, 'Delete Work Force', '2021-01-20 20:59:29'),
(96, 'View Rate Card', '2021-01-20 20:59:29'),
(97, 'Create Rate Card', '2021-01-20 20:59:29'),
(98, 'Update Rate Card', '2021-01-20 20:59:29'),
(99, 'Delete Rate Card', '2021-01-20 20:59:29');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `is_active`, `updated_at`) VALUES
(2, 'ADMIN', 1, '2021-01-09 11:58:45'),
(1, 'SUPER ADMIN', 1, '0000-00-00 00:00:00'),
(3, 'workforce', 1, '2021-01-15 11:05:57');

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
CREATE TABLE IF NOT EXISTS `role_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`id`, `role_id`, `permission_id`, `updated_at`) VALUES
(14, 1, 1, NULL),
(15, 1, 2, NULL),
(18, 1, 3, NULL),
(19, 1, 4, NULL),
(20, 1, 5, NULL),
(21, 1, 6, NULL),
(22, 1, 7, NULL),
(23, 1, 8, NULL),
(24, 1, 9, NULL),
(25, 1, 10, NULL),
(26, 1, 11, NULL),
(27, 1, 12, NULL),
(28, 1, 13, NULL),
(29, 1, 14, NULL),
(30, 1, 15, NULL),
(31, 1, 16, NULL),
(32, 1, 17, NULL),
(33, 1, 18, NULL),
(34, 1, 19, NULL),
(35, 1, 20, NULL),
(36, 1, 21, NULL),
(37, 1, 22, NULL),
(38, 1, 23, NULL),
(39, 1, 24, NULL),
(40, 1, 25, NULL),
(41, 1, 26, NULL),
(42, 1, 27, NULL),
(43, 1, 28, NULL),
(44, 1, 29, NULL),
(45, 1, 30, NULL),
(46, 1, 31, NULL),
(47, 1, 32, NULL),
(48, 1, 33, NULL),
(49, 1, 34, NULL),
(50, 1, 35, NULL),
(51, 1, 36, NULL),
(52, 1, 37, NULL),
(53, 1, 38, NULL),
(54, 1, 39, NULL),
(55, 1, 40, NULL),
(56, 1, 41, NULL),
(57, 1, 42, NULL),
(58, 1, 43, NULL),
(59, 1, 44, NULL),
(60, 1, 45, NULL),
(61, 1, 46, NULL),
(62, 1, 47, NULL),
(63, 1, 48, NULL),
(64, 1, 49, NULL),
(65, 1, 50, NULL),
(66, 1, 51, NULL),
(67, 1, 52, NULL),
(68, 1, 53, NULL),
(69, 1, 54, NULL),
(70, 1, 55, NULL),
(71, 1, 56, NULL),
(72, 1, 57, NULL),
(73, 1, 58, NULL),
(74, 1, 59, NULL),
(75, 1, 60, NULL),
(76, 1, 61, NULL),
(77, 1, 62, NULL),
(78, 1, 63, NULL),
(79, 1, 64, NULL),
(80, 1, 65, NULL),
(81, 1, 66, NULL),
(82, 1, 67, NULL),
(83, 1, 68, NULL),
(84, 1, 69, NULL),
(85, 1, 70, NULL),
(86, 1, 71, NULL),
(87, 1, 72, NULL),
(88, 1, 73, NULL),
(89, 1, 74, NULL),
(90, 1, 75, NULL),
(91, 1, 76, NULL),
(92, 1, 77, NULL),
(93, 1, 78, NULL),
(94, 1, 79, NULL),
(95, 1, 80, NULL),
(96, 1, 81, NULL),
(97, 1, 82, NULL),
(98, 1, 83, NULL),
(99, 1, 84, NULL),
(100, 1, 85, NULL),
(101, 1, 86, NULL),
(102, 1, 87, NULL),
(103, 1, 88, NULL),
(104, 1, 89, NULL),
(105, 1, 90, NULL),
(106, 1, 91, NULL),
(107, 1, 92, NULL),
(108, 1, 93, NULL),
(109, 1, 94, NULL),
(110, 1, 95, NULL),
(111, 1, 40, NULL),
(112, 1, 42, NULL),
(113, 1, 96, NULL),
(114, 1, 97, NULL),
(115, 1, 98, NULL),
(116, 1, 99, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role_users`
--

DROP TABLE IF EXISTS `role_users`;
CREATE TABLE IF NOT EXISTS `role_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_users`
--

INSERT INTO `role_users` (`id`, `user_id`, `role_id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sites`
--

DROP TABLE IF EXISTS `sites`;
CREATE TABLE IF NOT EXISTS `sites` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `zone_id` int DEFAULT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `state_id` int DEFAULT NULL,
  `country_id` int DEFAULT NULL,
  `latitude` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `longitude` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `teamleader_id` int NOT NULL,
  `presold_hours` float NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
CREATE TABLE IF NOT EXISTS `states` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_id` int NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `name`, `country_id`, `is_active`, `updated_at`) VALUES
(11, 'Washington', 9, 0, '2021-01-13 04:57:12'),
(9, 'Connecticut', 9, 1, '0000-00-00 00:00:00'),
(10, 'Colorado', 9, 1, '0000-00-00 00:00:00'),
(8, 'New York', 9, 1, '0000-00-00 00:00:00'),
(12, 'punjab', 4, 1, '0000-00-00 00:00:00'),
(15, 'sindh', 4, 1, '2021-01-12 06:07:02');

-- --------------------------------------------------------

--
-- Table structure for table `task_category`
--

DROP TABLE IF EXISTS `task_category`;
CREATE TABLE IF NOT EXISTS `task_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `parent_id` int DEFAULT '0',
  `description` varchar(191) DEFAULT NULL,
  `is_active` int DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `task_category`
--

INSERT INTO `task_category` (`id`, `name`, `parent_id`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(14, 'MULTI FIBER CABLING', NULL, NULL, 1, '2021-01-22 04:37:36', '2021-01-22 04:37:36'),
(13, 'FIBER OPTIC PATCHING', NULL, NULL, 1, '2021-01-22 04:37:15', '2021-01-22 04:37:15'),
(12, 'Removals', NULL, NULL, 1, '2021-01-22 04:36:24', '2021-01-22 04:36:24'),
(11, 'CABINETS AND RACKS', NULL, NULL, 1, '2021-01-22 04:35:53', '2021-01-22 04:35:53'),
(10, 'RACK MOUNT ELECTRONICS GENERIC', NULL, NULL, 1, '2021-01-22 04:35:31', '2021-01-22 04:35:31'),
(15, 'NLYTE', NULL, NULL, 1, '2021-01-22 04:38:10', '2021-01-22 04:38:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `second_email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` int DEFAULT NULL,
  `city` int DEFAULT NULL,
  `state` int DEFAULT NULL,
  `phone` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `forgrt_pass_token` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_first_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `name`, `role_id`, `email`, `second_email`, `country`, `city`, `state`, `phone`, `img`, `email_verified_at`, `password`, `remember_token`, `forgrt_pass_token`, `created_at`, `updated_at`, `is_active`) VALUES
(1, 'Super', 'Admin', 'Super Admin', 1, 'admin@gmail.com', NULL, 4, 14, 1, '77777777799', '1608719467_mansha.jpg', NULL, '$2y$10$C9GRfeOZvaLtdeNLcP/0GuQhd3diHRGxZMqYUGO21uE5V5.b9ltem', NULL, NULL, '2020-12-23 05:31:08', '2021-01-08 21:11:27', 1);

-- --------------------------------------------------------

--
-- Table structure for table `zones`
--

DROP TABLE IF EXISTS `zones`;
CREATE TABLE IF NOT EXISTS `zones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_id` int DEFAULT NULL,
  `state_id` int DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `coordinates` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_active` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `zones`
--

INSERT INTO `zones` (`id`, `name`, `country_id`, `state_id`, `city_id`, `coordinates`, `is_active`, `updated_at`) VALUES
(22, 'test', 4, NULL, 14, '[{\"lat\":\"31.68829\",\"lng\":\"74.17747\"},{\"lat\":\"31.48549\",\"lng\":\"74.31472\"},{\"lat\":\"31.48549\",\"lng\":\"74.04022\"}]', '1', '2021-01-13 05:06:07'),
(18, 'NY / CONN', 9, NULL, 11, '[{\"lat\":\"41.95507\",\"lng\":\"-74.08378\"},{\"lat\":\"41.71367\",\"lng\":\"-72.8297\"},{\"lat\":\"41.09987\",\"lng\":\"-71.69648\"},{\"lat\":\"40.43436\",\"lng\":\"-74.28598\"},{\"lat\":\"40.43436\",\"lng\":\"-74.59569\"},{\"lat\":\"41.24872\",\"lng\":\"-74.65834\"}]', '0', '2021-01-13 05:09:08'),
(19, 'Gulberg Town', 4, NULL, 14, NULL, '1', '2021-01-10 14:12:11'),
(20, 'awd', NULL, NULL, NULL, NULL, '1', '0000-00-00 00:00:00'),
(21, 'test1', 4, NULL, 16, '[{\"lat\":\"31.60634\",\"lng\":\"74.21867\"},{\"lat\":\"31.40354\",\"lng\":\"74.35581\"},{\"lat\":\"31.40354\",\"lng\":\"74.08154\"}]', '1', '2021-01-12 07:48:02');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
