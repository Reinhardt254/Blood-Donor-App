import { collection, query, addDoc, orderBy, onSnapshot, getDocs, doc, updateDoc, setDoc, getDoc, where } from 'firebase/firestore';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { GiftedChat } from 'react-native-gifted-chat'
import { useEffect } from 'react';
import { DataContext } from '../useContext/DataContext';
import { useContext } from 'react';

const Groups = () => {
  const [messages, setMessages] = useState([]);
  const userm = auth.currentUser;


    // Post new messages to firebase
  const onSend = useCallback(async (newMessages = []) => {
    const {_id, createdAt, text, user} = newMessages[0];
    const userm = auth.currentUser;
    const newMessageData = {
      _id,
      createdAt,
      text,
      user,
    };
    const messagesRef = collection(db, "GroupChat");
    await addDoc(messagesRef, newMessageData);
  }, []);

  useEffect(() => {
    const messagesRef = collection(db, "GroupChat");
    const unsubscribe = onSnapshot(
      query(messagesRef, orderBy("createdAt")),
      (snapshot) => {
        const messages = snapshot.docChanges().map((change) => {
          const data = change.doc.data();
          return {
            _id: data._id,
            createdAt: data.createdAt.toDate(),
            text: data.text,
            user: data.user,
          };
        });
        setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
      }
    );
    return () => unsubscribe();
  }, []);
 
  return (
      <GiftedChat 
      messages={messages}
      onSend={onSend}
      user={{ _id: userm.uid }}
    />
  )
}

export default Groups












