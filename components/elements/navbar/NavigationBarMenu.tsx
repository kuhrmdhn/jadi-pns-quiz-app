import { ListItem, NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button'
import { navigation } from '@/constant/navigationListData'
import AuthNav from './AuthNav'
import ButtonAnimationMobileNav from './ButtonAnimationMobileNav'
import { Home } from 'lucide-react'

export default function NavigationBarMenu() {
    return (
        <div className="w-2/3 lg:w-1/3 hidden md:block">
            <NavigationMenu>
                <NavigationMenuList className='flex gap-5'>
                    <NavigationMenuItem>
                        <ButtonAnimationMobileNav
                            href='/'
                            icon={<Home />}
                            text='Beranda'
                        />
                    </NavigationMenuItem>
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
                                                    <h1 className='font-bold text-xl text-black dark:text-gray-100'>{content.title}</h1>
                                                    <h2 className="font-semibold text-base text-gray-900 dark:text-gray-100/90">{content.subTitle}</h2>
                                                    <p className="text-justify text-gray-700 font-medium dark:text-gray-100/85">{content.description}</p>
                                                </ListItem>
                                            ))
                                        }
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ))
                    }
                    <NavigationMenuItem>
                        <AuthNav />
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <ThemeToggleButton />
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
