CREATE DATABASE gameDB;
USE gameDB;

CREATE TABLE `rooms` (
  `id` INT NOT NULL,
  `host_id` INT NOT NULL,
  `join_code` VARCHAR (10) NOT NULL,
  `player_count` INT NOT NULL,
  `current_judge_id` INT NOT NULL,
  `round_id` INT NOT NULL,
  PRIMARY KEY (`id`, `current_judge_id`)
);

CREATE TABLE `players` (
  `name` VARCHAR(40) NOT NULL,
  `id` INT PRIMARY KEY,
  `is_host` BOOLEAN DEFAULT false,
  `room_id` INT NOT NULL
);

CREATE TABLE `answer_cards` (
  `id` INT NOT NULL,
  `text` VARCHAR(255) NOT NULL
);

CREATE TABLE `question_cards` (
  `id` INT NOT NULL,
  `text` VARCHAR(255) NOT NULL
);

CREATE TABLE `rounds` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `question_cards_id` INT NOT NULL
);

CREATE TABLE `roundQuestionCards` (
  `id` INT NOT NULL,
  `question_cards_id` INT NOT NULL,
  `round_id` INT
);

CREATE TABLE `roundAnswerCards` (
  `id` INT NOT NULL AUTO_INCREMENT
  `answer_cards_id` INT NOT NULL,
  `round_id` INT
);

CREATE TABLE `playersAnswerCards` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `player_id` INT NOT NULL,
  `answerCardId` INT NOT NULL
);

ALTER TABLE `players` ADD FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`);

ALTER TABLE `rounds` ADD FOREIGN KEY (`id`) REFERENCES `rooms` (`round_id`);

ALTER TABLE `question_cards` ADD FOREIGN KEY (`id`) REFERENCES `roundQuestionCards` (`question_cards_id`);

ALTER TABLE `rounds` ADD FOREIGN KEY (`id`) REFERENCES `roundQuestionCards` (`round_id`);

ALTER TABLE `answer_cards` ADD FOREIGN KEY (`id`) REFERENCES `roundAnswerCards` (`answer_cards_id`);

ALTER TABLE `rounds` ADD FOREIGN KEY (`id`) REFERENCES `roundAnswerCards` (`round_id`);

ALTER TABLE `players` ADD FOREIGN KEY (`id`) REFERENCES `playersAnswerCards` (`player_id`);

ALTER TABLE `answer_cards` ADD FOREIGN KEY (`id`) REFERENCES `playersAnswerCards` (`answerCardId`);

