// app/page.tsx
'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation

const RootPage: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to /home when the root route is accessed
        router.replace('/home');
    }, [router]);

    return null; // No UI for the root page as it redirects
};

export default RootPage;
