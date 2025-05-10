
export type NavigationContent = {
    id?: number
    url: string
    title: string
    subTitle?: string
    description?: string
}

type Navigation = {
    id: number
    title: string
    content: NavigationContent[]
}

const exercisePath = "/exercise"
const learningPath = "/learning"

export const navigation: Navigation[] = [
    {
        id: 1,
        title: "Zona Literasi",
        content: [
            {
                id: 1,
                url: `${learningPath}/TWK`,
                title: "TWK",
                subTitle: "Tes Wawasan Kebangsaan",
                description: "ini bertujuan untuk mengukur pengetahuan dan pemahaman peserta mengenai nasionalisme, sejarah Indonesia, konstitusi, serta aspek kebangsaan lainnya."
            },
            {
                id: 2,
                url: `${learningPath}/TIU`,
                title: "TIU",
                subTitle: "Tes Intelegensi Umum",
                description: "ini bertujuan untuk mengukur kemampuan kognitif peserta yang berkaitan dengan logika, verbal, numerik, dan analitis, yang dibutuhkan dalam pemecahan masalah sehari-hari maupun dalam pekerjaan."
            },
            {
                id: 3,
                url: `${learningPath}/TKP`,
                title: "TKP",
                subTitle: "Tes Karakteristik Pribadi",
                description: "ini bertujuan untuk menilai karakter, kepribadian, serta potensi peserta dalam menghadapi situasi kerja."
            },
        ]
    },
    {
        id: 2,
        title: "Zona Ujian",
        content: [
            {
                id: 1,
                url: `${exercisePath}/TWK`,
                title: "TWK",
                subTitle: "Materi Kebangsaan",
                description: "Materi: Pancasila, Undang Undang Dasar Tahun 1945, Bhineka Tunggal Ika, Negara Kesatuan Republik Indonesia, dan Sejarah Indonesia"
            },
            {
                id: 2,
                url: `${exercisePath}/TIU`,
                title: "TIU",
                subTitle: "Materi Logika",
                description: "Pengujian: Kemampuan Verbal, Kemampuan Numerik, Kemampuan Logis, dan Kemampuan Analitis"
            },
            {
                id: 3,
                url: `${exercisePath}/TKP`,
                title: "TKP",
                subTitle: "Materi Karakter",
                description: "Nilai Nilai Dasar: Pelayanan Publik, Jejaring Kerja, Sosial Budaya, Tekanan Kerja, Profesionalisme, Integritas Diri, Semangat Berprestasi, Orientasi pada Hasil, Kemampuan Beradaptasi, dan Pengendalian Diri"
            },
        ]
    }
]