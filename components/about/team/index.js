import members from "./members";

export default function Team() {
    return (
        <section className="w-full py-10 bg-white text-gray-700">
            <div className="w-full max-w-5xl mx-auto flex flex-col px-4">
                <div className="font-semibold text-3xl w-full text-center py-3">
                    Our team
                </div>
                <p className="w-full text-center text-sm">
                    A group of serial entrepreneurs, passionate about Web3 and funding new ventures
                </p>
                <div className="w-full py-8 grid grid-cols-2 md:grid-cols-4 gap-12">
                    {members.map((member, index) => (
                        <div key={index} className="relative group w-full overflow-hidden rounded-3xl h-42">
                            <img src={member.imgUrl} className="object-cover w-full h-full" />
                            <div
                                className={`
                                    absolute top-0 left-0 w-full h-full bg-blue-600 opacity-0
                                    group-hover:opacity-100 duration-300 bg-opacity-70
                                    flex flex-col space-x-2 text-white overflow-hidden
                                    items-center justify-center
                                `}
                            >
                                <p className="font-bold text-lg">
                                    {member.name}
                                </p>
                                <p className="font-medium text-base">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}