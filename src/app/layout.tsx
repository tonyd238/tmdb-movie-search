import type { Metadata } from 'next';
import '../styles/globals.css';
import { apiFetch } from '@/utils/api-fetch';
import { ApiGetLanguagesSchema, routeApiGetLanguages } from '@/app/api/get-languages';
import { ApiGetCountriesSchema, routeApiGetCountries } from '@/app/api/get-countries';
import React from 'react';
import { BaseProvider } from '@/app/provider';
import { ApiGetGenresSchema, routeApiGetGenres } from '@/app/api/get-genres';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "TMDB Movie Search",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const languages = await apiFetch(routeApiGetLanguages, ApiGetLanguagesSchema, { cache: 'force-cache' })
    const genres = await apiFetch(routeApiGetGenres, ApiGetGenresSchema, { cache: 'force-cache' })
    const countries = await apiFetch(routeApiGetCountries, ApiGetCountriesSchema, { cache: 'force-cache' })
  return (
    <html lang="en">
      <body
        className="bg-body-gradient"
      >
       <BaseProvider data={{
           languages,
           countries,
           genres
       }}>
          {children}
        </BaseProvider>
      </body>
    </html>
  );
}
