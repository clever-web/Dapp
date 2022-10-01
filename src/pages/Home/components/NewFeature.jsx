import { useContext } from "react";
import { ThemeContext } from "CONTEXT/theme-context";
import { useMediaQuery } from "hooks/useMediaQuery";
import { useHistory } from "react-router-dom";
import Image from "COMPONENTS/Image";
import Button from "COMPONENTS/Button";
import Left from "ASSETS/images/pages/home/Left.png";
import Top from "ASSETS/images/pages/home/Top.png";
import CharacterImg from 'assets/images/pages/home/CHARACTER.svg';
import Right from "ASSETS/images/pages/home/Right.png";

const NewFeature = () => {
  const history = useHistory();
  const matchMedia = useMediaQuery("(min-width: 768px)");
  const matchMedia_1 = useMediaQuery("(min-width: 768px)");
  const matchMedia_2 = useMediaQuery("(min-width: 960px)");
  const matchMedia_3 = useMediaQuery("(min-width: 1075px)");

  const { theme } = useContext(ThemeContext);

  const handleClick = () => history.push("/stable-swap");

  const renderTextClasses = () =>
    `txt-marked ${
      theme === "theme-light"
        ? "txt-marked--dark c-white"
        : "txt-marked--green c-dark"
    }`;

  return (
    <div className="new-feature space-h--mobile">
      <div className="new-feature__box">
        <div className="new-feature__box__txt">
          <p className="font-weight-500 c-white txt-glow sub-title">
            usdt&#47;busd pool&nbsp;
          </p>
          <p className="font-size-18 font-weight-500 c-white txt-glow description">
            Add Liquidity, Earn Fees & COLLECT $FORM
          </p>
        </div>
        <Image
          light={matchMedia_2 ? Left : Left}
          dark={matchMedia_2 ? Left : Left}
          alt="Left"
          w="135"
          h="186"
          classes="new-feature__box__img new-feature__box__img__right"
        />
        <Image
          light={matchMedia_2 ? Right : Right}
          dark={matchMedia_2 ? Right : Right}
          alt="Right"
          w="135"
          h="186"
          classes="new-feature__box__img new-feature__box__img__left"
        />
        <Image
          light={matchMedia_2 ? CharacterImg : CharacterImg}
          dark={matchMedia_2 ? CharacterImg : CharacterImg}
          alt="Right"
          w="135"
          h="186"
          classes="new-feature__box__img new-feature__box__img__character"
        />
        <Image
          light={matchMedia_2 ? Top : Top}
          dark={matchMedia_2 ? Top : Top}
          alt="Right"
          w="135"
          h="186"
          classes="new-feature__box__img new-feature__box__img__top"
        />
        <Button
          type="button"
          text="Swap now"
          outlinedWhite
          glow
          classes="pl-7 pr-7 pt-2 pb-2 new-feature__box__btn"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default NewFeature;
