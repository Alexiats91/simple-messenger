import React, {useEffect, useRef} from 'react';
import SendField from "../SendField/SendField";
import styles from "./styles.module.css";
import UserIcon from "../UserIcon/UserIcon";

const CurrentMessagesList = ({messages, addMessage, currentUser, answer}) => {
    const scrollRef = useRef(null);
    const messagesList = messages.map(m =>
        <div key={m.id} className={m.own ? styles.ownMessageContainer : styles.messageContainer}>
            <div className={m.own ? styles.ownMessage : styles.message}>{m.message}</div>
            <div className={m.own ? styles.ownMessageDate : styles.messageDate} >{new Date(m.publish).toLocaleString('en')}</div>
        </div>
    );
    useEffect(() => {           //scroll messages list to last message
        scrollRef.current.scrollIntoView({behavior: "smooth"});
    }, [addMessage])
    return (
        <div className={styles.currentMessagesList}>
            <div className={styles.currentUser}>
                <UserIcon currentUser={currentUser}/>
                <h2 className={styles.currentUserName}>{currentUser.nickname}</h2>
            </div>
            <div className={styles.messagesList}>
                {messagesList}
                <div ref={scrollRef}/>
            </div>
            <SendField answer={answer} addMessage={addMessage}/>
        </div>
    );
};

export default CurrentMessagesList;