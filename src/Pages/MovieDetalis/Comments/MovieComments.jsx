

export function MovieComments({film}) {
    const percentage = film.comments.total > 0 ? (film.comments.positive / film.comments.total) * 100 : 0;
    function getBackgroundColor() {
        if (percentage >= 60) {
            return "#326339"; // Green
        } else if (percentage >= 50) {
            return "#FFF0654D"; // Yellow
        } else {
            return "#642C36"; // Red
        }
    }
    return (
        <div className="flex flex-col gap-[40px]">
            <div className="flex items-end justify-between w-full">
                <h2>Рецензии к фильму</h2>
                <button className="w-[214px] h-[63px] rounded-[10px] bg-[#3657CB] text-[16px] font-bold text-white">Добавить рецензию</button>
            </div>
            <div className="h-[71px] flex gap-[17px]">
                <button className="py-[24px] px-[20px] bg-[#1B2133] rounded-[10px] flex items-center gap-[40px] h-full text-[20px] font-semibold text-white">
                    <span>Всего</span>
                    <div className="bg-[#3657CB4D] rounded-[5px] flex items-center justify-center min-w-[40px] min-h-[40px] px-2 py-2">
                        <span className="text-[15px] font-medium text-[#3657CB]">{film.comments.total}</span>
                    </div>              
                </button>
                <button className="py-[24px] px-[20px] bg-[#1B2133] rounded-[10px] flex items-center gap-[40px] h-full text-[20px] font-semibold text-white">
                    <span>Положительных</span>
                    <div className="bg-[#57D04361] rounded-[5px] flex items-center justify-center min-w-[40px] min-h-[40px] px-2 py-2">
                        <span className="text-[15px] font-medium text-[#57D043]">{film.comments.positive}</span>
                    </div>     
                </button>
                <button className="py-[24px] px-[20px] bg-[#1B2133] rounded-[10px] flex items-center gap-[40px] h-full text-[20px] font-semibold text-white">
                    <span>Отрицательных</span>
                    <div className="bg-[#642C36] rounded-[5px] flex items-center justify-center min-w-[40px] min-h-[40px] px-2 py-2">
                        <span className="text-[15px] font-medium text-[#E04141]">{film.comments.negative}</span>
                    </div>     
                </button> 
                <button className="py-[24px] px-[20px] bg-[#1B2133] rounded-[10px] flex items-center gap-[40px] h-full text-[20px] font-semibold text-white">
                    <span>Нейтральных рецензний</span>
                    <div className="bg-[#FFF0654D] rounded-[5px] flex items-center justify-center min-w-[40px] min-h-[40px] px-2 py-2">
                        <span className="text-[15px] font-medium text-[#FFF065]">{film.comments.neutral}</span>
                    </div>     
                </button>
                <button className="py-[24px] px-[20px] bg-[#1B2133] rounded-[10px] flex items-center gap-[40px] h-full text-[20px] font-semibold text-white">
                    <span>Процент</span>
                    <div className={` rounded-[5px] flex items-center justify-center min-w-[40px] min-h-[40px] px-2 py-2 ${getBackgroundClass(percentage)}`}>
                        <span className="text-[15px] font-medium text-[#3657CB]"> {percentage.toFixed(0)}%</span>
                    </div>     
                </button>
            </div>
            <div></div>
        </div>
    )
}