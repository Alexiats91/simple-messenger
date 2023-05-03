import React from 'react';
import styles from "./styles.module.css";
import UserIcon from "../UserIcon/UserIcon";

const User = ({currentUser, user, chooseUser, lastMessage, lastMessageDate}) => {
    return (
        <div className={(currentUser && user.id === currentUser.id) ? styles.user+" "+styles.active : styles.user} onClick={() => chooseUser(user)}>
            <div className={styles.userIcon} >
                <UserIcon currentUser={user}/>
            </div>
            <div className={styles.nameAndMessage}>
                <h3 className={styles.name}>{user.nickname}</h3>
                <div className={styles.lastMessage}>{lastMessage}</div>
            </div>
            <div className={styles.messageDate}>{lastMessageDate}</div>
        </div>
    );
};

export default User;