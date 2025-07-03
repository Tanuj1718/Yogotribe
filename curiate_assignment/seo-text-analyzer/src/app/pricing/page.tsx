"use client"

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
            <div className="flex gap-6 items-center my-16 justify-around w-full flex-wrap bg-amber-600">
                <div>
                    <CardSpotlight className="h-96 w-96">
                    <p className="text-xl font-bold relative z-20 mt-2 text-white">
                        Authentication steps
                    </p>
                    <div className="text-neutral-200 mt-4 relative z-20">
                        Follow these steps to secure your account:
                        <ul className="list-none  mt-2">
                        <Step title="Enter your email address" />
                        <Step title="Create a strong password" />
                        <Step title="Set up two-factor authentication" />
                        <Step title="Verify your identity" />
                        </ul>
      </div>
      <p className="text-neutral-300 mt-4 relative z-20 text-sm">
        Ensuring your account is properly secured helps protect your personal
        information and data.
      </p>
    </CardSpotlight>

                </div>
                <div>
                    <CardSpotlight className="h-96 w-96">
                        <p className="text-xl font-bold relative z-20 mt-2 text-white">
                            Authentication steps
                        </p>
                        <div className="text-neutral-200 mt-4 relative z-20">
                            Follow these steps to secure your account:
                            <ul className="list-none  mt-2">
                            <Step title="Enter your email address" />
                            <Step title="Create a strong password" />
                            <Step title="Set up two-factor authentication" />
                            <Step title="Verify your identity" />
                            </ul>
      </div>
      <p className="text-neutral-300 mt-4 relative z-20 text-sm">
        Ensuring your account is properly secured helps protect your personal
        information and data.
      </p>
    </CardSpotlight>
                    
                </div>
                <div>
                    <CardSpotlight className="h-96 w-96">
                        <p className="text-xl font-bold relative z-20 mt-2 text-white">
                            Authentication steps
                        </p>
                        <div className="text-neutral-200 mt-4 relative z-20">
                            Follow these steps to secure your account:
                            <ul className="list-none  mt-2">
                            <Step title="Enter your email address" />
                            <Step title="Create a strong password" />
                            <Step title="Set up two-factor authentication" />
                            <Step title="Verify your identity" />
                            </ul>
      </div>
      <p className="text-neutral-300 mt-4 relative z-20 text-sm">
        Ensuring your account is properly secured helps protect your personal
        information and data.
      </p>
    </CardSpotlight>
                    
                </div>
            </div>
        </div>
    );
}

export default Pricing