import { useContext } from "react";
import { ThemeContext } from "CONTEXT/theme-context";
import Image from "COMPONENTS/Image";
import InfoDarkIcon from "ASSETS/images/actions/dark/info.svg";
import InfoLightIcon from "ASSETS/images/actions/light/info.svg";
import { REMINDER_STYLE } from "./constants";
import { numberFormatter } from "utils/formatters";

const Reminder = ({
  swapFeeRate,
  minimumSwapAmount,
  maximumSwapAmount,
  minimumSwapFee,
  maxiumumSwapFee,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="reminder mt-4">
      <div className="reminder__header">
        <Image
          light={InfoLightIcon}
          dark={InfoDarkIcon}
          alt="Information"
          w="18"
          h="17"
          classes="reminder__header__icon"
        />
        <p className="ml-1 font-size-14">Reminder</p>
      </div>
      <div
        className="reminder__info--1"
        style={
          theme === "theme-light"
            ? REMINDER_STYLE.LIGHT.BOX_1.BORDER
            : REMINDER_STYLE.DARK.BOX_1.BORDER
        }
      >
        <p
          className="txt-center font-size-14 mb-2 line-height-4"
          style={
            theme === "theme-light"
              ? REMINDER_STYLE.LIGHT.BOX_1.TITLE
              : REMINDER_STYLE.DARK.BOX_1.TITLE
          }
        >
          Swap Fee is {numberFormatter.format(swapFeeRate * 100)}%. Minimum Swap
          fee is {numberFormatter.format(minimumSwapFee)} $FORM. Maximum Swap
          Fee is {numberFormatter.format(maxiumumSwapFee)} $FORM
        </p>
        <p className="txt-center font-size-14 line-height-4">
          Minium Swap Amount is {numberFormatter.format(minimumSwapAmount)}
          $FORM.
          <br />
          Maximum Swap Amount is {numberFormatter.format(
            maximumSwapAmount
          )}
          $FORM.
          <br />
          Estimated Time od deposit Arrival is 10-30 min.
        </p>
      </div>
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
            Keep in mind that withdrawing funds costs gas!
          </span>
          <br />
          <span
            style={
              theme === "theme-light"
                ? REMINDER_STYLE.LIGHT.BOX_2.TEXT
                : REMINDER_STYLE.DARK.BOX_2.TEXT
            }
          >
            Please contact{" "}
          </span>
          <a
            href="mailto:support@formation.fi"
            className="reminder__info--2__link"
            style={
              theme === "theme-light"
                ? REMINDER_STYLE.LIGHT.BOX_2.LINK
                : REMINDER_STYLE.DARK.BOX_2.LINK
            }
          >
            support@formation.fi
          </a>{" "}
          <span
            style={
              theme === "theme-light"
                ? REMINDER_STYLE.LIGHT.BOX_2.TEXT
                : REMINDER_STYLE.DARK.BOX_2.TEXT
            }
          >
            with any questions related to app.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Reminder;
