import Item from "./item";

export default function Grid({ isLoading, items = [] }) {
    if (isLoading === true || items.length < 1) {
        return (
            <div className="px-4 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {[0, 0, 0, 0].map((item, index) => <Item key={index} item={item} isLoading={true} />)}
            </div>
        )
    }

    return (
        <div className="px-4 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            {items.map((item, index) => <Item key={index} item={item} />)}
        </div>
    );
}