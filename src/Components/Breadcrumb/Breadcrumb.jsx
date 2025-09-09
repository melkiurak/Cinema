import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";

export default function Breadcrumb() {
    const location = useLocation();
    const { movieName } = useParams();
    const { pathname } = location;
    return (
        <div className="h-[27px]">
            <ul className="flex items-center gap-1 h-full">
                <Link className={`font-medium text-[16px] ${pathname === '/' ? 'text-white' : 'text-[#4F5B7C]'}`} to="/">Главная</Link>
                {pathname.includes('/movies/') && (
                <>
                    <MdKeyboardArrowRight className="text-[#4F5B7C] w-5 h-5"/>
                    <Link className={`font-medium text-[16px] ${pathname.includes('/movies/') ? 'text-white' : 'text-[#4F5B7C]'}`} to={`/movies/${movieName}`}>{movieName}</Link>
                </>
                )}
                {pathname.includes('/Billboard') && (
                <>
                    <MdKeyboardArrowRight className="text-[#4F5B7C] w-5 h-5"/>
                    <Link className={`font-medium text-[16px] ${pathname.includes('/Billboard') ? 'text-white' : 'text-[#4F5B7C]'}`} to="/Billboard">Афиша</Link>
                </>
                )}
            </ul>
        </div>
    )
}