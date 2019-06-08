create table user_table (
    Email VARCHAR(50) not null,
    HashedPw VARCHAR(60) not null,
    primary key (Email)
);

create table plant_table (
    Plant_Name VARCHAR(50) not null,
    SowPeriod_Begin INT,
    SowPeriod_End INT,
    PlantPeriod_Begin INT,
    PlantPeriod_End INT,
    HarvestPeriod_Begin INT,
    HarvestPeriod_End INT,
    primary key (Plant_Name)
);