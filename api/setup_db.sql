-- ============================================================
-- GCBT Website - MySQL Database Setup Script
-- Run this once to initialize all tables
-- ============================================================

CREATE DATABASE IF NOT EXISTS gcbt_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gcbt_db;

-- ----------------------------------------
-- Table: courses
-- Stores all OTHM qualification programs
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS courses (
  id            VARCHAR(64)   NOT NULL PRIMARY KEY,
  title         VARCHAR(255)  NOT NULL,
  school        VARCHAR(100)  NOT NULL,
  level         VARCHAR(50)   NOT NULL,
  mode          VARCHAR(50)   NOT NULL DEFAULT 'Full-Time',
  campus        VARCHAR(100)  NOT NULL DEFAULT 'Both Campuses',
  duration      VARCHAR(100)  NOT NULL DEFAULT '12 Months',
  credits       INT           NOT NULL DEFAULT 120,
  description   TEXT,
  modules       TEXT          COMMENT 'JSON array of module strings',
  image         VARCHAR(512),
  ofqual        VARCHAR(100),
  fee_local     VARCHAR(50)   DEFAULT NULL,
  fee_international VARCHAR(50) DEFAULT NULL,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------------------
-- Table: events
-- Stores institutional calendar events
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS events (
  id            VARCHAR(64)   NOT NULL PRIMARY KEY,
  title         VARCHAR(255)  NOT NULL,
  date          VARCHAR(50)   NOT NULL,
  time          VARCHAR(50),
  location      VARCHAR(255),
  category      VARCHAR(50)   NOT NULL DEFAULT 'academic',
  description   TEXT,
  map_url       TEXT,
  map_embed     TEXT,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------------------
-- Table: faculty
-- Stores staff and faculty biographies
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS faculty (
  id            VARCHAR(64)   NOT NULL PRIMARY KEY,
  name          VARCHAR(255)  NOT NULL,
  title         VARCHAR(255),
  department    VARCHAR(100),
  campus        VARCHAR(100),
  bio           TEXT,
  image         VARCHAR(512),
  email         VARCHAR(255),
  phone         VARCHAR(50),
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------------------
-- Table: inquiries
-- Stores student contact/enquiry submissions
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS inquiries (
  id            VARCHAR(64)   NOT NULL PRIMARY KEY,
  name          VARCHAR(255)  NOT NULL,
  email         VARCHAR(255)  NOT NULL,
  phone         VARCHAR(50),
  campus        VARCHAR(100),
  course        VARCHAR(255),
  message       TEXT,
  status        ENUM('New','Contacted','In Progress','Enrolled','Closed') NOT NULL DEFAULT 'New',
  notes         TEXT,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------------------
-- Table: admin_settings
-- Stores admin configuration key-value pairs
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS admin_settings (
  setting_key   VARCHAR(100)  NOT NULL PRIMARY KEY,
  setting_value TEXT,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Seed admin passcode (change this before going live!)
INSERT IGNORE INTO admin_settings (setting_key, setting_value)
VALUES ('admin_passcode', 'gcbt2026');
