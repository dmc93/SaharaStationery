import '../CSS/CustomAlert.css';

const CustomAlert = ({ message, onClose }) => {
    return (
        <div className="custom-alert">
            <p>{message}</p>
            <button
                onClick={onClose}
                type ="button"
                className="custom-alert-button"
                    >
                    Close</button>
        </div>
    );
};

export default CustomAlert;
