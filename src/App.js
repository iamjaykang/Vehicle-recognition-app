import "./App.css";
import storage from "./data/FirebaseConfig";
import database from "./data/FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { initializeAnalytics } from "firebase/analytics";
import CarContent from "./components/CarContent/CarContent";
import Header from "./components/Header/Header";

function App() {
  // State to store uploaded file
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [carArray, setCarArray] = useState([]);

  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = (e) => {
    if (!file) {
      alert("Please upload an image first!");
    } else {
      console.log(file);
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImageUrl(url);
        });
      }
    );
  };

  const imageData = file;

  const azureComputerVisionApi = async () => {
    const response = await axios.post(
      `https://${process.env.REACT_APP_MRCV_ENDPOINT}/customvision/v3.0/Prediction/3ab52789-a398-4798-b51d-c07080a507d9/detect/iterations/Iteration8/image`,
      imageData,
      {
        headers: {
          "Content-Type": "application/json",
          "Prediction-Key": process.env.REACT_APP_MRCV_PREDICTION_KEY,
        },
      }
    );
    if (response) {
      setCarArray(response.data.predictions);
    }
  };

  useEffect(() => {
    if (imageData) {
      azureComputerVisionApi();
    }
  }, [imageData]);

  return (
    <div className="App">
      <Header />
      <div className="files">
        <input type="file" onChange={handleChange} accept="/image/*" />
      </div>
      <button onClick={handleUpload} className="btn">
        Upload
      </button>
      <div className="progress-container">
        <progress id="file" max="100" value={percent}></progress>
        <p>{percent}%</p>
      </div>
      <div className="image-display">
        {imageUrl && (
          <div className="image_card">
            <img className="car-image" src={imageUrl && imageUrl}></img>
            <div className="car_description">
              {imageUrl && <CarContent carArray={carArray} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
