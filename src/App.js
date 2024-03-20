import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [states, setStates] = useState(false);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [cities, setCities] = useState(false);
  const [con, setCon] = useState("");
  const [sat, setSat] = useState("");
  const [cit, setCit] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respons = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );
        if (!respons.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await respons.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = async (e) => {
    setStates(true);
    setCon(e.target.value);
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${e.target.value}/states`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch states");
      }
      const jsonData = await response.json();
      setData1(jsonData);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleSelectState = async (e) => {
    setCities(true);
    setSat(e.target.value);
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${con}/state=${e.target.value}/cities`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const jsonData = await response.json();
      setData2(jsonData);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const showDataNow = (e) => {
    setCit(e.target.value);
  };

  return (
    <div className="App">
      <h1>Search Location</h1>
      <div>
        <select disabled={false} onChange={handleSelectChange}>
          <option value="">Select Country</option>
          {data.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>
        <select disabled={!states} onChange={handleSelectState}>
          <option value="">Select State</option>
          {data1.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>
        <select disabled={!cities} onChange={showDataNow}>
          <option value="">Select City</option>
          {data2.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>
      </div>
      {cit && (
        <div>
          You selected {con}, {sat}, {cit}
        </div>
      )}
    </div>
  );
}

