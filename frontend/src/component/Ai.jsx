import React, { useContext, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"
function Ai() {
  let {showSearch, setShowSearch, setSearch} = useContext(shopDataContext)
  let navigate = useNavigate()
  let [activeAi,setActiveAi] = useState(false)
  let openingSound = new Audio(open)

 function speak(message){
let utterence=new SpeechSynthesisUtterance(message)
window.speechSynthesis.speak(utterence)
  }

  const speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new speechRecognition()
   if(!recognition){
    console.log("not supported")
  }

  recognition.onresult = (e)=>{
    // Convert to lowercase and strip all punctuation (periods, commas, question marks, exclamation points)
    let rawTranscript = e.results[0][0].transcript.toLowerCase();
    const transcript = rawTranscript.replace(/[.,!?]/g, '').trim();
    
    console.log("Voice Assistant heard:", transcript);

    if(transcript.includes("search") && transcript.includes("open") && !showSearch){
      speak("opening search")
      setShowSearch(true) 
      navigate("/collection")
    }
    else if(transcript.includes("search") && transcript.includes("close") && showSearch){
      speak("closing search")
      setShowSearch(false) 
    }
    else if(transcript.includes("collection") || transcript.includes("product") || transcript.includes("shop")){
      speak("opening collection page")
      setSearch("")
      setShowSearch(false) 
      navigate("/collection")
    }
    else if(transcript.includes("about") || transcript.includes("who are you")){
      speak("opening about page")
      navigate("/about")
      setShowSearch(false) 
    }
    else if(transcript.includes("home") || transcript.includes("main page")){
      speak("opening home page")
      navigate("/")
      setShowSearch(false) 
    }
    else if(transcript.includes("cart") || transcript.includes("bag") || transcript.includes("basket")){
      speak("opening your cart")
      navigate("/cart")
      setShowSearch(false) 
    }
    else if(transcript.includes("contact") || transcript.includes("help") || transcript.includes("support")){
      speak("opening contact page")
      navigate("/contact")
      setShowSearch(false) 
    }
    else if(transcript.includes("order") || transcript.includes("purchase")){
      speak("opening your orders page")
      navigate("/order")
      setShowSearch(false) 
    }
    else {
      // Handle suggestions, recommendations, or direct product searches
      let searchTerms = transcript
        .replace(/\bsuggest\b/g, '')
        .replace(/\brecommend\b/g, '')
        .replace(/\bclothes\b/g, '')
        .replace(/\bcloth\b/g, '')
        .replace(/\bplease\b/g, '')
        .replace(/\bshow\b/g, '')
        .replace(/\bme\b/g, '')
        .replace(/\bsome\b/g, '')
        .replace(/\bfor\b/g, '')
        .replace(/\bcan you\b/g, '')
        .replace(/\blooking\b/g, '')
        .replace(/\bfind\b/g, '')
        .trim();

      // Normalize extra spaces that might have been left behind
      searchTerms = searchTerms.replace(/\s+/g, ' ');

      if (searchTerms) {
          speak(`Searching for ${searchTerms}`)
          setSearch(searchTerms)
          setShowSearch(true)
          navigate("/collection")
      } else {
          speak("Sure, taking you to our top recommendations")
          setSearch("")
          setShowSearch(false)
          navigate("/collection")
      }
    }
  }
  recognition.onend=()=>{
   setActiveAi(false)
  }
  return (
    <div className='fixed lg:bottom-[40px] md:bottom-[60px] bottom-[80px] right-[5%] z-50' onClick={()=>{recognition.start();
    openingSound.play()
    setActiveAi(true)
    }}>
      <img src={ai} alt="" className={`w-[100px] cursor-pointer ${activeAi ? 'translate-x-[10%] translate-y-[-10%] scale-125 ' : 'translate-x-[0] translate-y-[0] scale-100'} transition-transform` } style={{
        filter: ` ${activeAi?"drop-shadow(0px 0px 30px #00d2fc)":"drop-shadow(0px 0px 20px black)"}`
      }}/>
    </div>
  )
}

export default Ai
