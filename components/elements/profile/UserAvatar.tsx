import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Props = {
    username: string
}

export default function UserAvatar({username}:Props) {
    return (
        <div>
            <Avatar className='size-24'>
                <AvatarImage
                    alt={`${username} Photo Profile`}
                    title={username}
                    src={`https://ui-avatars.com/api/?background=random&name=${username}&size=128`}
                />
                <AvatarFallback></AvatarFallback>
            </Avatar>
        </div>
    )
}
