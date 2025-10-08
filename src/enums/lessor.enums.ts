export enum Regions {
  ANDIJON = 'Andijon viloyati',
  BUXORO = 'Buxoro viloyati',
  JIZZAX = 'Jizzax viloyati',
  QASHQADARYO = 'Qashqadaryo viloyati',
  NAVOIY = 'Navoiy viloyati',
  NAMANGAN = 'Namangan viloyati',
  FARGONA = "Farg'ona viloyati",
  SIRDARYO = 'Sirdaryo viloyati',
  SURXONDARYO = 'Surxondaryo viloyati',
  SAMARQAND = 'Samarqand viloyati',
  XORAZM = 'Xorazm viloyati',
  TOSHKENT_VILOYAT = 'Toshkent viloyati',
  TOSHKENT_SHAHAR = 'Toshkent shahri',
}

export const Districts: Record<Regions, string[]> = {
  [Regions.ANDIJON]: [
    'Andijon tumani', 'Asaka tumani', 'Baliqchi tumani', 'Bo‘ston tumani',
    'Buloqboshi tumani', 'Izboskan tumani', 'Jalaquduq tumani',
    'Xo‘jaobod tumani', 'Qo‘rg‘ontepa tumani', 'Marhamat tumani',
    'Oltinko‘l tumani', 'Paxtaobod tumani', 'Shahrixon tumani',
    'Ulug‘nor tumani'
  ],
  [Regions.BUXORO]: [
    'Alat tumani', 'Buxoro tumani', 'Vobkent tumani', 'G‘ijduvon tumani',
    'Jondor tumani', 'Kogon tumani', 'Qorako‘l tumani',
    'Qorovulbozor tumani', 'Peshku tumani', 'Romitan tumani',
    'Shofirkon tumani'
  ],
  [Regions.JIZZAX]: [
    'Arnasoy tumani', 'Baxmal tumani', 'Do‘stlik tumani',
    'Forish tumani', 'G‘allaorol tumani', 'Mirzacho‘l tumani',
    'Paxtakor tumani', 'Yangiobod tumani', 'Zomin tumani',
    'Zafarobod tumani', 'Zarbdor tumani', 'Sharaf Rashidov tumani'
  ],
  [Regions.QASHQADARYO]: [
    'Chiroqchi tumani', 'Dehqonobod tumani', 'G‘uzor tumani',
    'Kasbi tumani', 'Kitob tumani', 'Koson tumani',
    'Mirishkor tumani', 'Muborak tumani', 'Nishon tumani',
    'Qarshi tumani', 'Shahrisabz tumani', 'Yakkabog‘ tumani'
  ],
  [Regions.NAVOIY]: [
    'Karmana tumani', 'Konimex tumani', 'Navbahor tumani',
    'Nurota tumani', 'Tomdi tumani', 'Uchquduq tumani'
  ],
  [Regions.NAMANGAN]: [
    'Chortoq tumani', 'Chust tumani', 'Kosonsoy tumani',
    'Mingbuloq tumani', 'Namangan tumani', 'Naryn tumani',
    'Pop tumani', 'To‘raqo‘rg‘on tumani', 'Uchqo‘rg‘on tumani',
    'Uychi tumani', 'Yangiqo‘rg‘on tumani'
  ],
  [Regions.FARGONA]: [
    'Oltiariq tumani', 'Bag‘dod tumani', 'Beshariq tumani',
    'Buvayda tumani', 'Dang‘ara tumani', 'Farg‘ona tumani',
    'Furqat tumani', 'Qo‘shtepa tumani', 'Quva tumani',
    'Rishton tumani', 'So‘x tumani', 'Toshloq tumani',
    'Uchko‘prik tumani', 'Uzbekistan tumani', 'Yozyovon tumani'
  ],
  [Regions.SIRDARYO]: [
    'Akaltyn tumani', 'Bayaut tumani', 'Guliston tumani',
    'Mirzaobod tumani', 'Sayxunobod tumani', 'Sardoba tumani',
    'Sirdaryo tumani', 'Xavast tumani'
  ],
  [Regions.SURXONDARYO]: [
    'Angor tumani', 'Bandixon tumani', 'Boysun tumani',
    'Denov tumani', 'Jarkurgan tumani', 'Muzrabot tumani',
    'Oltinsoy tumani', 'Qiziriq tumani', 'Qumqo‘rg‘on tumani',
    'Sariosiyo tumani', 'Sherobod tumani', 'Termiz tumani',
    'Uzun tumani'
  ],
  [Regions.SAMARQAND]: [
    'Akdarya tumani', 'Bulungur tumani', 'Ishtikhan tumani',
    'Jomboy tumani', 'Kattakurgan tumani', 'Kushrabad tumani',
    'Narpay tumani', 'Nurabad tumani', 'Paxtachi tumani',
    'Payariq tumani', 'Pastdargom tumani', 'Samarqand tumani',
    'Taylak tumani', 'Urgut tumani'
  ],
  [Regions.XORAZM]: [
    'Bog‘ot tumani', 'Gurlan tumani', 'Hazarasp tumani',
    'Khanka tumani', 'Khiva tumani', 'Shavat tumani',
    'Taxtako‘pir tumani', 'Urganch tumani', 'Yangibozor tumani'
  ],
  [Regions.TOSHKENT_VILOYAT]: [
    'Ahangaran tumani', 'Bekobod tumani', 'Bo‘ka tumani',
    'Chinaz tumani', 'Oqqo‘rg‘on tumani', 'Parkent tumani',
    'Piskent tumani', 'Qibray tumani', 'Quyi Chirchiq tumani',
    'Tashkent tumani', 'Uchko‘prik tumani', 'Yuqori Chirchiq tumani',
    'Yangiyo‘l tumani', 'Zangiota tumani', 'Qo‘yichirchiq tumani'
  ],
  [Regions.TOSHKENT_SHAHAR]: [
    'Bektemir tumani', 'Chilanzor tumani', 'Mirzo Ulug‘bek tumani',
    'Mirobod tumani', 'Olmazor tumani', 'Sergeli tumani',
    'Shayxontohur tumani', 'Uchtepa tumani', 'Yakkasaroy tumani',
    'Yashnobod tumani', 'Yunusobod tumani'
  ],
};


export enum flatorhouse {
    flat = "flat",
    house = "house"
}


export enum for_who  {
    family = "for family",
    male = "male",
    female = "female"
}

export enum comforts {
    all_equipments = "with all equipments",
    free_communal = "free communals",
    gas = "gas",
    electricity = "electricity",
    water = "water",
    wifi = "wifi",
    carpets="carpets",
    curtains = "curtains",
    lift = "lift",
    heating ="heating",
    garage= "garage",
    conditioner = "conditioner",
    washing_machine = "washing machine",
    sofa="sofa",
    fridge ="fridge",
    television= "television",
    balcony="balcony",
    pet_friendly= "access to feeding pets",
}

