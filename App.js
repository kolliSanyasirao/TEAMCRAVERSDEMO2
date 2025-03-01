import React, { useState } from 'react';
import './App.css';
import axios from 'axios'; // Import Axios for API requests

function App() {
  const [text, setText] = useState('');
  const [signImages, setSignImages] = useState([]);
  const [isRecognizing, setIsRecognizing] = useState(false);

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.continuous = true;

  const signImageDictionary = {
    hello: '/hello.png',
    thank: '/thank.png',
    'allu arjun': '/bunny.png',
    save: '/save.png',
    a: '/a.png',
    b: '/b.png',
    c: '/c.png',
    d: '/d.png',
    e: '/e.png',
    f: '/f.png',
    g: '/g.png',
    h: '/h.png',
    i: '/i.png',
    j: '/j.png',
    k: '/k.png',
    l: '/l.png',
    m: '/m.png',
    n: '/n.png',
    o: '/o.png',
    p: '/p.png',
    q: '/q.png',
    r: '/r.png',
    s: '/s.png',
    t: '/t.png',
    u: '/u.png',
    v: '/v.png',
    w: '/w.png',
    x: '/x.png',
    y: '/y.png',
    z: '/z.png'
  };

  const handleVoiceRecognition = () => {
    if (isRecognizing) return;
    setIsRecognizing(true);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognition.onend = () => {
      setIsRecognizing(false);
      console.log('Voice recognition ended.');
    };

    recognition.onerror = (event) => {
      console.error('Voice recognition error:', event.error);
      setIsRecognizing(false);
    };
  };

  const handleSignLanguage = () => {
    const lowerCaseText = text.toLowerCase().trim();

    // Initialize an empty array to store the sign language images
    let signImagesArray = [];

    // Loop through each character in the text
    for (let char of lowerCaseText) {
      // Check if the character is in the signImageDictionary
      if (signImageDictionary[char]) {
        signImagesArray.push(signImageDictionary[char]);  // Add the image to the array
      } else {
        signImagesArray.push(null);  // Push null if no image found for the character
      }
    }

    // Set the sign images array in the state
    setSignImages(signImagesArray);
  };

  const handleKeyboardClick = (key) => {
    setText((prevText) => prevText + key); // Add clicked key to the text
  };

  const handleDelete = () => {
    setText((prevText) => prevText.slice(0, -1)); // Delete last character
  };

  return (
    <div className="App">
      <h1>AI Communication</h1>
      <button onClick={handleVoiceRecognition} className="button" disabled={isRecognizing}>
        {isRecognizing ? 'Recognizing...' : 'Start Voice Recognition'}
      </button>
      <button onClick={handleSignLanguage} className="button">
        Convert Text to Sign
      </button>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="textarea"
        placeholder="Type or Speak to Communicate..."
      />

      {/* Render the sign language images */}
      {signImages.length > 0 && (
        <div className="sign-images">
          {signImages.map((img, index) => (
            img ? (
              <img
                key={index}
                src={img}
                alt={`Sign Language for character ${text[index]}`}
                className="sign-image"
              />
            ) : (
              <span key={index}>?</span> // If no image, display a question mark
            )
          ))}
        </div>
      )}

      {/* On-Screen Keyboard */}
      <div className="keyboard">
        {renderKeyboard(handleKeyboardClick)}
        <button onClick={handleDelete} className="button">Delete</button>
      </div>
    </div>
  );
}

// Function to render the keyboard
const renderKeyboard = (handleClick) => {
  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    [' ', '.', ',', '?', '!', '@', '#', '(', ')']
  ];

  return (
    <div>
      {keyboardLayout.map((row, index) => (
        <div key={index} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className="keyboard-button"
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
