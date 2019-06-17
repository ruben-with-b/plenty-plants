create table user_table (
    email VARCHAR(50) not null,
    hashed_pw VARCHAR(60) not null,
    primary key (email)
);

create table plant_table (
    plant_name VARCHAR(50) not null,
    sow_period_begin INT,
    sow_period_end INT,
    plant_period_begin INT,
    plant_period_end INT,
    harvest_period_begin INT,
    harvest_period_end INT,
    primary key (plant_name)
);

create table push_subscription_table (
    user_email VARCHAR(50) not null,
    push_subscription VARCHAR(1024)
)