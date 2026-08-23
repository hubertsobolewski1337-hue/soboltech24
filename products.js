// SOBOLTECH24 — wszystkie aktualne oferty Allegro Lokalnie.
const PRODUCTS = [
  {
    title: "Płyta Samsung NP350E7C LA-8861P + dedykowana grafika Radeon + chłodzenie",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "180,00 zł",
    oldPrice: "350,00 zł",
    image: "",
    description: "Sprawna płyta główna Samsung NP350E7C z układem chłodzenia i grafiką Radeon.",
    url: "https://allegrolokalnie.pl/oferta/plyta-samsung-np350e7c-la8861p-i73630qm-radeon-sprawna"
  },
  {
    title: "Rower szosowy SCOTT Speedster 40 2016 M/54 Shimano Sora 2x9 | serwis",
    category: "Akcesoria",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "1 820,00 zł",
    oldPrice: "1 999,00 zł",
    image: "",
    description: "Rower szosowy Scott Speedster 40, rozmiar M/54, napęd Shimano Sora 2x9, po serwisie.",
    url: "https://allegrolokalnie.pl/oferty/q/Rower%20szosowy%20SCOTT%20Speedster%2040%202016%20M/54%20Shimano%20Sora%202x9%20%7C%20serwis"
  },
  {
    title: "Pamięć RAM Samsung 6GB (4GB+2GB) DDR3 1600MHz SO-DIMM PC3-12800S Laptop",
    category: "RAM",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "40,00 zł",
    oldPrice: "45,00 zł",
    image: "",
    description: "Zestaw pamięci RAM Samsung 6 GB (4 GB + 2 GB), DDR3 1600 MHz SO-DIMM.",
    url: "https://allegrolokalnie.pl/oferty/q/Pami%C4%99%C4%87%20RAM%20Samsung%206GB%20%284GB%2B2GB%29%20DDR3%201600MHz%20SO-DIMM%20PC3-12800S%20Laptop"
  },
  {
    title: "Karta sieciowa Qualcomm/Atheros AR5B225 – Wi‑Fi + Bluetooth",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "20,00 zł",
    oldPrice: "25,00 zł",
    image: "",
    description: "Karta sieciowa Qualcomm/Atheros AR5B225 z Wi‑Fi i Bluetooth.",
    url: "https://allegrolokalnie.pl/oferty/q/Karta%20sieciowa%20Qualcomm/Atheros%20AR5B225%20Wi-Fi%20Bluetooth"
  },
  {
    title: "Dysk HDD Seagate ST500LT012 500GB 2,5” 7mm SATA III + ramka",
    category: "Dyski",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "60,00 zł",
    image: "",
    description: "Dysk twardy Seagate 500 GB 2,5 cala SATA III 7 mm z ramką.",
    url: "https://allegrolokalnie.pl/oferty/q/Dysk%20HDD%20Seagate%20ST500LT012%20500GB%202%2C5%207mm%20SATA%20III%20ramka"
  },
  {
    title: "Oryginalna bateria Toshiba PA3536U-1BRS PABAS100 10.8V",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "50,00 zł",
    oldPrice: "55,00 zł",
    image: "",
    description: "Oryginalna bateria Toshiba PA3536U-1BRS / PABAS100 10.8V.",
    url: "https://allegrolokalnie.pl/oferty/q/Oryginalna%20bateria%20Toshiba%20PA3536U-1BRS%20PABAS100%2010.8V"
  },
  {
    title: "Oryginalna bateria ASUS A32-K55 10.8V 4400mAh 47Wh",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "70,00 zł",
    oldPrice: "80,00 zł",
    image: "",
    description: "Oryginalna bateria ASUS A32-K55 10.8V 4400mAh 47Wh.",
    url: "https://allegrolokalnie.pl/oferty/q/Oryginalna%20bateria%20ASUS%20A32-K55%2010.8V%204400mAh%2047Wh"
  },
  {
    title: "Głośnik konferencyjny EMEET OfficeCore M0 Plus Bluetooth USB – jak nowy",
    category: "Akcesoria",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "150,00 zł",
    oldPrice: "200,00 zł",
    image: "",
    description: "Głośnik konferencyjny EMEET OfficeCore M0 Plus, Bluetooth i USB.",
    url: "https://allegrolokalnie.pl/oferty/q/G%C5%82o%C5%9Bnik%20konferencyjny%20EMEET%20OfficeCore%20M0%20Plus%20Bluetooth%20USB"
  },
  {
    title: "Moduł Bluetooth Toshiba PA3608U-1BTM Taiyo Yuden EYTFXCS z przewodem",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "12,00 zł",
    image: "",
    description: "Moduł Bluetooth Toshiba PA3608U-1BTM Taiyo Yuden EYTFXCS z przewodem.",
    url: "https://allegrolokalnie.pl/oferty/q/Modu%C5%82%20Bluetooth%20Toshiba%20PA3608U-1BTM%20Taiyo%20Yuden%20EYTFXCS%20z%20przewodem"
  },
  {
    title: "Modem telefoniczny Agere Delphi D40 4005B-DELPI Toshiba PK010000000",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "15,00 zł",
    image: "",
    description: "Modem telefoniczny Agere Delphi D40 4005B-DELPI Toshiba PK010000000.",
    url: "https://allegrolokalnie.pl/oferty/q/Modem%20telefoniczny%20Agere%20Delphi%20D40%204005B-DELPI%20Toshiba%20PK010000000"
  },
  {
    title: "Matryca Samsung LTN170X2-L02 17” 1440x900 CCFL LVDS 30-pin błyszcząca",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "90,00 zł",
    oldPrice: "120,00 zł",
    image: "",
    description: "Matryca Samsung LTN170X2-L02 17 cali, 1440x900, CCFL, 30-pin.",
    url: "https://allegrolokalnie.pl/oferty/q/Matryca%20Samsung%20LTN170X2-L02%2017%201440x900%20CCFL%20LVDS%2030-pin"
  },
  {
    title: "Karta WiFi Bluetooth Ralink RT3290LE HP 690020-001 mini PCI-E",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "29,99 zł",
    image: "",
    description: "Karta WiFi / Bluetooth Ralink RT3290LE HP 690020-001 mini PCI-E.",
    url: "https://allegrolokalnie.pl/oferty/q/Karta%20WiFi%20Bluetooth%20Ralink%20RT3290LE%20HP%20690020-001%20mini%20PCI-E"
  },
  {
    title: "Karta WiFi Atheros AR5BXB63 Toshiba WLL3141-D4 mini PCI-E 54 Mb/s",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "12,00 zł",
    image: "",
    description: "Karta WiFi Atheros AR5BXB63 Toshiba WLL3141-D4 mini PCI-E 54 Mb/s.",
    url: "https://allegrolokalnie.pl/oferty/q/Karta%20WiFi%20Atheros%20AR5BXB63%20Toshiba%20WLL3141-D4%20mini%20PCI-E%2054%20Mb/s"
  },
  {
    title: "Touchpad Synaptics TM-00270-000 39T7209 Lenovo IBM ThinkPad T60 T60p",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "30,00 zł",
    oldPrice: "40,00 zł",
    image: "",
    description: "Touchpad Synaptics TM-00270-000 39T7209 do Lenovo IBM ThinkPad T60 / T60p.",
    url: "https://allegrolokalnie.pl/oferta/touchpad-synaptics-tm00270000-39t7209-lenovo-ibm-thinkpad-t60-t60p"
  },
  {
    title: "Procesor Intel Core i3-2370M 2,40 GHz",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "20,00 zł",
    image: "",
    description: "Procesor mobilny Intel Core i3-2370M 2,40 GHz.",
    url: "https://allegrolokalnie.pl/oferty/q/Procesor%20Intel%20Core%20i3-2370M%202%2C40%20GHz"
  },
  {
    title: "Pamięć RAM Micron 4GB DDR3L 1600 MHz PC3L-12800S SO-DIMM",
    category: "RAM",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "30,00 zł",
    image: "",
    description: "Pamięć RAM Micron 4 GB DDR3L 1600 MHz PC3L-12800S SO-DIMM.",
    url: "https://allegrolokalnie.pl/oferty/q/Pami%C4%99%C4%87%20RAM%20Micron%204GB%20DDR3L%201600%20MHz%20PC3L-12800S%20SO-DIMM"
  },
  {
    title: "Pamięć RAM Samsung 2x1GB DDR2 667 MHz SO-DIMM",
    category: "RAM",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "20,00 zł",
    image: "",
    description: "Zestaw pamięci RAM Samsung 2x1 GB DDR2 667 MHz SO-DIMM.",
    url: "https://allegrolokalnie.pl/oferty/q/Pami%C4%99%C4%87%20RAM%20Samsung%202x1GB%20DDR2%20667%20MHz%20SO-DIMM"
  },
  {
    title: "Procesor Intel Core 2 Duo T7300 2,00 GHz",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "32,00 zł",
    image: "",
    description: "Procesor Intel Core 2 Duo T7300 2,00 GHz.",
    url: "https://allegrolokalnie.pl/oferty/q/Procesor%20Intel%20Core%202%20Duo%20T7300%202%2C00%20GHz"
  },
  {
    title: "Procesor Intel Pentium Dual-Core T2130 1,86 GHz",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "25,00 zł",
    image: "",
    description: "Procesor Intel Pentium Dual-Core T2130 1,86 GHz.",
    url: "https://allegrolokalnie.pl/oferty/q/Procesor%20Intel%20Pentium%20Dual-Core%20T2130%201%2C86%20GHz"
  },
  {
    title: "Matryca 14,1” LG Philips LP141WP1-TLB8 1440x900 WXGA+ 30-pin",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "80,00 zł",
    image: "",
    description: "Matryca LG Philips LP141WP1-TLB8 14,1 cala, 1440x900, WXGA+, 30-pin.",
    url: "https://allegrolokalnie.pl/oferty/q/Matryca%2014%2C1%20LG%20Philips%20LP141WP1-TLB8%201440x900%20WXGA%2B%2030-pin"
  },
  {
    title: "Matryca LG LP173WD1-TLG1 17,3” 1600x900 HD+ LED 40-pin LVDS",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "70,00 zł",
    image: "",
    description: "Matryca LG LP173WD1-TLG1 17,3 cala, 1600x900 HD+, LED, 40-pin LVDS.",
    url: "https://allegrolokalnie.pl/oferty/q/Matryca%20LG%20LP173WD1-TLG1%2017%2C3%201600x900%20HD%2B%20LED%2040-pin%20LVDS"
  },
  {
    title: "Szelki bezpieczeństwa PROTEKT P-12 mX PRO XXL + lonża Y AW137 z AZ023",
    category: "Akcesoria",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "200,00 zł",
    oldPrice: "380,00 zł",
    image: "",
    description: "Szelki bezpieczeństwa PROTEKT P-12 mX PRO XXL z lonżą Y AW137 i AZ023.",
    url: "https://allegrolokalnie.pl/oferty/q/Szelki%20bezpiecze%C5%84stwa%20PROTEKT%20P-12%20mX%20PRO%20XXL%20lon%C5%BCa%20Y%20AW137%20AZ023"
  },
  {
    title: "Karta Wi‑Fi Ralink RT5390 150 Mb/s Mini PCIe ASUS",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "15,00 zł",
    image: "",
    description: "Karta Wi‑Fi Ralink RT5390 150 Mb/s Mini PCIe ASUS.",
    url: "https://allegrolokalnie.pl/oferty/q/Karta%20Wi-Fi%20Ralink%20RT5390%20150%20Mb/s%20Mini%20PCIe%20ASUS"
  },
  {
    title: "Karta sieciowa Wi‑Fi 5 + Bluetooth 5.0 Realtek RTL8822CE HP M.2",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "55,00 zł",
    image: "",
    description: "Karta sieciowa Realtek RTL8822CE HP M.2 z Wi‑Fi 5 i Bluetooth 5.0.",
    url: "https://allegrolokalnie.pl/oferty/q/Karta%20sieciowa%20Wi-Fi%205%20Bluetooth%205.0%20Realtek%20RTL8822CE%20HP%20M.2"
  },
  {
    title: "Karta Wi‑Fi Intel 300 Mb/s 2,4/5 GHz Lenovo",
    category: "Części",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "30,00 zł",
    image: "",
    description: "Karta Wi‑Fi Intel 300 Mb/s z obsługą 2,4/5 GHz do Lenovo.",
    url: "https://allegrolokalnie.pl/oferty/q/Karta%20Wi-Fi%20Intel%20300%20Mb/s%202%2C4/5%20GHz%20Lenovo"
  },
  {
    title: "Pamięć RAM Hynix 2 GB DDR2 667 MHz PC2-5300S SO-DIMM",
    category: "RAM",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "25,00 zł",
    image: "",
    description: "Pamięć RAM Hynix 2 GB DDR2 667 MHz PC2-5300S SO-DIMM.",
    url: "https://allegrolokalnie.pl/oferty/q/Pami%C4%99%C4%87%20RAM%20Hynix%202%20GB%20DDR2%20667%20MHz%20PC2-5300S%20SO-DIMM"
  },
  {
    title: "Pamięć RAM Samsung 8 GB 2x4 GB DDR4 3200 MHz",
    category: "RAM",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "80,00 zł",
    image: "",
    description: "Zestaw pamięci RAM Samsung 8 GB (2x4 GB) DDR4 3200 MHz.",
    url: "https://allegrolokalnie.pl/oferty/q/Pami%C4%99%C4%87%20RAM%20Samsung%208%20GB%202x4%20GB%20DDR4%203200%20MHz"
  },
  {
    title: "Dysk SSD Western Digital PC SN520 NVMe 128 GB",
    category: "Dyski",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "80,00 zł",
    image: "",
    description: "Dysk SSD Western Digital PC SN520 NVMe 128 GB.",
    url: "https://allegrolokalnie.pl/oferty/q/Dysk%20SSD%20Western%20Digital%20PC%20SN520%20NVMe%20128%20GB"
  },
  {
    title: "Ledger-NANO-S-plus",
    category: "Akcesoria",
    platform: "Allegro Lokalnie",
    status: "available",
    currentPrice: "220,00 zł",
    image: "",
    description: "Portfel sprzętowy Ledger Nano S Plus do przechowywania kryptowalut.",
    url: "https://allegrolokalnie.pl/oferty/q/Ledger%20Nano%20S%20Plus"
  }
];
