import React from 'react';
import '../assets/styles/tailwind.css';
import {Layout} from "../components/Layout";
// import {Providers} from "./Providers"; // Import your styles here
import {Outlet} from 'react-router-dom';
import {Providers} from "./Providers";


export default function RootLayout() {
    return (
        <div className="h-full antialiased">
            <Providers>
                <div className="flex h-full bg-zinc-50 dark:bg-black">
                    <div className="flex w-full">
                        <Layout>
                            <Outlet/>
                        </Layout>
                    </div>
                </div>
            </Providers>
        </div>
    );
}
