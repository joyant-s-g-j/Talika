import { Button, ButtonProps, Icon, Text } from "@chakra-ui/react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavButtonProps extends ButtonProps {
    herf: string,
    icon: LucideIcon,
    label: string
}

function NavButton({ herf, icon, label, ...props}: NavButtonProps) {
    return (
        <Link href={herf} passHref legacyBehavior>
            <Button
                as="a"
                variant="ghost"
                gap={1.5}
                borderRadius="full"
                {...props}
            >
                <Icon as={icon} boxSize={5} />
                <Text lineHeight="4">{label}</Text>
                {props.children}
            </Button>
        </Link>
    )
}

export default NavButton