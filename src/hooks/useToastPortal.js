import { useEffect, useState } from 'react';
import { uuid } from 'SHARED/helpers';

export const useToastPortal = () => {
	const [loaded, setLoaded] = useState(false);
	const [portalId] = useState(`toast-portal-${uuid()}`);

	useEffect(() => {
		const div = document.createElement('div');
		div.id = portalId;
		div.style = 'position: fixed; top: 15px; right: 15px; z-index: 150;';
		document.getElementsByTagName('body')[0].prepend(div);

		setLoaded(true);

		return () => document.getElementsByTagName('body')[0].removeChild(div);
	}, [portalId]);

	return { loaded, portalId };
};
