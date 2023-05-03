import './App.css';

import UsersList from "./components/UserList/UsersList";
import CurrentMessagesList from "./components/CurrentMessagesList/CurrentMessagesList";
import SearchUser from "./components/SearchUser/SearchUser";

import {useEffect, useState} from "react";
import axios from "axios";

import {initialMessages, users} from "./state";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const chooseUser = u => setCurrentUser(u);
    const [searchValue, setSearchValue] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [messages, setMessages] = useState(initialMessages);
    const [isTyping, setIsTyping] = useState(false);
    const addMessage = (newMessage) => {
        setMessages({...messages, ...messages[currentUser.id].push(newMessage)});
        setFilteredUsers(() =>
            filteredUsers.map(u => {
                if (u.id === currentUser.id) {
                    return {...u, publish: newMessage.publish};
                }
                return u;
            })
        )
        setIsTyping(true);
    };
    const getRandomNumber = () => (Math.floor(Math.random() * 6) + 3) * 1000;

    const answer =  () => {
        setTimeout(async () => {
            await axios
                .get("https://api.chucknorris.io/jokes/random")
                .then(res => {
                    const data = res.data;
                    const answerNorris = {id: Date.now(), own: false, publish: Date.now(), message: data.value};
                    addMessage(answerNorris);
                    setIsTyping(false);
                })
        }, getRandomNumber())
    }

    useEffect(() => {                 //load data from localeStorage
        const usersList = localStorage.getItem('usersList');
        const messagesList = localStorage.getItem('messagesList');
        setFilteredUsers(JSON.parse(usersList));
        setMessages(JSON.parse(messagesList));
    }, []);

    useEffect(() => {                //save data to localeStorage
        localStorage.setItem('usersList', JSON.stringify(filteredUsers));
        localStorage.setItem('messagesList', JSON.stringify(messages));
    });
    const clearSavedData = () => {          //reset data to initialState
        localStorage.setItem('usersList', JSON.stringify(users));
        localStorage.setItem('messagesList', JSON.stringify(initialMessages));
        window.location.reload();
    }
    return (
        <div className="container" >
            <div className="userList">
                <SearchUser setSearchValue={setSearchValue}/>
                {filteredUsers.length
                    ? <UsersList currentUser={currentUser} searchValue={searchValue} messages={messages}
                                 users={filteredUsers} chooseUser={chooseUser}/>
                    : <h2>No matches found</h2>
                }
            </div>
            <div className="messagesList">
                {currentUser
                    ? <CurrentMessagesList
                        currentUser={currentUser}
                        messages={messages[currentUser.id]}
                        addMessage={addMessage}
                        answer={answer}
                        isTyping={isTyping}
                    />
                    : <h2>Choose any chat.</h2>
                }
            </div>
            <button type="submit" className='deleteData' onClick={clearSavedData} >clear saved data</button>
        </div>
    );
}

export default App;
