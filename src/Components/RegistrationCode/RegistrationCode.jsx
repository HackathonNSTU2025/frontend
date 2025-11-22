import "./RegistrationCode.scss";
import { FiArrowLeft } from "react-icons/fi";

let RegistrationCode = ({ eventName, registrationCode, peopleRemaining }) => {
    return (
        <div className="RegistrationCode">
            <div className="container">
                <div className="RegistrationCode__inner">
                    <div className="RegistrationCode__header">
                        <div className="RegistrationCode__back">
                            <FiArrowLeft />
                        </div>
                        <div className="RegistrationCode__event-title">
                            {eventName}
                        </div>
                    </div>
                    <div className="RegistrationCode__content">
                        <div className="RegistrationCode__content__inner">
                            <div className="RegistrationCode__text">
                                Ваш талон:
                            </div>
                            <div className="RegistrationCode__num">
                                {registrationCode}
                            </div>
                            <div className="RegistrationCode__PeopleRemaining">
                                Перед вами: {peopleRemaining} человек
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RegistrationCode;
