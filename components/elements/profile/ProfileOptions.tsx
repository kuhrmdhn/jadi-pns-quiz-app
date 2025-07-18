import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import useLogout from '@/utils/hooks/useLogout'
import { Ellipsis } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfileOptions() {
    const { logOut } = useLogout()
    const router = useRouter()
    function navigateToEditProfile() {
        return router.push("/profile/edit")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-2">
                <Button variant={"ghost"} onClick={navigateToEditProfile}>Edit</Button>
                <Button variant={"ghost"} onClick={logOut}>Logout</Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
