'use client'
import data from '@/data.json';

export default function Home() {
    const keys = Object.keys(data);
    return (
        <div>
            <main>
                {keys.map((key, index) => {
                    return (
                        <p key={index}>
                            <a href={`timeline/${key}`}>
                                {key}
                            </a>
                        </p>
                    )
                })}
            </main>
        </div>
  );
}
