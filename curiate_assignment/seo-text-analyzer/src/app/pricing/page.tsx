"use client"

import { Card, CardDescription, CardSkeletonContainer, CardTitle, Skeleton } from "@/components/card";

function Pricing() {
    return (
        <div className="flex flex-wrap">
            <div className="bg-blue-200 w-full h-auto flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-4xl my-4">Choose Your SEO Superpower</h1>
                    <p className="mb-4 px-4">Welcome to the SEO superpower zone! Whether you’re a small business owner trying to rank for that elusive "best pizza in town" keyword, or an agency handling 100+ client websites like a boss, we’ve got a plan that’s just right for you.
                    Each plan comes with all the SEO goodness—content analysis, keyword wizardry, and magic backlink powers. No matter your goal, we’ll help you "SEO your way to the top!" (Or at least, to page one).</p>
                </div>
            </div>
            <div className="flex gap-6 items-center my-4 justify-around h-screen w-full flex-wrap">
                <div>
                    <Card>
                        <CardSkeletonContainer>
                        <Skeleton />
                        </CardSkeletonContainer>
                        <CardTitle>Damn good card</CardTitle>
                        <CardDescription>
                        A card that showcases a set of tools that you use to create your
                        product.
                        </CardDescription>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardSkeletonContainer>
                        <Skeleton />
                        </CardSkeletonContainer>
                        <CardTitle>Damn good card</CardTitle>
                        <CardDescription>
                        A card that showcases a set of tools that you use to create your
                        product.
                        </CardDescription>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardSkeletonContainer>
                        <Skeleton />
                        </CardSkeletonContainer>
                        <CardTitle>Damn good card</CardTitle>
                        <CardDescription>
                        A card that showcases a set of tools that you use to create your
                        product.
                        </CardDescription>
                    </Card>
                </div>
            </div>
        </div>

    );
}

export default Pricing