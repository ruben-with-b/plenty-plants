INSERT INTO user_table (email, hashedPw)
values ('rudi.loderer@outlook.de', '$2b$10$1q35a/qGPtnJfey54HenaOadjJDRpSmszeiDyKIMhhDT/epRCWHIC'); -- pw: 1234

INSERT INTO plant_table (Plant_Name, SowPeriod_Begin, SowPeriod_End,
    PlantPeriod_Begin, PlantPeriod_End,
    HarvestPeriod_Begin, HarvestPeriod_End)
values ('strawberry', '2', '4',
    '5', '5',
    '6', '10');