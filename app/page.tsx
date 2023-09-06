"use client";

import { fetchCars } from "@utils";
import { HomeProps } from "@types";
import { fuels, yearsOfProduction } from "@constants";
import { CarRecognization, CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@components";
import { useState } from "react";

export default async function Home({ searchParams }: HomeProps) {
  const [cars, setCars] = useState([]);
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      {/* <Hero /> */}

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container"></div>

        <CarRecognization />
        <div className="home__filters">
          <SearchBar />
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard key={car.name} car={car} setCars={setCars} />
              ))}
            </div>

            {/* <ShowMore pageNumber={(searchParams.limit || 10) / 10} isNext={(searchParams.limit || 10) > allCars.length} /> */}
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
          </div>
        )}
      </div>
    </main>
  );
}
