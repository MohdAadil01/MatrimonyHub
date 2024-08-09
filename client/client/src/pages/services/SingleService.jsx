import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleService = () => {
  const [service, setService] = useState({});
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);
  //   const { id } = useParams();
  // LATER USE THE ABOVE ID IN API
  const id = 1;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      if (!response.ok) {
        throw new Error("Error while fetching data");
      }
      const json = await response.json();
      setService(json);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h1>MAKE UI HERE ACCORDING TO THE DUMMY DATA</h1>
        </div>
      )}
    </div>
  );
};

export default SingleService;

// YOU CAN USE DUMMY DATA GIVEN BELOW
// const service = {
//     availability: "available",
//     createdAt: "2024-07-09T18:52:10.682Z",
//     description: "dummy",
//     images: [],
//     price: 123,
//     ratings: 0,
//     serviceType: "photography",
//     title: "dummy",
//     updatedAt: "2024-07-09T18:52:10.682Z",
//     vendor: "668c34ab0b8d80c9b293540e",
//     __v: 0,
//     _id: "668d86daa76331f7e57f62d8"
//   };
// REFER BACKEND FOR MORE AS vendor field will contain vendor data not the vendor id
