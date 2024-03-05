import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from "../config/firebase-config";

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
        <div className="chat-app">
            <div className="header">
                <h1>Welcome to: {room}</h1>
            </div>
            <div className="messages">
                {messages.map(message => 
                    <div className="message" key={message.id}>
                        <span className="user">{message.user}</span>
                        {message.text}
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
        </div>
    );
}