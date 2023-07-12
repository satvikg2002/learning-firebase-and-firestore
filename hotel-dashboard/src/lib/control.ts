import { addDoc, collection, deleteDoc, doc, getFirestore, setDoc } from 'firebase/firestore'

// treeshaking from firebase
import { app } from './firebase'
import { AddHotelType } from '../types/hotel';
import { NavigateFunction } from 'react-router-dom';

export const firestore = getFirestore(app);

// HOTELS COLLECTION
export const hotelsCollection = collection(firestore, 'hotels')

// Add a new Hotel to firestore
export const addHotel = async (hotelData: AddHotelType) => {
    const newHotel = await addDoc(hotelsCollection, { ...hotelData })
    console.log(`New hotel was created at ${newHotel.path}`)
}

export const deleteHotel = async (id: string | undefined, navigate: NavigateFunction) => {
    const document = doc(firestore, `hotels/${id}`)
    await deleteDoc(document)
    console.log("Hotel has been deleted")
    navigate("/")
}

export const updateHotel = async (id: string | undefined, docData: any) => {
    const getHotel = doc(firestore, `hotels/${id}`)
    await setDoc(getHotel, docData, { merge: true })
    console.log("New Description has been updated")
}