const navLinks = [
    {
        id: "rolam",
        title: "Rólam",
    },
    {
        id: "referenciak",
        title: "Referenciák",
    },
    {
        id: "szolgaltatasok",
        title: "Szolgáltatások",
    },

    {
        id: "gyik",
        title: "GY.I.K",
    },
];

const cards = [
    {
        title: "Modern természetesség",
        img: "/pr1.jpg",
        slug: "project-1",
        desc: "Világos tónusok, természetes anyagok és letisztult formák találkozása.",
    },
    {
        title: "Klasszikus Harmónia – Időtlen Otthon",
        img: "/pr2.webp",
        slug: "project-2",
        desc: "A letisztult vonalak, a természetes anyagok és a meleg tónusok időtlen hangulatot árasztanak, miközben minden részlet a nyugodt, harmonikus élettér megteremtését szolgálja.",
    },
    {
        title: "Modern Letisztultság – Természetes Elegancia",
        img: "/pr3.jpg",
        slug: "project-3",
        desc: "A világos tónusok, a fa részletek és a puha textúrák meleg, hívogató légkört teremtenek, miközben a praktikus térszervezés a modern élet minden igényét kiszolgálja.",
    },
    {
        title: "Letisztult Élettér - Airbnb lakás",
        img: "/pr4.jpg",
        slug: "project-4",
        desc: "A fürdő és a konyha finoman összehangolt színvilága, a nappali és étkező meleg tónusai otthonos, mégis friss atmoszférát teremtenek, amely időtálló marad.",
    },
    {
        title: "Időtlen elegancia",
        img: "/pr5.png",
        slug: "project-5",
        desc: "Letisztult arányok, nemes anyagok és finom részletek, melyek sosem mennek ki a divatból.",
    },
    {
        title: "Japandi Konyha",
        img: "/pr6.jpg",
        slug: "project-6",
        desc: "A tágas elrendezés és az egyszerű, mégis kifinomult részletek nemcsak esztétikai élményt nyújtanak, hanem a mindennapi használatban is maximális kényelmet biztosítanak.",
    },
    {
        title: "COMING SOON",
        img: "/pr7.png",
        slug: "project-7",
        desc: "",
    },
];

const plans = [
    {
        img: '/price/basic.jpg',
        alt: 'basic',
        title: 'Basic',
        desc: 'Ez a csomag nem tartalmaz fotórealisztikus látványterveket.\n' +
            'A Basic csomagot azoknak ajánlom, akik már egy meglévő vagy felújított helyiség elrendezését és bútorozását tervezik. Fontos számomra, hogy a tervek praktikusak és időtállóak legyenek, így ebben a csomagban is ezt a szemléletet követem.\n',
        question: 'Mit tartalmaz a csomag?',
        features: ['Egy alkalmas személyes konzultáció', 'Két változatban készített konszignációs alaprajz', 'Egyszerű, vázlatos látványterv (white 3d model)', 'Vázlatos falnézetek', 'Helyszíni bejárás és pontos felmérés', 'Hangulatkép (moodboard) a tervezett stílus bemutatására', 'Részletes bevásárló lista a kiválasztott elemekhez'],
    },
    {
        img: '/price/standard1.jpg',
        alt: 'standard',
        title: 'Standard',
        desc: 'Ez a csomag azoknak szól, akik otthonukban egy-egy helyiséget szeretnének megújítani, például nappalit, gyerekszobát vagy fürdőszobát.\n' +
            'A Standard tervezést azoknak ajánlom, akik részleges felújításban gondolkodnak, és fontos számukra a részletes, pontos tervdokumentáció. Ez a csomag minden lényeges elemet tartalmaz, mint a prémium, csak egy vagy két helyiségre fókuszálva.\n',
        question: 'Mit tartalmaz a csomag?',
        features: [
            'Két alkalmas személyes konzultáció',
            'Két-három változatban készített konszignációs alaprajz',
            'Világítási terv',
            'Gépészeti terv',
            'Elektromos terv',
            'Falazási és bontási terv',
            'Álmennyezeti terv',
            'Vázlatos és színes falnézetek',
            'Fotórealisztikus vagy egyszerűsített látványtervek',
            'Vázlatos látványterv',
            'Helyszíni bejárás és pontos felmérés',
            'Hangulatkép (moodboard) a tervezett stílus bemutatására',
            'Részletes bevásárló lista',
            'Folyamatos kapcsolattartás a tervezés során',
            'Kapcsolattartás a szakemberekkel a megvalósításhoz'
        ],
    },
    {
        img: '/price/premium.jpg',
        alt: 'premium',
        title: 'Premium',
        desc: 'Ezt a csomagot azoknak ajánlom, akik nagyobb felújítást vagy építkezést terveznek. Legyen szó új ház vagy lakás vásárlásáról, vagy meglévő ingatlan teljes átalakításáról, a Premium csomag segítségével időtálló, stílusos és praktikus otthont alakítunk ki.\n' +
            'Ebben a csomagban az egész ingatlanra fókuszálunk, így lehetőség van a helyiségek harmonikus összehangolására: a színek, anyagok és formák tökéletes egységére. A fotórealisztikus látványtervek pedig segítenek elképzelni a végeredményt, még a munka megkezdése előtt.\n',
        question: 'Mit tartalmaz a csomag?',
        features: [
            'Három alkalommal személyes konzultáció',
            'Két-három változatban készített konszignációs alaprajz',
            'Világítási terv',
            'Gépészeti terv',
            'Elektromos terv',
            'Falazási és bontási terv',
            'Álmennyezeti terv',
            'Vázlatos és színes falnézetek',
            'Fotórealisztikus látványtervek',
            'Vázlatos látványterv',
            'Helyszíni bejárás és részletes felmérés',
            'Hangulatkép (moodboard) a tervezett stílus bemutatására',
            'Részletes bevásárló lista',
            'Folyamatos kapcsolattartás a tervezés egész folyamata alatt',
            'Kapcsolattartás a szakemberekkel a kivitelezés során'
        ],
    },
    {
        img: '/price/konyha.jpg',
        alt: '',
        title: 'Konyhatervezés',
        desc: 'Egyedi igényekre szabott, funkcionális és időtálló konyhaterveket készítek, ahol a design és a használhatóság harmonikusan összekapcsolódik. A tervezési folyamat maximum 30 napot vesz igénybe.\n' +
            'A legmodernebb belsőépítészeti trendek és technológiák alkalmazásával részletes tervdokumentációt nyújtok, amely támogatja a gördülékeny kivitelezést. A tervezés során kiemelt figyelmet fordítok a téroptimalizálásra, ergonómiára és műszaki megvalósíthatóságra.\n',
        question: 'A tervdokumentáció tartalma:\n',
        features: [
            '2 alkalmas konzultáció az igények pontosítására',
            'Konszignációs alaprajz készítése',
            'Világítási terv kidolgozása',
            'Gépészeti és elektromos tervek elkészítése',
            'Falazási és bontási terv összeállítása',
            'Álmennyezeti terv megtervezése',
            'Vázlatos és színes falnézetek',
            'Fotórealisztikus és vázlatos látványtervek bemutatása',
            'Helyszíni bejárás és pontos felmérés',
            'Moodboard készítése a stílus és hangulat meghatározásához',
            'Bevásárló lista összeállítása az anyagokhoz',
            'Folyamatos kapcsolattartás az ügyféllel a tervezés teljes folyamata alatt',
            'Kapcsolattartás a kivitelező szakemberekkel a gördülékeny megvalósítás érdekében'
        ],
    },
];

