import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavigationContent } from '@/constant/navigationListData';
import Link from 'next/link';
import React from 'react';

type Props = {
    icon: React.ReactNode
    description: string
}

export default function HomeCard({ description, icon, title, url, subTitle }: Props & NavigationContent) {
    return (
        <Link className='h-28 sm:min-h-48 sm:max-h-52 w-full sm:w-[48%] lg:w-[30%]' href={url}>
            <Card className='flex flex-col sm:justify-between sm:pt-3'>
                <CardHeader className='flex justify-center h-full sm:h-1/4'>
                    <CardTitle className='flex gap-5 flex-row items-center'>
                        <h1 className='inline-flex gap-3 w-20 items-center'>
                            {icon}
                            <span>
                                {title}
                            </span>
                        </h1>
                        <h2 className='sm:hidden lg:block'>
                            {subTitle}
                        </h2>
                    </CardTitle>
                </CardHeader>
                <CardContent className="hidden sm:block sm:h-3/4">
                    <p className="text-sm leading-relaxed text-justify">
                        {description}
                    </p>
                </CardContent>
            </Card>
        </Link>
    )
}
