import { validateRequest } from "@/lib/auth"
import Link from "next/link";
import { getAllClients } from "../actions/client/client.controller";
import ActionColumn, { MoreInfoColumn } from "@/components/action-column";

export default async function HomePage() {
    const { user } = await validateRequest();
    if (!user) {
        return <div>Unauthorized</div>;
    }
    const clients = await getAllClients();

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* Main Content */}
            <main className="flex-grow p-6">
                <div className="max-w-7xl mx-auto h-full">
                    {/* Table Card */}
                    <div className="bg-white shadow-lg rounded-lg h-full flex flex-col">
                        <div className="px-6 py-5 flex justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Clients</h2>
                                <p className="mt-1 text-sm text-gray-500">A list of all registered clients and their information.</p>
                            </div>
                            <Link href="/home/add-client" className="text-lg font-bold text-black hover:underline">Add Client +</Link>
                        </div>
                        <div className="flex-grow overflow-auto border-t border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Full Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Age
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Gender
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Medical Info
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Additional Info
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {clients.map((client) => (
                                        <tr key={client.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {client.fullName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {client.identification}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {client.age}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {client.gender}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${client.isActive
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {client.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex gap-2">
                                                    {client.canDrive && <span className="text-green-600">Can Drive</span>}
                                                    {client.wearsGlasses && <span className="text-blue-600">Wears Glasses</span>}
                                                    {client.isDiabetic && <span className="text-red-600">Diabetic</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <ActionColumn clientId={client.id} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <MoreInfoColumn key={client.id} client={client} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}