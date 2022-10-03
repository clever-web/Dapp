import { useState } from 'react';
import ButtonClose from 'COMPONENTS/ButtonClose';
import Input from 'COMPONENTS/Input';
import Image from 'COMPONENTS/Image';
import { tokens } from '../constants';

const SelectTokenModal = ({ destination, handleSelectToken, onCancel }) => {
	const [searchValue, setSearchValue] = useState('');

	const handleChange = (e) => setSearchValue(e.target.value);

	return (
		<div className='select-token-modal'>
			<div className='select-token-modal__header'>
				<p className='font-size-14 font-weight-700'>Select a token</p>
				<div className='d-flex justify-content-end'>
					<ButtonClose onClick={onCancel} />
				</div>
			</div>
			<div className='select-token-modal__search'>
				<Input
					type='search'
					name='select-token-input-search'
					onChange={handleChange}
					value={searchValue}
					placeholder='Search name or paste address'
				/>
			</div>
			<div className='select-token-modal__body'>
				<ul className='select-token-modal__list'>
					{tokens.map((token) => (
						<li
							key={token.name}
							className='select-token-modal__list__item'
							onClick={() =>
								handleSelectToken(destination, token.name)
							}
						>
							<div className='flex-center'>
								<Image
									light={token.icon}
									dark={token.icon}
									alt={token.name}
									w='30'
									h='30'
								/>
								<div className='ml-1'>
									<p className='font-size-14 font-weight-700'>
										{token.name}
									</p>
									<p className='font-size-12'>
										{token.description}
									</p>
								</div>
							</div>
							<p className='font-size-14 font-weight-700'>
								{token.amount}
							</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default SelectTokenModal;
