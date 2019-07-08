INSERT INTO user_table (username, hashed_pw)
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
    number_of_harvests, difficulty,
    plant_location)
values (
    'Erdbeere', 'Fruit',
    '2', '4',
    '5', '5',
    '6', '10',
    '50', '1',
    'feucht', '10',
    'Mehrfach', 'Moderate',
    'Sonne'),
    ('Rucola', 'Herbs',
    '2', '2',
    '3', '3',
    '4', '4',
    '50', '1',
    'feucht', '10',
    'Mehrfach', 'Moderate',
    'Sonne/Halbschatten'),
    ('Tomate', 'Vegetables',
    '2', '4',
    '5', '6',
    '7', '10',
    '50', '1',
    'feucht', '10',
    'Mehrfach', 'Moderate',
    'Sonne');

INSERT INTO plant_tutorial_table (
    plant_name, 
    step_number, 
    heading, 
    body
    )
values (
    'Tomate', 
    '1', 
    'Schritt 1', 
    'Beschreibung von Schritt 1 (Tomate)'
    ),(
    'Tomate', 
    '2', 
    'Schritt 2', 
    'Beschreibung von Schritt 2 (Tomate)'
    ),(
    'Tomate', 
    '3', 
    'Schritt 3', 
    'Beschreibung von Schritt 3 (Tomate)'
    ),(
    'Erdbeere', 
    '1', 
    'Schritt 1', 
    'Beschreibung von Schritt 1 (Erdbeere)'
    ),(
    'Erdbeere', 
    '2', 
    'Schritt 2', 
    'Beschreibung von Schritt 2 (Erdbeere)'
    ),(
    'Erdbeere', 
    '3', 
    'Schritt 3', 
    'Beschreibung von Schritt 3 (Erdbeere)'
    ),(
    'Rucola', 
    '1', 
    'Schritt 1', 
    'Beschreibung von Schritt 1 (Rucola)'
    ),(
    'Rucola', 
    '2', 
    'Schritt 2', 
    'Beschreibung von Schritt 2 (Rucola)'
    ),(
    'Rucola', 
    '3', 
    'Schritt 3', 
    'Beschreibung von Schritt 3 (Rucola)'
    );