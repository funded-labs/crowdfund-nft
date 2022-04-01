export default function Evidence({ project }) {
    return (
        <div className="w-full">
            <div className="w-full max-w-5xl mx-auto">

                <div class="relative overflow-x-auto rounded">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Column one
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Column two
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Column three
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Column four
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b">
                                <td scope="row" class="px-6 py-4 whitespace-nowrap">
                                    Value one
                                </td>
                                <td class="px-6 py-4">
                                    Value two
                                </td>
                                <td class="px-6 py-4">
                                    Value three
                                </td>
                                <td class="px-6 py-4">
                                    Value four
                                </td>
                            </tr>
                            <tr class="bg-white border-b">
                                <td scope="row" class="px-6 py-4 whitespace-nowrap">
                                    Value one
                                </td>
                                <td class="px-6 py-4">
                                    Value to
                                </td>
                                <td class="px-6 py-4">
                                    Value three
                                </td>
                                <td class="px-6 py-4">
                                    Value four
                                </td>
                            </tr>
                            <tr class="bg-white">
                                <td scope="row" class="px-6 py-4 whitespace-nowrap">
                                    Magic Mouse 2
                                </td>
                                <td class="px-6 py-4">
                                    Black
                                </td>
                                <td class="px-6 py-4">
                                    Accessories
                                </td>
                                <td class="px-6 py-4">
                                    $99
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
