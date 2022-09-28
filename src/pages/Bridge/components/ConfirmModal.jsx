import Button from "COMPONENTS/Button";
import ButtonClose from "COMPONENTS/ButtonClose";
import Image from "COMPONENTS/Image";
import FORMTokenIcon from "ASSETS/images/tokens/form.svg";

const ConfirmModal = ({
  swapInAmount,
  onCancel,
  handleCrossChain,
  buttonDisabled,
  // showTransactionModal,
}) => {
  const handleFlow = async () => {
    // showTransactionModal();
    await handleCrossChain();
  };
  return (
    <div className="confirm-modal">
      <div className="confirm-modal__header">
        <p className="font-size-14 font-weight-700">Cross Chain Deposit</p>
        <div className="d-flex justify-content-end">
          <ButtonClose onClick={onCancel} />
        </div>
      </div>

      <div className="confirm-modal__summary justify-content-start pt-2 pb-2">
        <div className="confirm-modal__summary__icon">
          <div
            className="flex-center"
            style={{ background: "#070618", borderRadius: "50%" }}
          >
            <Image
              light={FORMTokenIcon}
              dark={FORMTokenIcon}
              alt="$FORM"
              w="30"
              h="30"
            />
          </div>
        </div>
        <p className="font-size-24 font-weight-700 ml-2">
          Swapping {swapInAmount} FORM
        </p>
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
          disabled={buttonDisabled}
          classes="pl-4 pr-4"
          onClick={handleFlow}
        />
      </div>
    </div>
  );
};

export default ConfirmModal;
