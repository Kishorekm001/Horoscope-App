import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import axios from "axios";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

import sun from "../../assets/sun_logo.PNG";
import aries from "../../assets/aries.png";
import taurus from "../../assets/taurus.png";
import gemini from "../../assets/gemini.png";
import cancer from "../../assets/cancer.png";
import leo from "../../assets/leo.png";
import virgo from "../../assets/virgo.png";
import libra from "../../assets/libra.png";
import scorpio from "../../assets/scorpio.png";
import sagittarius from "../../assets/sagittarius.png";
import capricorn from "../../assets/capricorn.png";
import aquarius from "../../assets/aquarius.png";
import pisces from "../../assets/pisces.png";

import aries_bg from "../../assets/aries_bg.JPG";
import aquarius_bg from "../../assets/aquarius_bg.JPG";
import taurus_bg from "../../assets/taurus_bg.jpg";
import gemini_bg from "../../assets/gemini_bg.JPG";
import cancer_bg from "../../assets/cancer_bg.JPG";
import virgo_bg from "../../assets/virgo_bg.jpg";
import leo_bg from "../../assets/leo_bg.JPG";
import libra_bg from "../../assets/libra_bg.JPG";
import scorpio_bg from "../../assets/scorpio_bg.JPG";
import sagittarius_bg from "../../assets/sagittarius_bg.JPG";
import capricorn_bg from "../../assets/capricorn_bg.JPG";
import pisces_bg from "../../assets/pisces_bg.JPG";

