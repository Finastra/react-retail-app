import { useState, useEffect } from 'react';
import { useSwipeable } from "react-swipeable";
import './carousel-component.scss';
import '@finastra/icon-button'; 

const Carousel = (props) => {
    const {children, show, loading} = props

    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)

    let [disabledRight, setDisabledRight] = useState(null);
    let [disabledLeft, setDisabledLeft] = useState(true);

    const next = () => {
        if (currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }
    
    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (currentIndex < (length - 1)) {
                setCurrentIndex(prevState => prevState + 1)
            }
        },
        onSwipedRight: () => {
            if (currentIndex > 0) {
                setCurrentIndex(prevState => prevState - 1)
             }
            }     
        })

    useEffect(() => {
        setLength(children.length);
        if (currentIndex > 0){
            setDisabledLeft(null);
        }
        else {
            setDisabledLeft(true);
        }
        if (currentIndex > length-show-1){
            setDisabledRight(true);
        }
        else{
            setDisabledRight(null);
        }
    }, [children, currentIndex])

    return (
        <div {...handlers} className="carousel-container">
            <div className="carousel-buttons dark-theme">
                { <fds-icon-button className={`left-arrow ${loading && "loading"} ${disabledLeft && "dark-theme"}`} onClick={prev} icon="chevron_left" disabled={disabledLeft}></fds-icon-button> }   
                { <fds-icon-button className={`right-arrow ${loading && "loading"} ${disabledRight && "dark-theme"}`} onClick={next} icon="chevron_right" disabled={disabledRight}></fds-icon-button> }
            </div>
            <div className="carousel-wrapper"> 
                <div className="carousel-content-wrapper">
                    <div className="carousel-content" style={{ transform: `translateX(-${currentIndex*290}px)` }}>
                        {children}
                    </div>
                </div>
            
        </div>  
    </div>
    )
}

export default Carousel