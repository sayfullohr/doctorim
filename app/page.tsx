"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Search,
  Volume2,
  VolumeX,
  Bell,
  User,
  Check,
  Star,
  MapPin,
  Heart,
  ChevronRight,
  ChevronDown,
  Phone,
  Video,
  Clock,
  Headphones,
  SlidersHorizontal,
  X,
  LayoutGrid,
  Award,
  Wallet,
  Info,
  GraduationCap,
  Briefcase,
  Building2,
  PhoneOff,
  Stethoscope,
  Sparkles,
} from "lucide-react";

type Lang = "uz" | "ru" | "en";

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

interface Doctor {
  id: number;
  name: string;
  specialtyKey: string;
  specialty: { uz: string; ru: string; en: string };
  clinic: string;
  address: string;
  phone: string;
  workingHours: string;
  experience: number;
  rating: number;
  reviewsCount: number;
  distanceNum: number;
  distanceStr: string;
  price: number;
  image: string;
  verified: boolean;
  bio: { uz: string; ru: string; en: string };
  education: { uz: string[]; ru: string[]; en: string[] };
  skills: { uz: string[]; ru: string[]; en: string[] };
  reviews: Review[];
}

const DOCTORS: Doctor[] = [
  {
    id: 1,
    name: "Abdullaev Azizbek",
    specialtyKey: "kardiolog",
    specialty: { uz: "Kardiolog", ru: "Кардиолог", en: "Cardiologist" },
    clinic: "CardioLife Markazi",
    address: "Toshkent sh., Yunusobod t., Amir Temur ko'chasi 42",
    phone: "+998 (71) 203-11-22",
    workingHours: "Dush-Juma: 09:00 - 17:00, Shanba: 09:00 - 14:00",
    experience: 12,
    rating: 4.9,
    reviewsCount: 324,
    distanceNum: 1.2,
    distanceStr: "1.2 km away",
    price: 250000,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    verified: true,
    bio: {
      uz: "Oliy toifali kardiolog, tibbiyot fanlari nomzodi. 12 yildan ortiq davr mobaynida yurak-qon tomir kasalliklari diagnostikasi, arterial gipertoniya va aritmiyalarni zamonaviy xalqaro standartlar asosida muvaffaqiyatli davolab kelmoqda.",
      ru: "Кардиолог высшей категории, кандидат медицинских наук. Более 12 лет специализируется на диагностике сердечно-сосудистых заболеваний, лечении гипертонии и аритмий по международным протоколам.",
      en: "Senior Cardiologist, PhD in Medicine with 12+ years of experience in cardiovascular diagnosis, hypertension, and arrhythmia treatment using evidence-based international protocols.",
    },
    education: {
      uz: [
        "Toshkent Tibbiyot Akademiyasi — Davolash ishi (2008-2015)",
        "Respublika Kardiologiya Ilmiy Markazi — Magistratura va ordinatura (2015-2018)",
        "Germaniya (Charité Universiteti) — Kardiologik diagnostika bo'yicha amaliyot (2021)",
      ],
      ru: [
        "Ташкентская медицинская академия — Лечебное дело (2008-2015)",
        "Республиканский научный центр кардиологии — Ординатура (2015-2018)",
        "Германия (Charité) — Стажировка по кардиологической диагностике (2021)",
      ],
      en: [
        "Tashkent Medical Academy — General Medicine (2008-2015)",
        "Republican Scientific Cardiology Center — Residency (2015-2018)",
        "Charité University, Berlin — Clinical Cardiology Internship (2021)",
      ],
    },
    skills: {
      uz: [
        "EKG va Xolter sutkalik monitoring tahlili",
        "Exokardiografiya (Yurak UTT/ExoKG)",
        "Gipertoniya va gipotoniya davolash",
        "Yurak ishemik kasalligi profilaktikasi",
        "Aritmiya va yurak yetishmovchiligini korreksiyalash",
      ],
      ru: [
        "Анализ ЭКГ и суточного мониторинга Холтера",
        "Эхокардиография (УЗИ сердца)",
        "Лечение гипертонии и гипотонии",
        "Профилактика ишемической болезни сердца",
        "Терапия аритмий и сердечной недостаточности",
      ],
      en: [
        "ECG & Holter 24h monitoring interpretation",
        "Echocardiography (Cardiac Ultrasound)",
        "Hypertension & Hypotension therapy",
        "Ischemic heart disease prevention",
        "Arrhythmia & heart failure management",
      ],
    },
    reviews: [
      {
        id: 101,
        author: "Shavkat Aliyev",
        rating: 5,
        date: "Kecha, 14:20",
        comment: "Azizbek shifokor juda sinchkovlik bilan tekshirdilar. Bosimimni normaga keltirish bo'yicha ajoyib davolash kursi yozib berdilar. Rahmat!",
      },
      {
        id: 102,
        author: "Gulbahor Karimova",
        rating: 5,
        date: "3 kun oldin",
        comment: "Oliy toifali mutaxassis! Muammomni darhol tushunib, to'g'ri dori-darmonlar tayinladilar. Hozir o'zimni ancha yaxshi his qilyapman.",
      },
    ],
  },
  {
    id: 2,
    name: "Karimova Dilnoza",
    specialtyKey: "pediatr",
    specialty: { uz: "Pediatr", ru: "Педиатр", en: "Pediatrician" },
    clinic: "Bolalar Salomatligi Markazi",
    address: "Toshkent sh., Mirzo Ulug'bek t., Parkent ko'chasi 71",
    phone: "+998 (71) 207-88-99",
    workingHours: "Dush-Shanba: 08:30 - 16:30",
    experience: 8,
    rating: 4.8,
    reviewsCount: 218,
    distanceNum: 1.8,
    distanceStr: "1.8 km away",
    price: 180000,
    image: "https://images.unsplash.com/photo-1594824813589-913612543d8c?auto=format&fit=crop&w=800&q=80",
    verified: true,
    bio: {
      uz: "Bolalar salomatligi bo'yicha yetuk mutaxassis. Chaqaloqlik davridan to o'smirlik yoshigacha bo'lgan bolalarda uchraydigan kasalliklarni aniqlash, emlash rejalashtirish va immun tizimini mustahkamlash bilan shug'ullanadi.",
      ru: "Квалифицированный педиатр. Наблюдение детей от рождения до подросткового возраста, индивидуальные графики вакцинации, лечение простудных и аллергических заболеваний.",
      en: "Dedicated pediatrician specialized in comprehensive infant, child, and adolescent care, individualized vaccination schedules, and immunity strengthening.",
    },
    education: {
      uz: [
        "Toshkent Pediatriya Tibbiyot Instituti (SamPI) — Pediatriya fakulteti (2011-2018)",
        "Respublika Bolalar Ilmiy-Amaliy Tibbiyot Markazi — Klinika ordinaturasi (2018-2020)",
      ],
      ru: [
        "Ташкентский педиатрический медицинский институт — Педиатрия (2011-2018)",
        "Республиканский детский научно-практический центр — Ординатура (2018-2020)",
      ],
      en: [
        "Tashkent Pediatric Medical Institute — Pediatrics (2011-2018)",
        "Republican Children's Clinical Center — Residency (2018-2020)",
      ],
    },
    skills: {
      uz: [
        "Bolalar rivojlanishini nazorat qilish va baholash",
        "O'tkir respiratorli virusli infeksiyalar (O'RVI) davolash",
        "Bolalar allergik reaksiyalari profilaktikasi",
        "Chaqaloqlar parvarishi va emizish bo'yicha maslahat",
      ],
      ru: [
        "Контроль и оценка развития ребенка",
        "Лечение острых респираторных инфекций (ОРВИ)",
        "Профилактика детских аллергий",
        "Консультации по уходу за новорожденными и ГВ",
      ],
      en: [
        "Child developmental assessment",
        "Treatment of acute respiratory viral infections",
        "Pediatric allergy prevention",
        "Newborn care & breastfeeding consultation",
      ],
    },
    reviews: [
      {
        id: 201,
        author: "Zarina Usmonova",
        rating: 5,
        date: "1 hafta oldin",
        comment: "Dilnoza opaga katta rahmat! Qizalog'imni qo'rqitmasdan, juda muloyim qabul qildilar. Davolash kursi tezda foyda berdi.",
      },
    ],
  },
  {
    id: 3,
    name: "Raxmatov Shohruh",
    specialtyKey: "stomatolog",
    specialty: { uz: "Stomatolog", ru: "Стоматолог", en: "Dentist" },
    clinic: "Dental Shifo Clinic",
    address: "Toshkent sh., Chilonzor t., Bunyodkor shoh ko'chasi 18",
    phone: "+998 (71) 230-40-50",
    workingHours: "Dush-Shanba: 09:00 - 19:00",
    experience: 15,
    rating: 4.9,
    reviewsCount: 412,
    distanceNum: 2.4,
    distanceStr: "2.4 km away",
    price: 200000,
    image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=800&q=80",
    verified: true,
    bio: {
      uz: "15 yillik tajribaga ega bosh stomatolog, tish implantologi va ortopedi. Eng murakkab tish muammolarini og'riqsiz davolash, zamonaviy estetik tish qoplamalari va implantatsiya qilish bo'yicha yetakchi ekspert.",
      ru: "Главный стоматолог-ортопед и имплантолог с 15-летним стажем. Эксперт по безболезненному лечению зубов, установке имплантов и эстетической реставрации улыбки.",
      en: "Chief dentist and dental implantologist with 15 years experience. Expert in painless dentistry, aesthetic restorations, and modern dental implants.",
    },
    education: {
      uz: [
        "Toshkent Davlat Stomatologiya Instituti — Stomatologiya (2006-2011)",
        "Rossiya Federatsiyasi (Moskva) — Zamonaviy tish implantologiyasi kursi (2016)",
        "Janubiy Koreya (Osstem Implant) — Ilg'or implantatsiya sertifikati (2019)",
      ],
      ru: [
        "Ташкентский государственный стоматологический институт (2006-2011)",
        "Москва — Курс современной дентальной имплантологии (2016)",
        "Южная Корея (Osstem) — Сертификат по продвинутой имплантации (2019)",
      ],
      en: [
        "Tashkent State Dental Institute — Dentistry (2006-2011)",
        "Moscow — Advanced Dental Implantology Course (2016)",
        "South Korea (Osstem) — Advanced Surgical Implant Certificate (2019)",
      ],
    },
    skills: {
      uz: [
        "Og'riqsiz tish davolash va plombalash",
        "Zamonaviy tish implantatsiyasi",
        "Keramik vinirlar va sirkoniy qoplamalar",
        "Professional tish oqartirish va tozalash",
      ],
      ru: [
        "Безболезненное лечение кариеса и каналов",
        "Дентальная имплантация Osstem & Straumann",
        "Керамические виниры и циркониевые коронки",
        "Профессиональное отбеливание и чистка зубов",
      ],
      en: [
        "Painless root canal & filling treatment",
        "Dental implant placement",
        "Ceramic veneers & zirconia crowns",
        "Professional oral hygiene & teeth whitening",
      ],
    },
    reviews: [
      {
        id: 301,
        author: "Jamshid Mahmudov",
        rating: 5,
        date: "2 kun oldin",
        comment: "Shohruh aka haqiqiy mutaxassis! Tishimni umuman og'riqsiz davoladilar, qo'llari juda yengil ekan. Hamma do'stlarimga tavsiya qilaman.",
      },
    ],
  },
  {
    id: 4,
    name: "Tursunova Mohinur",
    specialtyKey: "dermatolog",
    specialty: { uz: "Dermatolog", ru: "Дерматолог", en: "Dermatologist" },
    clinic: "SkinCare Med Center",
    address: "Toshkent sh., Yakkasaroy t., Shota Rustaveli ko'chasi 55",
    phone: "+998 (71) 255-77-88",
    workingHours: "Dush-Juma: 09:00 - 18:00, Shanba: 10:00 - 15:00",
    experience: 7,
    rating: 4.7,
    reviewsCount: 176,
    distanceNum: 3.1,
    distanceStr: "3.1 km away",
    price: 220000,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    verified: true,
    bio: {
      uz: "Dermatovenerolog va tibbiy kosmetolog. Teri kasalliklari, husnbuzarlar (akne), allergiya asoratlari hamda terini yoshartirish muolajalari bo'yicha ilmiy yondashuvga ega malakali mutaxassis.",
      ru: "Дерматовенеролог и косметолог. Комплексное лечение акне, аллергических дерматозов, пигментации и аппаратные процедуры ухода за кожей.",
      en: "Dermatologist and medical aesthetician specializing in clinical dermatology, acne therapies, allergic dermatitis, and modern skin rejuvenation.",
    },
    education: {
      uz: [
        "Toshkent Tibbiyot Akademiyasi — Davolash ishi (2012-2019)",
        "Respublika Teri-Tanasil Kasalliklari Klinikasi — Ordinatura (2019-2021)",
        "Turkiya (Istanbul) — Estetik dermatologiya va lazer texnologiyalari (2022)",
      ],
      ru: [
        "Ташкентская медицинская академия — Лечебное дело (2012-2019)",
        "Республиканский кожно-венерологический диспансер — Ординатура (2019-2021)",
        "Турция (Стамбул) — Эстетическая дерматология и лазеры (2022)",
      ],
      en: [
        "Tashkent Medical Academy — General Medicine (2012-2019)",
        "Republican Center of Dermatology — Residency (2019-2021)",
        "Istanbul, Turkey — Aesthetic Dermatology & Laser Fellowship (2022)",
      ],
    },
    skills: {
      uz: [
        "Akne va postakne muammolarini davolash",
        "Dermatoskopiya (xollar va terini tekshirish)",
        "Teri toshmalari va ekzemani korreksiyalash",
        "Mezoterapiya va biorevitalizatsiya",
      ],
      ru: [
        "Лечение угревой сыпи (акне) и постакне",
        "Дерматоскопия родинок и новообразований",
        "Лечение экземы, псориаза и дерматитов",
        "Мезотерапия и биоревитализация",
      ],
      en: [
        "Acne and post-acne therapy",
        "Dermoscopy & mole checks",
        "Eczema, psoriasis, and dermatitis care",
        "Mesotherapy and skin biorevitalization",
      ],
    },
    reviews: [
      {
        id: 401,
        author: "Nilufar Rahimova",
        rating: 5,
        date: "5 kun oldin",
        comment: "Mohinur opa akne muammomni bir necha oy ichida to'liq bartaraf etishga yordam berdilar. Terim hozir juda silliq va tiniq bo'lib qoldi!",
      },
    ],
  },
  {
    id: 5,
    name: "Aliyev Sardor",
    specialtyKey: "terapevt",
    specialty: { uz: "Terapevt", ru: "Терапевт", en: "Therapist" },
    clinic: "Shifo Nur Hospital",
    address: "Toshkent sh., Shayxontohur t., Navoiy ko'chasi 12",
    phone: "+998 (71) 244-33-11",
    workingHours: "Dush-Juma: 08:30 - 17:30",
    experience: 10,
    rating: 4.9,
    reviewsCount: 290,
    distanceNum: 1.5,
    distanceStr: "1.5 km away",
    price: 190000,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    verified: true,
    bio: {
      uz: "Katta tajribaga ega umumiy amaliyot shifokori-terapevt. Ichki a'zolar faoliyatini kompleks tekshirish, shamollash, oshqozon-ichak va nafas yo'llari kasalliklarini davolash bo'yicha yuqori malakali vrach.",
      ru: "Опытный врач-терапевт. Комплексная оценка состояния внутренних органов, лечение острых вирусных заболеваний, патологий ЖКТ и дыхательной системы.",
      en: "Experienced general practitioner and internal medicine physician focusing on diagnostic workups, respiratory disorders, and digestive wellness.",
    },
    education: {
      uz: [
        "Toshkent Tibbiyot Akademiyasi (2009-2016)",
        "Respublika Shoshilinch Tibbiy Yordam Ilmiy Markazi — Ordinatura (2016-2018)",
      ],
      ru: [
        "Ташкентская медицинская академия (2009-2016)",
        "Республиканский научный центр экстренной медпомощи — Ординатура (2016-2018)",
      ],
      en: [
        "Tashkent Medical Academy (2009-2016)",
        "Republican Scientific Center of Emergency Medicine (2016-2018)",
      ],
    },
    skills: {
      uz: [
        "Kompleks terapevtik ko'rik va check-up",
        "Oshqozon va jigar kasalliklarini davolash",
        "Bronxit va pnevmoniya terapiyasi",
      ],
      ru: [
        "Комплексный терапевтический чек-ап",
        "Терапия заболеваний ЖКТ и печени",
        "Лечение бронхита и пневмонии",
      ],
      en: [
        "Comprehensive health check-ups",
        "Gastrointestinal & liver treatment",
        "Bronchitis & respiratory therapy",
      ],
    },
    reviews: [
      {
        id: 501,
        author: "Otabek Qosimov",
        rating: 5,
        date: "2 hafta oldin",
        comment: "Juda tajribali terapevt. To'g'ri tashxis qo'yib, keraksiz dorilarsiz aniq davolash rejasini tuzib berdilar.",
      },
    ],
  },
  {
    id: 6,
    name: "Ismoilova Malika",
    specialtyKey: "nevrolog",
    specialty: { uz: "Nevrolog", ru: "Невролог", en: "Neurologist" },
    clinic: "NeuroMed Klinikasi",
    address: "Toshkent sh., Mirabad t., Nukus ko'chasi 29",
    phone: "+998 (71) 280-99-00",
    workingHours: "Dush-Shanba: 09:00 - 16:00",
    experience: 11,
    rating: 4.8,
    reviewsCount: 245,
    distanceNum: 2.8,
    distanceStr: "2.8 km away",
    price: 230000,
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=80",
    verified: true,
    bio: {
      uz: "Yetakchi nevrolog, asab tizimi kasalliklari, migren, surunkali bosh og'riqlari, uyqusizlik va umurtqa pog'onasi osteoxondrozi bo'yicha yuqori toifali shifokor.",
      ru: "Ведущий невролог, специалист по лечению мигрени, хронических болей в спине, бессонницы, вегетососудистой дистонии и неврозов.",
      en: "Leading neurologist specializing in migraines, chronic spinal pain, insomnia, autonomic disorders, and modern neurological rehab.",
    },
    education: {
      uz: [
        "Toshkent Tibbiyot Akademiyasi (2010-2017)",
        "Respublika Neyroxirurgiya va Nevrologiya Markazi (2017-2020)",
      ],
      ru: [
        "Ташкентская медицинская академия (2010-2017)",
        "Республиканский центр неврологии (2017-2020)",
      ],
      en: [
        "Tashkent Medical Academy (2010-2017)",
        "Republican Center of Neurology (2017-2020)",
      ],
    },
    skills: {
      uz: [
        "Surunkali bosh og'riqlari va migren davolash",
        "Osteoxondroz va churra (grija) muolajasi",
        "Uyqu buzilishlari va nevrozlarni davolash",
      ],
      ru: [
        "Лечение мигрени и головных болей",
        "Терапия остеохондроза и протрузий",
        "Коррекция бессонницы и тревожных состояний",
      ],
      en: [
        "Migraine and tension headache therapy",
        "Spinal disc & osteochondrosis care",
        "Sleep disorders & anxiety management",
      ],
    },
    reviews: [
      {
        id: 601,
        author: "Dildora Fayzullaeva",
        rating: 5,
        date: "3 hafta oldin",
        comment: "Bosh og'rig'idan uzoq vaqt qiynalardim, Malika opaning tavsiyalari va muolajalaridan so'ng butunlay qutildim. Rahmat!",
      },
    ],
  },
  {
    id: 7,
    name: "Qodirova Shahnoza",
    specialtyKey: "ginekolog",
    specialty: { uz: "Ginekolog", ru: "Гинеколог", en: "Gynecologist" },
    clinic: "Ona va Bola Markazi",
    address: "Toshkent sh., Olmazor t., Forobiy ko'chasi 2",
    phone: "+998 (71) 227-14-14",
    workingHours: "Dush-Juma: 09:00 - 17:00",
    experience: 13,
    rating: 4.9,
    reviewsCount: 310,
    distanceNum: 2.2,
    distanceStr: "2.2 km away",
    price: 210000,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    verified: true,
    bio: {
      uz: "Oliy toifali akusher-ginekolog. Ayollar salomatligi, homiladorlikni rejalashtirish va olib borish, gormonal o'zgarishlarni davolash bo'yicha katta tajribaga ega.",
      ru: "Акушер-гинеколог высшей категории. Ведение беременности, диагностика и терапия репродуктивных нарушений, гормональная коррекция.",
      en: "Senior obstetrician-gynecologist with 13 years of practice in maternal health, pregnancy monitoring, and reproductive endocrine health.",
    },
    education: {
      uz: [
        "Toshkent Tibbiyot Akademiyasi (2007-2014)",
        "Respublika Ona va Bola Salomatligi Ilmiy Markazi (2014-2017)",
      ],
      ru: [
        "Ташкентская медицинская академия (2007-2014)",
        "Научный центр здоровья матери и ребенка (2014-2017)",
      ],
      en: [
        "Tashkent Medical Academy (2007-2014)",
        "Republican Center of Maternal & Child Health (2014-2017)",
      ],
    },
    skills: {
      uz: [
        "Homiladorlikni rejalashtirish va monitoring",
        "Ginekologik UTT (UZI) diagnostikasi",
        "Gormonal muvozanatni tiklash",
      ],
      ru: [
        "Планирование и ведение беременности",
        "Ультразвуковая диагностика в гинекологии",
        "Нормализация гормонального фона",
      ],
      en: [
        "Pregnancy planning and ultrasound care",
        "Gynecological ultrasound evaluation",
        "Hormonal balance restoration",
      ],
    },
    reviews: [
      {
        id: 701,
        author: "Maftuna Sobirova",
        rating: 5,
        date: "Kecha, 18:00",
        comment: "Shahnoza opa juda e'tiborli va muloyim shifokor. Homiladorlik davrimda barcha maslahatlari juda yordam berdi.",
      },
    ],
  },
  {
    id: 8,
    name: "Saidov Jasur",
    specialtyKey: "stomatolog",
    specialty: { uz: "Stomatolog", ru: "Стоматолог", en: "Dentist" },
    clinic: "Smile Dental Studio",
    address: "Toshkent sh., Uchtepa t., Lutfiy ko'chasi 8",
    phone: "+998 (71) 275-60-70",
    workingHours: "Dush-Shanba: 09:00 - 19:30",
    experience: 6,
    rating: 4.7,
    reviewsCount: 154,
    distanceNum: 3.5,
    distanceStr: "3.5 km away",
    price: 190000,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
    verified: true,
    bio: {
      uz: "Tish terapevti va estetik restavratsiya ustasi. Kariesni zamonaviy nurli plombalar bilan davolash, tishlarni og'riqsiz tozalash va oqartirish bo'yicha mutaxassis.",
      ru: "Стоматолог-терапевт. Качественное пломбирование светоотверждаемыми композитами, профессиональная гигиена полости рта и отбеливание зубов.",
      en: "Dentist specializing in aesthetic restorations, light-curing composite fillings, painless deep cleaning, and tooth whitening.",
    },
    education: {
      uz: ["Toshkent Davlat Stomatologiya Instituti (2014-2019)"],
      ru: ["Ташкентский государственный стоматологический институт (2014-2019)"],
      en: ["Tashkent State Dental Institute (2014-2019)"],
    },
    skills: {
      uz: [
        "Karies va pulpitni zamonaviy davolash",
        "Ultratovushli tish tozalash (Air Flow)",
        "Estetik tish restavratsiyasi",
      ],
      ru: [
        "Лечение кариеса и пульпита",
        "Ультразвуковая чистка Air Flow",
        "Эстетическая реставрация зубов",
      ],
      en: [
        "Caries and pulpitis therapy",
        "Ultrasonic teeth cleaning (Air Flow)",
        "Aesthetic front tooth restoration",
      ],
    },
    reviews: [
      {
        id: 801,
        author: "Bekzod To'rayev",
        rating: 5,
        date: "4 kun oldin",
        comment: "Tishlarimni tozalash va davolash uchun bordim. Natija a'lo darajada bo'ldi, rahmat!",
      },
    ],
  },
];

