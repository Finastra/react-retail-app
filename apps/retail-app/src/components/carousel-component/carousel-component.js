import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useEffect } from 'react';
import { useSwipeable } from "react-swipeable";
import './carousel-component.scss' 

const Carousel = (props) => {
    const {children, show, loading} = props

    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)

    const next = () => {
        if (currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + show)
        }
    }
    
    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - show)
        }
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (currentIndex < (length - show)) {
                setCurrentIndex(prevState => prevState + show)
            }
        },
        onSwipedRight: () => {
            if (currentIndex > 0) {
                setCurrentIndex(prevState => prevState - show)
             }
            }     
        })

    useEffect(() => {
        setLength(children.length);
    }, [children])

    return (
        <div {...handlers} className="carousel-container">
            <div className="carousel-buttons">
            {   <IconButton onClick={next} className={`right-arrow ${loading && "loading"}`}>
                    <ArrowForwardIosIcon className="button-icon"/>
                </IconButton> }   
        {  <IconButton onClick={prev} className={`left-arrow ${loading && "loading"}`}>
                    <ArrowBackIosIcon className="button-icon"/>
                </IconButton> }
                </div>
            <div className="carousel-wrapper"> 
                <div className="carousel-content-wrapper">
                    <div className={`carousel-content show-${show}`} style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}>
                        {children}
                    </div>
                </div>
            
        </div>  
    </div>
    )
}

export default Carousel