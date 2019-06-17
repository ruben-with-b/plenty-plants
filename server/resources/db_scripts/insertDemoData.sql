INSERT INTO user_table (email, hashed_pw)
values ('rudi.loderer@outlook.de', '$2b$10$1q35a/qGPtnJfey54HenaOadjJDRpSmszeiDyKIMhhDT/epRCWHIC'); -- pw: 1234

INSERT INTO plant_table (plant_name, sow_period_begin, sow_period_end,
    plant_period_begin, plant_period_end,
    harvest_period_begin, harvest_period_end)
values ('strawberry', '2', '4',
    '5', '5',
    '6', '10'),
    ('arugula', '2', '2',
    '3', '3',
    '4', '4'),
    ('tomato', '2', '4',
    '5', '6',
    '7', '10');