"use client"

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { CardSpotlight, Step } from "@/components/ui/card-spotlight";
import { Cover } from "@/components/ui/cover";

function Pricing() {
    return (
        <div className="flex flex-wrap">
            <div className="w-full h-auto flex items-center justify-center text-white">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-200 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                        Unlock Your SEO Superpowers and Conquer
                    </h1>
                    <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-200 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                        <Cover>Your Competition!</Cover>
                    </h1>
                    <p className="mb-4 px-4 font-serif mt-12">Welcome to the SEO superpower zone! Whether you’re a small business owner trying to rank for that elusive "best pizza in town" keyword, or an agency handling 100+ client websites like a boss, we’ve got a plan that’s just right for you.
                    Each plan comes with all the SEO goodness—content analysis, keyword wizardry, and magic backlink powers. No matter your goal, we’ll help you "SEO your way to the top!" (Or at least, to page one).</p>
                </div>
            </div>
            <BackgroundBeamsWithCollision className="bg-black h-full">
                <div className=" flex gap-6 items-center my-16 justify-around w-full flex-wrap">
                    <div className="bg-black">
                        <CardSpotlight className="h-[500px] w-96">
                        <p className="text-xl font-bold relative z-20 mt-2 text-white">
                            Starter – Just Getting Google’s Attention
                        </p>
                        <div className="text-neutral-200 mt-4 relative z-20">
                            Perfect for bloggers, freelancers, or anyone who still thinks “meta description” is a dating profile.
                            <ul className="list-none  mt-6">
                            <Step title="🔍 Analyze up to 100 pages/month"/>
                            <Step title="📈 Basic SEO insights (no PhD in algorithms required)" />
                            <Step title="🚦 Keyword tracking for 5 keywords – baby steps, but important ones" />
                            </ul>
                    </div>
                    <p className="text-neutral-300 mt-4 relative z-20 text-sm">
                        Just like your first gym session — light, manageable, and builds core strength (of your website).
                    </p>
                    </CardSpotlight>
                    <button className="text-white ml-28 w-28 shadow-[inset_0_0_0_2px_#616467] hover:bg-[#8d57ab8c] px-8 py-4 rounded-4xl tracking-widest uppercase font-bold bg- z-20 hover:text-white dark:text-neutral-200 transition duration-200">
                        $Free
                    </button>
                    </div>
                    <div className="bg-black">
                        <CardSpotlight className="h-[500px] w-96">
                            <p className="text-xl font-bold relative z-20 mt-2 text-white">
                                Pro – Because You Actually Want Traffic
                            </p>
                            <div className="text-neutral-200 mt-4 relative z-20">
                                For small businesses, content creators, and marketers who’ve moved beyond “Why am I still on page 7?”
                                
                                <ul className="list-none  mt-6">
                                <Step title="🧠 Analyze up to 1,000 pages/month" />
                                <Step title="🚀 Advanced SEO suggestions with action plans" />
                                <Step title="📊 Track 50 keywords – because guesswork is so 2009" />
                                </ul>
                            </div>
                            <p className="text-neutral-300 mt-4 relative z-20 text-sm">
                        Like a personal trainer for your website — except we won’t yell at you (unless you ignore H1 tags again).
                            </p>
                            </CardSpotlight>
                            <button className="text-white w-28 ml-28 shadow-[inset_0_0_0_2px_#616467] hover:bg-[#8d57ab8c] px-8 py-4 rounded-4xl tracking-widest uppercase font-bold bg- z-20 hover:text-white dark:text-neutral-200 transition duration-200">
                                $30
                            </button>
                        
                    </div>
                    <div className="bg-black">
                        <CardSpotlight className="h-[500px] w-96">
                            <p className="text-xl font-bold relative z-20 mt-2 text-white">
                                Agency – Dominate Search Like a Boss
                            </p>
                            <div className="text-neutral-200 mt-4 relative z-20">
                                Built for agencies and large teams who need SEO tools with more power than your grandma’s station wagon.
                                <ul className="list-none  mt-2">
                                <Step title="🌍 Analyze unlimited pages" />
                                <Step title="🧩 White-label reports for clients (so you look super smart)" />
                                <Step title="📡 Track up to 500 keywords – because you’ve got an empire to manage" />
                                </ul>
                            </div>
                            <p className="text-neutral-300 mt-4 relative z-20 text-sm">
                                Like an SEO lightsaber — powerful, elegant, and capable of slicing through the competition.
                            </p>
                            </CardSpotlight>
                            <button className="text-white w-28 ml-28 shadow-[inset_0_0_0_2px_#616467] hover:bg-[#8d57ab8c] px-8 py-4 rounded-4xl tracking-widest uppercase font-bold bg- z-20 hover:text-white dark:text-neutral-200 transition duration-200">
                                $50
                            </button>
                        
                    </div>
                </div>
            </BackgroundBeamsWithCollision>

        </div>
    );
}

export default Pricing