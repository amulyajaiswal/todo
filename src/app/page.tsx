"use client"; // Ensure this is a Client Component

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use 'next/navigation' in App Router for router functionality
import AddTodo from "@/components/add-todo";
import { Todos } from "@/components/todos";
import Navbar from "@/components/navbar";
import { RiTodoLine } from "react-icons/ri";
import "./globals.css";

const Page = () => {
    const router = useRouter(); // 'useRouter' from 'next/navigation' for the App Router

    // Simulate a logged-in check
    const isLoggedIn = () => {
        // Check localStorage only if window is available (client-side)
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("authToken");
            return !!token;
        }
        return false;
    };

    useEffect(() => {
        // Redirect to '/login' if not logged in, but only on client-side
        if (!isLoggedIn()) {
            router.push("/login");
        }
    }, [router]);

    return (
        <main>
            <h2>
                <RiTodoLine className="icons" /> TODO NEXT + TYPESCRIPT{" "}
                <RiTodoLine className="icons" />
            </h2>
            <Navbar />
            <AddTodo />
            <Todos />
        </main>
    );
};

export default Page;
