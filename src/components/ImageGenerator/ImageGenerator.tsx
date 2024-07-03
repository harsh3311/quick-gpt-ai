import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import { assets } from '../../assets/assets';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/image-generator");
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const imageGenerator = async () => {
        if (inputRef.current && inputRef.current.value === "") {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(
                "https://api.openai.com/v1/images/generations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                        "User-Agent": "Chrome",
                    },
                    body: JSON.stringify({
                        "model": "dall-e-2",
                        prompt: `${inputRef.current.value}`,
                        "n": 1,
                        "size": "256x256",
                    }),
                }
            );
            const data = await response.json();
            console.log(data);
            const data_array = data.data;
            setImage_url(data_array[0].url);
        } catch (error) {
            console.error("Error generating image:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='main'>
            <div className='nav'>
                <img src={assets.logo} className='logo' alt='Logo' />
                <a href='/'><p><span>Quick.</span>GPT</p></a>
                <img src={assets.user_icon} alt='User Icon' />
            </div>
            <div className='ai-image-generator'>
                <div className="header">AI Image <span>Generator</span></div>
                <div className="img-loading">
                    <div className="image">
                        <img src={image_url === "/image-generator" ? assets.default_image : image_url} alt="Generated" />
                    </div>
                    <div className="loading">
                        <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                    </div>
                </div>
                <div className="search-box-section">
                    <input type="text" ref={inputRef} className='search-input-section' placeholder="Generating AI content, this won't take long..." />
                    <div className="generate-btn" onClick={imageGenerator}>Generate</div>
                </div>
            </div>
        </div>
    );
}

export default ImageGenerator;
