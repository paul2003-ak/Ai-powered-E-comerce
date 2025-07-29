import React, { useContext, useState } from 'react';
import logo from '../assets/77970B44-EBD9-4723-9479-C9BA93B7864F.png';
import { shopcontext } from '../context/Shopdatacontext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import open from '../assets/ai_open_chime.mp3'

const Ai = () => {
    const [activeai, setActiveai] = useState(false)
    const { showsearch, setShowsearch } = useContext(shopcontext)
    const navigate = useNavigate();
    const opensound = new Audio(open);

    function speak(meaasage) {
        let utterence = new SpeechSynthesisUtterance(meaasage);
        window.speechSynthesis.speak(utterence);
    }

    const speechRecongnition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecongnition();
    if (!recognition) {
        console.log("not supported");
    }

    recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript.trim();
        if (transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("open") && !showsearch) {
            speak("Opening search bar");
            setShowsearch(true);
            navigate("/collection")
        }
        else if (transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("close") && showsearch) {
            speak("Closing search bar");
            setShowsearch(false);
        }
        else if (transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("collections") || transcript.toLowerCase().includes("product") || transcript.toLowerCase().includes("products")) {
            speak("Opening collections");
            setShowsearch(false);
            navigate("/collection")
        }
        else if (transcript.toLowerCase().includes("about") || transcript.toLowerCase().includes("aboutpage")) {
            speak("Opening about page");
            setShowsearch(false);
            navigate("/about")
        }
        else if (transcript.toLowerCase().includes("home") || transcript.toLowerCase().includes("homepage")) {
            speak("Opening home page");
            setShowsearch(false);
            navigate("/")
        }
        else if (transcript.toLowerCase().includes("cart") || transcript.toLowerCase().includes("kaat") || transcript.toLowerCase().includes("caat")) {
            speak("Opening cart page");
            setShowsearch(false);
            navigate("/cart")
        }
        else if (transcript.toLowerCase().includes("order") || transcript.toLowerCase().includes("orders")) {
            speak("Opening order page");
            setShowsearch(false);
            navigate("/order")
        }
        else if (transcript.toLowerCase().includes("profile") || transcript.toLowerCase().includes("user")) {
            speak("Opening profile page");
            setShowsearch(false);
            navigate("/profile")
        }
        else if (transcript.toLowerCase().includes("contact") || transcript.toLowerCase().includes("contactus")) {
            speak("Opening contact us page");
            setShowsearch(false);
            navigate("/contact")
        }
        else {
            toast.error("Try Again")
            speak("Sorry, I didn't understand that command.");
        }

    }

    recognition.onend = () => {
        setActiveai(false);
    }

    return (
        <div
            onClick={() => {
                recognition.start(),
                    opensound.play(),
                    setActiveai(true);
            }}
            className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]'
        >
            <img
                src={logo}
                alt=""
                className={`w-[100px] cursor-pointer ${activeai ? 'translate-x-[10%] translate-y-[-10%] scale-125' : 'translate-x-[0] translate-y-[0] scale-100'} transition-transform`}
                style={{
                    filter: `${activeai ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 20px black)"}`
                }}
            />
        </div>
    );
};

export default Ai;