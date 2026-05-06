import React, {useState} from 'react'

const SearchBar = ({onSearch}) => {
    const [term,setTerm] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSearch(term);
    }
    return (
        <div>SearchBar</div>
    )
}

export default SearchBar;