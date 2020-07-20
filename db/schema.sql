CREATE TABLE `Rooms` (
  `id` INT NOT NULL PRIMARY KEY,
  `host_id` INT NOT NULL,
  `player_count` INT NOT NULL,
  `current_round_id` INT NOT NULL
);

CREATE TABLE `rounds` (
  `id` INT NOT NULL PRIMARY KEY,
  `game_round` INT NOT NULL,
  `current_status` INT NOT NULL,
  `judge_id` INT NOT NULL,
  `question_card_id` INT NOT NULL,
  `room_id` INT NOT NULL,
  `winner_id` INT NOT NULL
);

CREATE TABLE `players` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` varchar(255),
<<<<<<< HEAD
  `socket_id` INT NOT NULL,
  `poINT NOT NULLs` INT NOT NULL,
  `room_id` INT NOT NULL
=======
  `socket_id` varchar(255),
  `points` int,
  `room_id` int
>>>>>>> fe53436b5eab74ee1fe53a4793486205a6ef3e65
);

CREATE TABLE `answer_cards` (
  `id` INT NOT NULL,
  `text` varchar(255)
);

CREATE TABLE `question_cards` (
  `id` INT NOT NULL,
  `text` varchar(255)
);

CREATE TABLE `roundAnswerCards` (
  `id` INT NOT NULL,
  `answer_card_id` INT NOT NULL,
  `player_id` INT NOT NULL,
  `round_id` INT NOT NULL
);

CREATE TABLE `playersAnswerCards` (
  `id` INT NOT NULL,
  `player_id` INT NOT NULL,
  `answer_card_id` INT NOT NULL
);

ALTER TABLE `players` ADD FOREIGN KEY (`room_id`) REFERENCES `Rooms` (`id`);

ALTER TABLE `rounds` ADD FOREIGN KEY (`room_id`) REFERENCES `Room` (`id`);

ALTER TABLE `rounds` ADD FOREIGN KEY (`id`) REFERENCES `Rooms` (`current_round_id`);

ALTER TABLE `players` ADD FOREIGN KEY (`id`) REFERENCES `rounds` (`judge_id`);

ALTER TABLE `question_cards` ADD FOREIGN KEY (`id`) REFERENCES `rounds` (`question_card_id`);

ALTER TABLE `players` ADD FOREIGN KEY (`id`) REFERENCES `rounds` (`winner_id`);

ALTER TABLE `answer_cards` ADD FOREIGN KEY (`id`) REFERENCES `roundAnswerCards` (`answer_card_id`);

ALTER TABLE `rounds` ADD FOREIGN KEY (`id`) REFERENCES `roundAnswerCards` (`round_id`);

ALTER TABLE `players` ADD FOREIGN KEY (`id`) REFERENCES `roundAnswerCards` (`player_id`);

ALTER TABLE `playersAnswerCards` ADD FOREIGN KEY (`player_id`) REFERENCES `players` (`id`);

ALTER TABLE `answer_cards` ADD FOREIGN KEY (`id`) REFERENCES `playersAnswerCards` (`answer_card_id`);
