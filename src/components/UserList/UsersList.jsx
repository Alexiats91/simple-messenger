import React from 'react';
import styles from "./styles.module.css";
import User from "../User/User";

const UsersList = ({currentUser, messages, users, chooseUser, searchValue}) => {
    const filteredSortedUsers = users
        .sort((a, b) => a.publish > b.publish ? -1 : a.publish < b.publish ? 1 : 0)
        .filter(u => u.nickname.toLowerCase().includes(searchValue.toLowerCase()));

    const usersList = filteredSortedUsers.map(u => {
        const lastMessage = messages[u.id][messages[u.id].length - 1].message;
        const lastMessageDate = new Date(messages[u.id][messages[u.id].length - 1].publish)
            .toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
        return (
            <User key={u.id} currentUser={currentUser} user={u} chooseUser={chooseUser} lastMessage={lastMessage}
                  lastMessageDate={lastMessageDate}/>
        )
    })
    return (
        <>
            <h2 className={styles.chatsTitle} >Chats</h2>
            <div className={styles.usersList} >
                {usersList}
            </div>
        </>
    );
};

export default UsersList;