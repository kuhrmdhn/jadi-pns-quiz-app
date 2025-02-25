"use client"
import { ListItem, NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import AuthButton from './AuthButton'
import Logo from './Logo'

type Navigation = {
    id: number
    title: string
    content: NavigationContent[]
}

type NavigationContent = {
    id: number
    url: string
    title: string
    subTitle?: string
    description?: string
}

export default function Navbar() {
    return (
        <header className='px-10 flex items-center justify-around w-full h-24 shadow-md rounded-b-lg'>
            <div className='w-1/5'>
                <Logo />
            </div>
            <div className="w-1/3">
                <NavigationMenu>
                    <NavigationMenuList className='flex gap-5'>
                        {
                            navigation.map((navigate) => (
                                <NavigationMenuItem key={navigate.id}>
                                    <NavigationMenuTrigger>
                                        {navigate.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]">
                                            {
                                                navigate.content.map((content) => (
                                                    <ListItem href={content.url} key={content.id}>
                                                        <h1 className='font-bold text-xl text-black'>{content.title}</h1>
                                                        <h2 className="font-semibold text-base text-gray-900">{content.subTitle}</h2>
                                                        <p className="text-justify text-gray-700 font-medium">{content.description}</p>
                                                    </ListItem>
                                                ))
                                            }
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            ))
                        }
                        <NavigationMenuItem>
                            <AuthButton />
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    )
}

const navigation: Navigation[] = [
    {
        id: 1,
        title: "Zona Literasi",
        content: [
            {
                id: 1,
                url: "/",
                title: "TWK",
                subTitle: "Tes Wawasan Kebangsaan",
                description: "Tes ini bertujuan untuk mengukur pengetahuan dan pemahaman peserta mengenai nasionalisme, sejarah Indonesia, konstitusi, serta aspek kebangsaan lainnya."
            },
            {
                id: 2,
                url: "/",
                title: "TIU",
                subTitle: "Tes Intelegensi Umum",
                description: "Tes ini bertujuan untuk mengukur kemampuan kognitif peserta yang berkaitan dengan logika, verbal, numerik, dan analitis, yang dibutuhkan dalam pemecahan masalah sehari-hari maupun dalam pekerjaan."
            },
            {
                id: 3,
                url: "/",
                title: "TKP",
                subTitle: "Tes Karakteristik Pribadi",
                description: "Tes ini bertujuan untuk menilai karakter, kepribadian, serta potensi peserta dalam menghadapi situasi kerja."
            },
        ]
    },
    {
        id: 2,
        title: "Zona Ujian",
        content: [
            {
                id: 1,
                url: "/",
                title: "Tes TWK",
                description: "Materi: Pancasila, Undang Undang Dasar Tahun 1945, Bhineka Tunggal Ika, Negara Kesatuan Republik Indonesia, dan Sejarah Indonesia"
            },
            {
                id: 2,
                url: "/",
                title: "Tes TIU",
                description: "Pengujian: Kemampuan Verbal, Kemampuan Numerik, Kemampuan Logis, dan Kemampuan Analitis"
            },
            {
                id: 3,
                url: "/",
                title: "Tes TKP",
                description: "Nilai Nilai Dasar: Pelayanan Publik, Jejaring Kerja, Sosial Budaya, Tekanan Kerja, Profesionalisme, Integritas Diri, Semangat Berprestasi, Orientasi pada Hasil, Kemampuan Beradaptasi, dan Pengendalian Diri"
            },
        ]
    }
]