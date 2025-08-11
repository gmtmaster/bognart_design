// lib/projects.js
export const projects = [
    {
        slug: "project-1",
        title: "Modern természetesség",
        cover: "/pr1.jpg", // card image
        blurb: "Világos tónusok, természetes anyagok és letisztult formák találkozása.",
        images: [
            "/projects/project-1/1.jpg",
            "/projects/project-1/2.jpg",
            "/projects/project-1/3.jpg",
        ],
    },
    {
        slug: "project-2",
        title: "Klasszikus Harmónia – Időtlen Otthon",
        cover: "/pr2.jpg",
        blurb: "A letisztult vonalak, a természetes anyagok és a meleg tónusok időtlen hangulatot árasztanak, miközben minden részlet a nyugodt, harmonikus élettér megteremtését szolgálja.",
        images: [
            "/projects/project-2/1.jpg",
            "/projects/project-2/2.jpg",
            "/projects/project-2/3.jpg",
        ],
    },
    {
        slug: "project-3",
        title: "Modern Letisztultság – Természetes Elegancia",
        cover: "/pr3.jpg",
        blurb: "A világos tónusok, a fa részletek és a puha textúrák meleg, hívogató légkört teremtenek, miközben a praktikus térszervezés a modern élet minden igényét kiszolgálja.",
        images: [
            "/projects/project-3/1.jpg",
            "/projects/project-3/2.jpg",
            "/projects/project-3/3.jpg",
        ],
    },
    {
        slug: "project-4",
        title: "Letisztult Élettér - Airbnb lakás",
        cover: "/pr4.jpg",
        blurb: "A fürdő és a konyha finoman összehangolt színvilága, a nappali és étkező meleg tónusai otthonos, mégis friss atmoszférát teremtenek, amely időtálló marad.",
        images: [
            "/projects/project-4/1.jpg",
            "/projects/project-4/2.jpg",
            "/projects/project-4/3.jpg",
        ],
    },
    {
        slug: "project-5",
        title: "Időtlen elegancia",
        cover: "/pr5.jpg",
        blurb: "Letisztult arányok, nemes anyagok és finom részletek, melyek sosem mennek ki a divatból.",
        images: [
            "/projects/project-5/1.png",
            "/projects/project-5/2.png",
            "/projects/project-5/3.png",
        ],
    },
    {
        slug: "project-6",
        title: "Japandi Konyha",
        cover: "/pr6.jpg",
        blurb: "A tágas elrendezés és az egyszerű, mégis kifinomult részletek nemcsak esztétikai élményt nyújtanak, hanem a mindennapi használatban is maximális kényelmet biztosítanak.",
        images: [
            "/projects/project-6/1.jpg",
            "/projects/project-6/2.jpg",
            "/projects/project-6/3.jpg",
            "/projects/project-6/4.jpg",
            "/projects/project-6/5.png",
        ],
    },
    {
        slug: "project-7",
        title: "Project 7",
        cover: "/pr7.jpg",
        blurb: "Praesent euismod dignissim velit a elementum.",
        images: [
            "/projects/project-7/1.jpg",
            "/projects/project-7/2.jpg",
            "/projects/project-7/3.jpg",
        ],
    },

];

export function getProject(slug) {
    return projects.find(p => p.slug === slug) || null;
}

export function getProjectParams() {
    return projects.map(p => ({ slug: p.slug }));
}
