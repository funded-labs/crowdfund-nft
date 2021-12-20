import Item from "./item";

const ITEMS = [
    {
        imgUrl: "",
        title: "Comic Book Reboot",
        goal: "£5,000",
        amountFunded: 67,
        author: "Alan Grey",
        color: "bg-emerald-100"
    },
    {
        imgUrl: "",
        title: "Resin Tables",
        goal: "£12,000",
        amountFunded: 42,
        author: "Stacy McDee",
        color: "bg-blue-400"
    },
    {
        imgUrl: "",
        title: "Notre Dame Maquette",
        goal: "£3,000",
        amountFunded: 402,
        author: "Daniel Mayfroi",
        color: "bg-yellow-500"
    },
    {
        imgUrl: "",
        title: "Tie Die Floral Dress",
        goal: "£23,400",
        amountFunded: 89,
        author: "Silvana Drea",
        color: "bg-black"
    },
];

export default function NearlyFunded() {
    return (
        <section className="w-full py-10">
            <div className="w-full max-w-5xl mx-auto text-gray-400 uppercase font-semibold text-sm mb-2">
                Nearly Funded
            </div>
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {ITEMS.map((item, index) => <Item key={index} item={item} />)}
            </div>
        </section>
    )
}