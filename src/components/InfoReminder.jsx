import { useContext } from "react";
import { ThemeContext } from "CONTEXT/theme-context";
import Image from "COMPONENTS/Image";
import InfoIcon from "ASSETS/images/actions/reminder-info.svg";
import { REMINDER_STYLE } from "containers/constants";

const InfoReminder = ({
  infoTextMain,
  infoTextBottom
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="reminder mt-0" style={{ width: '100%' }}>
      <div
        className="d-flex flex-direction-row align-items-center gap-2 reminder__info--1 mt-0 mb-1"
        style={
          theme === "theme-light"
            ? REMINDER_STYLE.LIGHT.BOX_1.BORDER
            : REMINDER_STYLE.DARK.BOX_1.BORDER
        }
      >
        <Image
          light={InfoIcon}
          dark={InfoIcon}
          alt="Information"
          w="18"
          h="17"
          classes="reminder__header__icon"
        />
        <p
          className="font-size-14 mb-0 line-height-4"
          style={
            theme === "theme-light"
              ? { color: '#000' }
              : { color : '#FFF' }
          }
        >
            {infoTextMain}
            <br/>
            {infoTextBottom}
        </p>
      </div> 
    </div>
  );
};

export default InfoReminder;