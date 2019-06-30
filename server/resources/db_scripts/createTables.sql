create table user_table (
    username VARCHAR(50) not null,
    hashed_pw VARCHAR(60) not null,
    primary key (username)
);

create table plant_table (
    plant_name VARCHAR(64) not null,
    species VARCHAR(32) not null,
    sow_period_begin INT not null,
    sow_period_end INT not null,
    plant_period_begin INT not null,
    plant_period_end INT not null,
    harvest_period_begin INT not null,
    harvest_period_end INT not null,
    sowing_distance INT not null,
    sowing_depth INT not null,
    soil_condition VARCHAR(64) not null,
    germination_time INT not null,
    number_of_harvests VARCHAR(64) not null,
    difficulty VARCHAR(32) not null,
    primary key (plant_name)
);

create table push_subscription_table (
    username VARCHAR(50) not null,
    push_subscription VARCHAR(1024)
);

create table user_garden_table (
    username VARCHAR(50) not null references user_table(username),
    plant_name VARCHAR(64) not null references plant_table(plant_name),
    tutorial_progress INT not null,
    primary key (username, plant_name)
)

create table plant_tutorial_table (
    plant_name VARCHAR(50) not null references plant_table(plant_name),
    step_number INT not null,
    heading VARCHAR(64) not null,
    body VARCHAR(1024) not null,
    primary key (plant_name, step_number)
);