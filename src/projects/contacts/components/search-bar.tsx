const SearchBar = ({
  contactsLength,
  onSearchBarChange,
}: {
  contactsLength: number;
  onSearchBarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className="my-4 w-full rounded-2xl bg-gray-100 px-3 py-1 text-sm text-gray-900"
      type="search"
      onChange={onSearchBarChange}
      placeholder={`Search through all ${contactsLength} contacts`}
    />
  );
};

export default SearchBar;