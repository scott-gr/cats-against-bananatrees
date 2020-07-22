CREATE TABLE `Rooms` (
  `id` int PRIMARY KEY,
  `host_id` int,
  `player_count` int,
  `current_round_id` int
);

CREATE TABLE `Rounds` (
  `id` int PRIMARY KEY,
  `game_round` int,
  `current_status` int,
  `judge_id` int,
  `question_card_id` int,
  `room_id` int,
  `winner_id` int
);

CREATE TABLE `Players` (
  `id` int PRIMARY KEY,
  `name` varchar(255),
  `socket_id` varchar(255),
  `points` int,
  `room_id` int
);

CREATE TABLE `AnswerCards` (
  `id` int,
  `text` varchar(255)
);

CREATE TABLE `QuestionCards` (
  `id` int,
  `text` varchar(255)
);

CREATE TABLE `RoundAnswerCards` (
  `id` int,
  `answer_card_id` int,
  `player_id` int,
  `round_id` int
);

CREATE TABLE `Hand` (
  `id` int,
  `player_id` int,
  `answer_card_id` int
);

ALTER TABLE `players` ADD FOREIGN KEY (`room_id`) REFERENCES `Rooms` (`id`);

ALTER TABLE `rounds` ADD FOREIGN KEY (`room_id`) REFERENCES `Rooms` (`id`);

ALTER TABLE `rounds` ADD FOREIGN KEY (`id`) REFERENCES `Rooms` (`current_round_id`);

ALTER TABLE `players` ADD FOREIGN KEY (`id`) REFERENCES `rounds` (`judge_id`);

ALTER TABLE `QuestionCards` ADD FOREIGN KEY (`id`) REFERENCES `rounds` (`question_card_id`);

ALTER TABLE `players` ADD FOREIGN KEY (`id`) REFERENCES `rounds` (`winner_id`);

ALTER TABLE `AnswerCards` ADD FOREIGN KEY (`id`) REFERENCES `roundAnswerCards` (`answer_card_id`);

ALTER TABLE `rounds` ADD FOREIGN KEY (`id`) REFERENCES `roundAnswerCards` (`round_id`);

ALTER TABLE `players` ADD FOREIGN KEY (`id`) REFERENCES `roundAnswerCards` (`player_id`);

ALTER TABLE `Hand` ADD FOREIGN KEY (`player_id`) REFERENCES `players` (`id`);

ALTER TABLE `AnswerCards` ADD FOREIGN KEY (`id`) REFERENCES `Hand` (`answer_card_id`);
