"use client";

import { createClient, getClientById, updateClient } from "@/app/actions/client/client.controller";
import { useEffect } from "react";
import { Client } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

export default function AddClient() {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const clientId = searchParams.get("id");
    const router = useRouter();
    const [client, setClient] = useState<Client>({
        id: 0,
        userId: "",
        createdAt: new Date(),
        fullName: "",
        identification: "",
        age: 0,
        gender: "",
        isActive: false,
        additionalAttributes: "",
        canDrive: false,
        wearsGlasses: false,
        isDiabetic: false,
        otherIllness: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setClient(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    async function onFormSubmit(formData: FormData) {
        try {
            if (clientId) {
                await updateClient(formData, parseInt(clientId));
            } else {
                await createClient(formData);
            }
            alert("Operation completed successfully");
        } catch (error: any) {
            alert(`Error creating client: ${error.message}`);
        } finally {
            router.push("/home");
        }
    }

    useEffect(() => {
        const fetchClient = async () => {
            setIsLoading(true);
            try {
                if (clientId) {
                    const client = await getClientById(parseInt(clientId)) as Client;
                    setClient(client);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchClient();
    }, [clientId]);

    const title = clientId ? "Edit Client" : "Create New Client";
    const description = clientId ? "Update client information below." : "Please fill out the form below to create a new client.";

    if (isLoading) {
        return (
            <div className="grid place-content-center min-h-screen bg-white">
                <Loader2Icon size={40} className="animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-5xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</h2>
                                <p className="text-xl text-gray-500">{description}</p>
                            </div>
                            <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                                <form action={onFormSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                name="fullName"
                                                value={client.fullName}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="identification" className="block text-sm font-medium text-gray-700">
                                                Identification
                                            </label>
                                            <input
                                                type="text"
                                                id="identification"
                                                name="identification"
                                                value={client.identification}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                                                Age
                                            </label>
                                            <input
                                                type="number"
                                                id="age"
                                                name="age"
                                                min={1}
                                                max={100}
                                                value={client.age}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                                Gender
                                            </label>
                                            <select
                                                id="gender"
                                                name="gender"
                                                value={client.gender}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                            >
                                                <option value="">Select gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="isActive"
                                            name="isActive"
                                            checked={client.isActive}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                                            Is Active
                                        </label>
                                    </div>

                                    <div>
                                        <label htmlFor="additionalAttributes" className="block text-sm font-medium text-gray-700">
                                            Additional Attributes
                                        </label>
                                        <textarea
                                            id="additionalAttributes"
                                            name="additionalAttributes"
                                            value={client.additionalAttributes || ""}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                        ></textarea>
                                    </div>

                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="canDrive"
                                                name="canDrive"
                                                checked={client.canDrive}
                                                onChange={handleInputChange}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="canDrive" className="ml-2 block text-sm text-gray-900">
                                                Can Drive
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="wearsGlasses"
                                                name="wearsGlasses"
                                                checked={client.wearsGlasses}
                                                onChange={handleInputChange}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="wearsGlasses" className="ml-2 block text-sm text-gray-900">
                                                Wears Glasses
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="isDiabetic"
                                                name="isDiabetic"
                                                checked={client.isDiabetic}
                                                onChange={handleInputChange}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="isDiabetic" className="ml-2 block text-sm text-gray-900">
                                                Is Diabetic
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="otherIllness" className="block text-sm font-medium text-gray-700">
                                            Do you suffer from any other illnesses?
                                        </label>
                                        <textarea
                                            id="otherIllness"
                                            name="otherIllness"
                                            value={client.otherIllness || ""}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                        />
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            {clientId ? 'Update Client' : 'Create Client'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
