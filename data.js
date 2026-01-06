// Victorian Coastal Monitoring Program Sites
// All VCMP monitoring locations across Victoria

const victorianSites = [
    {"id": "port-fairy", "name": "Port Fairy", "lat": -38.3750687, "lon": 142.245636, "active": true, "surveys": 69, "firstSurvey": "2018", "coastlineKm": 5.6},
    {"id": "inverloch", "name": "Inverloch", "lat": -38.6369057, "lon": 145.7277069, "active": false, "surveys": 69, "firstSurvey": "2018", "coastlineKm": 2.8},
    {"id": "cowes", "name": "Cowes", "lat": -38.4479675, "lon": 145.2403107, "active": false, "surveys": 58, "firstSurvey": "2018", "coastlineKm": 4.2},
    {"id": "anglesea---demons-bluff", "name": "Anglesea - Demons Bluff", "lat": -38.4068336, "lon": 144.1994629, "active": false, "surveys": 61, "firstSurvey": "2018", "coastlineKm": 2.6},
    {"id": "portarlington", "name": "Portarlington", "lat": -38.1131058, "lon": 144.6522217, "active": false, "surveys": 50, "firstSurvey": "2018", "coastlineKm": 4.7},
    {"id": "aireys-inlet", "name": "Aireys Inlet", "lat": -38.4608727, "lon": 144.1105194, "active": false, "surveys": 9, "firstSurvey": "2022", "coastlineKm": 3.0},
    {"id": "altona", "name": "Altona", "lat": -37.8706856, "lon": 144.8294678, "active": false, "surveys": 30, "firstSurvey": "2022", "coastlineKm": 3.3},
    {"id": "altona-coastal-park", "name": "Altona Coastal Park", "lat": -37.8604698, "lon": 144.8632812, "active": false, "surveys": 6, "firstSurvey": "2024", "coastlineKm": 1.2},
    {"id": "anglesea---point-roadknight", "name": "Anglesea - Point Roadknight", "lat": -38.4183807, "lon": 144.1810608, "active": false, "surveys": 60, "firstSurvey": "2018", "coastlineKm": 2.3},
    {"id": "apollo-bay", "name": "Apollo Bay", "lat": -38.7482643, "lon": 143.6710815, "active": false, "surveys": 86, "firstSurvey": "2018", "coastlineKm": 3.6},
    {"id": "bells-beach", "name": "Bells Beach", "lat": -38.3752747, "lon": 144.2708893, "active": false, "surveys": 22, "firstSurvey": "2022", "coastlineKm": 3.6},
    {"id": "blairgowrie", "name": "Blairgowrie", "lat": -38.3566513, "lon": 144.7676086, "active": false, "surveys": 35, "firstSurvey": "2020", "coastlineKm": 3.7},
    {"id": "dromana-mccrae", "name": "Dromana/McCrae", "lat": -38.3404884, "lon": 144.946579, "active": false, "surveys": 37, "firstSurvey": "2020", "coastlineKm": 3.5},
    {"id": "eastern-view", "name": "Eastern View", "lat": -38.470211, "lon": 144.0600891, "active": false, "surveys": 26, "firstSurvey": "2021", "coastlineKm": 6.6},
    {"id": "flinders", "name": "Flinders", "lat": -38.4772873, "lon": 145.0257263, "active": false, "surveys": 11, "firstSurvey": "2022", "coastlineKm": 2.6},
    {"id": "frankston", "name": "Frankston", "lat": -38.1503868, "lon": 145.1136932, "active": false, "surveys": 1, "firstSurvey": "2018", "coastlineKm": 0.3},
    {"id": "indented-head", "name": "Indented Head", "lat": -38.1228065, "lon": 144.6948547, "active": false, "surveys": 1, "firstSurvey": "2022", "coastlineKm": 3.5},
    {"id": "jan-juc", "name": "Jan Juc", "lat": -38.3507042, "lon": 144.3000488, "active": false, "surveys": 15, "firstSurvey": "2021", "coastlineKm": 3.0},
    {"id": "kennett-river", "name": "Kennett River", "lat": -38.6682129, "lon": 143.8634644, "active": false, "surveys": 13, "firstSurvey": "2021", "coastlineKm": 1.0},
    {"id": "killarney", "name": "Killarney", "lat": -38.3568039, "lon": 142.3132019, "active": false, "surveys": 2, "firstSurvey": "2014", "coastlineKm": 1.5},
    {"id": "lorne", "name": "Lorne", "lat": -38.5408478, "lon": 143.9770508, "active": false, "surveys": 13, "firstSurvey": "2021", "coastlineKm": 4.0},
    {"id": "marengo", "name": "Marengo", "lat": -38.7717857, "lon": 143.6646423, "active": false, "surveys": 66, "firstSurvey": "2018", "coastlineKm": 3.0},
    {"id": "mornington---beleura-cliff", "name": "Mornington - Beleura Cliff", "lat": -38.2032661, "lon": 145.0581055, "active": false, "surveys": 3, "firstSurvey": "2022", "coastlineKm": 1.5},
    {"id": "mornington---fishermans-beach", "name": "Mornington - Fishermans Beach", "lat": -38.2243195, "lon": 145.0308685, "active": false, "surveys": 3, "firstSurvey": "2022", "coastlineKm": 1.0},
    {"id": "mornington---shire-hall-beach", "name": "Mornington - Shire Hall Beach", "lat": -38.2146378, "lon": 145.0368805, "active": false, "surveys": 2, "firstSurvey": "2022", "coastlineKm": 0.9},
    {"id": "mount-eliza", "name": "Mount Eliza", "lat": -38.1675529, "lon": 145.0861359, "active": false, "surveys": 11, "firstSurvey": "2022", "coastlineKm": 5.2},
    {"id": "mount-martha", "name": "Mount Martha", "lat": -38.2676048, "lon": 145.0119171, "active": false, "surveys": 49, "firstSurvey": "2019", "coastlineKm": 2.6},
    {"id": "ocean-grove", "name": "Ocean Grove", "lat": -38.2715683, "lon": 144.5236511, "active": false, "surveys": 55, "firstSurvey": "2019", "coastlineKm": 3.7},
    {"id": "patterson-river", "name": "Patterson River", "lat": -38.0723991, "lon": 145.1199646, "active": false, "surveys": 33, "firstSurvey": "2021", "coastlineKm": 3.4},
    {"id": "point-impossible", "name": "Point Impossible", "lat": -38.3034286, "lon": 144.3787384, "active": false, "surveys": 10, "firstSurvey": "2019", "coastlineKm": 1.4},
    {"id": "point-lonsdale-queenscliff", "name": "Point Lonsdale/Queenscliff", "lat": -38.2745667, "lon": 144.6244965, "active": false, "surveys": 57, "firstSurvey": "2018", "coastlineKm": 3.5},
    {"id": "portland---dutton-way", "name": "Portland - Dutton Way", "lat": -38.2900314, "lon": 141.6412048, "active": false, "surveys": 47, "firstSurvey": "2018", "coastlineKm": 5.5},
    {"id": "portsea", "name": "Portsea", "lat": -38.3191338, "lon": 144.7153473, "active": false, "surveys": 22, "firstSurvey": "2022", "coastlineKm": 3.4},
    {"id": "rye", "name": "Rye", "lat": -38.3698349, "lon": 144.825531, "active": false, "surveys": 8, "firstSurvey": "2022", "coastlineKm": 3.2},
    {"id": "sandringham", "name": "Sandringham", "lat": -37.9523888, "lon": 145.0032806, "active": false, "surveys": 34, "firstSurvey": "2020", "coastlineKm": 3.1},
    {"id": "sandy-point", "name": "Sandy Point", "lat": -37.847393, "lon": 144.8964386, "active": false, "surveys": 6, "firstSurvey": "2024", "coastlineKm": 0.8},
    {"id": "seaspray", "name": "Seaspray", "lat": -38.3776932, "lon": 147.1900482, "active": false, "surveys": 52, "firstSurvey": "2018", "coastlineKm": 3.2},
    {"id": "skenes-creek", "name": "Skenes Creek", "lat": -38.7251892, "lon": 143.7122803, "active": false, "surveys": 2, "firstSurvey": "2018", "coastlineKm": 2.4},
    {"id": "st-leonards", "name": "St Leonards", "lat": -38.1592064, "lon": 144.716095, "active": false, "surveys": 58, "firstSurvey": "2018", "coastlineKm": 3.2},
    {"id": "summerlands-beach", "name": "Summerlands Beach", "lat": -38.5093765, "lon": 145.1541138, "active": false, "surveys": 12, "firstSurvey": "2017", "coastlineKm": 1.7},
    {"id": "torquay", "name": "Torquay", "lat": -38.3266945, "lon": 144.3281708, "active": false, "surveys": 19, "firstSurvey": "2019", "coastlineKm": 3.8},
    {"id": "walkerville", "name": "Walkerville", "lat": -38.8458061, "lon": 145.9983521, "active": false, "surveys": 13, "firstSurvey": "2022", "coastlineKm": 2.7},
    {"id": "warrnambool", "name": "Warrnambool", "lat": -38.3938942, "lon": 142.4815674, "active": false, "surveys": 67, "firstSurvey": "2014", "coastlineKm": 4.1},
    {"id": "wye-river", "name": "Wye River", "lat": -38.6354446, "lon": 143.8924103, "active": false, "surveys": 25, "firstSurvey": "2021", "coastlineKm": 1.9}
];

// VCMP Program Statistics
const siteStats = {
    totalSites: 44,
    activeSites: 1,
    inDevelopment: 43,
    totalSurveys: 1328,
    totalCoastline: 131.8
};
