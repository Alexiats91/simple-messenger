import React from 'react';
import styles from "./styles.module.css";

const SearchUser = ({setSearchValue}) => {
    return (
        <div className={styles.searchUser} >
            <input
                className={styles.searchInput}
                type="text"
                placeholder="Search..."
                onChange={e => { setSearchValue(e.target.value)}}
            />
        </div>
    );
};

export default SearchUser;