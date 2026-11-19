(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const STORE = 'rent-a-cars-go-v1';
  let serverSession={authenticated:false,csrf:''};
  let serverRevision=0;
  const ADMIN_SESSION_KEY = 'rent-a-cars-go-admin-authorized';
  const archivePhotoNumbers = [1,2,3,5,6,7,8,10,11,15,16,19,22,23,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60];
  const provinces = ['Adana','Adıyaman','Afyonkarahisar','Ağrı','Amasya','Ankara','Antalya','Artvin','Aydın','Balıkesir','Bilecik','Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale','Çankırı','Çorum','Denizli','Diyarbakır','Edirne','Elazığ','Erzincan','Erzurum','Eskişehir','Gaziantep','Giresun','Gümüşhane','Hakkâri','Hatay','Isparta','Mersin','İstanbul','İzmir','Kars','Kastamonu','Kayseri','Kırklareli','Kırşehir','Kocaeli','Konya','Kütahya','Malatya','Manisa','Kahramanmaraş','Mardin','Muğla','Muş','Nevşehir','Niğde','Ordu','Rize','Sakarya','Samsun','Siirt','Sinop','Sivas','Tekirdağ','Tokat','Trabzon','Tunceli','Şanlıurfa','Uşak','Van','Yozgat','Zonguldak','Aksaray','Bayburt','Karaman','Kırıkkale','Batman','Şırnak','Bartın','Ardahan','Iğdır','Yalova','Karabük','Kilis','Osmaniye','Düzce'];
  const vehicleSeed = [
  {
    "id": "fiat-egea-sedan",
    "name": "Fiat Egea Sedan",
    "category": "Ekonomi Sedan",
    "transmission": "Otomatik",
    "fuel": "Benzin",
    "seats": 5,
    "dailyPrice": 1150,
    "image": "assets/cars/fiat-egea-sedan.jpg",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "order": 0,
    "pricingSegment": "Ekonomik"
  },
  {
    "id": "fiat-egea-cross",
    "name": "Fiat Egea Cross",
    "category": "Crossover",
    "transmission": "Otomatik",
    "fuel": "Benzin",
    "seats": 5,
    "dailyPrice": 1400,
    "image": "assets/cars/fiat-egea-cross.jpg",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "order": 1,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "renault-clio",
    "name": "Renault Clio",
    "category": "Ekonomi",
    "transmission": "Otomatik",
    "fuel": "Benzin",
    "seats": 5,
    "dailyPrice": 1050,
    "image": "assets/cars/renault-clio.jpg",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "order": 2,
    "pricingSegment": "Ekonomik"
  },
  {
    "id": "hyundai-i20",
    "name": "Hyundai i20",
    "category": "Ekonomi",
    "transmission": "Otomatik",
    "fuel": "Benzin",
    "seats": 5,
    "dailyPrice": 1100,
    "image": "assets/cars/hyundai-i20.jpg",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "order": 3,
    "pricingSegment": "Ekonomik"
  },
  {
    "id": "honda-civic",
    "name": "Honda Civic",
    "category": "Sedan",
    "transmission": "Otomatik",
    "fuel": "Benzin",
    "seats": 5,
    "dailyPrice": 1600,
    "image": "assets/cars/honda-civic.jpg",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "order": 4,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "toyota-corolla",
    "name": "Toyota Corolla",
    "category": "Sedan",
    "transmission": "Otomatik",
    "fuel": "Hibrit",
    "seats": 5,
    "dailyPrice": 1500,
    "image": "assets/cars/toyota-corolla.jpg",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "order": 5,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "volkswagen-passat",
    "name": "Volkswagen Passat",
    "category": "Premium Sedan",
    "transmission": "Otomatik",
    "fuel": "Dizel",
    "seats": 5,
    "dailyPrice": 2100,
    "image": "assets/cars/volkswagen-passat.jpg",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "order": 6,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "bmw-3-serisi",
    "name": "BMW 3 Serisi",
    "category": "Premium Sedan",
    "transmission": "Otomatik",
    "fuel": "Benzin",
    "seats": 5,
    "dailyPrice": 2500,
    "image": "assets/cars/bmw-3-serisi.jpg",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "order": 7,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "bmw-5-serisi",
    "name": "BMW 5 Serisi",
    "category": "Premium Sedan",
    "transmission": "Otomatik",
    "fuel": "Dizel",
    "seats": 5,
    "dailyPrice": 2900,
    "image": "assets/cars/bmw-5-serisi.jpg",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "order": 8,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "audi-a3",
    "name": "Audi A3",
    "category": "Premium Sedan",
    "transmission": "Otomatik",
    "fuel": "Benzin",
    "seats": 5,
    "dailyPrice": 2200,
    "image": "assets/cars/audi-a3.jpg",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "order": 9,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "ford-focus",
    "name": "Ford Focus",
    "category": "Sedan",
    "transmission": "Otomatik",
    "fuel": "Benzin",
    "seats": 5,
    "dailyPrice": 1450,
    "image": "assets/cars/ford-focus.jpg",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "order": 10,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "peugeot-2008",
    "name": "Peugeot 2008",
    "category": "SUV",
    "transmission": "Otomatik",
    "fuel": "Benzin",
    "seats": 5,
    "dailyPrice": 1600,
    "image": "assets/cars/peugeot-2008.jpg",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "order": 11,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "renault-duster",
    "name": "Renault Duster",
    "category": "SUV",
    "transmission": "Otomatik",
    "fuel": "Benzin",
    "seats": 5,
    "dailyPrice": 1700,
    "image": "assets/cars/renault-duster.jpg",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "order": 12,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "skoda-octavia",
    "name": "Skoda Octavia",
    "category": "Sedan",
    "transmission": "Otomatik",
    "fuel": "Dizel",
    "seats": 5,
    "dailyPrice": 1750,
    "image": "assets/cars/skoda-octavia.jpg",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "order": 13,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "volkswagen-t-roc",
    "name": "Volkswagen T-Roc",
    "category": "SUV",
    "transmission": "Otomatik",
    "fuel": "Benzin",
    "seats": 5,
    "dailyPrice": 1800,
    "image": "assets/cars/volkswagen-t-roc.jpg",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "order": 14,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "volkswagen-tiguan",
    "name": "Volkswagen Tiguan",
    "category": "SUV",
    "transmission": "Otomatik",
    "fuel": "Dizel",
    "seats": 5,
    "dailyPrice": 2200,
    "image": "assets/cars/volkswagen-tiguan.jpg",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "order": 15,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "renault-austral",
    "name": "Renault Austral",
    "category": "SUV",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2100,
    "image": "assets/cars/archive/grentgo-1.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 16,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "hyundai-tucson",
    "name": "Hyundai Tucson",
    "category": "SUV",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2100,
    "image": "assets/cars/archive/grentgo-2.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 17,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "kia-sportage",
    "name": "Kia Sportage",
    "category": "SUV",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2100,
    "image": "assets/cars/archive/grentgo-3.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 18,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "peugeot-3008",
    "name": "Peugeot 3008",
    "category": "SUV",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2100,
    "image": "assets/cars/archive/grentgo-5.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 19,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "opel-grandland",
    "name": "Opel Grandland",
    "category": "SUV",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1900,
    "image": "assets/cars/archive/grentgo-6.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 20,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "nissan-qashqai",
    "name": "Nissan Qashqai",
    "category": "SUV",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1850,
    "image": "assets/cars/archive/grentgo-7.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 21,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "toyota-c-hr",
    "name": "Toyota C-HR",
    "category": "SUV",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1800,
    "image": "assets/cars/archive/grentgo-8.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 22,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "bmw-x1",
    "name": "BMW X1",
    "category": "SUV",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2400,
    "image": "assets/cars/archive/grentgo-10.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 23,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "renault-megane-sedan",
    "name": "Renault Megane Sedan",
    "category": "Sedan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1450,
    "image": "assets/cars/archive/grentgo-11.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 24,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "skoda-superb",
    "name": "Skoda Superb",
    "category": "Sedan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2100,
    "image": "assets/cars/archive/grentgo-15.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 25,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "hyundai-elantra",
    "name": "Hyundai Elantra",
    "category": "Sedan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1550,
    "image": "assets/cars/archive/grentgo-16.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 26,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "mercedes-benz-c-serisi",
    "name": "Mercedes-Benz C Serisi",
    "category": "Sedan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2600,
    "image": "assets/cars/archive/grentgo-19.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 27,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "volkswagen-golf",
    "name": "Volkswagen Golf",
    "category": "Hatchback",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1700,
    "image": "assets/cars/archive/grentgo-22.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 28,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "volkswagen-polo",
    "name": "Volkswagen Polo",
    "category": "Hatchback",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1150,
    "image": "assets/cars/archive/grentgo-23.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 29,
    "pricingSegment": "Ekonomik"
  },
  {
    "id": "opel-astra",
    "name": "Opel Astra",
    "category": "Hatchback",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1500,
    "image": "assets/cars/archive/grentgo-25.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 30,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "opel-corsa",
    "name": "Opel Corsa",
    "category": "Hatchback",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1050,
    "image": "assets/cars/archive/grentgo-26.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 31,
    "pricingSegment": "Ekonomik"
  },
  {
    "id": "peugeot-208",
    "name": "Peugeot 208",
    "category": "Hatchback",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1100,
    "image": "assets/cars/archive/grentgo-27.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 32,
    "pricingSegment": "Ekonomik"
  },
  {
    "id": "peugeot-308",
    "name": "Peugeot 308",
    "category": "Hatchback",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1650,
    "image": "assets/cars/archive/grentgo-28.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 33,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "toyota-yaris",
    "name": "Toyota Yaris",
    "category": "Hatchback",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1150,
    "image": "assets/cars/archive/grentgo-29.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 34,
    "pricingSegment": "Ekonomik"
  },
  {
    "id": "renault-megane-e-tech",
    "name": "Renault Megane E-Tech",
    "category": "Hatchback",
    "transmission": "",
    "fuel": "Elektrik",
    "seats": 0,
    "dailyPrice": 2100,
    "image": "assets/cars/archive/grentgo-30.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 35,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "volkswagen-caravelle",
    "name": "Volkswagen Caravelle",
    "category": "Minivan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2400,
    "image": "assets/cars/archive/grentgo-31.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 36,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "mercedes-benz-vito",
    "name": "Mercedes-Benz Vito",
    "category": "Minivan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2600,
    "image": "assets/cars/archive/grentgo-32.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 37,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "ford-tourneo-custom",
    "name": "Ford Tourneo Custom",
    "category": "Minivan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2300,
    "image": "assets/cars/archive/grentgo-33.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 38,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "volkswagen-caddy",
    "name": "Volkswagen Caddy",
    "category": "Minivan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1500,
    "image": "assets/cars/archive/grentgo-34.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 39,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "ford-tourneo-connect",
    "name": "Ford Tourneo Connect",
    "category": "Minivan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1450,
    "image": "assets/cars/archive/grentgo-35.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 40,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "mercedes-benz-citan",
    "name": "Mercedes-Benz Citan",
    "category": "Minivan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1800,
    "image": "assets/cars/archive/grentgo-36.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 41,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "peugeot-rifter",
    "name": "Peugeot Rifter",
    "category": "Minivan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1450,
    "image": "assets/cars/archive/grentgo-37.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 42,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "citroen-berlingo",
    "name": "Citroen Berlingo",
    "category": "Minivan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1400,
    "image": "assets/cars/archive/grentgo-38.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 43,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "ford-transit-custom",
    "name": "Ford Transit Custom",
    "category": "Panelvan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1900,
    "image": "assets/cars/archive/grentgo-39.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 44,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "mercedes-benz-vito-panelvan",
    "name": "Mercedes-Benz Vito Panelvan",
    "category": "Panelvan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2100,
    "image": "assets/cars/archive/grentgo-40.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 45,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "volkswagen-transporter-panelvan",
    "name": "Volkswagen Transporter Panelvan",
    "category": "Panelvan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1900,
    "image": "assets/cars/archive/grentgo-41.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 46,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "renault-trafic",
    "name": "Renault Trafic",
    "category": "Panelvan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1800,
    "image": "assets/cars/archive/grentgo-42.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 47,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "renault-master",
    "name": "Renault Master",
    "category": "Panelvan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2100,
    "image": "assets/cars/archive/grentgo-43.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 48,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "fiat-scudo",
    "name": "Fiat Scudo",
    "category": "Panelvan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1700,
    "image": "assets/cars/archive/grentgo-44.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 49,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "fiat-ducato",
    "name": "Fiat Ducato",
    "category": "Panelvan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2100,
    "image": "assets/cars/archive/grentgo-45.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 50,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "jeep-wrangler",
    "name": "Jeep Wrangler",
    "category": "Arazi",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2800,
    "image": "assets/cars/archive/grentgo-46.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 51,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "land-rover-defender",
    "name": "Land Rover Defender",
    "category": "Arazi",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 3200,
    "image": "assets/cars/archive/grentgo-47.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 52,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "toyota-land-cruiser",
    "name": "Toyota Land Cruiser",
    "category": "Arazi",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 3000,
    "image": "assets/cars/archive/grentgo-48.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 53,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "mercedes-benz-g-serisi",
    "name": "Mercedes-Benz G Serisi",
    "category": "Arazi",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 3500,
    "image": "assets/cars/archive/grentgo-49.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 54,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "suzuki-jimny",
    "name": "Suzuki Jimny",
    "category": "Arazi",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 1900,
    "image": "assets/cars/archive/grentgo-50.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 55,
    "pricingSegment": "Orta segment"
  },
  {
    "id": "ford-ranger",
    "name": "Ford Ranger",
    "category": "Pick-up",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2300,
    "image": "assets/cars/archive/grentgo-51.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 56,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "toyota-hilux",
    "name": "Toyota Hilux",
    "category": "Pick-up",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2200,
    "image": "assets/cars/archive/grentgo-52.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 57,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "mercedes-benz-s-serisi",
    "name": "Mercedes-Benz S Serisi",
    "category": "Premium Sedan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 3300,
    "image": "assets/cars/archive/grentgo-53.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 58,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "bmw-7-serisi",
    "name": "BMW 7 Serisi",
    "category": "Premium Sedan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 3300,
    "image": "assets/cars/archive/grentgo-54.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 59,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "audi-a8",
    "name": "Audi A8",
    "category": "Premium Sedan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 3200,
    "image": "assets/cars/archive/grentgo-55.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 60,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "porsche-panamera",
    "name": "Porsche Panamera",
    "category": "Premium Sedan",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 3500,
    "image": "assets/cars/archive/grentgo-56.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 61,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "mercedes-benz-gls",
    "name": "Mercedes-Benz GLS",
    "category": "Premium SUV",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 3200,
    "image": "assets/cars/archive/grentgo-57.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 62,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "bmw-x5",
    "name": "BMW X5",
    "category": "Premium SUV",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 2900,
    "image": "assets/cars/archive/grentgo-58.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 63,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "range-rover",
    "name": "Range Rover",
    "category": "Premium SUV",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 3400,
    "image": "assets/cars/archive/grentgo-59.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 64,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "porsche-cayenne",
    "name": "Porsche Cayenne",
    "category": "Premium SUV",
    "transmission": "",
    "fuel": "",
    "seats": 0,
    "dailyPrice": 3500,
    "image": "assets/cars/archive/grentgo-60.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "",
    "specsPending": true,
    "order": 65,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "tesla-model-y",
    "name": "Tesla Model Y",
    "category": "Elektrikli SUV",
    "transmission": "Otomatik",
    "fuel": "Elektrik",
    "seats": 5,
    "dailyPrice": 2700,
    "image": "assets/cars/tesla-model-y.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "B",
    "generatedImage": true,
    "order": 66,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "togg-t10x",
    "name": "Togg T10X",
    "category": "Elektrikli SUV",
    "transmission": "Otomatik",
    "fuel": "Elektrik",
    "seats": 5,
    "dailyPrice": 2400,
    "image": "assets/cars/togg-t10x.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "B",
    "generatedImage": true,
    "order": 67,
    "pricingSegment": "Üst segment"
  },
  {
    "id": "byd-atto-3",
    "name": "BYD Atto 3",
    "category": "Elektrikli SUV",
    "transmission": "Otomatik",
    "fuel": "Elektrik",
    "seats": 5,
    "dailyPrice": 2100,
    "image": "assets/cars/byd-atto-3.webp",
    "active": true,
    "unlimitedKm": true,
    "width": "",
    "licenseClass": "B",
    "generatedImage": true,
    "order": 68,
    "pricingSegment": "Üst segment"
  }
];
  // Geçici GitHub Pages sürümü: filoyu ilk 15 araçla sınırla.
  vehicleSeed.splice(15);
  const defaults = {
    settings:{brand:'Rent A Cars Go', tagline:'81 ilde, her yolculuğa hazır.', phone:'', whatsapp:'', callLabel:'Ara', whatsappLabel:'WhatsApp', phoneEnabled:true, whatsappEnabled:true, mobileDock:true, searchEnabled:true, reservationOpen:false, theme:'burgundy', activeCustomers:'', satisfactionRating:'', deposit:4500, weeklyDiscount:22, monthlyDiscount:22, pricesAreExamples:false, heroVehicle:'fiat-egea-sedan', heroTitle:'81 ilde, her yolculuğa hazır.', heroText:'Aracınızı filodan seçin. Günlük, haftalık ve aylık seçenekler; tüm araçlarda sınırsız kilometre.', legalTitle:'EKÜP KESİCİ TAKIM MERKEZİ ANONİM ŞİRKETİ', address:'ALAADDİNBEY MAH. 624. SOK. NO:5D PK:16120 NİLÜFER BURSA', email:'info@Garentamerkezi.com', metaTitle:'Rent A Cars Go | 81 İlde Araç Kiralama', metaDescription:'Türkiye’nin 81 ilinde araç kiralama. Sınırsız kilometre, net fiyat ve kolay iletişim.', ga4:'', gtm:'', googleAds:'', googleAdsLabel:'', googleTagSnippet:'', googleConversionSnippet:'', siteVerification:'', announcement:'Tüm araçlarda sınırsız kilometre · Türkiye genelinde 81 ilde hizmet', reservationMessage:'Online rezervasyon talep formumuz şu anda kapalı. Araç uygunluğu için bizi telefon veya WhatsApp üzerinden arayın.', appPromoCode:'UYGULAMADAN%35', appDiscount:35, appPopupEnabled:true, appPromoText:'Uygulamayı indir, uygulamadan gelenlere özel %35 fırsat kodunu kullan.'},
    vehicles:vehicleSeed,
    events:[],
    requests:[]
  };
  let state = loadState();
  state.requests=[];
  let currentTab = 'dashboard';
  let filterText = '';
  let filterCategory = 'all';
  let filterFuel = 'all';
  let filterProvince = 'all';
  let selectedVehicle = null;
  let filterLicenseClasses = [];
  let lastLicenseCheck = null;
  let applicantName='';
  let toastTimer;
  let activeScratchReward = null;

  function api(action,data){const xhr=new XMLHttpRequest();xhr.open(data?'POST':'GET','/api.php?action='+action,false);xhr.setRequestHeader('X-RGO-Request','1');if(data)xhr.setRequestHeader('Content-Type','application/json');xhr.send(data?JSON.stringify(data):null);let result;try{result=JSON.parse(xhr.responseText);}catch{throw new Error('PHP sunucu bağlantısı çalışmıyor. Plesk üzerinde PHP 8.1 veya üzerini etkinleştirin.');}if(xhr.status<200||xhr.status>=300)throw new Error(result.error||'Sunucu hatası');return result;}
  function loadState(){
    try {
      const saved=localStorage.getItem(STORE);
      if(saved){const data=JSON.parse(saved);return {...structuredClone(defaults),...data,settings:{...defaults.settings,...data.settings}};}
    } catch(e) { console.warn('Yerel kayıt okunamadı:',e); }
    const initial=structuredClone(defaults);
    if(window.RGO_CONFIG){initial.settings={...initial.settings,...window.RGO_CONFIG};}
    return initial;
  }
  function save(){
    try { localStorage.setItem(STORE,JSON.stringify({settings:state.settings,vehicles:state.vehicles,events:state.events})); showToast('Bu tarayıcıya kaydedildi.'); }
    catch(e){ alert('Tarayıcı kaydı yapılamadı.'); throw e; }
  }
  function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function carMoney(v,n=v.dailyPrice){return Number(v.dailyPrice)>0?money(n):'Fiyat sorunuz';}
  function vehicleSpecs(v){return [v.fuel,v.seats?num(v.seats)+' kişilik':'',v.transmission,v.licenseClass?v.licenseClass+' sınıfı':'',v.width?num(v.width)+' mm genişlik':''].filter(Boolean).map(x=>'<span>'+esc(x)+'</span>').join('');}
  function money(n){return new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY',maximumFractionDigits:0}).format(Number(n)||0);}
  function num(v){return Math.max(0,Math.round(Number(v)||0));}
  function activeCars(){return state.vehicles.filter(v=>v.active);}
  function findCar(id){return state.vehicles.find(v=>v.id===id);}
  function priceFor(v,days){const daily=num(v.dailyPrice);if(days===7)return Math.round(daily*7*(1-num(state.settings.weeklyDiscount)/100));if(days===30)return Math.round(daily*30*(1-num(state.settings.monthlyDiscount)/100));return daily;}
  function eventLog(type,label){state.events.unshift({type,label,time:new Date().toISOString()});state.events=state.events.slice(0,500);if(window.gtag){window.gtag('event',type,{event_label:label});if((type==='call'||type==='whatsapp')&&state.settings.googleAds&&state.settings.googleAdsLabel)window.gtag('event','conversion',{send_to:state.settings.googleAds+'/'+state.settings.googleAdsLabel});}}
  function eventCount(type,days=30){const since=Date.now()-days*86400000;return state.events.filter(e=>(!type||e.type===type)&&new Date(e.time).getTime()>=since).length;}
  function showToast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2800);}
  const phoneSvg='<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.6 3.7 9 3.2c.7-.1 1.3.3 1.5 1l.8 2.7c.2.6 0 1.2-.5 1.6L9.2 9.8a14 14 0 0 0 5 5l1.3-1.6c.4-.5 1-.7 1.6-.5l2.7.8c.7.2 1.1.8 1 1.5l-.5 2.4c-.2.9-1 1.5-1.9 1.5C10 18.9 5.1 14 5.1 7.6c0-.9.6-1.7 1.5-1.9Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const waSvg='<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.4 11.8a8.4 8.4 0 0 1-12.4 7.4L4 20l.9-3.8a8.4 8.4 0 1 1 15.5-4.4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8.3 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.4.8 1.1 1.5 1.9 1.9.2.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5v.5c0 .3-.1.5-.4.7-.5.3-1.2.5-1.9.4-1.1-.2-2.4-.8-3.6-2-1.2-1.2-1.8-2.5-2-3.6-.1-.7.1-1.4.6-2.0Z" fill="currentColor"/></svg>';
  const carSvg='<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 11 1.5-4.2A2 2 0 0 1 8.4 5.5h7.2a2 2 0 0 1 1.9 1.3L19 11m-15 0h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-1v1.5h-2V18h-9v1.5H6V18H5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="7.5" cy="14.5" r="1" fill="currentColor"/><circle cx="16.5" cy="14.5" r="1" fill="currentColor"/></svg>';
  function waDigits(){return String(state.settings.whatsapp||'').replace(/\D/g,'');}
  function phoneDigits(){return String(state.settings.phone||'').replace(/[^\d+]/g,'');}
  function contactButton(kind,carId='',compact=false){const s=state.settings;const isCall=kind==='call';const enabled=isCall?s.phoneEnabled:s.whatsappEnabled;if(!enabled)return '';const cls=isCall?'btn-red':'btn-whatsapp';const label=isCall?(s.callLabel||'Ara'):(s.whatsappLabel||'WhatsApp');const icon=isCall?phoneSvg:waSvg;return `<button class="btn ${cls}" data-action="contact" data-kind="${kind}" data-car="${esc(carId)}" ${enabled?'':'disabled'}>${icon}<span>${label}</span></button>`;}
  function navHeader(admin=false){
    const s=state.settings;
    return `<div class="header-inner"><a class="brand" href="#home" data-action="home" aria-label="Rent A Cars Go ana sayfa"><img class="brand-mark" src="app-icon.svg?v=8" alt=""><span class="brand-copy"><span class="brand-name">${esc(s.brand.split(' ').slice(0,-1).join(' '))} <em>${esc(s.brand.split(' ').slice(-1)[0])}</em></span><span class="brand-sub">Araç kiralama <i></i> 81 ilde hizmet</span></span></a><nav class="main-nav" id="main-nav"><a href="#fleet" data-action="fleet">Araç filosu</a><a href="#airport-locations" data-action="airport-locations">Havalimanı</a><a href="#coverage" data-action="coverage">81 ilde hizmet</a><a href="#company" data-action="company">Kurumsal</a><a href="#contact" data-action="contact-section">İletişim</a></nav><div class="header-actions">${contactButton('call')}${admin?'<button class="btn btn-outline" data-action="public">Siteyi görüntüle</button>':''}</div><button class="menu-toggle" aria-label="Menüyü aç" data-action="menu"><svg class="icon" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></div>`;
  }
  function carCard(v,i){return `<article class="vehicle-card ${Number(v.dailyPrice)>0?'':'price-pending'}"><div class="card-badge-row"><span class="availability-badge">${esc(availabilityText(v))}</span><span class="km-badge"><i></i>Sınırsız km</span></div><div class="car-media"><img src="${esc(v.image)}" alt="${esc(v.name)}" loading="lazy" onerror="this.src='assets/cars/fiat-egea-sedan.jpg'"></div><div class="vehicle-info"><div class="vehicle-brand">${esc(v.category)}</div><h3 class="vehicle-title">${esc(v.name)}</h3><div class="specs">${vehicleSpecs(v)}</div><div class="card-rule"></div><div class="price-layout"><div class="daily-rate"><div class="office-rate">Ofis fiyatı <s>${carMoney(v,v.dailyPrice*1.35)}</s></div><small>ONLINE REZERVASYON / GÜN</small><strong>${carMoney(v)}</strong>${state.settings.pricesAreExamples&&Number(v.dailyPrice)>0?'<em>Örnek fiyat</em>':''}</div><div class="term-rates"><div><span>Haftalık <small>7 gün</small></span><strong>${carMoney(v,priceFor(v,7))}</strong><em>%${num(state.settings.weeklyDiscount)} indirim</em></div><div><span>Aylık <small>30 gün</small></span><strong>${carMoney(v,priceFor(v,30))}</strong><em>%${num(state.settings.monthlyDiscount)} indirim</em></div></div></div><div class="deposit">Depozito <b>${money(state.settings.deposit)}</b> <span>·</span> Sınırsız kilometre</div><div class="card-actions">${contactButton('call',v.id)}${contactButton('whatsapp',v.id)}</div><button class="details-link" data-action="details" data-car="${esc(v.id)}">Araç detayları <span>→</span></button></div></article>`;}
  function updateSiteMetadata(){
    const title=state.settings.metaTitle||state.settings.brand+' | Araç Kiralama';
    const description=state.settings.metaDescription||'Türkiye’nin 81 ilinde araç kiralama. Sınırsız kilometre, net fiyat ve kolay iletişim.';
    document.title=title;
    const meta=document.querySelector('meta[name="description"]');if(meta)meta.content=description;
    const ogTitle=document.querySelector('meta[property="og:title"]');if(ogTitle)ogTitle.content=title;
    const ogDescription=document.querySelector('meta[property="og:description"]');if(ogDescription)ogDescription.content=description;
    const schema=document.querySelector('#business-schema');if(schema){const data={"@context":"https://schema.org","@type":"AutoRental","name":state.settings.brand,"description":description,"areaServed":provinces.map(name=>({"@type":"AdministrativeArea",name})),"address":{"@type":"PostalAddress","streetAddress":state.settings.address,"addressLocality":"İstanbul","addressCountry":"TR"},"priceRange":"₺"};if(state.settings.phone)data.telephone=state.settings.phone;schema.textContent=JSON.stringify(data);}
  }
  function citySlug(value){return value.toLocaleLowerCase('tr').replaceAll('ı','i').replaceAll('ş','s').replaceAll('ğ','g').replaceAll('ü','u').replaceAll('ö','o').replaceAll('ç','c').normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
  function currentCity(){return provinces.find(p=>'/'+citySlug(p)===decodeURIComponent(location.pathname).replace(/\/+$/,''));}
  function renderPublic(){
    const city=currentCity();if(city)filterProvince=city;
    $('#site-header').innerHTML=navHeader(false);
    const categories=[...new Set(activeCars().map(v=>v.category))];
    const fuels=[...new Set(activeCars().map(v=>v.fuel).filter(Boolean))];
    const filtered=activeCars().filter(v=>`${v.name} ${v.category} ${v.fuel} ${v.transmission} ${v.seats} kişilik ${v.unlimitedKm?'sınırsız kilometre':''}`.toLocaleLowerCase('tr').includes(filterText.toLocaleLowerCase('tr'))&&(filterCategory==='all'||v.category===filterCategory)&&(filterFuel==='all'||v.fuel===filterFuel)&&(!filterLicenseClasses.length||filterLicenseClasses.includes(v.specsPending?'':(v.licenseClass||'B'))));
    const cityOptions=['Tüm Türkiye',...provinces].map((p,i)=>{const value=i===0?'all':p;return `<option value="${esc(value)}" ${filterProvince===value?'selected':''}>${i===0?'Tüm Türkiye':esc(p)}</option>`;}).join('');
    $('#public-view').hidden=false;$('#admin-view').hidden=true;updateSiteMetadata();
    $('#public-view').innerHTML=`
<section class="video-hero" id="home" aria-label="Rent A Cars Go">
  <div class="hero-media" aria-hidden="true">
    <img class="hero-video is-active" src="assets/images/hero-still.webp" alt="Rent A Cars Go araç filosu" fetchpriority="high" decoding="async">
  </div>
  <div class="hero-shade"></div><div class="hero-glow"></div>
  <div class="wrap hero-inner">
    <div class="hero-copy">
      <div class="hero-eyebrow"><i></i> RENT A CARS GO <span>·</span> 81 İLDE HİZMET</div>
      <h1>${esc(city?city+' Araç Kiralama':state.settings.heroTitle)}</h1>
      <p>${esc(state.settings.heroText)}</p>
      <div class="hero-points"><span><b>81</b> ilde hizmet</span><span><b>∞</b> sınırsız kilometre</span><span><b>₺4.500</b> sabit depozito</span></div>
      <div class="hero-actions"><button class="btn btn-glass" data-action="fleet">Filo araçlarını incele <span aria-hidden="true">↗</span></button><button class="btn btn-license" data-action="license-open">Ehliyet sorgu <span aria-hidden="true">✓</span></button>${contactButton('whatsapp')}</div>
    </div>
    <div class="hero-scene"><span>FİLO GÖRÜNTÜLERİ · TÜRKİYE GENELİ</span></div>
    <div class="hero-search" role="search" aria-label="Kiralık araç ara">
      <div class="hero-search-intro"><span>FİLONUZDAN SEÇİN</span><b>Aracınızı bulun</b></div>
      <label class="hero-search-field"><span>MARKA / MODEL / SINIF</span><input id="hero-search" type="search" placeholder="Örn. Fiat Egea, SUV, otomatik" value="${esc(filterText)}" autocomplete="off"></label>
      <label class="hero-search-field province-field"><span>TESLİMAT İLİ</span><select id="province-filter">${cityOptions}</select></label>
      <button class="btn btn-red search-submit" data-action="search">Araç bul ${carSvg}</button>
    </div>
  </div>
</section>
<div class="campaign-ticker" aria-label="Duyurular"><div class="ticker-track" id="campaign-message" aria-live="polite"><span>Haftalık ve aylık kiralamalarda <b>%22 indirim</b></span></div></div>
<section class="airport-section" id="airport-locations"><div class="wrap airport-layout"><div class="airport-visual"><img id="airport-video" src="assets/images/airport-still.webp" alt="Havalimanı teslim noktası" loading="lazy" decoding="async"><div class="airport-video-shade"></div><span class="airport-video-tag"><i></i> RENT A CARS GO · HAVALİMANI LOKASYONLARI</span></div><div class="airport-copy"><div class="section-mark">YOLCULUĞUN BAŞLADIĞI YERDE</div><h2>Havalimanı lokasyonlarımız.</h2><p>Havalimanı lokasyonlarımızdan görüntüler. Size uygun araç ve teslimat bilgisi için ekibimizle iletişime geçin.</p><div class="airport-points"><span>Net fiyat seçenekleri</span><span>Sınırsız kilometre</span><span>81 ilde hizmet</span></div><div class="airport-actions" id="contact">${contactButton('call')}${contactButton('whatsapp')}</div></div></div></section><section class="catalog-top" id="catalog"><div class="wrap"><div class="catalog-heading"><div><div class="eyebrow">RENT A CARS GO · ARAÇ FİLOSU</div><h2>Filoyu keşfedin.</h2><p>Kategori ve yakıt tipine göre daraltın; fiyatları net şekilde karşılaştırın.</p></div><div class="catalog-assurance"><span><b>${money(state.settings.deposit)}</b><small>Sabit depozito</small></span><span><b>Sınırsız km</b><small>Tüm araçlarda</small></span><span><b>81 il</b><small>Türkiye geneli</small></span></div></div><div class="filter-panel"><div class="filter-row"><span class="filter-label">Araç kategorisi</span><div class="filter-chips"><button class="filter-chip ${filterCategory==='all'?'active':''}" data-filter-category="all">Tümü</button>${categories.map(c=>`<button class="filter-chip ${filterCategory===c?'active':''}" data-filter-category="${esc(c)}">${esc(c)}</button>`).join('')}</div></div><div class="filter-row"><span class="filter-label">Yakıt tipi</span><div class="filter-chips"><button class="filter-chip ${filterFuel==='all'?'active':''}" data-filter-fuel="all">Tüm yakıtlar</button>${fuels.map(f=>`<button class="filter-chip ${filterFuel===f?'active':''}" data-filter-fuel="${esc(f)}">${esc(f)}</button>`).join('')}</div></div><div class="catalog-note"><span><i></i>${esc(state.settings.announcement)}</span><span>${filtered.length} araç listeleniyor</span></div></div></section><section class="fleet-section wrap" id="fleet"><div class="inventory-heading"><div><div class="section-mark">Kiralık araç filosu</div><h2>Size uygun aracı bulun.</h2><p>Her şehirde 98+ araçlık filo · Sınırsız kilometre.</p></div><div class="inventory-count"><b>${String(filtered.length).padStart(2,'0')}</b><span>araç</span></div></div><div class="vehicle-grid" id="vehicle-grid">${filtered.length?filtered.map(carCard).join(''):'<div class="empty-state">Aramanıza uygun araç bulunamadı. Filtreleri değiştirip tekrar deneyin.</div>'}</div></section><section class="coverage" id="coverage"><div class="wrap coverage-inner"><div><div class="section-mark">Geniş hizmet ağı</div><h2>81 ilin tamamında yanınızdayız.</h2><p>Araç kiralama talebinizi Türkiye'nin tüm illeri için iletebilirsiniz. Teslimat ve uygunluk bilgisi için bizimle iletişime geçin.</p></div><div class="province-cloud">${provinces.map(p=>`<a class="province-chip" href="/${citySlug(p)}">${esc(p)}</a>`).join('')}</div></div></section><footer class="site-footer" id="company"><div class="wrap"><div class="footer-top"><div><div class="footer-title">${esc(state.settings.legalTitle||state.settings.brand)}</div><div class="footer-legal"><strong>Şirket unvanı:</strong> ${esc(state.settings.legalTitle||state.settings.brand)}<br><strong>Adres:</strong> ${esc(state.settings.address)}<br><strong>E-posta:</strong> <a href="mailto:${esc(state.settings.email||'info@Garentamerkezi.com')}">${esc(state.settings.email||'info@Garentamerkezi.com')}</a><br>${esc(state.settings.brand)} · Türkiye genelinde 81 ilde araç kiralama.</div></div><div class="footer-links"><a href="/sozlesme">Sözleşme</a><a href="/fatura">Fatura taslağı</a><a href="#fleet" data-action="fleet">Araç filosu</a><a href="#coverage" data-action="coverage">Hizmet bölgeleri</a><a href="#contact" data-action="contact-section">İletişim</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} ${esc(state.settings.brand)}</span><span>Haftalık %${num(state.settings.weeklyDiscount)} · Aylık %${num(state.settings.monthlyDiscount)} avantaj</span></div></div></footer><div class="mobile-dock">${contactButton('call')}${contactButton('whatsapp')}</div>`;
    if(city){document.title=city+' Araç Kiralama | Rent A Cars Go';$('.hero-copy p').textContent=city+' şehir merkezi ve havalimanı teslim seçenekleri. Online rezervasyonlarda ücretsiz vale teslimi, sınırsız kilometre ve 4.500 TL depozito.';$('.inventory-heading h2').textContent=city+' için araç seçenekleri';}
    startCampaignTicker();$('.hero-search').hidden=!state.settings.searchEnabled;$('#hero-search').addEventListener('input',e=>{filterText=e.target.value;renderFleetOnly();});
    $('#public-view').querySelectorAll('[data-filter-category]').forEach(el=>el.addEventListener('click',()=>{filterCategory=el.dataset.filterCategory;renderPublic();}));
    $('#public-view').querySelectorAll('[data-filter-fuel]').forEach(el=>el.addEventListener('click',()=>{filterFuel=el.dataset.filterFuel;renderPublic();}));
    $('#province-filter').addEventListener('change',e=>{filterProvince=e.target.value;renderFleetOnly();eventLog('filter',`Teslimat ili: ${filterProvince==='all'?'Tüm Türkiye':filterProvince}`);showToast(filterProvince==='all'?'Türkiye genelinde 81 ilde hizmet.':`${filterProvince} için araç seçenekleri hazır.`);});
    const visits=state.events.filter(e=>e.type==='visit');
    if(!visits.length||Date.now()-new Date(visits[0].time).getTime()>30000)eventLog('visit','Site ziyareti');
  }  function renderFleetOnly(){const grid=$('#vehicle-grid');if(!grid)return;const cats=[...new Set(activeCars().map(v=>v.category))];const list=activeCars().filter(v=>`${v.name} ${v.category} ${v.fuel} ${v.transmission} ${v.seats} kişilik ${v.unlimitedKm?'sınırsız kilometre':''}`.toLocaleLowerCase('tr').includes(filterText.toLocaleLowerCase('tr'))&&(filterCategory==='all'||v.category===filterCategory)&&(filterFuel==='all'||v.fuel===filterFuel)&&(!filterLicenseClasses.length||filterLicenseClasses.includes(v.specsPending?'':(v.licenseClass||'B'))));grid.innerHTML=list.length?list.map(carCard).join(''):'<div class="empty-state">Aramanıza uygun araç bulunamadı.</div>';const count=$('.inventory-count b');if(count)count.textContent=String(list.length).padStart(2,'0');const note=$('.catalog-note span:last-child');if(note)note.textContent=`${list.length} araç listeleniyor`;const search=$('#fleet-search');if(search&&search.value!==filterText)search.value=filterText;const upper=$('#hero-search');if(upper&&upper.value!==filterText)upper.value=filterText;}
  function openDetails(id){const v=findCar(id);if(!v)return;eventLog('detail',`Araç detayı: ${v.name}`);selectedVehicle=v.id;const w=priceFor(v,7),m=priceFor(v,30);$('#modal-root').innerHTML=`<div class="modal-backdrop" data-action="close-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-label="${esc(v.name)} detayları"><div class="modal-head"><div><div class="section-mark">Filo / araç detayı</div><h2>${esc(v.name)}</h2></div><button class="icon-btn" data-action="close-modal" aria-label="Kapat">✕</button></div><div class="detail-grid"><div><div class="detail-photo"><img src="${esc(v.image)}" alt="${esc(v.name)}"></div><div class="detail-facts"><div class="fact">Kilometre<b>Sınırsız</b></div><div class="fact">Depozito<b>${money(state.settings.deposit)}</b></div><div class="fact">Vites / yakıt<b>${esc(v.transmission||'Bilgi alınız')} · ${esc(v.fuel||'Bilgi alınız')}</b></div><div class="fact">Kapasite<b>${v.seats?num(v.seats)+" kişi":"Bilgi alınız"}</b></div><div class="fact">Gerekli ehliyet<b>${esc(v.specsPending?'Teslim bilgisiyle teyit edilir':(v.licenseClass||'B')+' sınıfı')}</b></div>${v.width ? '<div class="fact">Genişlik<b>' + num(v.width) + ' mm</b></div>' : ''}</div></div><div class="detail-copy"><div class="vehicle-type">${esc(v.category)}</div><h3>${esc(v.name)}</h3><p>Fiyatlar seçilen kiralama süresine göre otomatik hesaplanır. Depozito tüm araçlarda aynıdır.</p><div class="rate-grid"><div class="rate active"><span>Günlük · 1 gün</span><strong>${carMoney(v)}</strong><small>${state.settings.pricesAreExamples?'Örnek fiyat':'Günlük ücret'}</small></div><div class="rate"><span>Haftalık · 7 gün</span><strong>${carMoney(v,w)}</strong><small>%${num(state.settings.weeklyDiscount)} indirim</small></div><div class="rate"><span>Aylık · 30 gün</span><strong>${carMoney(v,m)}</strong><small>%${num(state.settings.monthlyDiscount)} indirim</small></div></div><div class="notice" style="margin-top:12px">${money(state.settings.deposit)} sabit depozito · Sınırsız kilometre</div><div class="detail-actions" style="margin-top:15px">${contactButton('call',v.id)}${contactButton('whatsapp',v.id)}</div>${state.settings.reservationOpen?`<button class="btn btn-outline" style="margin-top:9px;width:100%" data-action="reservation" data-car="${esc(v.id)}">Ehliyet ön kontrolü ve talep</button>`:''}</div></div></section></div>`;}
  function dial(kind,carId){const s=state.settings;const isCall=kind==='call';const value=isCall?phoneDigits():waDigits();if(isCall)eventLog('call',`Arama tıklaması${carId?': '+(findCar(carId)?.name||''):''}`);else eventLog('whatsapp',`WhatsApp tıklaması${carId?': '+(findCar(carId)?.name||''):''}`);if(!value){showToast(isCall?'Telefon numarası yönetim panelinden eklenmeli.':'WhatsApp numarası yönetim panelinden eklenmeli.');return;}if(isCall){location.href=`tel:${value}`;}else{const msg=carId?`Merhaba, ${findCar(carId)?.name||'araç'} için bilgi almak istiyorum.`:'Merhaba, araç kiralama hakkında bilgi almak istiyorum.';window.open(`https://wa.me/${value.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`,'_blank','noopener');}}
  function isAdminPath(){return decodeURIComponent(location.pathname).replace(/\/+$/,'')==='/admin';}
  function renderAdminGate(message=''){
    $('#site-header').innerHTML='';$('#public-view').hidden=true;$('#admin-view').hidden=false;document.title='Yönetim paneli | Rent A Cars Go';
    const error=message?'<p class="admin-gate-error" role="alert">'+esc(message)+'</p>':'';
    $('#admin-view').innerHTML='<section class="admin-gate"><form class="admin-gate-card" data-form="admin-login"><img src="app-icon.svg?v=8" alt="" width="52" height="52"><span class="section-mark">RENT A CARS GO · YÖNETİM</span><h1>Yönetim paneli</h1><p>Devam etmek için yönetim şifresini girin.</p><label for="admin-password">Şifre</label><input id="admin-password" name="password" type="password" autocomplete="current-password" required><button class="btn btn-red" type="submit">Giriş yap</button>'+error+'</form></section>';
    $('#admin-password')?.focus();
  }
  function routePage(){if(location.hash==='#admin'||isAdminPath()){if(sessionStorage.getItem(ADMIN_SESSION_KEY)==='1'){serverSession.authenticated=true;renderAdmin();}else renderAdminGate();return;}renderPublic();}  function renderAdmin(){
    $('#site-header').innerHTML=navHeader(true);$('#public-view').hidden=true;$('#admin-view').hidden=false;
    const tabs=[['dashboard','Genel bakış'],['vehicles','Araç yönetimi'],['pricing','Fiyatlandırma'],['contacts','İletişim ve butonlar'],['reservation','Rezervasyon formu'],['marketing','Google ve etiketler'],['analytics','Analiz'],['content','Site içeriği'],['appearance','Renk paleti']];
    $('#admin-view').innerHTML=`<div class="admin-shell"><div class="wrap"><div class="admin-top"><div><div class="section-mark">Rent A Cars Go / Yönetim</div><h1>Yönetim paneli</h1><p>Araçları, fiyatları, iletişim kanallarını ve ölçüm ayarlarını buradan düzenleyin.</p></div><div class="admin-top-actions"><button class="btn btn-outline" data-action="backup">Yedek indir</button><button class="btn btn-red" data-action="save-admin">Değişiklikleri kaydet</button><button class="btn btn-outline" data-action="admin-logout">Çıkış</button></div></div><div class="admin-layout"><aside class="admin-nav">${tabs.map(t=>`<button class="${currentTab===t[0]?'active':''}" data-tab="${t[0]}">${tabIcon(t[0])}${t[1]}</button>`).join('')}<div class="nav-sep"></div><button data-action="public">↗ Siteyi aç</button></aside><section class="admin-content" id="admin-content">${adminTabContent()}</section></div><div class="admin-footer">Sunucuya bağlı yönetim · Kaydedilen değişiklikler tüm ziyaretçilere yansır.</div></div></div>`;
  }
  function tabIcon(name){const icons={dashboard:'◫',vehicles:'▣',pricing:'₺',contacts:'⌕',reservation:'▤',marketing:'⌘',analytics:'↗',content:'☷',appearance:'◉'};return `<span style="width:16px;color:var(--red);font-size:14px">${icons[name]||'·'}</span>`;}
  function adminTabContent(){switch(currentTab){case'vehicles':return vehiclesAdmin();case'pricing':return pricingAdmin();case'contacts':return contactsAdmin();case'reservation':return reservationAdmin();case'marketing':return marketingAdmin();case'analytics':return analyticsAdmin();case'content':return contentAdmin();case'appearance':return appearanceAdmin();default:return dashboardAdmin();}}
  function dashboardAdmin(){const types=[['visit','Site ziyareti'],['call','Arama tıklaması'],['whatsapp','WhatsApp tıklaması'],['detail','Araç detayı']];const weekDays=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));return d;});const daily=weekDays.map(d=>state.events.filter(e=>e.type==='visit'&&new Date(e.time).toDateString()===d.toDateString()).length);const max=Math.max(1,...daily);return `<div class="metric-grid">${[['Ziyaret',eventCount('visit'),'+ toplam'],['Arama tıklaması',eventCount('call'),'+ toplam'],['WhatsApp tıklaması',eventCount('whatsapp'),'+ toplam'],['Araç detayı görüntüleme',eventCount('detail'),'+ toplam']].map(x=>`<div class="metric"><small>${x[0]}</small><strong>${x[1]}</strong><em>${x[2]}</em></div>`).join('')}</div><div class="admin-grid-2" style="margin-top:14px"><div class="admin-panel"><div class="panel-title"><div><h2>Son 7 gün ziyaretleri</h2><p>Sunucuda kaydedilen site açılışları</p></div><span class="section-mark">CANLI VERİ</span></div><div class="chart">${daily.map((n,i)=>`<div class="chart-col"><div class="chart-bar" style="height:${Math.max(4,n/max*78)}%"></div><small>${['P','S','Ç','P','C','C','P'][i]}</small></div>`).join('')}</div></div><div class="admin-panel"><div class="panel-title"><div><h2>Etkileşim özeti</h2><p>Arama ve iletişim aksiyonları</p></div></div>${types.slice(1).map(t=>`<div class="channel-row"><span>${t[1]}</span><b>${eventCount(t[0])}</b></div>`).join('')}<div class="channel-row"><span>Rezervasyon formu</span><b>${state.settings.reservationOpen?'Açık':'Kapalı'}</b></div><div class="channel-row"><span>Yayındaki araç</span><b>${activeCars().length}</b></div></div></div><div class="admin-panel"><div class="panel-title"><div><h2>Son hareketler</h2><p>Site ve yönetim etkileşimleri</p></div></div>${state.events.slice(0,6).map(e=>`<div class="channel-row"><span>${esc(e.label)}</span><b>${new Date(e.time).toLocaleString('tr-TR')}</b></div>`).join('')||'<div class="empty-state">Henüz analiz verisi yok.</div>'}</div><div class="notice">Bu prototip analizleri yalnızca sunucuda tutar. Canlı site için GA4 veya Google Tag Manager kimliğini pazarlama sekmesinden ekleyin.</div>`;}
  function vehiclesAdmin(){return `<div class="admin-panel"><div class="panel-title"><div><h2>Araç envanteri</h2><p>Filodaki araçları düzenleyin, fotoğrafını seçin ve fiyatını güncel tutun.</p></div><button class="btn btn-red" data-action="add-vehicle">+ Yeni araç</button></div><div class="admin-car-list">${state.vehicles.map(v=>`<div class="admin-car-row"><img src="${esc(v.image)}" alt=""><div><strong>${esc(v.name)}</strong><small>${esc(v.category)} · ${carMoney(v)} / gün · ${v.unlimitedKm?'Sınırsız km':'Km limitli'}</small></div><div class="car-availability"><span class="status ${v.active?'':'off'}">${v.active?'Yayında':'Gizli'}</span></div><label title="Yayında"><input type="checkbox" class="toggle" data-toggle-car="${esc(v.id)}" ${v.active?'checked':''}></label><div class="mini-actions"><button class="tiny-btn" data-action="edit-vehicle" data-car="${esc(v.id)}">Düzenle</button><button class="tiny-btn red" data-action="delete-vehicle" data-car="${esc(v.id)}">Sil</button></div></div>`).join('')}</div></div><div class="notice">Her araçta ${money(state.settings.deposit)} depozito uygulanır. Günlük ücreti kaydedince haftalık ve aylık toplamlar otomatik hesaplanır.</div>`;}
  function pricingAdmin(){return `<form data-form="pricing"><div class="admin-panel"><div class="panel-title"><div><h2>Fiyat ve depozito</h2><p>Uzun dönem tutarları her aracın günlük fiyatından otomatik hesaplanır.</p></div></div><div class="admin-form"><div class="admin-field"><label>Tüm araçlar için depozito (TL)</label><input name="deposit" type="number" min="0" step="100" value="${num(state.settings.deposit)}"></div><div class="admin-field"><label>Fiyat gösterimi</label><select name="pricesAreExamples"><option value="true" ${state.settings.pricesAreExamples?'selected':''}>Örnek fiyat olarak işaretle</option><option value="false" ${!state.settings.pricesAreExamples?'selected':''}>Gerçek fiyat olarak göster</option></select></div><div class="admin-field"><label>Haftalık indirim (%)</label><input name="weeklyDiscount" type="number" min="0" max="90" value="${num(state.settings.weeklyDiscount)}"></div><div class="admin-field"><label>Aylık indirim (%)</label><input name="monthlyDiscount" type="number" min="0" max="90" value="${num(state.settings.monthlyDiscount)}"></div></div><div class="notice" style="margin-top:15px">Örnek: Günlük 2.500 TL, haftalık %22 indirimle 7 gün için 13.650 TL; aylık %22 indirimle 30 gün için 58.500 TL olur.</div><div style="display:flex;justify-content:flex-end;margin-top:15px"><button class="btn btn-red">Fiyatları kaydet</button></div></div></form><div class="admin-panel"><div class="panel-title"><div><h2>Araç bazlı günlük ücretler</h2><p>Günlük tutarı araç satırından değiştirin; detay fiyatı anında yeniden üretilir.</p></div></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Araç</th><th>Günlük</th><th>7 gün / %${num(state.settings.weeklyDiscount)}</th><th>30 gün / %${num(state.settings.monthlyDiscount)}</th></tr></thead><tbody>${activeCars().map(v=>`<tr><td>${esc(v.name)}</td><td>${carMoney(v)}</td><td>${carMoney(v,priceFor(v,7))}</td><td>${carMoney(v,priceFor(v,30))}</td></tr>`).join('')}</tbody></table></div></div>`;}
  function contactsAdmin(){return `<form data-form="contacts"><div class="admin-panel"><div class="panel-title"><div><h2>Telefon, WhatsApp ve arama</h2><p>İletişim düğmelerini ve araç bulma alanını ayrı ayrı açıp kapatın.</p></div></div><div class="admin-form"><div class="admin-field"><label>Arama numarası</label><input name="phone" value="${esc(state.settings.phone)}" placeholder="+90 5XX XXX XX XX"></div><div class="admin-field"><label>WhatsApp numarası</label><input name="whatsapp" value="${esc(state.settings.whatsapp)}" placeholder="+90 5XX XXX XX XX"></div><label class="check-row"><input name="phoneEnabled" type="checkbox" ${state.settings.phoneEnabled?'checked':''}> Arama butonunu göster</label><label class="check-row"><input name="whatsappEnabled" type="checkbox" ${state.settings.whatsappEnabled?'checked':''}> WhatsApp butonunu göster</label><label class="check-row"><input name="searchEnabled" type="checkbox" ${state.settings.searchEnabled?'checked':''}> Araç arama alanını göster</label></div><div style="display:flex;justify-content:flex-end;margin-top:15px"><button class="btn btn-red">İletişim ayarlarını kaydet</button></div></div></form><div class="admin-panel"><div class="panel-title"><div><h2>Site aksiyonları</h2><p>Arama ve WhatsApp tıklamaları analiz ekranında sayılır.</p></div></div><div class="channel-row"><span>Arama bağlantısı</span><b>${phoneDigits()?'Hazır':'Numara bekleniyor'}</b></div><div class="channel-row"><span>WhatsApp bağlantısı</span><b>${waDigits()?'Hazır':'Numara bekleniyor'}</b></div></div>`;}  function marketingAdminLegacy(){return `<form data-form="marketing"><div class="admin-panel"><div class="panel-title"><div><h2>Google ölçüm kimlikleri</h2><p>Etiket kimlikleri yayına alındığında ziyaret ve dönüşüm ölçümünde kullanılır.</p></div></div><div class="admin-form"><div class="admin-field"><label>Google Analytics 4 · Measurement ID</label><input name="ga4" value="${esc(state.settings.ga4)}" placeholder="G-XXXXXXXXXX"></div><div class="admin-field"><label>Google Tag Manager · Container ID</label><input name="gtm" value="${esc(state.settings.gtm)}" placeholder="GTM-XXXXXXX"></div><div class="admin-field"><label>Google Ads dönüşüm kimliği</label><input name="googleAds" value="${esc(state.settings.googleAds)}" placeholder="AW-XXXXXXXXX"></div><div class="admin-field"><label>Search Console doğrulama kodu</label><input name="siteVerification" value="${esc(state.settings.siteVerification)}" placeholder="Doğrulama meta değeri"></div></div><div class="notice" style="margin-top:15px">Kimlikler bu prototipte saklanır. Analitik etiketleri gerçek ziyaretçi verisi toplamaya ancak yayımlanmış alan adında bağlanır.</div><div style="display:flex;justify-content:flex-end;margin-top:15px"><button class="btn btn-red">Etiket ayarlarını kaydet</button></div></div></form><div class="admin-panel"><div class="panel-title"><div><h2>Arama görünümü</h2><p>Google sonuçlarında kullanılacak başlık ve açıklama.</p></div></div><div class="admin-form"><div class="admin-field full"><label>Sayfa başlığı</label><input value="${esc(state.settings.metaTitle)}" disabled></div><div class="admin-field full"><label>Meta açıklama</label><textarea disabled>${esc(state.settings.metaDescription)}</textarea></div></div><button class="tiny-btn" data-action="tab" data-tab-target="content" style="margin-top:12px">Site içeriğinde düzenle</button></div>`;}
  function analyticsAdmin(){const types=[['visit','Site ziyareti'],['call','Arama tıklaması'],['whatsapp','WhatsApp tıklaması'],['detail','Araç detayı']];return `<div class="metric-grid">${types.map(t=>`<div class="metric"><small>${t[1]}</small><strong>${eventCount(t[0])}</strong><em>Son 30 gün · sunucu</em></div>`).join('')}</div><div class="admin-panel" style="margin-top:14px"><div class="panel-title"><div><h2>Etkinlik kayıtları</h2><p>Son 100 hareket</p></div><button class="tiny-btn red" data-action="clear-analytics">Analizi temizle</button></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Etkinlik</th><th>İçerik</th><th>Zaman</th></tr></thead><tbody>${state.events.slice(0,100).map(e=>`<tr><td>${esc(e.type)}</td><td>${esc(e.label)}</td><td>${new Date(e.time).toLocaleString('tr-TR')}</td></tr>`).join('')||'<tr><td colspan="3">Henüz veri yok.</td></tr>'}</tbody></table></div></div><div class="notice">Yerel sayaçlar yalnızca sunucudaki kullanımı gösterir. Google Analytics 4 ve Google Ads dönüşüm ölçümü için ilgili kimlikleri Google ve etiketler sekmesine ekleyin.</div>`;}
  function contentAdmin(){return `<form data-form="content"><div class="admin-panel"><div class="panel-title"><div><h2>Ana sayfa ve marka</h2><p>Başlık ve bilgilendirme yazılarını düzenleyin.</p></div></div><div class="admin-form"><div class="admin-field"><label>Marka adı</label><input name="brand" value="${esc(state.settings.brand)}"></div><div class="admin-field"><label>Ana sayfa başlığı</label><input name="heroTitle" value="${esc(state.settings.heroTitle)}"></div><div class="admin-field full"><label>Ana sayfa açıklaması</label><textarea name="heroText">${esc(state.settings.heroText)}</textarea></div><div class="admin-field full"><label>Duyuru şeridi</label><input name="announcement" value="${esc(state.settings.announcement)}"></div><div class="admin-field"><label>Aktif müşteri sayısı</label><input name="activeCustomers" type="number" min="0" value="${esc(state.settings.activeCustomers)}" placeholder="Doğrulanmış sayı"></div><div class="admin-field"><label>Müşteri memnuniyet puanı (1–5)</label><input name="satisfactionRating" type="number" min="1" max="5" step="0.1" value="${esc(state.settings.satisfactionRating)}" placeholder="Doğrulanmış puan"></div><div class="admin-field"><label>Öne çıkan araç</label><select name="heroVehicle">${activeCars().map(v=>`<option value="${esc(v.id)}" ${state.settings.heroVehicle===v.id?'selected':''}>${esc(v.name)}</option>`).join('')}</select></div></div></div><div class="admin-panel"><div class="panel-title"><div><h2>Şirket bilgileri</h2><p>Faaliyet belgenizdeki ticaret unvanı ve iş yeri adresi.</p></div></div><div class="admin-form"><div class="admin-field full"><label>Ticaret unvanı</label><input name="legalTitle" value="${esc(state.settings.legalTitle)}"></div><div class="admin-field full"><label>İş yeri adresi</label><textarea name="address">${esc(state.settings.address)}</textarea></div><div class="admin-field full"><label>İletişim e-postası</label><input type="email" name="email" value="${esc(state.settings.email||'')}"></div><div class="admin-field full"><label>Google sonuç başlığı</label><input name="metaTitle" value="${esc(state.settings.metaTitle)}"></div><div class="admin-field full"><label>Google sonuç açıklaması</label><textarea name="metaDescription">${esc(state.settings.metaDescription)}</textarea></div></div><div style="display:flex;justify-content:flex-end;margin-top:15px"><button class="btn btn-red">İçeriği kaydet</button></div></div></form><div class="admin-panel"><div class="panel-title"><div><h2>Yedekleme</h2><p>Araç ve site ayarlarını JSON dosyası olarak indirin.</p></div><button class="btn btn-outline" data-action="backup">Yedek indir</button></div></div>`;}
  function renderAdminTab(){const content=$('#admin-content');if(content)content.innerHTML=adminTabContent();$$('.admin-nav [data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===currentTab));}
  function imageChoice(path,label,selected){
    return '<label class="image-choice' + (selected?' selected':'') + '"><input type="radio" name="image" value="' + esc(path) + '" ' + (selected?'checked':'') + ' required><img src="' + esc(path) + '" alt="" loading="lazy"><span>' + esc(label) + '</span></label>';
  }
  function vehicleImagePicker(v){
    const named = vehicleSeed.map(x => imageChoice(x.image, x.name, v.image === x.image)).join('');
    const archive = archivePhotoNumbers.map(n => { const path='assets/cars/archive/grentgo-' + n + '.webp'; return imageChoice(path, 'Ek görsel #' + n, v.image === path); }).join('');
    const open = v.image && v.image.includes('/archive/') ? ' open' : '';
    return '<div class="vehicle-image-picker"><div class="image-group-title">Araç görselleri <span>' + vehicleSeed.length + ' fotoğraf</span></div><div class="image-choice-grid">' + named + '</div></div>';
  }  function openVehicleForm(id=''){const v=id?findCar(id):{id:'',name:'',category:'Sedan',transmission:'Otomatik',fuel:'Benzin',seats:5,dailyPrice:2500,image:'assets/cars/fiat-egea-sedan.jpg',active:true,unlimitedKm:true};$('#modal-root').innerHTML=`<div class="modal-backdrop" data-action="close-backdrop"><section class="modal" role="dialog" aria-modal="true"><div class="modal-head"><div><div class="section-mark">${id?'Araç düzenle':'Yeni araç'}</div><h2>${id?esc(v.name):'Araç envanteri'}</h2></div><button class="icon-btn" data-action="close-modal">✕</button></div><form data-form="vehicle" data-id="${esc(id)}"><div class="admin-panel" style="border:0;margin:0"><div class="admin-form"><div class="admin-field"><label>Marka ve model</label><input name="name" required value="${esc(v.name)}"></div><div class="admin-field"><label>Araç sınıfı</label><input name="category" required value="${esc(v.category)}"></div><div class="admin-field full"><label>Müsait araç adedi (boşsa bilgi gösterilmez)</label><input name="availableCount" type="number" min="0" max="999" value="${esc(v.availableCount??'')}"></div><div class="admin-field full"><label>Şehir bazında müsaitlik — her satır: İstanbul:2</label><textarea name="cityAvailability">${esc(v.cityAvailability||'')}</textarea></div><div class="admin-field"><label>Günlük fiyat (TL)</label><input name="dailyPrice" type="number" min="0" required value="${num(v.dailyPrice)}"></div><div class="admin-field"><label>Araç genişliği (mm)</label><input name="width" type="number" min="100" max="3000" value="${num(v.width)}" placeholder="Örn. 1.800"></div><div class="admin-field full"><label>Araç fotoğrafı</label>${vehicleImagePicker(v)}</div><div class="admin-field"><label>Vites</label><select name="transmission"><option value="">Belirtilmedi</option><option ${v.transmission==='Otomatik'?'selected':''}>Otomatik</option><option ${v.transmission==='Manuel'?'selected':''}>Manuel</option></select></div><div class="admin-field"><label>Yakıt</label><select name="fuel">${['','Benzin','Dizel','Hibrit','Elektrik','LPG'].map(x=>`<option ${v.fuel===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="admin-field"><label>Koltuk sayısı</label><input name="seats" type="number" min="1" max="9" required value="${v.seats?num(v.seats):''}"></div><div class="admin-field"><label>Gerekli ehliyet sınıfı</label><select name="licenseClass">${["B","C1","C","D1","D"].map(x=>`<option value="${x}" ${((v.licenseClass||"B")===x)?"selected":""}>${x}</option>`).join("")}</select></div><div class="admin-field"><label>Yayında</label><select name="active"><option value="true" ${v.active?'selected':''}>Evet</option><option value="false" ${!v.active?'selected':''}>Hayır</option></select></div><label class="check-row admin-field full"><input name="unlimitedKm" type="checkbox" ${v.unlimitedKm?'checked':''}> Sınırsız kilometre ibaresi</label></div><div class="notice" style="margin-top:13px">Günlük fiyat kaydedildiğinde 7 günlük ve 30 günlük indirimli toplam araç detayında otomatik hesaplanır.</div><div style="display:flex;justify-content:flex-end;gap:8px;margin-top:15px"><button type="button" class="btn btn-outline" data-action="close-modal">Vazgeç</button><button class="btn btn-red">Aracı kaydet</button></div></div></form></section></div>`;}
  function openReservation(id){if(!state.settings.reservationOpen){showToast('Rezervasyon talep formu kapalı.');return;}const v=findCar(id);if(v&&lastLicenseCheck&&lastLicenseCheck.expires>Date.now()&&lastLicenseCheck.classes.includes(v.specsPending?'':(v.licenseClass||'B'))){openReservationForm(id);return;}openLicenseCheck(id,'reservation');}
  function openLicenseCheck(carId='',mode='public'){
    const chosen=findCar(carId);const today=new Date().toISOString().slice(0,10);const classes=['B','C1','C','D1','D'];
    $('#modal-root').innerHTML='';
    let area=$('#license-inline');if(!area){area=document.createElement('div');area.id='license-inline';area.className='wrap license-inline';$('#home').after(area);}
    area.innerHTML=`<div><section class="license-panel" aria-label="Ehliyet ön uygunluk kontrolü"><div class="modal-head"><div><div class="section-mark">ARAÇ KİRALAMA · ÖN KONTROL</div><h2>Ehliyet sorgu</h2></div></div><div class="license-content"><div class="license-intro"><span class="license-step">01 / 02</span><h3>Ehliyet bilgilerinizi girin.</h3><p>İşletme kuralımıza göre ehliyet tarihi en az 1 ayı doldurmuş olmalı. Belgenizde yazılı sınıfları seçin; uygun araçları listeleyelim.</p></div><div class="license-fields"><label class="admin-field full"><span>Ad soyad</span><input id="license-name" autocomplete="name" maxlength="100" placeholder="Adınız ve soyadınız"></label><label class="admin-field"><span>Ehliyet numarası</span><input id="license-number" autocomplete="off" inputmode="text" maxlength="24" placeholder="Ehliyet numaranız"></label><label class="admin-field"><span>Ehliyet veriliş tarihi</span><input id="license-date" type="date" max="${today}" required></label><fieldset class="license-class-field"><legend>Ehliyetinizde bulunan sınıflar</legend><div class="license-class-list">${classes.map(c=>`<label class="license-class-option"><input type="checkbox" name="license-class" value="${c}" ${chosen&&(chosen.licenseClass||'B')===c?'checked':''}><span>${c}</span></label>`).join('')}</div></fieldset></div><p class="license-privacy">Bu değerlendirme girdiğiniz tarih ve sınıfa dayanır; resmî kayıt sorgulanmaz. Numara kaydedilmez ve WhatsApp mesajına eklenmez. Ehliyetin aslı araç tesliminde kontrol edilir.</p><button class="btn btn-red license-run" type="button" data-action="license-run"><span>Uygunluğu kontrol et</span><span aria-hidden="true">→</span></button><div class="license-result" id="license-result" aria-live="polite" data-mode="${mode}"></div></div></section></div>`;
    area.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function licenseDateElapsed(issueDate){if(!issueDate)return false;const parts=issueDate.split('-').map(Number);if(parts.length!==3||parts.some(n=>!n))return false;const issued=new Date(parts[0],parts[1]-1,parts[2]);issued.setHours(0,0,0,0);const cutoff=new Date();cutoff.setHours(0,0,0,0);const day=cutoff.getDate();cutoff.setMonth(cutoff.getMonth()-1);if(cutoff.getDate()!==day)cutoff.setDate(0);return issued<=cutoff;}
  function runLicenseCheck(){applicantName=$('#license-name')?.value.trim()||'';const number=$('#license-number')?.value.trim()||'';const issueDate=$('#license-date')?.value||'';const classes=$$('[name="license-class"]:checked').map(el=>el.value);const result=$('#license-result');const run=$('[data-action="license-run"]');if(!result||!run)return;if(!applicantName||!number||!issueDate||!classes.length){result.innerHTML='<div class="license-message is-error">Ad soyad, ehliyet numarası, veriliş tarihi ve en az bir sınıfı girin.</div>';return;}const passesDate=licenseDateElapsed(issueDate);const matches=passesDate?activeCars().filter(v=>classes.includes(v.specsPending?'':(v.licenseClass||'B'))):[];run.disabled=true;run.innerHTML='<span class="license-loader" aria-hidden="true"></span><span>Bilgiler kontrol ediliyor</span>';result.innerHTML='<div class="license-wait"><span class="license-loader" aria-hidden="true"></span><span>Ehliyet tarihi ve araç sınıfı kontrol ediliyor…</span></div>';window.setTimeout(()=>{if($('#license-result')!==result)return;run.disabled=false;run.innerHTML='<span>Kontrolü yeniden yap</span><span aria-hidden="true">↻</span>';if(!passesDate){result.innerHTML='<div class="license-message is-error"><span class="license-x">!</span><div><b>Şimdilik uygun araç gösteremiyoruz.</b><p>Ehliyet veriliş tarihinin en az 1 ayı doldurmuş olması gerekir.</p></div></div>';return;}if(!matches.length){result.innerHTML='<div class="license-message is-error"><span class="license-x">!</span><div><b>Seçtiğiniz ehliyet sınıflarına uygun araç bulunamadı.</b><p>Ehliyette yazılı sınıfları tekrar kontrol edin.</p></div></div>';return;}lastLicenseCheck={classes,expires:Date.now()+15*60*1000};filterLicenseClasses=classes;const cards=matches.slice(0,6).map(v=>`<article class="license-car"><img src="${esc(v.image)}" alt=""><div><b>${esc(v.name)}</b><small>${esc(v.licenseClass||'B')} sınıfı · ${esc(v.transmission||'Bilgi alınız')} · ${esc(v.fuel||'Bilgi alınız')}</small><strong>${carMoney(v)} / gün</strong></div></article>`).join('');result.innerHTML=`<div class="license-message is-success"><span class="license-checkmark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.4 4.2L19 7" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>Ön uygunluk tamamlandı.</b><p>Ehliyet tarihi ve seçtiğiniz sınıflara uygun araçları listeledik. Belgenin aslı teslim sırasında kontrol edilir.</p></div></div><div class="license-matches"><div class="license-matches-title"><span>Size uygun araçlar</span><b>${matches.length} araç</b></div>${cards}</div><button class="btn btn-red license-next" type="button" data-action="license-next">Uygun araçlara devam et <span aria-hidden="true">→</span></button>`;eventLog('license_precheck',`Ön uygunluk tamamlandı · ${matches.length} araç`);},4000);}
  function continueToLicenseFleet(){if(!lastLicenseCheck||lastLicenseCheck.expires<Date.now()){showToast('Ön uygunluk kontrolünü tekrar yapın.');return;}$('#modal-root').innerHTML='';filterText='';filterCategory='all';filterFuel='all';renderPublic();const note=$('.catalog-note span:last-child');if(note)note.textContent=`Ehliyet sınıfınıza uygun ${activeCars().filter(v=>filterLicenseClasses.includes(v.specsPending?'':(v.licenseClass||'B'))).length} araç listeleniyor`;setTimeout(()=>$('#fleet')?.scrollIntoView({behavior:'smooth'}),60);}
  function openReservationForm(id){const v=findCar(id);if(!v)return;const today=new Date().toISOString().slice(0,10);const vehicleOptions=activeCars().filter(x=>lastLicenseCheck?.classes.includes(x.specsPending?'':(x.licenseClass||'B'))).map(x=>`<option value="${esc(x.id)}" ${x.id===id?'selected':''}>${esc(x.name)} · ${esc(x.specsPending?'':(x.licenseClass||'B'))} sınıfı · ${carMoney(x)} / gün</option>`).join('');const cities=provinces.map(p=>`<option>${esc(p)}</option>`).join('');$('#modal-root').innerHTML=`<div class="modal-backdrop" data-action="close-backdrop"><section class="modal license-modal" role="dialog" aria-modal="true" aria-label="Rezervasyon talebi"><div class="modal-head"><div><div class="section-mark">EHLIYET ÖN KONTROLÜ TAMAMLANDI</div><h2>Rezervasyon talebi</h2></div><button class="icon-btn" data-action="close-modal" aria-label="Kapat">✕</button></div><form data-form="request" data-car="${esc(id)}"><div class="license-content"><div class="license-selected-car"><img src="${esc(v.image)}" alt=""><span><small>Seçilen araç</small><b>${esc(v.name)}</b></span><strong>${carMoney(v)} / gün</strong></div><div class="license-fields"><label class="admin-field full"><span>Araç</span><select name="vehicle">${vehicleOptions}</select></label><label class="admin-field"><span>Ad soyad</span><input name="name" autocomplete="name" value="${esc(applicantName)}" required></label><label class="admin-field"><span>Telefon</span><input name="phone" type="tel" autocomplete="tel" required></label><label class="admin-field"><span>T.C. kimlik no (isteğe bağlı)</span><input name="tc" inputmode="numeric" maxlength="11" autocomplete="off"></label><label class="admin-field"><span>Ödeme tercihi</span><select name="payment"><option>Kredi kartı (teslimde)</option><option>EFT / Havale</option></select></label><label class="admin-field"><span>Alış tarihi</span><input name="start" type="date" min="${today}" required></label><label class="admin-field"><span>İade tarihi</span><input name="end" type="date" min="${today}" required></label><label class="admin-field"><span>Alış ili</span><select name="pickupCity">${cities}</select></label><label class="admin-field"><span>Alış noktası</span><select name="pickupType"><option>Şehir merkezi</option><option>Havalimanı</option></select></label><label class="admin-field"><span>İade ili</span><select name="returnCity">${cities}</select></label><label class="admin-field"><span>İade noktası</span><select name="returnType"><option>Şehir merkezi</option><option>Havalimanı</option></select></label></div><div class="valet-note"><b>Ücretsiz vale teslimi</b><span>81 ilin şehir merkezi ve havalimanı teslim noktalarında çevrimiçi rezervasyon taleplerine ücretsiz vale teslimi eklenir.</span></div><p class="license-privacy">Rezervasyon bilgileriniz site yönetimine kaydedilmez. WhatsApp mesajı siz gönderdiğinizde iletilir. Ehliyet numarası mesajda yer almaz.</p><label class="consent-row"><input name="privacyConsent" type="checkbox" required><span>Bilgilerimi rezervasyon talebim için WhatsApp mesajına eklemeyi kabul ediyorum.</span></label><button class="btn btn-whatsapp license-next" type="submit">${waSvg}<span>WhatsApp ile talep gönder</span></button></div></form></section></div>`;}
  function sendReservationToWhatsApp(form,fd){const phone=waDigits();if(!state.settings.whatsappEnabled){showToast('WhatsApp iletişimi şu anda kapalı.');return;}const start=String(fd.get('start')||''),end=String(fd.get('end')||'');if(!start||!end||end<=start){showToast('İade tarihi alış tarihinden sonra olmalı.');return;}if(!phone){showToast('WhatsApp numarası yönetim panelinden eklenmeli.');return;}const vehicle=findCar(String(fd.get('vehicle')||form.dataset.car));if(!vehicle){showToast('Lütfen araç seçin.');return;}const message=[`Merhaba, ${state.settings.brand} üzerinden rezervasyon talebi oluşturuyorum.`,`Ad soyad: ${String(fd.get('name')||'').trim()}`,`Telefon: ${String(fd.get('phone')||'').trim()}`,`T.C. kimlik no: ${String(fd.get('tc')||'').trim()||'Paylaşılmadı'}`,`Araç: ${vehicle.name}`,`Tarih: ${fd.get('start')} – ${fd.get('end')}`,`Alış: ${fd.get('pickupCity')} · ${fd.get('pickupType')}`,`İade: ${fd.get('returnCity')} · ${fd.get('returnType')}`,`Ödeme tercihi: ${fd.get('payment')}`,'Ücretsiz vale teslimi talep ediyorum.'].join('\n');eventLog('request',`WhatsApp rezervasyon talebi · ${vehicle.name}`);$('#modal-root').innerHTML='';window.open(`https://wa.me/${phone.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`,'_blank','noopener');showToast('WhatsApp mesajı açıldı; göndermek için WhatsApp’ta onaylayın.');}
  function backup(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='rent-a-cars-go-yedek.json';a.click();URL.revokeObjectURL(a.href);}
  function clearAnalytics(){state.events=[];save();renderAdmin();showToast('Bu tarayıcıdaki analiz kayıtları temizlendi.');}
  function setPublic(){if(isAdminPath()||location.hash==='#admin'){history.pushState({},'','/');sessionStorage.removeItem(ADMIN_SESSION_KEY);}location.hash='home';renderPublic();window.scrollTo({top:0,behavior:'smooth'});}
  function applyTags(){if(location.protocol==='file:')return;const s=state.settings;const ga4Valid=s.ga4&&/^G-[A-Z0-9]+$/i.test(s.ga4);const adsValid=s.googleAds&&/^AW-[0-9]+$/i.test(s.googleAds);if(ga4Valid||adsValid){window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};if(!document.querySelector('[data-tag="gtag"]')){const g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ga4Valid?s.ga4:s.googleAds);g.dataset.tag='gtag';document.head.append(g);gtag('js',new Date());}if(ga4Valid)gtag('config',s.ga4);if(adsValid)gtag('config',s.googleAds);}if(s.gtm&&/^GTM-[A-Z0-9]+$/i.test(s.gtm)&&!document.querySelector('[data-tag="gtm"]')){const g=document.createElement('script');g.dataset.tag='gtm';g.text=`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${s.gtm}');`;document.head.append(g);}if(s.siteVerification){let meta=$('meta[name="google-site-verification"]');if(!meta){meta=document.createElement('meta');meta.name='google-site-verification';document.head.append(meta);}meta.content=s.siteVerification;}}
  document.addEventListener('click',e=>{const tab=e.target.closest('[data-tab]');if(tab){currentTab=tab.dataset.tab;renderAdminTab();return;}const target=e.target.closest('[data-action]');if(!target)return;const a=target.dataset.action;if(a==='admin'){history.pushState({},'','/admin');currentTab='dashboard';routePage();window.scrollTo(0,0);}else if(a==='admin-logout'){sessionStorage.removeItem(ADMIN_SESSION_KEY);serverSession={authenticated:false,csrf:''};renderAdminGate();}else if(a==='public'||a==='home'){setPublic();}else if(a==='fleet'||a==='airport-locations'||a==='coverage'||a==='company'||a==='contact-section'){if(location.hash==='#admin')setPublic();setTimeout(()=>$(a==='fleet'?'#fleet':a==='airport-locations'?'#airport-locations':a==='coverage'?'#coverage':a==='company'?'#company':'#contact')?.scrollIntoView({behavior:'smooth'}),30);}else if(a==='details'){openDetails(target.dataset.car);}else if(a==='contact'){e.preventDefault();dial(target.dataset.kind,target.dataset.car);}else if(a==='close-modal'){$('#modal-root').innerHTML='';}else if(a==='close-backdrop'&&e.target===target){$('#modal-root').innerHTML='';}else if(a==='reservation'){openReservation(target.dataset.car);}else if(a==='license-open'){openLicenseCheck('','public');}else if(a==='license-run'){runLicenseCheck();}else if(a==='license-next'){continueToLicenseFleet();}else if(a==='menu'){$('#main-nav')?.classList.toggle('open');}else if(a==='search'){filterText=$('#hero-search')?.value||'';eventLog('search',`${filterText||'Tüm araçlar'} · ${filterProvince==='all'?'Tüm Türkiye':filterProvince}`);renderPublic();$('#fleet').scrollIntoView({behavior:'smooth'});}else if(a==='add-vehicle'){openVehicleForm();}else if(a==='edit-vehicle'){openVehicleForm(target.dataset.car);}else if(a==='delete-vehicle'){if(confirm('Bu aracı listeden kaldırmak istiyor musunuz?')){state.vehicles=state.vehicles.filter(v=>v.id!==target.dataset.car);save();renderAdmin();}}else if(a==='backup'){backup();}else if(a==='clear-analytics'){if(confirm('Yerel analiz kayıtları temizlensin mi?'))clearAnalytics();}else if(a==='save-admin'){const form=$('#admin-content form');if(form)form.requestSubmit();else showToast('Bu bölümde kaydedilecek değişiklik yok.');}else if(a==='tab'){currentTab=target.dataset.tabTarget;renderAdmin();}});
  document.addEventListener('change',e=>{const id=e.target.dataset.toggleCar;if(id){const v=findCar(id);if(v){v.active=e.target.checked;save();renderAdmin();showToast('Araç durumu güncellendi.');}}});
  document.addEventListener('submit',e=>{const form=e.target.closest('form[data-form]');if(!form)return;e.preventDefault();if(form.dataset.form==='admin-login'){const password=String(new FormData(form).get('password')||'');if(password==='rio123'){serverSession={authenticated:true,csrf:'local-only'};sessionStorage.setItem(ADMIN_SESSION_KEY,'1');state=loadState();currentTab='dashboard';renderAdmin();}else renderAdminGate('Şifre yanlış.');return;}saveForm(form);if(!isAdminPath()&&!location.hash.includes('admin')&&form.dataset.form!=='request')renderPublic();});
  window.addEventListener('hashchange',()=>{if(isAdminPath()||location.hash==='#admin')routePage();else if(location.hash.startsWith('#car/'))openDetails(location.hash.split('/')[1]);else renderPublic();});window.addEventListener('popstate',routePage);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#modal-root').innerHTML='';});
  const paletteOptions=[['burgundy','Klasik bordo','#8c2632','#ad4e58'],['navy','Lacivert','#294764','#587590'],['forest','Orman yeşili','#42644e','#75917d'],['slate','Çelik mavisi','#51697d','#8194a3'],['copper','Bakır','#9b5c3e','#bd856a'],['plum','Mürdüm','#6b566e','#927f96'],['petrol','Petrol','#2c6b69','#60918f'],['graphite','Grafit','#48515b','#7c858e'],['olive','Zeytin','#69724f','#90997a'],['indigo','İndigo','#4d5f8b','#7d8cb0'],['wine','Şarap','#712c3d','#a56d7a'],['bronze','Bronz','#806a43','#ad966e']];
  function applyPalette(){const chosen=paletteOptions.find(x=>x[0]===state.settings.theme)||paletteOptions[0];const root=document.documentElement;root.style.setProperty('--red',chosen[2]);root.style.setProperty('--red-soft',chosen[3]);document.body.dataset.palette=chosen[0];}
  function appearanceAdmin(){return `<form data-form="appearance"><div class="admin-panel"><div class="panel-title"><div><h2>Kurumsal renk paleti</h2><p>Beyaz zeminli site görünümünü koruyarak marka vurgu rengini seçin.</p></div></div><div class="palette-grid">${paletteOptions.map(p=>`<label class="palette-card ${state.settings.theme===p[0]?'active':''}"><input type="radio" name="theme" value="${p[0]}" ${state.settings.theme===p[0]?'checked':''}><span class="palette-swatch" style="--swatch:${p[2]};--swatch-soft:${p[3]}"><i></i><i></i><i></i></span><b>${p[1]}</b></label>`).join('')}</div><div class="notice" style="margin-top:14px">Renkler sade, okunaklı ve kurumsal kontrastı koruyacak şekilde seçildi.</div><div style="display:flex;justify-content:flex-end;margin-top:15px"><button class="btn btn-red">Renk paletini kaydet</button></div></div></form>`;}
  function marketingAdmin(){return `<form data-form="marketing"><div class="admin-panel"><div class="panel-title"><div><h2>Google ölçüm ve reklam etiketleri</h2><p>Kimlik girebilir veya Google Ads kod parçalarını yapıştırabilirsiniz.</p></div></div><div class="admin-form"><div class="admin-field"><label>Google Analytics 4 kimliği</label><input name="ga4" value="${esc(state.settings.ga4)}" placeholder="G-XXXXXXXXXX"></div><div class="admin-field"><label>Google Tag Manager kimliği</label><input name="gtm" value="${esc(state.settings.gtm)}" placeholder="GTM-XXXXXXX"></div><div class="admin-field"><label>Google Ads dönüşüm kimliği</label><input name="googleAds" value="${esc(state.settings.googleAds)}" placeholder="AW-XXXXXXXXX"></div><div class="admin-field"><label>Dönüşüm etiketi</label><input name="googleAdsLabel" value="${esc(state.settings.googleAdsLabel)}" placeholder="Dönüşüm etiketi"></div><div class="admin-field full"><label>Google etiketi kodu (gtag.js)</label><textarea name="googleTagSnippet" placeholder="Google Ads veya Analytics global site tag kodunu buraya yapıştırın">${esc(state.settings.googleTagSnippet)}</textarea></div><div class="admin-field full"><label>Google Ads dönüşüm kodu</label><textarea name="googleConversionSnippet" placeholder="Dönüşüm etkinliği kodunu buraya yapıştırın">${esc(state.settings.googleConversionSnippet)}</textarea></div><div class="admin-field full"><label>Search Console doğrulama kodu</label><input name="siteVerification" value="${esc(state.settings.siteVerification)}" placeholder="Meta doğrulama değeri"></div></div><div class="notice" style="margin-top:14px">Yapıştırılan Google kodlarından yalnızca ölçüm kimlikleri ve dönüşüm etiketi alınır. Google etiketi siteye bu kimliklerle güvenli şekilde eklenir.</div><div style="display:flex;justify-content:flex-end;margin-top:15px"><button class="btn btn-red">Google etiketlerini kaydet</button></div></div></form>`;}
  function reservationAdmin(){return `<form data-form="reservation"><div class="admin-panel"><div class="panel-title"><div><h2>Rezervasyon ve talep akışı</h2><p>Ehliyet ön kontrolü, uygun araç listesi ve WhatsApp talep formunu buradan yönetin.</p></div></div><label class="check-row"><input name="reservationOpen" type="checkbox" ${state.settings.reservationOpen?'checked':''}> Rezervasyon talep formunu sitede aç</label><div class="admin-field full" style="margin-top:14px"><label>Form kapalıyken gösterilecek açıklama</label><textarea name="reservationMessage">${esc(state.settings.reservationMessage)}</textarea></div><div class="notice" style="margin-top:14px">Müşteri iletişim bilgileri siteye kaydedilmez. Talep, müşterinin WhatsApp üzerinden kendisi göndermesiyle iletilir.</div><div style="display:flex;justify-content:flex-end;margin-top:15px"><button class="btn btn-red">Rezervasyon ayarlarını kaydet</button></div></div></form>`;}
  function startCampaignTicker(){const el=$('#campaign-message');if(!el)return;if(window.campaignTickerTimer)clearInterval(window.campaignTickerTimer);const messages=['Haftalık ve aylık kiralamalarda <b>%22 indirim</b>','Bütün araçlarda <b>sınırsız kilometre</b>','<b>81 ilde</b> şehir merkezi ve havalimanı teslim noktaları','Online rezervasyonlarda <b>ücretsiz vale teslimi</b>','Her araçta <b>4.500 TL depozito</b>','Aracınızı seçin, yolculuğunuza güvenle başlayın'];let i=0;window.campaignTickerTimer=window.setInterval(()=>{el.classList.add('is-changing');window.setTimeout(()=>{if(!el.isConnected)return;i=(i+1)%messages.length;el.innerHTML=`<span>${messages[i]}</span>`;el.classList.remove('is-changing');},220);},3900);}
  function saveForm(form){const name=form.dataset.form;const fd=new FormData(form);if(name==='request'){sendReservationToWhatsApp(form,fd);return;}if(name==='appearance'){state.settings.theme=String(fd.get('theme')||'burgundy');save();applyPalette();renderAdmin();showToast('Site renk paleti güncellendi.');return;}if(name==='marketing'){for(const k of ['ga4','gtm','googleAds','googleAdsLabel','googleTagSnippet','googleConversionSnippet','siteVerification'])state.settings[k]=String(fd.get(k)||'').trim();const siteCode=state.settings.googleTagSnippet;const convCode=state.settings.googleConversionSnippet;const ads=siteCode.match(/\bAW-\d+\b/);const ga=siteCode.match(/\bG-[A-Z0-9]+\b/i);const tag=siteCode.match(/\bGTM-[A-Z0-9]+\b/i);const label=convCode.match(/AW-\d+\/([A-Za-z0-9_-]+)/);if(!state.settings.googleAds&&ads)state.settings.googleAds=ads[0];if(!state.settings.ga4&&ga)state.settings.ga4=ga[0];if(!state.settings.gtm&&tag)state.settings.gtm=tag[0];if(!state.settings.googleAdsLabel&&label)state.settings.googleAdsLabel=label[1];save();applyTags();renderAdmin();showToast('Google etiket ayarları kaydedildi.');return;}if(name==='contacts')state.settings.searchEnabled=fd.get('searchEnabled')==='on';saveFormLegacy(form);}
  function saveFormLegacy(form){const fd=new FormData(form),name=form.dataset.form;
if(name==='vehicle'){const id=form.dataset.id||'car-'+Date.now();const item={id,availableCount:fd.get('availableCount')===''?'':num(fd.get('availableCount')),cityAvailability:String(fd.get('cityAvailability')||''),name:String(fd.get('name')||''),category:String(fd.get('category')||''),dailyPrice:num(fd.get('dailyPrice')),image:String(fd.get('image')||''),transmission:String(fd.get('transmission')||''),fuel:String(fd.get('fuel')||''),seats:num(fd.get('seats')),width:num(fd.get('width'))||'',licenseClass:String(fd.get('licenseClass')||'B'),active:fd.get('active')==='true',unlimitedKm:fd.get('unlimitedKm')==='on'};const i=state.vehicles.findIndex(v=>v.id===id);if(i<0)state.vehicles.push(item);else state.vehicles[i]=item;$('#modal-root').innerHTML='';}
else if(name==='contacts'){for(const k of ['phone','whatsapp'])state.settings[k]=String(fd.get(k)||'').trim();for(const k of ['phoneEnabled','whatsappEnabled','searchEnabled'])state.settings[k]=fd.get(k)==='on';}
else if(name==='reservation'){state.settings.reservationOpen=fd.get('reservationOpen')==='on';}
else if(name==='pricing'){for(const k of ['deposit','weeklyDiscount','monthlyDiscount'])state.settings[k]=num(fd.get(k));state.settings.pricesAreExamples=fd.get('pricesAreExamples')==='true';}
else if(name==='content'){for(const [k,v] of fd)if(Object.hasOwn(state.settings,k))state.settings[k]=String(v);}
save();renderAdmin();showToast('Ayarlar kaydedildi.');}
  document.addEventListener('rgo:open-license',()=>openLicenseCheck());
  function availabilityText(v){let count=v.availableCount; if(filterProvince!=='all'){const rows=String(v.cityAvailability||'').split(/\r?\n/);const row=rows.find(r=>r.split(':')[0].trim().toLocaleLowerCase('tr')===filterProvince.toLocaleLowerCase('tr'));count=row?row.split(':')[1].trim():'';}if(count===''||count==null)return 'Online fiyat avantajı';const n=Number(count);if(!Number.isFinite(n)||n<0)return 'Online fiyat avantajı';return n===0?'Şu anda müsaitlik yok':n<=2?'Son '+n+' araç · Hemen talep oluştur':n+' araç müsait · Aracını seç';}
  function renderDocumentPage(){const invoice=location.pathname.includes('fatura');$('#site-header').innerHTML=navHeader();$('#admin-view').hidden=true;$('#public-view').hidden=false;document.title=(invoice?'Fatura taslağı':'Kiralama sözleşmesi')+' | Rent A Cars Go';$('#public-view').innerHTML=`<section class="wrap document-page"><div class="document-tools"><h1>${invoice?'Fatura taslağı':'Kiralama sözleşmesi'}</h1><p>Bilgileri doldurun. PDF için yazdırma penceresinde “PDF olarak kaydet” seçin. Bilgiler siteye kaydedilmez.</p><button class="btn btn-red" data-action="document-print">PDF olarak indir / Yazdır</button><a class="btn btn-outline" href="/">Siteye dön</a></div><article class="print-document"><h2>${esc(state.settings.legalTitle)}</h2><p>${esc(state.settings.address)}</p><p>${esc(state.settings.email||'info@Garentamerkezi.com')}</p><h1>${invoice?'FATURA TASLAĞI — MALİ BELGE DEĞİLDİR':'ARAÇ KİRALAMA SÖZLEŞMESİ TASLAĞI'}</h1><div class="admin-form">${['Belge numarası','Tarih','Müşteri adı / unvanı','T.C. / Vergi numarası','Adres','Telefon','Araç marka / model','Plaka','Alış tarihi ve saati','İade tarihi ve saati','Teslim noktası','Günlük bedel (TL)','Toplam kira (TL)','Depozito (TL)','Ödeme yöntemi'].map(label=>`<label class="admin-field"><span>${label}</span><input autocomplete="off" value="${label==='Depozito (TL)'?'4500':''}"></label>`).join('')}</div><label class="admin-field document-terms"><span>${invoice?'Hizmet açıklaması, vergi oranı ve tutar dökümü':'Tarafların kabul ettiği kiralama koşulları'}</span><textarea placeholder="Belgeye eklenecek metni buraya yazın."></textarea></label><p>${invoice?'Bu çıktı fatura taslağıdır; resmî e-Fatura/e-Arşiv yerine geçmez.':'Taraflar yukarıda belirtilen bilgiler ve yazılan kiralama koşulları üzerinde anlaşmıştır.'}</p><div class="document-signatures"><span>Kiraya veren · Ad / İmza</span><span>Kiracı · Ad / İmza</span></div></article></section>`;}
  document.addEventListener('click',e=>{if(e.target.closest('[data-action="document-print"]'))window.print();});
  window.rgoStore={read:()=>structuredClone(state),updateSettings:next=>{state.settings={...state.settings,...next};save();},event:eventLog};
  if(window.rgoLoadError){document.body.innerHTML='<main style="padding:40px;font:16px Arial"><h1>Sunucu bağlantısı kurulamadı</h1><p>'+esc(window.rgoLoadError)+'</p></main>';return;}
  applyPalette();routePage();applyTags();
})();
