import Ads from "../ads/Ads";
import Authors from "../authors/Authors";
import Categories from "../categories/Categories";
import DiscountedBooks from "../discountedBooks/DiscountedBooks";
import HeroProducts from "../heroProducts/HeroProducts";
import SpecialOffer from "../specialOffer/specialOffer";
import Subscribe from "../subscribe/Subscribe";
import HeroBanner from '../heroBanner/HeroBanner'
import Services from "../services/Services";
export default function Main() {

    return (
        <div className="px-[30px]">
            <div className="py-[50px]">

                <HeroBanner />
            </div>
            <Services />
            <DiscountedBooks />
            <Ads />
            <div >
                <HeroProducts />
                <Categories />
            </div>

            <Authors />
            <SpecialOffer />
            <div>
                <Subscribe />
            </div>
        </div>
    )
}
