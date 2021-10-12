import React from 'react'
import './CardInfos.css'
import caloriesIcon from 'assets/calories-icon.png'
import glucidesIcon from 'assets/carbs-icon.png'
import lipidesIcon from 'assets/fat-icon.png'
import proteinIcon from 'assets/protein-icon.png'
import PropTypes from 'prop-types'

/**
 * Create custom card with icon corresponding to type
 * 
 * @component
 */
function CardInfos({type, unit, value}){
    return(
        <div className='card'>
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
            <p><span className='cardValue'>{value}{unit}</span><br />{type}</p>
        </div>
    )
}

CardInfos.propTypes = {
    /**
     * Data type
     */
    type: PropTypes.oneOf(['Calories', 'Proteines', 'Glucides', 'Lipides']).isRequired,
    /**
     * Type unit
     */
    unit: PropTypes.string.isRequired,
    /**
     * Type quantity
     */
    value: PropTypes.string.isRequired,
}

export default CardInfos
