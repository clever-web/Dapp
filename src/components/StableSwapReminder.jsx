import { useContext } from "react";
import { ThemeContext } from "CONTEXT/theme-context";
import { REMINDER_STYLE } from "containers/constants";

const StableSwapReminder = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="reminder mt-4">
      <div
        className="reminder__info--2"
        style={
          theme === "theme-light"
            ? REMINDER_STYLE.LIGHT.BOX_2.BORDER
            : REMINDER_STYLE.DARK.BOX_2.BORDER
        }
      >
        <p className="txt-center font-size-14 line-height-4">
            <span
                style={
                    theme === "theme-light"
                        ? REMINDER_STYLE.LIGHT.BOX_2.TEXT
                        : REMINDER_STYLE.DARK.BOX_2.TEXT
                    }
            >
            Your swap address will be your receiving address. Please switch the network to check to check your balance after completion

            </span>
        </p>
        <p className="txt-center font-size-14 line-height-4">
            <span
                style={
                    theme === "theme-light"
                        ? REMINDER_STYLE.LIGHT.BOX_2.TEXT
                        : REMINDER_STYLE.DARK.BOX_2.TEXT
                    }
            >
            Estimated Time of Crosschain swap is (5-7 minutes).
            </span>
        </p>
        <p className="txt-center font-size-14 line-height-4">
            <span
                style={
                    theme === "theme-light"
                        ? REMINDER_STYLE.LIGHT.BOX_2.TEXT
                        : REMINDER_STYLE.DARK.BOX_2.TEXT
                    }
            >
            Crosschain swap in rare cases can take up to 12 hours.
            </span>
        </p>
      </div>
    </div>
  );
};

export default StableSwapReminder;
