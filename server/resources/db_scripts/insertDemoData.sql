INSERT INTO user_table (email, hashed_pw)
values
    ('rudi.loderer@outlook.de', '$2b$10$1q35a/qGPtnJfey54HenaOadjJDRpSmszeiDyKIMhhDT/epRCWHIC'), -- pw: 1234
    ('ruben.santoro@hs-augsburg.de', '$2b$10$1q35a/qGPtnJfey54HenaOadjJDRpSmszeiDyKIMhhDT/epRCWHIC'); -- pw: 1234

INSERT INTO plant_table (
    plant_name, species,
    sow_period_begin, sow_period_end,
    plant_period_begin, plant_period_end,
    harvest_period_begin, harvest_period_end,
    sowing_distance, sowing_depth,
    soil_condition, germination_time,
    number_of_harvests, difficulty)
values (
    'Erdbeere', 'Fruit',
    '2', '4',
    '5', '5',
    '6', '10',
    '50', '1',
    'feucht', '10',
    'Mehrfach', 'Moderate'),
    ('Rucola', 'Herbs',
    '2', '2',
    '3', '3',
    '4', '4',
    '50', '1',
    'feucht', '10',
    'Mehrfach', 'Moderate'),
    ('Tomate', 'Vegetables',
    '2', '4',
    '5', '6',
    '7', '10',
    '50', '1',
    'feucht', '10',
    'Mehrfach', 'Moderate');