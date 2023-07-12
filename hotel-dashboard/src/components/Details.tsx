import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../lib/control";
import { doc, getDoc } from "firebase/firestore";
import Information from "./Information";

function Details() {
  const { id } = useParams();
  // fetch a single doc
  const getHotel = doc(firestore, `hotels/${id}`);

  const [isLoading, setIsLoading] = useState(false);
  const [hotel, setHotel] = useState({});

  useEffect(() => {
    const fetchHotelData = async () => {
      setIsLoading(true);
      const docSnap = await getDoc(getHotel);
      if (docSnap.exists()) {
        const newHotelObj = {
          id: docSnap.id,
          ...docSnap.data(),
        };
        setHotel(newHotelObj);
        setIsLoading(false);
      } else {
        // doc.data is undefined
        console.log("No such document");
      }
    };
    fetchHotelData();
  }, []);

  if (isLoading) return <div className="loading" />;
  return (
    <div className="hotel-details">
      {hotel && Object.keys(hotel).length ? (
        <Information hotel={hotel} detailsPage />
      ) : null}
    </div>
  );
}

export default Details;
function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
