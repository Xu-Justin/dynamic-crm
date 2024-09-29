'use client';

import { Button } from "@material-tailwind/react";
import { useState } from "react";

export default function Home() {
    const [count, setCount] = useState(0);
    return (
        <div className={'flex flex-col items-center justify-center p-20 gap-4'}>
            <div className={'text-base'}>
                Count: {count}
            </div>
            <Button onClick={() => setCount(count + 1)}>
                Increase
            </Button>
        </div>
    );
}
