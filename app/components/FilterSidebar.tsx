'use client';

type FilterSidebarProps = {
  selectedColour: string;
  onColourChange: (colour: string) => void;
};

const colours = ['All colours', 'Black', 'Grey', 'Blue', 'Green', 'Pink'];

export default function FilterSidebar({
  selectedColour,
  onColourChange,
}: FilterSidebarProps) {
  return (
    <aside className="w-full lg:w-56 shrink-0">
      <h2 className="mb-5 text-lg font-semibold">Colour</h2>

      <div className="flex flex-col gap-4">
        {colours.map((colour) => {
          const selected = selectedColour === colour;

          return (
            <button
              key={colour}
              type="button"
              onClick={() => onColourChange(colour)}
              className={`text-left text-base ${
                selected
                  ? 'font-semibold underline'
                  : 'text-gray-700 hover:underline'
              }`}
            >
              {colour}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
