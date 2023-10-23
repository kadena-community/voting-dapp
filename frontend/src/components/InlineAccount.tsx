import {useState} from "react";
import {Modal} from "./Modal.tsx";
import {Button} from "./Button.tsx";

type ModalProps = {
    value?: string;
    onChange: (value: string) => void;
    onClose: () => void;
}
const AccountModal = ({value: defaultValue = '', onChange, onClose}: ModalProps) => {
    const [value, setValue] = useState(defaultValue);

    return <Modal title="Provide your k:account" onClose={onClose}>
        <div className="md:flex md:w-[500px]">
            <input
                onChange={({target: {value}}) => setValue(value)}
                value={value}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <Button className="md:ml-4 mt-2 md:mt-0 w-full md:w-auto" onClick={() => onChange(value)}>Save</Button>
        </div>
    </Modal>
}

type Props = Readonly<{
    account: string,
    onChange: (value: string) => void,
    voted?: boolean
}>
export const InlineAccount = ({account, onChange, voted = false}: Props) => {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleSaveClick = (value: string) => {
        setShowModal(false);
        onChange(value);
    };

    if (account) {
        return <>
            <div className="mt-4 md:mt-0">
                <p className="md:leading-8 font-extrabold">{account} <button type="button" onClick={openModal} className="bg-none ml-2 leading-none text-2xl text-pink-500">⚙</button></p>
                <p className="md:leading-8 font-light text-gray-700">{voted ? 'Please cast your vote below!' : 'Thanks for voting!'}</p>
            </div>

            {showModal && <AccountModal onClose={closeModal} onChange={handleSaveClick} value={account} />}
        </>
    }

    return <>
        <button
            type="button"
            className="bg-pink-500 text-white rounded-full px-8 py-2 font-bold"
            onClick={openModal}
        >
            Set Account
        </button>
        {showModal && <AccountModal onClose={closeModal} onChange={handleSaveClick}/>}
    </>
}
