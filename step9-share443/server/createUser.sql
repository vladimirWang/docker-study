create table if not exists user (
	id int not null auto_increment,
	username varchar(32) not null,
	primary key(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;