const CATEGORIES = [
  { id: "all", name: { uz: "Barchasi", ru: "Все", en: "All" }, icon: LayoutGrid },
  { id: "stomatolog", name: { uz: "Stomatolog", ru: "Стоматолог", en: "Dentist" }, icon: "🦷" },
  { id: "kardiolog", name: { uz: "Kardiolog", ru: "Кардиолог", en: "Cardiologist" }, icon: "❤️" },
  { id: "pediatr", name: { uz: "Pediatr", ru: "Педиатр", en: "Pediatrician" }, icon: "👶" },
  { id: "terapevt", name: { uz: "Terapevt", ru: "Терапевт", en: "Therapist" }, icon: "🩺" },
  { id: "nevrolog", name: { uz: "Nevrolog", ru: "Невролог", en: "Neurologist" }, icon: "🧠" },
  { id: "dermatolog", name: { uz: "Dermatolog", ru: "Дерматолог", en: "Dermatologist" }, icon: "✨" },
  { id: "ginekolog", name: { uz: "Ginekolog", ru: "Гинеколог", en: "Gynecologist" }, icon: "👩‍⚕️" },
];

const DICT = {
  uz: {
    tagline: "Sog'lig'ingiz biz uchun muhim",
    searchPlaceholder: "Shifokor, kasallik yoki yo'nalish nomi...",
    voiceRead: "Ovozli o'qish",
    voiceStop: "Ovozni to'xtatish",
    loginBtn: "Kirish / Ro'yxatdan o'tish",
    heroBadge: "Sog'lom hayot",
    heroTitle: "O'zingizga eng yaxshi shifokorni toping",
    heroSubtitle: "Tajribali shifokorlar, qulay narxlar, to'liq ma'lumotlar.",
    trust100: "100% ishonchli",
    quickBooking: "Tezkor ma'lumot",
    support247: "24/7 qo'llab-quvvatlash",
    wishText: "Sog'lom bo'ling! ♡",
    recommendedTitle: "Tavsiya etilgan shifokorlar",
    otherTitle: "Boshqa mutaxassislar",
    viewAll: "Barchasini ko'rish",
    verified: "Tasdiqlangan",
    reviewsCount: "ta sharh",
    experiencePrefix: "Tajriba",
    years: "yil",
    consultationPrice: "Qabul narxi",
    consultation: "konsultatsiya",
    doctorInfoBtn: "Batafsil ma'lumot",
    filterTitle: "Filtrlash",
    distanceLabel: "Masofa",
    allRegions: "Barcha hududlar",
    priceRangeLabel: "Narx oralig'i",
    experienceLabel: "Tajriba",
    allExperience: "Barchasi",
    exp3Plus: "Kamida 3 yil",
    exp5Plus: "Kamida 5 yil",
    exp10Plus: "Kamida 10 yil",
    onlyVerifiedLabel: "Faqat tasdiqlangan shifokorlar",
    onlineConsultTitle: "Onlayn maslahat",
    onlineConsultDesc: "Uydan chiqmasdan shifokor bilan maslahatlashing",
    detailsBtn: "Batafsil",
    som: "so'm",
    noResults: "Hech qanday shifokor topilmadi. Qidiruv parametrlarini o'zgartirib ko'ring.",
    resetFilter: "Filtrni tozalash",
    modalDoctorBio: "Shifokor haqida",
    modalEducation: "Ta'lim va malaka",
    modalSkills: "Davolash yo'nalishlari",
    modalClinicInfo: "Klinika va ish jadvali",
    modalReviews: "Bemorlar fikrlari",
    close: "Yopish",
    callClinic: "Klinikaga qo'ng'iroq qilish",
  },
  ru: {
    tagline: "Ваше здоровье важно для нас",
    searchPlaceholder: "Врач, заболевание или направление...",
    voiceRead: "Голосовое чтение",
    voiceStop: "Остановить чтение",
    loginBtn: "Вход / Регистрация",
    heroBadge: "Здоровая жизнь",
    heroTitle: "Найдите лучшего врача для себя",
    heroSubtitle: "Опытные врачи, доступные цены, подробная информация.",
    trust100: "100% надежно",
    quickBooking: "Быстрая информация",
    support247: "24/7 поддержка",
    wishText: "Будьте здоровы! ♡",
    recommendedTitle: "Рекомендуемые врачи",
    otherTitle: "Другие специалисты",
    viewAll: "Смотреть все",
    verified: "Подтвержден",
    reviewsCount: "отзывов",
    experiencePrefix: "Стаж",
    years: "лет",
    consultationPrice: "Стоимость приема",
    consultation: "консультация",
    doctorInfoBtn: "Подробная информация",
    filterTitle: "Фильтрация",
    distanceLabel: "Расстояние",
    allRegions: "Все районы",
    priceRangeLabel: "Диапазон цен",
    experienceLabel: "Стаж",
    allExperience: "Все",
    exp3Plus: "От 3 лет",
    exp5Plus: "От 5 лет",
    exp10Plus: "От 10 лет",
    onlyVerifiedLabel: "Только проверенные врачи",
    onlineConsultTitle: "Онлайн консультация",
    onlineConsultDesc: "Консультируйтесь с врачом не выходя из дома",
    detailsBtn: "Подробнее",
    som: "сум",
    noResults: "Врачи не найдены. Попробуйте изменить параметры поиска.",
    resetFilter: "Сбросить фильтры",
    modalDoctorBio: "О враче",
    modalEducation: "Образование и квалификация",
    modalSkills: "Направления лечения",
    modalClinicInfo: "Клиника и график работы",
    modalReviews: "Отзывы пациентов",
    close: "Закрыть",
    callClinic: "Позвонить в клинику",
  },
  en: {
    tagline: "Your health matters to us",
    searchPlaceholder: "Doctor, condition, or specialty...",
    voiceRead: "Text-to-Speech",
    voiceStop: "Stop Audio",
    loginBtn: "Login / Register",
    heroBadge: "Healthy Life",
    heroTitle: "Find the best doctor for yourself",
    heroSubtitle: "Experienced specialists, fair prices, full profile details.",
    trust100: "100% trusted",
    quickBooking: "Quick info",
    support247: "24/7 support",
    wishText: "Stay healthy! ♡",
    recommendedTitle: "Recommended Doctors",
    otherTitle: "Other Specialists",
    viewAll: "View all",
    verified: "Verified",
    reviewsCount: "reviews",
    experiencePrefix: "Experience",
    years: "years",
    consultationPrice: "Consultation Fee",
    consultation: "consultation",
    doctorInfoBtn: "Detailed Information",
    filterTitle: "Filters",
    distanceLabel: "Distance",
    allRegions: "All regions",
    priceRangeLabel: "Price range",
    experienceLabel: "Experience",
    allExperience: "All",
    exp3Plus: "3+ years",
    exp5Plus: "5+ years",
    exp10Plus: "10+ years",
    onlyVerifiedLabel: "Verified doctors only",
    onlineConsultTitle: "Online consultation",
    onlineConsultDesc: "Consult with a specialist without leaving home",
    detailsBtn: "Details",
    som: "UZS",
    noResults: "No doctors found matching your criteria. Try adjusting filters.",
    resetFilter: "Reset filters",
    modalDoctorBio: "About Doctor",
    modalEducation: "Education & Qualifications",
    modalSkills: "Treatments & Expertise",
    modalClinicInfo: "Clinic & Working Hours",
    modalReviews: "Patient Reviews",
    close: "Close",
    callClinic: "Call Clinic",
  },
};

