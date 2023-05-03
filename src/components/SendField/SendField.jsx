import React, {useState} from 'react';
import styles from "./styles.module.css";

const SendField = ({addMessage, answer}) => {
    const [newMessage, setNewMessage] = useState({} );
    const onMessageChange = (e) => {
        setNewMessage({id: Date.now(), own: true, publish: Date.now(), message: e.target.value});
    }
    const addNewMessage = () => {
        newMessage.message && addMessage(newMessage);
        setNewMessage({ ...newMessage, message: "" });
        answer();
    }
    return (
        <div className={styles.sendMessageField}>
            <textarea
                className={styles.textarea}
                value={newMessage.message}
                onChange={onMessageChange}
                placeholder="Type your message here..."
            />
            <button className={styles.button} onClick={addNewMessage} >SEND</button>
        </div>
    );
};

export default SendField;