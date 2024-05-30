"use client"
import React, { useState, useEffect } from 'react';
import { Navbar } from "@/components/navbar";
import { List } from "@/components/list";
import { subject } from '@/db/schema';
import { countSlashes } from '@/lib/route-finder';
import { usePathname } from 'next/navigation';
import { getSubjects } from '@/db/queries';


type Props = {
  Data: typeof subject.$inferSelect[]
}

const MainPage = ({ Data }: Props) => {
  const [data, setData] = useState<typeof Data>([])
  const [query, setQuery] = useState("");
  const pathName = usePathname()
  const slash = countSlashes(pathName)

  useEffect(() => {
    if (query.length == 0) {
       getSubjects()
       .then((result: any) => setData(result))
    } else {
      fetch(`/api/${slash}?q=${query}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setData(data);

        })
    }
  }, [query, data, slash]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <Navbar query={query} onChange={handleInputChange} className="w-full" />
      <div className="h-full w-full p-10">
        <List pathName="" data={data} />
      </div>
    </>
  );
};

export default MainPage;


