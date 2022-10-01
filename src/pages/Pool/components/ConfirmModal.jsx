import Button from "COMPONENTS/Button";
import ButtonClose from "COMPONENTS/ButtonClose";
import Image from "COMPONENTS/Image";
import { TAB_NAMES, tokens } from "../constants";

const ConfirmModal = ({
  currentTab,
  selectedValue,
  inputValue,
  onCancel,
  handleAction,
  // showTransactionModal,
  approvalModal,
}) => {
  const handleFlow = async () => {
    // showTransactionModal();
    await handleAction();
  };

  const setIcon = (name) => tokens.find((item) => item.name === name)?.icon;

  const renderIcon = () =>
    currentTab === TAB_NAMES.STAKE
      ? setIcon(selectedValue.tokenFrom.name)
      : setIcon(selectedValue.tokenTo.name);

  return (
    <div className="confirm-modal">
      <div className="confirm-modal__header">
        {approvalModal ? (
          <>
            <p className="font-size-14 font-weight-700">Approval</p>
            <div className="d-flex justify-content-end">
              <ButtonClose onClick={onCancel} />
            </div>
          </>
        ) : (
          <>
            {" "}
            <p className="font-size-14 font-weight-700">You will receive</p>
            <div className="d-flex justify-content-end">
              <ButtonClose onClick={onCancel} />
            </div>
          </>
        )}
      </div>

      <div className="confirm-modal__summary justify-content-start pt-2 pb-2">
        {approvalModal ? null : (
          <>
            <div className="confirm-modal__summary__icon">
              <div
                className="flex-center"
                style={{ background: "#070618", borderRadius: "50%" }}
              >
                <Image
                  light={renderIcon()}
                  dark={renderIcon()}
                  alt={
                    currentTab === TAB_NAMES.STAKE
                      ? selectedValue.tokenFrom.name
                      : selectedValue.tokenTo.name
                  }
                  w="30"
                  h="30"
                />
              </div>
            </div>
            <p className="font-size-24 font-weight-700 ml-2">
              {currentTab === TAB_NAMES.STAKE
                ? inputValue.inputFrom.toFixed(6)
                : inputValue.inputTo.toFixed(6)}
              &nbsp;
              {currentTab === TAB_NAMES.STAKE
                ? selectedValue.tokenFrom.name
                : selectedValue.tokenTo.name}
            </p>
          </>
        )}
      </div>

      <div className="confirm-modal__info pt-1 pb-1">
        <p className="font-size-12 txt-center">
          Please click confirm button to sign the transaction.
        </p>
      </div>
      <div className="flex-center mt-3 mb-3">
        <Button
          type="button"
          text="Confirm"
          green
          classes="pl-4 pr-4"
          onClick={handleFlow}
        />
      </div>
    </div>
  );
};

export default ConfirmModal;
