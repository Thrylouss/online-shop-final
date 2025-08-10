import React, { useState } from 'react';
import '../../scss/citydrop.scss'
import galka from  '../../img/galka.svg'

const Dropbox = ({ array, selected, curr }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(array[0]);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleSelect = (option) => {
        setSelectedOption(option);
        selected()
        setIsOpen(false);
        selected(option)
    };

    return (
        <div className="citydrop">

            <div onClick={() => { toggleDropdown() }} className="citydrop-button">
                {selectedOption}
            </div>

            {isOpen ? (

                <div className="citydrop-list">
                    {array.map((e, i) => (
                        <div key={i} onClick={() => { handleSelect(e) }} className="citydrop-list__element">
                            {e} 
                            {e == curr ? (<img src={galka}></img>) : ('')}
                        </div> 
                    ))}
                </div>
            ) : (
                ''
            )}

        </div>
    );
};

export default Dropbox;
