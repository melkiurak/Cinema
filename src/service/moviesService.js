import { db } from '../firebaseConfig'
import { collection, getDocs, orderBy, query, where} from "firebase/firestore";

export async function fetchAllFilms() {
    const q = query(collection(db, 'Film'));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}
export async function fetchNewFilms() {
    const q = query(collection(db, 'Film'), where('status', '==', 'new'));
    // Выполняем запрос и получаем отфильтрованные данные
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
};
export async function fetchTrailer() {
    const q = query(collection(db, 'NewTrailer'));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()});
    });
    return data;
};
export async function fetchPopularFilm() {
    const q = query(
        collection(db, 'Film'),
        where('isPopular', '==', true),
        orderBy('rating', "desc") // Сортировка по рейтингу в порядке убывания
    );
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
};
export async function fetchAllActor() {
    const q = query(collection(db, 'Actors'));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}
export async function fetchPopulateActor() {
    const q = query(
        collection(db, 'PopularPeople'),
        orderBy('popularityScore', 'desc')
    );
    const data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()});
    });
    return data
}
export async function fetchNews() {
    const q = query(collection(db, 'LatestNews'), orderBy('data', 'desc'));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()});
    });
    return data;
}
export async function fetchExpectedNoveltieS() {
    const q = query(collection(db, 'Film'), where('date', '!=', null ), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({id:doc.id, ...doc.data()});
    });
    return data;
}
export async function fetchBoxOffice() {
    const q = query(
        collection(db, 'Film'),
    );
    const data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const docData = doc.data();
        if (
            docData.boxOfficeUSCanada?.totalBoxOffice !== null &&
            docData.boxOfficeUkraine?.totalBoxOffice !== null &&
            docData.boxOfficeWorld?.totalBoxOffice !== null
        ) {
            data.push({ id: doc.id, ...docData });
        }
    });
    return data;
}