import { Label } from './Filter.styled';

export const Filter = ({ value, handleFilter }) => {
  return (
    <Label>
      Find contacts:
      <input
        type="text"
        name="filter"
        value={value}
        onChange={evt => {
          handleFilter(evt.target.value);
        }}
      />
    </Label>
  );
};
