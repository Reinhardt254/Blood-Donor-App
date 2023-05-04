import { collection, query, addDoc, orderBy, onSnapshot, getDocs, doc, updateDoc, setDoc, getDoc, where } from 'firebase/firestore';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { GiftedChat } from 'react-native-gifted-chat'
import { useEffect } from 'react';

const Chat = ({route}) => {
  const {data} = route.params
  const [messages, setMessages] = useState([]);
  const userm = auth.currentUser;

  //Add participants to firebase
  const addChat = async (participants) => {
    const chatRef = collection(db, 'chats');
    const chatData = {
      participants,
      createdAt: new Date(),
    };
    const docRef = await addDoc(chatRef, chatData);
    return docRef.id;
  };

  // Get the unique chat ID
  const getChatId = async (participants) => {
    const chatRef = collection(db, 'chats');
    const q = query(chatRef, where('participants', '==', participants));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    } else {
      const chatDoc = querySnapshot.docs[0];
      return chatDoc.id;
    };  
  };

  // Listen for new messages in the chat
// Listen for new messages in the chat
useEffect(() => {
  const participants = [userm.uid, data.uid];
  (async () => {
    const chatId = await getChatId(participants) || await addChat(participants);
    const messagesRef = collection(db, `chats/${chatId}/messages`);
    const unsubscribe = onSnapshot(query(messagesRef, orderBy('createdAt', "desc")), snapshot => {
      const messages = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          _id: data._id,
          createdAt: data.createdAt.toDate(),
          text: data.text,
          user: {
            _id: data.user._id,
            name: data.user.name
          }
        };
      });
      setMessages(messages);
      console.log(messages)
    });
    return () => unsubscribe();
  })();

}, [data.uid, userm.uid]);


  // Post new messages to firebase
  const onSend = useCallback(async (newMessages = []) => {
    const {_id, createdAt, text, user} = newMessages[0];
    const newMessageData = {
      _id,
      createdAt,
      text,
      user,
    };
    const participants = [userm.uid, data.uid];
    const chatId = await getChatId(participants) || await addChat(participants);
    const messagesRef = collection(db, `chats/${chatId}/messages`);
    await addDoc(messagesRef, newMessageData);
  }, [addChat, data.uid, getChatId, userm.uid]);

  return (
    <GiftedChat 
      messages={messages}
      onSend={onSend}
      user={{ _id: userm.uid }}
    />
  )
}

export default Chat;














