import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { FaSearch } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

const searchTimeOutTimer = 500;

const SearchInput = () => {
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState<any>(null);

  // useEffect(() => {
  //   if (isReset) {
  //     resetSearch();
  //   }
  // }, [isReset])

  const onSearchChanged = async (value: string) => {
    console.log('onSearchChanged', value);
    const data = await axios.get(`/api/search?q=${value}`)
    console.log(data);

  }

  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      onSearchChanged(event.target.value);
    }, searchTimeOutTimer));
  };

  // const resetSearch = () => {
  //   setSearch('');
  //   onSearchChanged('');
  // }
  return (
    <div className={`control has-icons-left has-icons-right search}`}>
      <input
        className={`text-input input`}
        type="text"
        value={value}
        placeholder="Tapez votre recherche"
        onChange={onValueChange}
      />
      <span className="icon is-left">
        <FaSearch />
      </span>
      {
        value.length >= 1
          ? (
            <span className="icon is-right is-clickable pointer-auto" onClick={() => null}>
              <AiOutlineClose />
            </span>
          )
          : null
      }
    </div>
  )
}

export default SearchInput;