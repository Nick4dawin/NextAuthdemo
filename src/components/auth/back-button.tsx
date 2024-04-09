'use client'

import { Button } from "../ui/button";
import Link from "next/link";
interface BackButtonProps {
    href: string;
    label:string;
}

const BackButtton = ({href,label}:BackButtonProps) => {
  return (
    <Button variant={'link'} className="font-normal w-full" size={'sm'} asChild>
        <Link href={href} className="text-sm" >{label}</Link>
    </Button>
  )
}

export default BackButtton