const partners = [
    { name: 'Partner One', logo: '/partners/caesar.webp' },
    { name: 'Partner Two', logo: '/partners/horanyi.png' },
    { name: 'Partner Three', logo: '/partners/ifloor.png' },
    { name: 'Partner Four', logo: '/partners/plshoppe.png' },
    { name: 'Partner Four', logo: '/partners/urbanhome.png' },
    { name: 'Partner One', logo: '/partners/caesar.webp' },
    { name: 'Partner Two', logo: '/partners/horanyi.png' },
    { name: 'Partner Three', logo: '/partners/ifloor.png' },
    { name: 'Partner Four', logo: '/partners/plshoppe.png' },
    { name: 'Partner Four', logo: '/partners/urbanhome.png' },
];

const pics = [
    '/slider/53.jpg',
    '/slider/51.jpg',
];
let pics1;
pics1 = [
    '/slider/52.jpg',
    '/slider/50.jpg',
];

const plusOptions = [
    {
        title: 'Látványterv',
        desc: 'Amennyiben választott szolgáltatásod nem tartalmazza, vagy utólag módosítanál a látvány terveken, lehetőséged van plusz szolgáltatásként kérni.',
        priceOnline: 'Árajánlatkérés szükséges',
        priceInPerson: '',
    },
    {
        title: 'Tanácsadás',
        desc: 'Tanácsadás 60 és 120 perces időtartalommal választható.',
        priceOnline: 'Online 20.000 Ft / óra',
        priceInPerson: 'Személyesen 30.000 Ft / óra'
    },
    {
        title: 'Közös vásárlás',
        desc: 'Választott csomagodhoz járt bevásárló lista segítségével, ha szükségét érzed elmegyek veled beszerezni a bútorokat, burkolatokat és egyéb kiegészítőket, hogy segítsek a döntésekben.',
        priceOnline: 'Online 20.000 Ft / óra',
        priceInPerson: 'Személyesen 30.000 Ft / óra'
    },
    {
        title: 'Kiszállási díj',
        desc: '',
        priceOnline: '20.000 Ft-tól / nap',
        priceInPerson: '',
    },

];

export {
    navLinks,
    cards,
    plans,
    partners,
    pics,
    pics1,
    plusOptions,
};