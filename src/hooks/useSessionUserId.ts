import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useSessionUserId(): string {
	const [sessionUserId, setSessionUserId] = React.useState<string>('');

	React.useEffect(() => {
		const existingSessionId = sessionStorage.getItem('sessionUserId');

		if (existingSessionId) {
			setSessionUserId(existingSessionId);
		} else {
			const newSessionId = uuidv4();
			sessionStorage.setItem('sessionUserId', newSessionId);
			setSessionUserId(newSessionId);
		}
	}, []);

	return sessionUserId;
}
