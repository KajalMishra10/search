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
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        //setError(error.message);
      }
    };

    fetchData();
  }, []);
  const handleSelectChange = (e) => {
    setStates((prev) => {
      !prev;
    });
    setCon(e.target.value);
    const fetchData = async () => {
      try {
        const respons = await fetch(
          `https://crio-location-selector.onrender.com/country=${e.target.value}/states`
        );
        if (!respons.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await respons.json();
        console.log(jsonData);
        setData1(jsonData);
      } catch (error) {
        //setError(error.message);
      }
    };

    fetchData();
  };
  const handleSelectState = (e) => {
    setCities((prev) => {
      !prev;
    });
    setSat(e.target.value);
    const fetchData = async () => {
      try {
        const respons = await fetch(
          ` https://crio-location-selector.onrender.com/country=${con}/state=${e.target.value}/cities`
        );
        if (!respons.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await respons.json();
        console.log(jsonData);
        setData2(jsonData);
      } catch (error) {
        //setError(error.message);
      }
    };

    fetchData();
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
            <option value={ele}>{ele}</option>
          ))}
        </select>
        <select disabled={states} onChange={handleSelectState}>
          <option value="">Select State</option>
          {data1.map((ele) => (
            <option value={ele}>{ele}</option>
          ))}
        </select>
        <select disabled={cities} onChange={showDataNow}>
          <option value="">Select City</option>
          {data2.map((ele) => (
            <option value={ele}>{ele}</option>
          ))}
        </select>
      </div>
      {cit? (
        <div>
          You selected {con},{sat},{cit}
        </div>
      ):""}
    </div>
  );
}
