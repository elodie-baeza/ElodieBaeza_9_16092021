import React from 'react'
import './CardInfos.css'
import caloriesIcon from 'assets/calories-icon.png'
import glucidesIcon from 'assets/carbs-icon.png'
import lipidesIcon from 'assets/fat-icon.png'
import proteinIcon from 'assets/protein-icon.png'
import PropTypes from 'prop-types'

export default function CardInfos({type, unit, data}){
    return(
        <div className='counter'>
            {(() => {
                switch (type) {
                    case 'Calories':
                        return <img src={caloriesIcon} alt="icon" />;

                    case 'Proteines':
                        return <img src={proteinIcon} alt="icon" />;

                    case 'Glucides':
                        return <img src={glucidesIcon} alt="icon" />;

                    case 'Lipides':
                        return <img src={lipidesIcon} alt="icon" />;
                
                    default:
                        return null
                }
            })()}
            <p><span className='counterValue'>{data}{unit}</span><br />{type}</p>
        </div>
    )
}

CardInfos.propTypes = {

    data: PropTypes.number.isRequired

};