export default function DoktorTopPage() {
  const [lang, setLang] = useState<Lang>("uz");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDistance, setSelectedDistance] = useState<string>("all");
  const [priceMax, setPriceMax] = useState<number>(500000);
  const [selectedExperience, setSelectedExperience] = useState<string>("all");
  const [onlyVerified, setOnlyVerified] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Doctor Detail Modal
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Other Modals
  const [showOnlineModal, setShowOnlineModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);

  const t = DICT[lang];

  // Favorite toggle
  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Keyboard shortcut '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        const searchInput = document.getElementById("search-input");
        searchInput?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Web Speech API
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "uz" ? "uz-UZ" : lang === "ru" ? "ru-RU" : "en-US";
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleHeroSpeech = () => {
    const speechMsg =
      lang === "uz"
        ? "DoktorTop. O'zingizga eng yaxshi shifokorni toping. Tajribali shifokorlar, qulay narxlar va to'liq ma'lumotlar. 100 foiz ishonchli."
        : lang === "ru"
        ? "ДокторТоп. Найдите лучшего врача для себя. Опытные врачи, доступные цены, подробная информация."
        : "DoktorTop. Find the best doctor for yourself. Experienced specialists, fair prices, complete information.";
    speakText(speechMsg);
  };

  // Filtering
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doctor) => {
      if (selectedCategory !== "all" && doctor.specialtyKey !== selectedCategory) {
        return false;
      }
      if (onlyVerified && !doctor.verified) {
        return false;
      }
      if (doctor.price > priceMax) {
        return false;
      }
      if (selectedExperience !== "all") {
        const minExp = parseInt(selectedExperience, 10);
        if (doctor.experience < minExp) return false;
      }
      if (selectedDistance !== "all") {
        const maxDist = parseFloat(selectedDistance);
        if (doctor.distanceNum > maxDist) return false;
      }
      if (search.trim() !== "") {
        const query = search.toLowerCase();
        const docName = doctor.name.toLowerCase();
        const docSpec = doctor.specialty[lang].toLowerCase();
        const docClinic = doctor.clinic.toLowerCase();
        if (
          !docName.includes(query) &&
          !docSpec.includes(query) &&
          !docClinic.includes(query)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, onlyVerified, priceMax, selectedExperience, selectedDistance, search, lang]);

  const recommendedDoctors = filteredDoctors.slice(0, 4);
  const otherDoctors = filteredDoctors.slice(4);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 selection:bg-blue-500 selection:text-white overflow-x-hidden">
      
      {/* ===================== NAVBAR ===================== */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-[0_4px_20px_rgba(0,102,255,0.04)]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo with Motion Hover */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3.5 cursor-pointer select-none group"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0052cc] to-[#0070f3] flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg className="w-6 h-6 text-white fill-current drop-shadow-md" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-1.5 h-3.5 bg-white rounded-full"></div>
                <div className="h-1.5 w-3.5 bg-white rounded-full absolute"></div>
              </div>
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-slate-900 leading-none group-hover:text-[#0066FF] transition-colors">
                Doktor<span className="text-[#0066FF]">Top</span>
              </div>
              <div className="text-[11px] font-medium text-slate-400 mt-1">
                {t.tagline}
              </div>
            </div>
          </motion.div>

          {/* Search bar with Motion Focus */}
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative flex items-center group">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-[#0066FF] transition-colors pointer-events-none" />
              <input
                id="search-input"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-slate-50/90 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-[#0066FF] rounded-full py-2.5 pl-12 pr-12 text-sm text-slate-800 placeholder-slate-400 transition-all outline-none focus:ring-4 focus:ring-blue-100 shadow-inner"
              />
              <div className="absolute right-4 text-xs font-semibold text-slate-400 bg-white border border-slate-200 rounded-md px-1.5 py-0.5 shadow-xs">
                /
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Ovozli o'qish button with Motion Equalizer */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleHeroSpeech}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 shadow-sm ${
                isSpeaking
                  ? "bg-[#0066FF] text-white border-[#0066FF] shadow-blue-500/30"
                  : "bg-blue-50/70 hover:bg-blue-100 text-[#0066FF] border-blue-200/80"
              }`}
            >
              {isSpeaking ? (
                <div className="flex items-center gap-0.5 h-4">
                  <span className="w-1 bg-white rounded-full wave-bar-1"></span>
                  <span className="w-1 bg-white rounded-full wave-bar-2"></span>
                  <span className="w-1 bg-white rounded-full wave-bar-3"></span>
                  <span className="w-1 bg-white rounded-full wave-bar-4"></span>
                </div>
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {isSpeaking ? t.voiceStop : t.voiceRead}
              </span>
            </motion.button>

            {/* Language Switcher with Motion Pill layoutId */}
            <div className="bg-slate-100/90 p-1 rounded-full flex items-center border border-slate-200/60 shadow-inner relative">
              {(["uz", "ru", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`relative px-2.5 py-1 text-xs font-bold uppercase rounded-full transition-colors z-10 ${
                    lang === l ? "text-white" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {lang === l && (
                    <motion.div
                      layoutId="activeLangIndicator"
                      className="absolute inset-0 bg-[#0066FF] rounded-full shadow-md shadow-blue-500/30"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {l}
                </button>
              ))}
            </div>

            {/* Bell Notification */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-ping"></span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ type: "spring", damping: 25, stiffness: 350 }}
                    className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 origin-top-right"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                      <span className="font-bold text-sm text-slate-900">
                        Bildirishnomalar
                      </span>
                      <span className="text-[11px] bg-blue-50 text-[#0066FF] font-semibold px-2 py-0.5 rounded-full">
                        Yangi
                      </span>
                    </div>
                    <div className="p-2.5 bg-blue-50/50 rounded-xl border border-blue-100/60 text-xs">
                      <div className="font-semibold text-slate-900">
                        Motion & 3D rejim faol ✨
                      </div>
                      <div className="text-slate-500 mt-0.5">
                        Barcha shifokorlar kartochkalari Framer Motion fizikasiga ega.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Avatar */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowProfile(!showProfile)}
                className="p-2.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              >
                <User className="w-5 h-5" />
              </motion.button>

              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ type: "spring", damping: 25, stiffness: 350 }}
                    className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 origin-top-right"
                  >
                    <div className="flex items-center gap-3 p-2 border-b border-slate-100 pb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0066FF] font-bold flex items-center justify-center text-sm shadow-inner">
                        DT
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          Foydalanuvchi
                        </div>
                        <div className="text-xs text-slate-500">+998 90 123 45 67</div>
                      </div>
                    </div>
                    <div className="pt-2 text-xs text-slate-700 space-y-1">
                      <button
                        onClick={() => setShowProfile(false)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition"
                      >
                        Saqlangan shifokorlar ({favorites.length})
                      </button>
                      <button
                        onClick={() => setShowProfile(false)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-red-600 transition"
                      >
                        Chiqish
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Kirish / Ro'yxatdan o'tish */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setAuthTab("login");
                setShowAuthModal(true);
              }}
              className="bg-gradient-to-r from-[#0066FF] to-[#0052cc] hover:from-[#0052cc] hover:to-[#0040a0] text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all"
            >
              {t.loginBtn}
            </motion.button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-xs outline-none focus:border-[#0066FF]"
            />
          </div>
        </div>
      </motion.header>

      {/* ===================== MAIN CONTENT ===================== */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* ===================== HERO BANNER WITH MOTION PHYSICS ===================== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#EBF5FF] via-[#E2EEFC] to-[#ECF5FE] border border-blue-200/60 shadow-[0_12px_40px_rgba(0,102,255,0.08)] p-6 sm:p-10 lg:p-12"
        >
          {/* Continuous Motion Floating Particles */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [-4, 4, -4],
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-8 right-1/3 w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-white flex items-center justify-center pointer-events-none hidden sm:flex"
          >
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          </motion.div>

          <motion.div
            animate={{
              y: [10, -12, 10],
              rotate: [4, -4, 4],
            }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-6 left-1/4 w-11 h-11 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-white flex items-center justify-center pointer-events-none hidden sm:flex"
          >
            <Stethoscope className="w-5 h-5 text-[#0066FF]" />
          </motion.div>

          <motion.div
            animate={{
              scale: [0.9, 1.1, 0.9],
              rotate: [0, 90, 0],
            }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-12 left-10 w-9 h-9 rounded-xl bg-white/80 backdrop-blur-md shadow-md border border-white flex items-center justify-center pointer-events-none hidden sm:flex"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
          </motion.div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Content with Staggered Entrance */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12 },
                },
              }}
              className="md:col-span-7 space-y-4"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-blue-200/80 text-[#0066FF] px-4 py-1.5 rounded-full text-xs font-bold shadow-md shadow-blue-500/10"
              >
                <Heart className="w-3.5 h-3.5 fill-[#0066FF] text-[#0066FF]" />
                <span>{t.heroBadge}</span>
              </motion.div>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-[1.16]"
              >
                {t.heroTitle}
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-slate-600 text-sm sm:text-base font-normal max-w-xl"
              >
                {t.heroSubtitle}
              </motion.p>

              {/* 3 Value Badges */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-2xl border border-white shadow-xs cursor-default"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0066FF] text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{t.trust100}</span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-2xl border border-white shadow-xs cursor-default"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0066FF] flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span>{t.quickBooking}</span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-2xl border border-white shadow-xs cursor-default"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0066FF] flex items-center justify-center">
                    <Headphones className="w-3.5 h-3.5" />
                  </div>
                  <span>{t.support247}</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Doctor Image with Motion Hover & Floating Note */}
            <div className="md:col-span-5 relative flex justify-center md:justify-end">
              <motion.div
                animate={{
                  y: [-8, 8, -8],
                }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="relative"
              >
                {/* Handwritten cursive note */}
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  className="absolute -top-4 right-4 sm:-right-4 z-20 text-center select-none rotate-3 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-blue-100 shadow-xl shadow-blue-500/15 cursor-default"
                >
                  <span
                    className="text-[#0066FF] text-lg sm:text-xl font-bold tracking-wide"
                    style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                  >
                    {t.wishText}
                  </span>
                </motion.div>

                {/* Doctor Portrait */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-64 sm:w-72 md:w-80 h-72 sm:h-80 md:h-92 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 border-4 border-white bg-white group cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1594824813589-913612543d8c?auto=format&fit=crop&w=800&q=80"
                    alt="Doctor"
                    className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 holo-card-shine pointer-events-none"></div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ===================== CATEGORY FILTER PILLS WITH MOTION LAYOUT ===================== */}
        <section className="relative">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const Icon = cat.icon;
              return (
                <motion.button
                  key={cat.id}
                  layout
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    isActive ? "text-white" : "bg-white text-slate-700 border border-slate-200/80 hover:text-[#0066FF]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#0052cc] rounded-2xl shadow-lg shadow-blue-500/35"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      style={{ zIndex: 0 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {typeof Icon === "string" ? (
                      <span className="text-base">{Icon}</span>
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                    <span>{cat.name[lang]}</span>
                  </span>
                </motion.button>
              );
            })}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const nextIdx =
                  (CATEGORIES.findIndex((c) => c.id === selectedCategory) + 1) %
                  CATEGORIES.length;
                setSelectedCategory(CATEGORIES[nextIdx].id);
              }}
              className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:text-[#0066FF] text-slate-600 flex items-center justify-center shrink-0 shadow-sm"
              aria-label="Keyingi toifa"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </section>

        {/* ===================== MAIN GRID (DOCTORS + SIDEBAR) ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ===================== LEFT: DOCTOR CARDS WITH MOTION GRID ===================== */}
          <div className="lg:col-span-9 space-y-12">
            
            {/* Section 1: Tavsiya etilgan shifokorlar */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {t.recommendedTitle}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Framer Motion fizika animatsiyalari va 3D tilt effekti bilan
                  </p>
                </div>
                <motion.button
                  whileHover={{ x: 3 }}
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceMax(500000);
                    setSelectedExperience("all");
                  }}
                  className="text-xs sm:text-sm font-bold text-[#0066FF] hover:underline flex items-center gap-1 group"
                >
                  <span>{t.viewAll}</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>

              {recommendedDoctors.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-md"
                >
                  <div className="w-16 h-16 bg-blue-50 text-[#0066FF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">
                    {t.noResults}
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearch("");
                      setPriceMax(500000);
                      setSelectedExperience("all");
                      setSelectedDistance("all");
                    }}
                    className="mt-3 px-5 py-2.5 bg-[#0066FF] text-white rounded-xl text-xs font-semibold shadow-md"
                  >
                    {t.resetFilter}
                  </button>
                </motion.div>
              ) : (
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AnimatePresence mode="popLayout">
                    {recommendedDoctors.map((doc) => (
                      <DoctorCardMotion
                        key={doc.id}
                        doctor={doc}
                        lang={lang}
                        t={t}
                        isFavorite={favorites.includes(doc.id)}
                        onToggleFavorite={(e) => toggleFavorite(doc.id, e)}
                        onOpenDetails={() => setSelectedDoctor(doc)}
                        onSpeak={() =>
                          speakText(
                            `${doc.name}. ${doc.specialty[lang]}. ${doc.clinic}. Tajriba ${doc.experience} yil. Qabul narxi ${doc.price.toLocaleString()} so'm.`
                          )
                        }
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* Section 2: Boshqa mutaxassislar */}
            {otherDoctors.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {t.otherTitle}
                  </h2>
                  <motion.button
                    whileHover={{ x: 3 }}
                    onClick={() => setSelectedCategory("all")}
                    className="text-xs sm:text-sm font-bold text-[#0066FF] hover:underline flex items-center gap-1 group"
                  >
                    <span>{t.viewAll}</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </div>

                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AnimatePresence mode="popLayout">
                    {otherDoctors.map((doc) => (
                      <DoctorCardMotion
                        key={doc.id}
                        doctor={doc}
                        lang={lang}
                        t={t}
                        isFavorite={favorites.includes(doc.id)}
                        onToggleFavorite={(e) => toggleFavorite(doc.id, e)}
                        onOpenDetails={() => setSelectedDoctor(doc)}
                        onSpeak={() =>
                          speakText(
                            `${doc.name}. ${doc.specialty[lang]}. ${doc.clinic}. Tajriba ${doc.experience} yil. Qabul narxi ${doc.price.toLocaleString()} so'm.`
                          )
                        }
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}
          </div>

          {/* ===================== RIGHT: SIDEBAR ===================== */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* FILTRLASH CARD */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-6 sticky top-28"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  {t.filterTitle}
                </h3>
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              </div>

              {/* 1. Masofa */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>{t.distanceLabel}</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedDistance}
                    onChange={(e) => setSelectedDistance(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200/90 rounded-2xl py-2.5 px-3.5 text-xs font-medium text-slate-700 outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 transition"
                  >
                    <option value="all">{t.allRegions}</option>
                    <option value="1.5">1.5 km ichida</option>
                    <option value="2.5">2.5 km ichida</option>
                    <option value="5">5.0 km ichida</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* 2. Narx oralig'i */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Wallet className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>{t.priceRangeLabel}</span>
                  </label>
                  <motion.span
                    key={priceMax}
                    initial={{ scale: 1.2, color: "#0066FF" }}
                    animate={{ scale: 1 }}
                    className="text-[11px] font-bold text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded-md shadow-xs"
                  >
                    {priceMax.toLocaleString()} {t.som}
                  </motion.span>
                </div>

                <input
                  type="range"
                  min={50000}
                  max={500000}
                  step={10000}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#0066FF] cursor-pointer h-2 bg-slate-100 rounded-lg"
                />

                <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
                  <span>50 000 {t.som}</span>
                  <span>500 000 {t.som}</span>
                </div>
              </div>

              {/* 3. Tajriba */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Award className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>{t.experienceLabel}</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200/90 rounded-2xl py-2.5 px-3.5 text-xs font-medium text-slate-700 outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 transition"
                  >
                    <option value="all">{t.allExperience}</option>
                    <option value="3">{t.exp3Plus}</option>
                    <option value="5">{t.exp5Plus}</option>
                    <option value="10">{t.exp10Plus}</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* 4. Faqat tasdiqlangan shifokorlar TOGGLE */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs font-bold text-slate-700">
                  {t.onlyVerifiedLabel}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setOnlyVerified(!onlyVerified)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    onlyVerified ? "bg-[#0066FF] shadow-md shadow-blue-500/30" : "bg-slate-200"
                  }`}
                  role="switch"
                  aria-checked={onlyVerified}
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md ring-0 ${
                      onlyVerified ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </motion.button>
              </div>
            </motion.div>

            {/* ONLAYN MASLAHAT BANNER CARD WITH CONTINUOUS MOTION */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E4F1FE] via-[#D8ECFD] to-[#C9E5FC] p-6 border border-blue-200/90 shadow-[0_12px_35px_rgba(0,102,255,0.09)]"
            >
              <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                <div className="max-w-[160px] space-y-1.5">
                  <h4 className="text-base font-black text-slate-900 leading-tight">
                    {t.onlineConsultTitle}
                  </h4>
                  <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                    {t.onlineConsultDesc}
                  </p>
                </div>

                <div>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowOnlineModal(true)}
                    className="bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all"
                  >
                    {t.detailsBtn}
                  </motion.button>
                </div>
              </div>

              {/* 3D Smartphone with Motion Floating Levitation */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateZ: [6, 4, 6],
                }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="absolute -right-2 -bottom-2 w-32 sm:w-36 pointer-events-none"
              >
                <div className="relative w-full aspect-[9/17] bg-slate-900 rounded-[28px] p-1.5 shadow-2xl border-2 border-slate-700/60">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-800 rounded-full z-20"></div>

                  <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-slate-800">
                    <img
                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
                      alt="Online Doctor"
                      className="w-full h-full object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-2">
                      <div className="flex justify-between items-center text-[8px] text-white font-bold">
                        <span className="bg-red-500 px-1.5 py-0.5 rounded-full text-[7px] uppercase tracking-wider animate-pulse">
                          Live
                        </span>
                        <span>04:12</span>
                      </div>

                      <div className="flex justify-center items-center gap-3 pb-1">
                        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white shadow-md">
                          <PhoneOff className="w-3 h-3" />
                        </div>
                        <div className="relative flex items-center justify-center">
                          <span className="absolute w-8 h-8 rounded-full bg-green-500/40 animate-ping"></span>
                          <div className="relative w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg">
                            <Phone className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </aside>
        </div>
      </main>

      {/* ===================== DETAILED DOCTOR PROFILE MODAL WITH ANIMATEPRESENCE ===================== */}
      <AnimatePresence>
        {selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoctor(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 35, rotateX: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 my-8 z-10"
            >
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                aria-label="Yopish"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-slate-100 pb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-blue-200 shadow-xl shadow-blue-500/10"
                >
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedDoctor.verified && (
                    <div className="absolute top-2 left-2 bg-emerald-500 text-white p-1 rounded-full shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </motion.div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      {selectedDoctor.name}
                    </h3>
                    {selectedDoctor.verified && (
                      <span className="w-5 h-5 rounded-full bg-[#0066FF] text-white flex items-center justify-center text-[10px] shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[#0066FF] font-bold">
                    <Stethoscope className="w-4 h-4" />
                    <span>{selectedDoctor.specialty[lang]}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-slate-800">
                        {selectedDoctor.rating}
                      </span>
                      <span>({selectedDoctor.reviewsCount} {t.reviewsCount})</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span>
                        {t.experiencePrefix}: {selectedDoctor.experience} {t.years}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span>{selectedDoctor.distanceStr}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sections */}
              <div className="py-6 space-y-6 max-h-[60vh] overflow-y-auto pr-1">
                <div className="space-y-2">
                  <h4 className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                    <Info className="w-4 h-4 text-[#0066FF]" />
                    <span>{t.modalDoctorBio}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                    {selectedDoctor.bio[lang]}
                  </p>
                </div>

                <div className="space-y-2.5">
                  <h4 className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                    <Award className="w-4 h-4 text-[#0066FF]" />
                    <span>{t.modalSkills}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDoctor.skills[lang].map((skill, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-slate-700 bg-blue-50/50 border border-blue-100/70 p-2.5 rounded-xl shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <h4 className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                    <GraduationCap className="w-4 h-4 text-[#0066FF]" />
                    <span>{t.modalEducation}</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedDoctor.education[lang].map((edu, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100"
                      >
                        <Briefcase className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span>{edu}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <h4 className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                    <Building2 className="w-4 h-4 text-[#0066FF]" />
                    <span>{t.modalClinicInfo}</span>
                  </h4>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">Klinika:</span>
                      <span>{selectedDoctor.clinic}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{selectedDoctor.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{selectedDoctor.workingHours}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1 font-semibold text-[#0066FF]">
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <span>{selectedDoctor.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <h4 className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{t.modalReviews} ({selectedDoctor.reviews.length})</span>
                  </h4>
                  <div className="space-y-2.5">
                    {selectedDoctor.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">
                            {rev.author}
                          </span>
                          <div className="flex items-center gap-1 text-[11px] text-slate-400">
                            <span>{rev.date}</span>
                            <span className="text-amber-500 font-bold ml-2">
                              ★ {rev.rating}.0
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 italic">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Bottom Actions */}
              <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">
                    {t.consultationPrice}
                  </div>
                  <div className="text-xl font-black text-slate-900">
                    {selectedDoctor.price.toLocaleString()} {t.som}
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`tel:${selectedDoctor.phone}`}
                    className="flex-1 sm:flex-none bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white py-3 px-6 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t.callClinic}</span>
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDoctor(null)}
                    className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition"
                  >
                    {t.close}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================== ONLINE CONSULTATION MODAL ===================== */}
      <AnimatePresence>
        {showOnlineModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOnlineModal(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 text-center z-10"
            >
              <button
                onClick={() => setShowOnlineModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/10">
                <Video className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                {t.onlineConsultTitle}
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                {t.onlineConsultDesc}. 24/7 navbatchi terapevtlar va mutaxassislar sizni
                videoaloqa orqali qabul qilishga tayyor.
              </p>

              <div className="space-y-3 mb-6 text-left">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">
                    Kutish vaqti 5 daqiqadan kam
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">
                    Elektron retsept va xulosa beriladi
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  alert("Tezkor video konsultatsiyaga ulanmoqda...");
                  setShowOnlineModal(false);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all"
              >
                Qo'ng'iroqni boshlash
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================== AUTH MODAL ===================== */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 z-10"
            >
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Doktor<span className="text-[#0066FF]">Top</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Tizimga kirish yoki ro'yxatdan o'tish
                </p>
              </div>

              <div className="flex bg-slate-100 p-1 rounded-2xl mb-5">
                <button
                  onClick={() => setAuthTab("login")}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                    authTab === "login"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Kirish
                </button>
                <button
                  onClick={() => setAuthTab("register")}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                    authTab === "register"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Ro'yxatdan o'tish
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Muvaffaqiyatli kirdingiz!");
                  setShowAuthModal(false);
                }}
                className="space-y-4"
              >
                {authTab === "register" && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Ism-familiyangiz
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ali Valiyev"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-[#0066FF]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Telefon raqam
                  </label>
                  <input
                    type="tel"
                    required
                    defaultValue="+998 "
                    placeholder="+998 90 123 45 67"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Parol
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-[#0066FF]"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full py-3 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25 transition mt-2"
                >
                  {authTab === "login" ? "Kirish" : "Ro'yxatdan o'tish"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

{/* ===================== COMPONENT: MOTION + 3D SPRING TILT DOCTOR CARD ===================== */}
function DoctorCardMotion({
  doctor,
  lang,
  t,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  onSpeak,
}: {
  doctor: Doctor;
  lang: Lang;
  t: (typeof DICT)["uz"];
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onOpenDetails: () => void;
  onSpeak: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth Motion Spring Physics
  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 250 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 250 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);

    setGlare({
      x: (mouseX / rect.width) * 100,
      y: (mouseY / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onOpenDetails}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative bg-white rounded-3xl p-4 border border-slate-200/90 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,102,255,0.18)] hover:border-blue-300 flex flex-col cursor-pointer select-none"
    >
      {/* Glare Reflection */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden transition-opacity duration-300 z-30"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle 300px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.85), transparent 70%)`,
        }}
      />

      {/* Doctor Image with 3D Parallax */}
      <div
        style={{ transform: "translateZ(30px)" }}
        className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 transition-transform duration-300 shadow-md"
      >
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
        />

        {/* Top-left: Verified Badge */}
        {doctor.verified && (
          <div
            style={{ transform: "translateZ(50px)" }}
            className="absolute top-2.5 left-2.5 bg-emerald-500/95 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-emerald-500/30 backdrop-blur-xs"
          >
            <Check className="w-3 h-3 stroke-[3]" />
            <span>{t.verified}</span>
          </div>
        )}

        {/* Top-right: Heart Favorite Button with Motion Tap */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          onClick={onToggleFavorite}
          style={{ transform: "translateZ(50px)" }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-400 hover:text-rose-500 flex items-center justify-center shadow-lg backdrop-blur-xs"
          aria-label="Sevimlilarga qo'shish"
        >
          <Heart
            className={`w-4 h-4 transition ${
              isFavorite ? "fill-rose-500 text-rose-500 scale-110" : ""
            }`}
          />
        </motion.button>

        {/* Bottom-left: Distance Pill */}
        <div
          style={{ transform: "translateZ(45px)" }}
          className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1"
        >
          <MapPin className="w-3 h-3 text-[#0066FF]" />
          <span>{doctor.distanceStr}</span>
        </div>
      </div>

      {/* Card Info Details */}
      <div
        style={{ transform: "translateZ(35px)" }}
        className="mt-3.5 flex-1 flex flex-col justify-between"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#0066FF] transition-colors leading-tight">
              {doctor.name}
            </h3>
            {doctor.verified && (
              <span className="w-4 h-4 rounded-full bg-[#0066FF] text-white flex items-center justify-center text-[9px] shrink-0 shadow-sm shadow-blue-500/30">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            )}
          </div>

          <p className="text-xs text-[#0066FF] font-semibold">
            {doctor.specialty[lang]}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-0.5">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-bold text-slate-800">{doctor.rating}</span>
            <span className="text-slate-400">
              ({doctor.reviewsCount} {t.reviewsCount})
            </span>
          </div>

          <div className="text-xs text-slate-500">
            {t.experiencePrefix}: {doctor.experience} {t.years}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400 font-medium">
                {t.consultationPrice}
              </div>
              <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                {doctor.price.toLocaleString()} {t.som}
              </div>
              <div className="text-[10px] text-slate-400">
                {t.consultation}
              </div>
            </div>

            {/* Audio speaker with Motion Tap */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onSpeak();
              }}
              style={{ transform: "translateZ(45px)" }}
              className="p-2.5 rounded-xl bg-blue-50 text-[#0066FF] hover:bg-blue-100 transition shadow-xs"
              title="Ovozli eshitish"
            >
              <Volume2 className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Batafsil ma'lumot Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails();
            }}
            style={{ transform: "translateZ(50px)" }}
            className="w-full bg-gradient-to-r from-[#0066FF] to-[#0052cc] hover:from-[#0052cc] hover:to-[#0040a0] text-white py-2.5 px-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
          >
            <Info className="w-4 h-4" />
            <span>{t.doctorInfoBtn}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
