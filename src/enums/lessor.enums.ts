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
    'Olot tumani', 'Buxoro tumani', 'Vobkent tumani', 'G‘ijduvon tumani',
    'Jondor tumani', 'Kogon tumani', 'Qorako‘l tumani',
    'Qorovulbozor tumani', 'Peshku tumani', 'Romitan tumani',
    'Shofirkon tumani'
  ],
  [Regions.JIZZAX]: [
    'Arnasoy tumani', 'Baxmal tumani', 'Do‘stlik tumani',
    'Forish tumani', 'G‘allaorol tumani', 'Mirzacho‘l tumani',
    'Paxtakor tumani', 'Yangiobod tumani', 'Zomin tumani',
    'Zafarobod tumani', 'Zarbdor tumani', 'Sharof Rashidov tumani'
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
    'Mingbuloq tumani', 'Namangan tumani', 'Norin tumani',
    'Pop tumani', 'To‘raqo‘rg‘on tumani', 'Uchqo‘rg‘on tumani',
    'Uychi tumani', 'Yangiqo‘rg‘on tumani'
  ],
  [Regions.FARGONA]: [
    'Oltiariq tumani', 'Bag‘dod tumani', 'Beshariq tumani',
    'Buvayda tumani', 'Dang‘ara tumani', 'Farg‘ona tumani',
    'Furqat tumani', 'Qo‘shtepa tumani', 'Quva tumani',
    'Rishton tumani', 'So‘x tumani', 'Toshloq tumani',
    'Uchko‘prik tumani', 'O‘zbekiston tumani', 'Yozyovon tumani'
  ],
  [Regions.SIRDARYO]: [
    'Oqoltin tumani', 'Boyovut tumani', 'Guliston tumani',
    'Mirzaobod tumani', 'Sayxunobod tumani', 'Sardoba tumani',
    'Sirdaryo tumani', 'Xovos tumani'
  ],
  [Regions.SURXONDARYO]: [
    'Angor tumani', 'Bandixon tumani', 'Boysun tumani',
    'Denov tumani', 'Jarqo‘rg‘on tumani', 'Muzrabot tumani',
    'Oltinsoy tumani', 'Qiziriq tumani', 'Qumqo‘rg‘on tumani',
    'Sariosiyo tumani', 'Sherobod tumani', 'Termiz tumani',
    'Uzun tumani'
  ],
  [Regions.SAMARQAND]: [
    'Oqdaryo tumani', 'Bulung‘ur tumani', 'Ishtixon tumani',
    'Jomboy tumani', 'Kattaqo‘rg‘on tumani', 'Qo‘shrabot tumani',
    'Narpay tumani', 'Nurobod tumani', 'Paxtachi tumani',
    'Payariq tumani', 'Pastdarg‘om tumani', 'Samarqand tumani',
    'Tayloq tumani', 'Urgut tumani'
  ],
  [Regions.XORAZM]: [
    'Bog‘ot tumani', 'Gurlan tumani', 'Hazorasp tumani',
    'Xonqa tumani', 'Xiva tumani', 'Shovot tumani',
    'Taxtako‘pir tumani', 'Urganch tumani', 'Yangibozor tumani'
  ],
  [Regions.TOSHKENT_VILOYAT]: [
    'Ohangaron tumani', 'Bekobod tumani', 'Bo‘ka tumani',
    'Chinoz tumani', 'Oqqo‘rg‘on tumani', 'Parkent tumani',
    'Piskent tumani', 'Qibray tumani', 'Quyi Chirchiq tumani',
    'Toshkent tumani', 'O‘rtachirchiq tumani', 'Yuqori Chirchiq tumani',
    'Yangiyo‘l tumani', 'Zangiota tumani', 'Qo‘yichirchiq tumani'
  ],
  [Regions.TOSHKENT_SHAHAR]: [
    'Bektemir tumani', 'Chilonzor tumani', 'Mirzo Ulug‘bek tumani',
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
    free_communal = "kommunallar tekin",
    gas = "gas",
    electrocity = "elektr toki",
    water = "suv",
    ariston= "arizton",
    wifi = "wifi",
    carpets="carpets",
    curtains = "curtains",
    lift = "lift",
    heating ="isitish tizimi",
    garage= "mashina uchun garaj",
    conditioner = "konditsioner",
    washing_machine = "kir yuvish mashinasi",
    fridge ="muzlatgich",
    tv= "television",
    balcony="balcony",
<<<<<<< HEAD
    pet_friendly= "hayvonlar uchun ruxsat",
=======
    pet_friendly= "hayvonlar uchun ruhsat",
}

export enum currency {
  uzs = "UZS",
  usd= "USD",
  eur= "EUR"
}

export enum statuses {
  free = "bo'sh",
  full = "to'lgan",
  half = "joy bor",
  banned = "firbgar"
>>>>>>> master
}