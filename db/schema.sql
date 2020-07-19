CREATE TABLE `Rooms` (
  `id` int PRIMARY KEY,
  `host_id` int,
  `player_count` int,
  `current_round_id` int
);

CREATE TABLE `rounds` (
  `id` int PRIMARY KEY,
  `game_round` int,
  `current_status` int,
  `judge_id` int,
  `question_card_id` int,
  `room_id` int,
  `winner_id` int
);

CREATE TABLE `players` (
  `id` int PRIMARY KEY,
  `name` varchar(255),
  `socket_id` int,
  `points` int,
  `room_id` int
);

CREATE TABLE `answer_cards` (
  `id` int,
  `text` varchar(255)
);

CREATE TABLE `question_cards` (
  `id` int,
  `text` varchar(255)
);

CREATE TABLE `roundAnswerCards` (
  `id` int,
  `answer_card_id` int,
  `player_id` int,
  `round_id` int
);

CREATE TABLE `playersAnswerCards` (
  `id` int,
  `player_id` int,
  `answer_card_id` int
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
