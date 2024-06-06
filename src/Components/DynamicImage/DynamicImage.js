import React,{useState, useEffect} from "react";

const DynamicImage = ({ imageName }) => {
    const [imageSrc, setImageSrc] = useState(); 
     
    const importImage = async () => {
      try {
        const module = await import(`../../Assets/img/${imageName}.png`);
        setImageSrc(module.default);
      } catch (error) {
        console.error("Error loading image:", error.message);
      }
    };  
    useEffect(() => {
      importImage();
    }, [imageName]);

    return <img className="w-30px fil" src={imageSrc} alt={imageName} />;
  };

export default DynamicImage;