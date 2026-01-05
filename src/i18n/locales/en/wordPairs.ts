const wordPairs = [
    [
        "Awan",
        "Kabut"
    ],
    [
        "Pantai Kuta",
        "Pantai Pandawa"
    ],
    [
        "Pizza",
        "Pasta"
    ],
    [
        "Kursi Lipat",
        "Kursi Rotan"
    ],
    [
        "Helm",
        "Topi"
    ],
    [
        "Detective",
        "Police"
    ],
    [
        "Roti Gandum",
        "Roti Tawar"
    ],
    [
        "Jam Meja",
        "Jam Dinding"
    ],
    [
        "Hiu",
        "Lumba Lumba"
    ],
    [
        "Kaos",
        "Kemeja"
    ],
    [
        "Twitch",
        "Netflix"
    ],
    [
        "Bola Tenis",
        "Bola Pingpong"
    ],
    [
        "Semangka",
        "Melon"
    ],
    [
        "Jam Tangan Digital",
        "Jam Tangan Analog"
    ],
    [
        "Adidas",
        "Nike"
    ],
    [
        "Tablet",
        "Smartphone"
    ],
    [
        "Rumah Kayu",
        "Rumah Batu"
    ],
    [
        "Google",
        "Facebook"
    ],
    [
        "Petir",
        "Halilintar"
    ],
    [
        "Strawberry",
        "Raspberry"
    ],
    [
        "Jerapah",
        "Zebra"
    ],
    [
        "Running",
        "Jogging"
    ],
    [
        "Pohon",
        "Rumput"
    ],
    [
        "Mouse",
        "Keyboard"
    ],
    [
        "Baju Renang",
        "Celana Renang"
    ],
    [
        "Wajan",
        "Panci"
    ],
    [
        "Es Krim",
        "Puding"
    ],
    [
        "Tenda",
        "Kabin"
    ],
    [
        "Coffee",
        "Tea"
    ],
    [
        "Jaket Kulit",
        "Jaket Jeans"
    ],
    [
        "Sepeda",
        "Motor"
    ],
    [
        "Istana",
        "Rumah Mewah"
    ],
    [
        "Rubah",
        "Serigala"
    ],
    [
        "Buku",
        "Koran"
    ],
    [
        "Windows",
        "MacOS"
    ],
    [
        "Energy Drink",
        "Soda"
    ],
    [
        "Jembatan Gantung",
        "Jembatan Beton"
    ],
    [
        "Bantal Empuk",
        "Bantal Pipih"
    ],
    [
        "Angin Kencang",
        "Angin Sepoi-sepoi"
    ],
    [
        "Singa",
        "Macan"
    ],
    [
        "sneakers",
        "sandals"
    ],
    [
        "Roti Tawar",
        "Roti Gandum"
    ],
    [
        "Sofa",
        "Kursi Recliner"
    ],
    [
        "Gold",
        "Silver"
    ],
    [
        "Nasi Goreng",
        "Mie Goreng"
    ],
    [
        "Durian",
        "Nangka"
    ],
    [
        "Kelelawar",
        "Burung hantu"
    ],
    [
        "Apartemen",
        "Kost"
    ],
    [
        "Kasur",
        "Matras"
    ],
    [
        "Air Mancur",
        "Air Terjun"
    ],
    [
        "chicken",
        "beef"
    ],
    [
        "Desert",
        "Sand"
    ],
    [
        "Cincin",
        "Anting"
    ],
    [
        "Burger",
        "Hotdog"
    ],
    [
        "Laut",
        "Sungai"
    ],
    [
        "Kamera DSLR",
        "Kamera Mirrorless"
    ],
    [
        "Drone",
        "Helikopter Mainan"
    ],
    [
        "Timun",
        "Terong"
    ],
    [
        "Minuman Soda",
        "Minuman Jus"
    ],
    [
        "Gelang Emas",
        "Gelang Perak"
    ],
    [
        "Komputer Desktop",
        "Laptop"
    ],
    [
        "Lautan",
        "Pantai"
    ],
    [
        "Japan",
        "China"
    ],
    [
        "Cabai Merah",
        "Cabai Hijau"
    ],
    [
        "Burger King",
        "McDonald’s"
    ],
    [
        "Notebook",
        "Diary"
    ],
    [
        "Jendela",
        "Pintu"
    ],
    [
        "Sendok",
        "Garpu"
    ],
    [
        "Pemadam Kebakaran",
        "Polisi"
    ],
    [
        "Cincin Berlian",
        "Cincin Perak"
    ],
    [
        "Celana Jeans",
        "Celana Chino"
    ],
    [
        "Mie",
        "Bihun"
    ],
    [
        "Apple",
        "Microsoft"
    ],
    [
        "Map",
        "GPS"
    ],
    [
        "Kerata",
        "Monorail"
    ],
    [
        "Mangga",
        "Nanas"
    ],
    [
        "Sabun",
        "Shampoo"
    ],
    [
        "Cermin",
        "Kaca"
    ],
    [
        "Peta Dunia",
        "Globe"
    ],
    [
        "Bus Kota",
        "Bus Pariwisata"
    ],
    [
        "Roti Tawar",
        "Roti Bakar"
    ],
    [
        "Teh Hijau",
        "Teh Hitam"
    ],
    [
        "Panci",
        "Wajan"
    ],
    [
        "Surga",
        "Neraka"
    ],
    [
        "Air Mineral",
        "Air Soda"
    ],
    [
        "Motor Bebek",
        "Motor Sport"
    ],
    [
        "Earthquake",
        "Tsunami"
    ],
    [
        "Shirt",
        "Sweater"
    ],
    [
        "Pelangi",
        "Aurora"
    ],
    [
        "Terowongan Jalan",
        "Terowongan Kereta"
    ],
    [
        "Jeruk",
        "Lemon"
    ],
    [
        "PlayStation",
        "Xbox"
    ],
    [
        "Yahudi",
        "Satanic"
    ],
    [
        "Yahudi",
        "Kristen"
    ],
    [
        "Budha",
        "Hindu"
    ],
    [
        "Volcano",
        "Mountain"
    ],
    [
        "Bangku",
        "Kursi"
    ],
    [
        "Piring",
        "Mangkok"
    ],
    [
        "Bintang Jatuh",
        "Meteor"
    ],
    [
        "Grand Canyon",
        "Niagara Falls"
    ],
    [
        "Jeruk",
        "Lemon"
    ],
    [
        "Sarung Tinju",
        "Pelindung Kepala"
    ],
    [
        "Pulau Bali",
        "Pulau Lombok"
    ],
    [
        "Sup Ayam",
        "Sup Sayur"
    ],
    [
        "Petani",
        "Pelayan"
    ],
    [
        "Ular",
        "Kadal"
    ],
    [
        "iPhone",
        "Samsung"
    ],
    [
        "Headphones",
        "Earbuds"
    ],
    [
        "Roti",
        "Donat"
    ],
    [
        "Volleyball",
        "Basketball"
    ],
    [
        "Statue of Liberty",
        "Eiffel Tower"
    ],
    [
        "Meja Kantor",
        "Meja Belajar"
    ],
    [
        "Job",
        "Hobby"
    ],
    [
        "Lampu",
        "Lilin"
    ],
    [
        "sunglasses",
        "eyeglasses"
    ],
    [
        "kakatua",
        "Gagak"
    ],
    [
        "Wolf",
        "Fox"
    ],
    [
        "Hantu",
        "Zombie"
    ],
    [
        "Pizza",
        "Pasta"
    ],
    [
        "Jam Tangan",
        "Jam Dinding"
    ],
    [
        "apple",
        "orange"
    ],
    [
        "Air Putih",
        "Air Mineral"
    ],
    [
        "Oven",
        "Microwave"
    ],
    [
        "Radio",
        "Podcast"
    ],
    [
        "Parasut",
        "Balon Udara"
    ],
    [
        "Spotify",
        "Apple Music"
    ],
    [
        "Swimming",
        "Diving"
    ],
    [
        "virus",
        "bacteria"
    ],
    [
        "chocolate",
        "vanilla"
    ],
    [
        "Langit",
        "Awan"
    ],
    [
        "Apel",
        "Pisang"
    ],
    [
        "Swimming Pool",
        "Beach"
    ],
    [
        "Kapal Laut",
        "Kapal Pesiar"
    ],
    [
        "Mobil Balap",
        "Mobil Klasik"
    ],
    [
        "Kereta",
        "Bus"
    ],
    [
        "Godzilla",
        "King Kong"
    ],
    [
        "jacuzzi",
        "sauna"
    ],
    [
        "Lukisan",
        "Sketsa"
    ],
    [
        "Handuk",
        "Keset"
    ],
    [
        "Piring",
        "Mangkok"
    ],
    [
        "Lampu Sorot",
        "Lampu Tidur"
    ],
    [
        "Laut Karibia",
        "Laut Mediterania"
    ],
    [
        "Sepeda Gunung",
        "Sepeda Lipat"
    ],
    [
        "Gajah",
        "Badak"
    ],
    [
        "water",
        "soda"
    ],
    [
        "Tesla",
        "Porsche"
    ],
    [
        "Gitar Akustik",
        "Gitar Elektrik"
    ],
    [
        "Angsa",
        "Itik"
    ],
    [
        "Ayam Goreng",
        "Ikan Goreng"
    ],
    [
        "Guru",
        "Professor"
    ],
    [
        "Sungai Amazon",
        "Sungai Nile"
    ],
    [
        "Pesawat",
        "Helicopter"
    ],
    [
        "Kursi Kantor",
        "Kursi Lipat"
    ],
    [
        "Sendok",
        "Garpu"
    ],
    [
        "Microphone",
        "Speaker"
    ],
    [
        "Ice cream",
        "Cake"
    ],
    [
        "UFC",
        "WWE"
    ],
    [
        "Telur Rebus",
        "Telur Dadar"
    ],
    [
        "Pisau",
        "Gunting"
    ],
    [
        "Papan Tulis",
        "Whiteboard"
    ],
    [
        "Lampu Meja",
        "Lampu Gantung"
    ],
    [
        "CIA",
        "FBI"
    ],
    [
        "Perahu",
        "Kapal"
    ],
    [
        "salt",
        "pepper"
    ],
    [
        "Topi Jerami",
        "Topi Baseball"
    ],
    [
        "TV",
        "Radio"
    ],
    [
        "Daging Sapi",
        "Daging Kambing"
    ],
    [
        "Danau",
        "Kolam"
    ],
    [
        "Kue Bolu",
        "Kue Lapis"
    ],
    [
        "Matahari",
        "Bulan"
    ],
    [
        "Twitter",
        "Facebook"
    ],
    [
        "Superman",
        "Batman"
    ],
    [
        "Sungar",
        "Danau"
    ],
    [
        "Katak",
        "Salamander"
    ],
    [
        "Gelask",
        "Cangkir"
    ],
    [
        "Gitar",
        "Ukulele"
    ],
    [
        "Kucing",
        "Harimau"
    ],
    [
        "Gedung Perkantoran",
        "Pabrik"
    ],
    [
        "Kursi Makan",
        "Kursi Taman"
    ],
    [
        "Bantal",
        "Guling"
    ],
    [
        "Selimut",
        "Bedcover"
    ],
    [
        "Jembatan",
        "Terowongan"
    ],
    [
        "Marathon",
        "Sprint"
    ],
    [
        "Mercedes",
        "BMW"
    ],
    [
        "Sungai Nil",
        "Sungai Amazon"
    ],
    [
        "McDonalds",
        "KFC"
    ],
    [
        "Dog",
        "Wolf"
    ],
    [
        "Selimut Wol",
        "Selimut Bulu"
    ],
    [
        "Kalung",
        "Gelang"
    ],
    [
        "Spiderman",
        "Ironman"
    ],
    [
        "Kalung Mutiara",
        "Kalung Emas"
    ],
    [
        "Syal",
        "Dasi"
    ],
    [
        "Paprika",
        "Cabai"
    ],
    [
        "Hutan Hujan",
        "Hutan Pinus"
    ],
    [
        "bra",
        "bikini"
    ],
    [
        "Tas Ransel",
        "Tas Selempang"
    ],
    [
        "Perpustakaan",
        "Universitas"
    ],
    [
        "Football",
        "Basketball"
    ],
    [
        "Laptop",
        "Komputer"
    ],
    [
        "Air Terjun Niagara",
        "Air Terjun Angel"
    ],
    [
        "Danau Toba",
        "Danau Singkarak"
    ],
    [
        "Tenis Meja",
        "Badminton"
    ],
    [
        "Busway",
        "Angkotan umum"
    ],
    [
        "Bunga",
        "Daun"
    ],
    [
        "Kacang",
        "Biji-bijian"
    ],
    [
        "potato",
        "tomato"
    ],
    [
        "Baseball",
        "Football"
    ],
    [
        "Pisang",
        "Apel"
    ],
    [
        "Mahkota",
        "Topi"
    ],
    [
        "Teh Panas",
        "Kopi Panas"
    ],
    [
        "Tabung Gas",
        "Kompor Listrik"
    ],
    [
        "Hujan Deras",
        "Hujan Gerimis"
    ],
    [
        "Sepatu Boots",
        "Sepatu Sneakers"
    ],
    [
        "Taj Mahal",
        "Great Wall of China"
    ],
    [
        "Mobil",
        "Motor"
    ],
    [
        "Bus",
        "Truk"
    ],
    [
        "Messi",
        "Ronaldo"
    ],
    [
        "SIM",
        "KTP"
    ],
    [
        "Blacksmith",
        "Carpenter"
    ],
    [
        "Kartu",
        "Dadu"
    ],
    [
        "hamburger",
        "hotdog"
    ],
    [
        "Bawang Bombay",
        "Bawang"
    ],
    [
        "Jam Dinding",
        "Jam Meja"
    ],
    [
        "Mobil",
        "Truck"
    ],
    [
        "UNO",
        "Monopoly"
    ],
    [
        "Microphone",
        "Camera"
    ],
    [
        "Kacamata Hitam",
        "Kacamata Baca"
    ],
    [
        "Alligator",
        "Crocodile"
    ],
    [
        "Seluncur Es",
        "Ski"
    ],
    [
        "Tempat Tidur",
        "Sofa"
    ],
    [
        "Daster",
        "Piyama"
    ],
    [
        "Kelinci",
        "Tupai"
    ],
    [
        "Sony",
        "Samsung"
    ],
    [
        "Pesawat Komersial",
        "Pesawat Tempur"
    ],
    [
        "Burung Hantu",
        "Elang"
    ],
    [
        "Facebook",
        "Instagram"
    ],
    [
        "Boxing",
        "Karate"
    ],
    [
        "Engineer",
        "Arsitek"
    ],
    [
        "Pizza",
        "Burger"
    ],
    [
        "Instagram",
        "Snapchat"
    ],
    [
        "sugar",
        "honey"
    ],
    [
        "Coconut milk",
        "Soy milk"
    ],
    [
        "Doctor",
        "Surgeon"
    ],
    [
        "Naga",
        "Dinosaurus"
    ],
    [
        "Sayur Bayam",
        "Sayur Kangkung"
    ],
    [
        "Mouse",
        "Rat"
    ],
    [
        "Laptop",
        "Tablet"
    ],
    [
        "Susu Kedelai",
        "Susu Almond"
    ],
    [
        "Pensil",
        "Pulpen"
    ],
    [
        "milk",
        "juice"
    ],
    [
        "Parfum",
        "Deodorant"
    ],
    [
        "Hutan",
        "Taman"
    ],
    [
        "Sekop",
        "Serokan"
    ],
    [
        "Kue Kering",
        "Kue Basah"
    ],
    [
        "Lampu Jalan",
        "Lampu Sorot"
    ],
    [
        "Apple",
        "Pear"
    ],
    [
        "YouTube",
        "TikTok"
    ],
    [
        "Kompas",
        "Peta"
    ],
    [
        "Agar",
        "Puding"
    ],
    [
        "Motor Trail",
        "Motor Bebek"
    ],
    [
        "Skiing",
        "Salju"
    ],
    [
        "Pisang",
        "Pepaya"
    ],
    [
        "Table tennis",
        "Badminton"
    ],
    [
        "Tangga",
        "Elevator"
    ],
    [
        "Nasi",
        "Kentang"
    ],
    [
        "Eiffel Tower",
        "Statue of Liberty"
    ],
    [
        "Sepatu Sneakers",
        "Sepatu Boots"
    ],
    [
        "Dompet",
        "Clutch"
    ],
    [
        "Topi Fedora",
        "Topi Baseball"
    ],
    [
        "Merpati",
        "Gagak"
    ],
    [
        "Olympics",
        "World Cup"
    ],
    [
        "Strawberry",
        "Raspberry"
    ],
    [
        "Pepaya",
        "Nangka"
    ],
    [
        "piano",
        "guitar"
    ],
    [
        "Mangga",
        "Pepaya"
    ],
    [
        "Tomat",
        "Mentimun"
    ],
    [
        "Mobil",
        "Bus"
    ],
    [
        "Jaket",
        "Mantel"
    ],
    [
        "Taman Kota",
        "Taman Nasional"
    ],
    [
        "Sarung Tangan",
        "Kaos Kaki"
    ],
    [
        "beer",
        "wine"
    ],
    [
        "Sepatu Selam",
        "Fin"
    ],
    [
        "Kasur Busa",
        "Kasur Springbed"
    ],
    [
        "Pizza",
        "Lasagna"
    ],
    [
        "Lilin",
        "Lentera"
    ],
    [
        "Captain America",
        "Thor"
    ],
    [
        "Sikat Gigi",
        "Pasta Gigi"
    ],
    [
        "Tas",
        "Dompet"
    ],
    [
        "Kacamata Renang",
        "Pelampung"
    ],
    [
        "Es Batu",
        "Es Krim"
    ],
    [
        "Bawang Merah",
        "Bawang Putih"
    ],
    [
        "Kapal Selam",
        "Perahu Layar"
    ],
    [
        "Perfume",
        "Deodorant"
    ],
    [
        "SpongeBob",
        "Patrick"
    ],
    [
        "carrot",
        "broccoli"
    ],
    [
        "Amazon",
        "Netflix"
    ],
    [
        "Durian",
        "Nangka"
    ],
    [
        "Parmasi",
        "Dokter"
    ],
    [
        "Helikopter",
        "Drone"
    ],
    [
        "Bola Basket",
        "Bola Voli"
    ],
    [
        "Speaker",
        "Microphone"
    ],
    [
        "Kompas",
        "Map"
    ],
    [
        "Papan Seluncur",
        "Skateboard"
    ],
    [
        "Salt",
        "Sugar"
    ],
    [
        "Sepatu Bola",
        "Sepatu Lari"
    ],
    [
        "Rok Pendek",
        "Rok Panjang"
    ],
    [
        "Movie",
        "Actor"
    ],
    [
        "Earphone",
        "Headphone"
    ],
    [
        "Meja Makan",
        "Meja Kopi"
    ],
    [
        "whiskey",
        "vodka"
    ],
    [
        "Raket",
        "Bat"
    ],
    [
        "Smartphone",
        "Tablet"
    ],
    [
        "Bantal",
        "Guling"
    ],
    [
        "Bayern Munich",
        "Real Madrid"
    ],
    [
        "Meja Belajar",
        "Meja Makan"
    ],
    [
        "Pantai",
        "Gunung"
    ],
    [
        "Kaus kaki",
        "Stockings"
    ],
    [
        "Sofa Kulit",
        "Sofa Kain"
    ],
    [
        "Anjing",
        "Kucing"
    ],
    [
        "Piano",
        "Keyboard"
    ],
    [
        "Tennis",
        "Badminton"
    ],
    [
        "Jellyfish",
        "Octopus"
    ],
    [
        "Gunung Merapi",
        "Gunung Rinjani"
    ],
    [
        "Platinum",
        "Gold"
    ],
    [
        "Lontong",
        "Ketupat"
    ],
    [
        "Nasi Uduk",
        "Nasi Liwet"
    ],
    [
        "Kelapa Ijo",
        "Kelapa Muda"
    ],
    [
        "Mie Indomie",
        "Mie Sedap"
    ],
    [
        "Rendang",
        "Dendeng"
    ],
    [
        "Gula Putih",
        "Gula Merah"
    ],
    [
        "Jokowi",
        "Gibran"
    ]
];

export default wordPairs;