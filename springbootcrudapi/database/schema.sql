create table ticket (
	id int primary key auto_increment,
    title varchar(255) not null,
    description text,
    status varchar(50),
    priority varchar(50),
    category varchar(50),
    assigned_to varchar(100),
    is_deleted boolean default false,
    created_at datetime default current_timestamp,
    updated_at datetime default current_timestamp on update current_timestamp
);
    
create table audit_log (
	id bigint primary key auto_increment,
    action_type varchar(50),
    timestamp datetime,
    details text
);
