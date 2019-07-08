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
    '50', '0',
    'feucht', '28',
    'ab Juni', 'Serious',
    'Sonne'),
    ('Rucola', 'Herbs',
    '2', '2',
    '3', '3',
    '4', '4',
    '50', '1',
    'feucht', '10',
    'mehrfach', 'Simple',
    'Sonne/Halbschatten'),
    ('Tomate', 'Vegetables',
    '2', '4',
    '5', '6',
    '7', '10',
    '60', '0',
    'feucht', '10',
    'ab Juli', 'Serious',
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
    'Aussaat',
    'Pflanze die Tomatensamen zwischen Februar und April 1cm tief in kleine Töpfe und ziehe sie an einem sonnigen Fensterplatz groß.'
    ),(
    'Tomate', 
    '2', 
    'Keimung',
    'Die Tomaten mögen es warm (20-30°). Nach etwa 10 Tagen siehst du die Pflänzchen.'
    ),(
    'Tomate', 
    '3', 
    'Pflanzen',
    'Nach 8-12 Wochen kannst du die Tomaten um-pflanzen. Tomaten sind sehr frostempfindlich und dürfen deshalb erst ab Juni nach draußen.'
    ),(
    'Tomate',
    '4',
    'Pflanzen',
    'Die Tomaten sind jetzt 20-30 cm hoch und haben erste Blütenknospen. Die Pflanzen mit einem Abstand von 45-60 cm in komposthaltige Erde einpflanzen.'
    ),(
    'Tomate',
    '5',
    'Gießen',
    'Zwei mal die Woche, bei Sonnenschein täglich die Wurzeln/Erde gießen. Wasser auf Blättern vermeiden, sonst gibt es Braunfäule.'
    ),(
    'Tomate',
    '6',
    'Ernte',
    'Tomatenfrüchte gibt es bis Oktober. Die Tomaten ernten, wenn sie zu drei vierteln rot verfärbt sind.'
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