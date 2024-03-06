import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from "../config/firebase-config";
import './Chat.css';

export default function Chat(props) {
    const {room} = props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // this is the reference to the messages table
    const messagesRef = collection(db, "messages");


    /**
     * This code gets the messages only from the correct room.
     */
    useEffect(() => {
        const queryMessages = query(
            messagesRef,
            where("room", '==', room),
            orderBy('createdAt'));
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages= [];
            snapshot.forEach(doc => {
                // I differenciate id with doc.id
                // I use it because this is how it works in firebase
                messages.push({...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });

        // to clean the use effect
        return () => unsubscribe();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newMessage === "") return;

        try {
            await addDoc(messagesRef, {
                text: newMessage,
                createdAt: serverTimestamp(),
                user: auth.currentUser.displayName,
                room: room
            });

            // to clear the textbox after you sent the message
            setNewMessage("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        /*<div className="chat-app">
            <div className="header">
                <h1>Welcome to: {room}</h1>
            </div>
            <div className="messages">
                {messages.map(message => 
                    <div className="message" key={message.id}>
                        <span className="user">{message.user}</span>
                         - {message.text}
                    </div>
                )}
            </div>
            <form className="new-message-form" onSubmit={handleSubmit}>
                <input
                    className="new-messaege-input"
                    placeholder="Type your message here..."
                    onChange={e => setNewMessage(e.target.value)}
                    value={newMessage} />
                <button
                    type="submit"
                    className="send-button">
                    Send
                </button>
            </form>
        </div>*/
        <div class="container">
            <div class="body justify-content-between">
                <div class=" box-2 d-flex flex-column h-100">
                    <div class="mt-5">
                        <p class="mb-1 h-1">Welcome to: {room}</p>
                        <div class="messages">
                            {messages.map(message => 
                                <p class="text-muted mb-2" key={message.id}>{message.user} <br /> <span class="ms-4 text">{message.text}</span></p>
                            )}
                        </div>
                    </div>
                    {/* <div class="mt-auto">
                        <p class="footer text-muted mb-0 mt-md-0 mt-4"><span class="me-1">Made with</span>
                            <span class="fab fa-github"></span>
                        </p>
                    </div> */}
                </div>
                <form class="w-100" onSubmit={handleSubmit}>
                    <div class="row mt-2 mb-2 ms-4 me-4">
                        <input
                            class="col"
                            placeholder="Type your message here..."
                            onChange={e => setNewMessage(e.target.value)}
                            value={newMessage} />
                        <button
                            class="col-auto btn"
                            type="submit">
                            Send
                        </button>
                    </div>
                </form>
                <span class="fas fa-times"></span>
            </div>
        </div>
    );
}