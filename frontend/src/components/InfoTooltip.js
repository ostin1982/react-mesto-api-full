import checkMark from '../images/check_mark.svg';
import cross from '../images/cross.svg';

const InfoTooltip = ({ isOpen, onClose, isInfoTooltipStatus }) => {
    return (
        <div className={`popup ${isOpen ? 'popup_is-open' : ' '}`} >
            <div className='popup__check'>
                <img className='popup__check-cross' src={isInfoTooltipStatus ? checkMark : cross} alt='Статус проведенной операции' />
                <h2 className='popup__check-about'>{isInfoTooltipStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
                <button className='popup__close' type='reset' onClick={onClose}></button>
            </div>
        </div>
    );
}

export default InfoTooltip;