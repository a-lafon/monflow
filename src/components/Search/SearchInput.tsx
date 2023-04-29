import { FC, useEffect, useState } from "react";
import { FaSearch } from 'react-icons/fa';
import { AiOutlineClose } from "react-icons/ai";

const searchTimeOutTimer = 600;

interface ISearchInput {
  onChange: Function;
  isLoading: boolean;
  isReset: boolean;
  placeholder: string;
}

const SearchInput: FC<ISearchInput> = ({ onChange, isLoading, placeholder, isReset }) => {
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState<any>();

  useEffect(() => {
    if (isReset) {
      setValue('');
    }
  }, [isReset])

  useEffect(() => {
    onValueChange(value);
  }, [value])

  const onValueChange = (value: string) => {
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      return onChange(value)
    }, searchTimeOutTimer));
  };

  return (
    <div className={`control has-icons-left has-icons-right ${isLoading ? 'is-loading' : ''}`}>
      <input
        className={`text-input input`}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
      <span className="icon is-left">
        <FaSearch />
      </span>
      {
        !isLoading && value.length >= 1 &&
        <span className="icon is-right is-clickable pointer-auto" onClick={() => setValue('')}>
          <AiOutlineClose />
        </span>
      }
    </div>
  )
}

export default SearchInput;