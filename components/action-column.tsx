"use client";
import { deleteClient } from "@/app/actions/client/client.controller";
import { Client } from "@prisma/client";
import { MoreHorizontalIcon, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default function ActionColumn(props: { clientId: number }) {
    return (
        <div className="flex gap-3">
            <Link href={`/home/add-client?id=${props.clientId}`} className="text-blue-600 hover:text-blue-800">
                <Pencil className="h-5 w-5" />
            </Link>
            <button className="text-red-600 hover:text-red-800">
                <Trash2 onClick={async () => {
                    try {
                        await deleteClient(props.clientId);
                        alert("Client deleted successfully");
                    } catch (error) {
                        console.error(error);
                    }
                }} className="h-5 w-5" />
            </button>
        </div>
    )
}

export function MoreInfoColumn(props: { client: Client }) {
    function openDialog(open: boolean) {
        const dialog = document.getElementById(`dialog-${props.client.id}`) as HTMLDialogElement;
        if (!dialog) return;
        if (open) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }
    return (
        <>
            <div className="flex justify-center">
                <MoreHorizontalIcon onClick={() => openDialog(true)} size={20} className="h-5 w-5 text-black cursor-pointer hover:scale-110 transition-all" />
            </div>
            <dialog id={`dialog-${props.client.id}`}>
                <div className="w-[400px] bg-white shadow-lg rounded-lg overflow-hidden p-10">
                    <div className="px-6 py-4">
                        <h2 className="font-bold text-2xl mb-2 text-gray-800">{props.client.fullName}</h2>
                        <div className="">
                            <span className="font-bold text-lg">Additional Attributes</span>
                            <p className="text-lg">{props.client.additionalAttributes}</p>
                            <span className="font-bold text-lg">Other Illness</span>
                            <p className="text-lg">{props.client.otherIllness}</p>
                        </div>
                    </div>
                    <div className="flex justify-end w-full">
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md" onClick={() => openDialog(false)}>Close</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}