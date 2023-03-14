import React, { useState } from 'react';

function Translation() {
  const [inputText, setInputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translation, setTranslation] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = event => {
    setInputText(event.target.value);
  };

  const handleLanguageChange = event => {
    const newLanguage = event.target.value;
    setTargetLanguage(newLanguage);
    setTranslation('');
    setError('');
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    const encodedParams = new URLSearchParams();
    encodedParams.append("q", inputText);
    encodedParams.append("target", targetLanguage);
    encodedParams.append("source", "en");

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '680cc44ffdmsh75352209ad374b9p10e4a4jsn85fb9191ef58',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      body: encodedParams
    };

    try {
      const response = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options);
      const data = await response.json();

      if (response.ok && data.data && data.data.translations && data.data.translations.length > 0) {
        setTranslation(data.data.translations[0].translatedText);
        setError('');
      } else {
        setTranslation('');
        setError('Translation failed. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      setTranslation('');
      setError('An error occurred while translating. Please try again later.');
    }
  };

  return (
    <div>
      {/* <h4>Below you can translate English to:</h4> */}
      <p>{" "}</p>
      <form onSubmit={handleFormSubmit}>
        <label>
          Translate to:
          <select value={targetLanguage} onChange={handleLanguageChange}>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="zh-CN">Simplified Chinese</option>
            <option value="zh-TW">Traditional Chinese</option>
          </select>
        </label>
        <br />
        <p>{" "}</p>
        <label>
          Text to translate:
          <input type="text" value={inputText} onChange={handleInputChange} />
        </label>
        <br />
        <p>{" "}</p>
        <button type="submit">Translate</button>
        {/* <p>Entered text has {inputText.split(" ").length} words and {inputText.length} characters</p> */}
      </form>
      {error ? (
        <p>{error}</p>
      ) : translation ? (
        <p>{translation}</p>
      ) : (
        <p>Enter text and click "Translate" to see the translation.</p>
      )}
    </div>
  );
}

export default Translation;

