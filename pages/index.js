import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log('Calling OpenAI...');
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log('OpenAI replied...', output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title> Bulk Writer | Henry</title>
      </Head>
      <div className="header">
  <img src="https://example.com/logo.png" alt="Logo" />
  <nav>
    <ul>
      <li><a href="#features">Features</a></li>
      <li><a href="#pricing">Pricing</a></li>
      <li><a href="#about">About Us</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</div>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>HW Bulk Writer</h1>
          </div>

          <div className="header-subtitle">
            <h2>Enter your article titles below</h2>
          </div>
        </div>

        <div className="prompt-container">
          <textarea
            placeholder="Start typing here"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />

          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </a>
          </div>

          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Generated Article</h3>
                </div>
              </div>

              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>

        <div className="badge-container grow">
          <a
            href="https://lnsafrica.com"
            target="_blank"
            rel="noreferrer"
          >
            <div className="badge">

              <p>Built by Henry Wambua</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
