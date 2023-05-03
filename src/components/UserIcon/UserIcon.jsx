import React from 'react';
import styles from "./styles.module.css";
import defaultAvatar from "./img/user_icon.png";

const UserIcon = ({currentUser}) => {
    return (
        <div className={styles.userIconContainer} >
            <img className={styles.userPhoto}
                 src={currentUser.photo !== '' ? currentUser.photo : defaultAvatar}
                 alt="userPhoto"
            />
            {currentUser.isOnline && <span className={styles.isOnline} />}
        </div>

    );
};

export default UserIcon;