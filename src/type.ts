export interface Film {
    id: string;
    date: string;
    comments: {
        negative: number
        neutral: number
        positive: number
        total: number
    }
    genres: string[];
    name: string;
    name_en: string,
    poster: string;
    ratingKinoarea: number,
    ratingIMDb: number,
    rating: number;
    status: string;
    year: number;
    isPopular: boolean;
    description: string;
    boxOfficeUSCanada: {
        totalBoxOffice: number;
        monthlyBoxOffice: number;
    };
    boxOfficeUkraine: {
        totalBoxOffice: number;
        monthlyBoxOffice: number;
    };
    boxOfficeWorld: {
        totalBoxOffice: number;
        monthlyBoxOffice: number;
    };
    director: string;
    cinematographer: string;
    composer: string;
    producer: string;
    productionCompanies: string[];
    productionDesigner: string;
    screenwriter: string;
    editor: string;
    dubbingStudio: string;
    visualEffects: string[];
    actors: string[];
    ageRating: string;
    duration: number;
    slogan: string;
    worldPremiere: string;
    ukrainePremiere: string;
    upcoming: boolean;
    background: string;
}
interface Trailer{
    name: string,
    trailer:string,
    img: string,
    dislikes: number,
    likes:number,
    upcoming: boolean,
    dislikeActive: boolean,
    likeActive: boolean,
}
interface PopularActor{
    age: number,
    name: string,
    name_em: string,
    picture: string,
    popularityScore: number,
    timestamp: string,
}
interface Actor{
    name:string,
    img: string,
    type: string,
}
interface News{
    data: string,
    img: string,
    title: string,
    content: string,
}