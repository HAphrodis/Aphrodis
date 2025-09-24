// components/CommunitySection.tsx
import Image from 'next/image';
import React from 'react';

export const CommunitySection: React.FC = () => {
  return (
    <section className="flex flex-col gap-8 p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          Community of designers <span className="text-blue-500">✴️</span> made
          by designers <span className="text-yellow-500">⚡</span>
        </h2>
        <p className="mt-2 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula
          massa in enim luctus. Rutrum arcu.
        </p>
      </div>

      <div className="text-center">
        <p className="font-semibold">Join to get free updates every week</p>
        <form className="mt-4 flex justify-center gap-2">
          <input
            type="email"
            placeholder="Enter email address"
            className="rounded-md border border-gray-300 px-4 py-2"
          />
          <button
            type="submit"
            className="rounded-md bg-black px-6 py-2 text-white hover:bg-gray-800"
          >
            Join Now
          </button>
        </form>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="w-full rounded-lg bg-white p-4 shadow-md sm:w-1/3"
          >
            <Image
              width={300}
              height={200}
              src={`https://via.placeholder.com/300x200?text=Image+${index}`}
              alt={`Content ${index}`}
              className="h-auto w-full rounded-t-lg"
            />
            <h3 className="mt-4 text-lg font-semibold">
              How to write content about your photographs
            </h3>
            <p className="mt-2 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit quis
              auctor odio arcu et dolor.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              <span>Growth • 7 Mins Read</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunitySection;
