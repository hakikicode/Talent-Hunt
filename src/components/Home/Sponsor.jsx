import React from "react";

const sponsors = [
  {
    name: "Kwara State Government",
    image: "https://kwarastate.gov.ng/wp-content/uploads/2020/03/new_logo.png", // Replace with the actual image URL
    isHeadline: true,
  },
];

  {/* {
    name: "Sponsor 1",
    image: "https://via.placeholder.com/100", // Replace with the actual image URL
  },
  {
    name: "Sponsor 2",
    image: "https://via.placeholder.com/100", // Replace with the actual image URL
  },
  {
    name: "Sponsor 3",
    image: "https://via.placeholder.com/100", // Replace with the actual image URL
  } */}

const Sponsor = () => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Our Sponsors
        </h2>

        {/* Headline Sponsor */}
        <div className="mt-8 text-center">
          {sponsors
            .filter((sponsor) => sponsor.isHeadline)
            .map((headlineSponsor) => (
              <div key={headlineSponsor.name} className="inline-block">
                <img
                  src={headlineSponsor.image}
                  alt={headlineSponsor.name}
                  className="w-40 h-40 mx-auto rounded-full border-4 border-red-600"
                />
                <h3 className="mt-4 text-xl font-bold text-gray-700">
                  {headlineSponsor.name}
                </h3>
              </div>
            ))}
        </div>

        {/* Other Sponsors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {sponsors
            .filter((sponsor) => !sponsor.isHeadline)
            .map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={sponsor.image}
                  alt={sponsor.name}
                  className="w-24 h-24 rounded-full shadow-lg"
                />
                <h4 className="mt-2 text-md font-medium text-gray-600">
                  {sponsor.name}
                </h4>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsor;
