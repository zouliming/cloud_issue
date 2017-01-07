export const SOCKET_URL = (process.env.NODE_ENV === 'production')
	? 'ws://localhost:2346'
	: 'ws://localhost:2346'

export const API_URL = 'http://localhost/api/index.php?s=index'