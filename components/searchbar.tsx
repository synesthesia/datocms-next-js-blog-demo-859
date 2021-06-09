import Search from "./Search/index";

export default function Searchbar() {

    return (
    <section role="search">  
        <div  className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-red mb-3">
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                <Search />
            </div>
        </div>
    </section>
    )

}