function Home() {
  const [input, setInput] = useState({});
  const [result, setResult] = useState([]);
  const [sign, setSign] = useState("");
  const [isSubmit, setIssubmit] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { name, email, date } = input;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 0.1,
  };

  const images = [
    {
      image: aries,
      value: "aries",
    },
    {
      image: taurus,
      value: "taurus",
    },
    {
      image: gemini,
      value: "gemini",
    },
    {
      image: cancer,
      value: "cancer",
    },
    {
      image: leo,
      value: "leo",
    },
    {
      image: virgo,
      value: "virgo",
    },
    {
      image: libra,
      value: "libra",
    },
    {
      image: scorpio,
      value: "scorpio",
    },
    {
      image: sagittarius,
      value: "sagittarius",
    },
    {
      image: capricorn,
      value: "capricorn",
    },
    {
      image: aquarius,
      value: "aquarius",
    },
    {
      image: pisces,
      value: "pisces",
    },
  ];

  const backgrounds = {
    aries: aries_bg,
    aquarius: aquarius_bg,
    taurus: taurus_bg,
    gemini: gemini_bg,
    cancer: cancer_bg,
    leo: leo_bg,
    virgo: virgo_bg,
    libra: libra_bg,
    scorpio: scorpio_bg,
    sagittarius: sagittarius_bg,
    capricorn: capricorn_bg,
    pisces: pisces_bg,
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const dataFetched = () => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("sign", sign);
    encodedParams.append("date", date);
    encodedParams.append("api_key", "2bb232c0b13c774965ef8558f0fbd615");
    encodedParams.append("timezone", "5.5");

    const options = {
      method: "POST",
      url: "https://daily-horoscope3.p.rapidapi.com/api/1.0/get_daily_horoscope.php",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Host": "daily-horoscope3.p.rapidapi.com",
        "X-RapidAPI-Key": "33e1b5087dmsh078ad0b0ddcb745p179f38jsna1b5e61535f6",
      },
      data: encodedParams,
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setResult(response.data);

        if (response.data.success === 1) {
          sessionStorage.setItem(
            "horoscopeData",
            JSON.stringify(response.data)
          );
          sessionStorage.setItem(
            "inputData",
            JSON.stringify({ ...input, sign })
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dataFetched();
    setIssubmit(true);
    setFormErrors(validate(email));
    setShowModal(true);
    if (email === "" || name === "") {
      setIssubmit(false);
      setShowModal(false);
    }
  };

  const validate = () => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email) {
      errors.email = "Email is required!";
    } else if (!regex.test(email)) {
      errors.email = "This is not a valid email format!";
    }
    return errors;
  };

  useEffect(() => {
    // dataFetched();
    const horoscopeData = JSON.parse(
      sessionStorage.getItem("horoscopeData") || "{}"
    );
    const inputData = JSON.parse(sessionStorage.getItem("inputData") || "{}");

    if (!inputData.name) {
      setInput({ name: "", email: "", date: "" });
      setSign("");
    } else {
      setInput(inputData);
      setSign(inputData?.sign || "");
    }
    setResult(horoscopeData);
    console.log(horoscopeData);
    setIssubmit(true);
  }, []);

  return (
    <div>
      <header className="header">
        <h2>HOROSCOPES</h2>
        <img className="sun_logo" src={sun} alt="Sun Logo" />
      </header>
      <div className="container">
        <div>
          {/* 
        <img src={images[0].image} alt="aries" /> */}

          {formErrors.email ? (
            <span style={{ color: "red" }}>{formErrors.email}</span>
          ) : (
            result.success === 0 && (
              <span style={{ color: "red" }}>{result.message}</span>
            )
          )}

          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <div className="input_div">
              <label htmlFor="name">Name : </label>
              <InputText
                value={name}
                type="text"
                name="name"
                onChange={handleChange}
                className="name"
                // placeholder="Name"
                required
              />
              <br />
              <label htmlFor="email">Email : </label>
              <InputText
                value={email}
                name="email"
                type="email"
                className="email"
                onChange={handleChange}
                id="email"
                // placeholder="Email"
              />

              <br />
              <label htmlFor="date">Date : </label>
              <InputText
                value={date}
                name="date"
                type="date"
                className="date"
                format="yyyy-mm-dd"
                onChange={handleChange}
                id="date"
                placeholder="Date"
              />
              <br />
            </div>

            <h4 className="select_sign">Select Your Sign</h4>

            <div className="signs">
              {images.map((item) => (
                <figure>
                  <img
                    className={`image2 ${sign === item.value ? "image" : ""}`}
                    src={item.image}
                    alt={item.value}
                    onClick={() => {
                      console.log(item.value);
                      setSign(item.value);
                      setIssubmit(false);
                    }}
                  />
                  <figcaption className="fig_cap">{item.value}</figcaption>
                </figure>
              ))}{" "}
            </div>

            <Button
              label="Submit"
              className="submit"
              aria-label="Submit"
              onClick={handleOpenModal}
            />
            <Button
              type="reset"
              className="reset"
              onClick={() => {
                sessionStorage.removeItem("horoscopeData");
                setResult({});
                setSign(null);
                sessionStorage.removeItem("inputData");
                // setInput({});
                setInput({ name: "", email: "", date: "" });
                setIssubmit(false);
                setFormErrors([]);
              }}
            >
              {" "}
              Reset
            </Button>
          </form>
        </div>

        {result.success === 1 && (
          <Modal
            open={showModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div
                style={{
                  backgroundImage:
                    "url(" + ` ${isSubmit && backgrounds[sign]}` + ")",
                  backgroundSize: "cover",
                  padding: "10px",
                  color: "white",
                }}
              >
                <CloseIcon
                  className="close_btn"
                  onClick={handleCloseModal}
                  sx={{ fontSize: 30, float: "right", color: "white" }}
                />

                <b>Name : </b>
                {name}
                <br />
                <b>Zodiac Sign : </b>
                {result.data.sign}
                <br />
                <b>Date : </b>
                {date}
                <br />
                <h4>Health : </h4>
                <p>{result.data.prediction.health}</p>
                <h4>Personal : </h4>
                <p>{result.data.prediction.personal}</p>
                <h4>Profession : </h4>
                <p>{result.data.prediction.profession}</p>
              </div>
            </Box>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Home;
